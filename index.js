// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const dialogflow = require("dialogflow");
const format = require('date-fns/format');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const axios = require('axios');
const livers = require('./livers');

// Youtube Data API Key
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// 関数
// 配信予定枠のVideoIdを取得
function fetchStreamingInfo(channelId) {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&key=" + YOUTUBE_API_KEY + "&eventType=upcoming&publishedAfter=" + today.toISOString() + "&type=video";
  return axios.get(apiUrl)
    .then(response => {
      if (!response) {
        return Promise.reject(new Error(`fetchStreamingSummary ${response.status}: ${response.statusText}`));
      } else {
        return response;
      }
    })
};

// 配信予定時刻を取得
function fetchStreamingScheduledInfo(videoId) {
  const apiUrl = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + videoId + "&key=" + YOUTUBE_API_KEY;
  return axios.get(apiUrl)
    .then(response => {
      if (!response) {
        return Promise.reject(new Error(`fetchStreamingSchedule ${response.status}: ${response.statusText}`));
      } else {
        return response;
      }
    })
};

// 配信予定時刻を日本時間に変換
function utcToJapanDate(utcDate) {
  const timeZone = 'Asia/Tokyo';
  const japanDate = utcToZonedTime(utcDate, timeZone);
  const pattern = 'HH時mm分';
  const formatedDate = format(japanDate, pattern, { timeZone: timeZone })
  return formatedDate;
};

async function createReplyMessage(liverName) {
	try {
    const streamingInfo = await fetchStreamingInfo(livers[liverName]["channelId"]);
    if (streamingInfo.data.items[0]) {
      const videoId = streamingInfo.data.items[0].id.videoId;
      const streamingScheduledInfo = await fetchStreamingScheduledInfo(videoId);
      const scheduledStartTime = streamingScheduledInfo.data.items[0].liveStreamingDetails['scheduledStartTime'];
      const streamingUrl = "https://www.youtube.com/watch?v=" + videoId;
      return `${liverName}は${utcToJapanDate(scheduledStartTime)}から配信予定です！\n${streamingUrl}`;
    }
    return `いまのところ${liverName}の配信予定は無いようです。\nまた後で聞いてみてくださいね！`;
	} catch (error) {
    console.log(`エラーが発生しました:${error}`);
  };
};

// LINEBOTにリプライメッセージを送信させる
function lineBotReplyMessage(token, replyMessage) {
  bot.replyMessage(token, {
    type: "text",
    text: replyMessage
  });
}

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// Dialogflowのクライアントインスタンスを作成
const session_client = new dialogflow.SessionsClient({
    project_id: process.env.GOOGLE_PROJECT_ID,
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
    }
});

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text"){
            events_processed.push(
                session_client.detectIntent({
                    session: session_client.sessionPath(process.env.GOOGLE_PROJECT_ID, event.source.userId),
                    queryInput: {
                        text: {
                            text: event.message.text,
                            languageCode: "ja",
                        }
                    }
                }).then((responses) => {
                    if (responses[0].queryResult && responses[0].queryResult.action == "get-liver-name"){
                      const liverName = responses[0].queryResult.parameters.fields.livers.stringValue;
											const replyMessage = createReplyMessage(liverName);
                      console.log("replyMessage", replyMessage)
                      console.log("event.replyToken", event.replyToken)
											bot.replyMessage(event.replyToken, {
												type: "text",
												text: replyMessage
											});
                    }
                }).catch(error => {
                  console.log(error)
                })
            );
        }
    });
});