// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const dialogflow = require("dialogflow");
const axios = require('axios');

// ライバー情報
const livers = {
    "ときのそら": "UCp6993wxpyDPHUpavwDFqgg",
    "AZKi": "UC0TXe_LYZ4scaW2XMyi5_kw",
    "ロボ子さん": "UCDqI2jOz0weumE8s7paEk6g",
    "さくらみこ": "UC-hM6YJuNYVAmUWxeIr9FeA",
    "白上フブキ": "UCdn5BQ06XqgXoAxIhbqw5Rg",
    "夏色まつり": "UCQ0UDLQCjY0rmuxCDE38FGg",
    "夜空メル": "UCD8HOxPs4Xvsm8H0ZxXGiBw",
    "赤井はあと": "UC1CfXB_kRs3C-zaeTG3oGyg",
    "アキ・ローゼンタール": "UCFTLzh12_nrtzqBPsTCqenA",
    "湊あくあ": "UC1opHUrw8rvnsadT-iGp7Cg",
    "癒月ちょこ": "UC1suqwovbL1kzsoaZgFZLKg",
    "百鬼あやめ": "UC7fk0CB07ly8oSl0aqKkqFg",
    "紫咲シオン": "UCXTpFs_3PqI41qX2d9tL2Rw",
    "大空スバル": "UCvzGlP9oQwU--Y0r9id_jnA",
    "大神ミオ": "UCp-5t9SrOQwXMU7iIjQfARg",
    "猫又おかゆ": "UCvaTdHTWBGv3MKj3KVqJVCw",
    "戌神ころね": "UChAnqc_AY5_I3Px5dig3X1Q",
    "不知火フレア": "UCvInZx9h3jC2JzsIzoOebWg",
    "白銀ノエル": "UCdyqAaZDKHXg4Ahi7VENThQ",
    "宝鐘マリン": "UCCzUftO8KOVkV4wQG1vkUvg",
    "兎田ぺこら": "UC1DCedRgGHBdm81E1llLhOQ",
    "潤羽るしあ": "UCl_gCybOJRIgOXw6Qb4qJzQ",
    "星街すいせい": "UC5CwaMl1eIgY8h02uZw7u8A",
    "天音かなた": "UCZlDXzGoo7d44bwdNObFacg",
    "桐生ココ": "UCS9uQI-jC3DE0L4IpXyvr6w",
    "角巻わため": "UCqm3BQLlJfvkTsX_hvm0UmA",
    "常闇トワ": "UC1uv2Oq6kNxgATlCiez59hw",
    "姫森ルーナ": "UCa9Y57gfeY0Zro_noHRVrnw",
    "雪花ラミィ": "UCFKOVgVbGmX65RxO3EtH3iw",
    "桃鈴ねね": "UCAWSyEs_Io8MtpY3m-zqILA",
    "獅白ぼたん": "UCUKD-uaobj9jiqB-VXt71mA",
    "尾丸ポルカ": "UCK9V2B22uJYu3N7eR_BT9QA",
}

// 関数
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function fetchStreamingSummary(channelId) {
  try {
    const apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&key=" + YOUTUBE_API_KEY + "&eventType=upcoming&type=video";
    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

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
                        let streamingUrl = '';
                        let liverName = responses[0].queryResult.parameters.fields.livers.stringValue;
                        if (liverName){
                          fetchStreamingSummary(livers[liverName])
                            .then(result => {
                              const videoId = result.data.items[0].id.videoId
                              streamingUrl = "https://www.youtube.com/watch?v=" + videoId;
                              bot.replyMessage(event.replyToken, {
                                type: "text",
                                text: streamingUrl
                              });
                            })
                            .catch(() => {
                                bot.replyMessage(event.replyToken, {
                                type: "text",
                                text: `いまのところ${liverName}の配信予定は無いようです。\nまた後で聞いてみてくださいね！`
                              });
                            });
                        } 
                        return 
                    }
                }).catch(error => {
                  console.log(error)
                })
            );
        }
    });
});