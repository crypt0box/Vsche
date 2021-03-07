// date utility library
const format = require('date-fns/format');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const livers = {
  'ときのそら': { channelId: 'UCp6993wxpyDPHUpavwDFqgg' },
  'AZKi': { channelId: 'UC0TXe_LYZ4scaW2XMyi5_kw' },
  'ロボ子さん': { channelId: 'UCDqI2jOz0weumE8s7paEk6g' },
  'さくらみこ': { channelId: 'UC-hM6YJuNYVAmUWxeIr9FeA' },
  '白上フブキ': { channelId: 'UCdn5BQ06XqgXoAxIhbqw5Rg' },
  '夏色まつり': { channelId: 'UCQ0UDLQCjY0rmuxCDE38FGg' },
  '夜空メル': { channelId: 'UCD8HOxPs4Xvsm8H0ZxXGiBw' },
  '赤井はあと': { channelId: 'UC1CfXB_kRs3C-zaeTG3oGyg' },
  'アキ・ローゼンタール': { channelId: 'UCFTLzh12_nrtzqBPsTCqenA' },
  '湊あくあ': { channelId: 'UC1opHUrw8rvnsadT-iGp7Cg' },
  '癒月ちょこ': { channelId: 'UC1suqwovbL1kzsoaZgFZLKg' },
  '百鬼あやめ': { channelId: 'UC7fk0CB07ly8oSl0aqKkqFg' },
  '紫咲シオン': { channelId: 'UCXTpFs_3PqI41qX2d9tL2Rw' },
  '大空スバル': { channelId: 'UCvzGlP9oQwU--Y0r9id_jnA' },
  '大神ミオ': { channelId: 'UCp-5t9SrOQwXMU7iIjQfARg' },
  '猫又おかゆ': { channelId: 'UCvaTdHTWBGv3MKj3KVqJVCw' },
  '戌神ころね': { channelId: 'UChAnqc_AY5_I3Px5dig3X1Q' },
  '不知火フレア': { channelId: 'UCvInZx9h3jC2JzsIzoOebWg' },
  '白銀ノエル': { channelId: 'UCdyqAaZDKHXg4Ahi7VENThQ' },
  '宝鐘マリン': { channelId: 'UCCzUftO8KOVkV4wQG1vkUvg' },
  '兎田ぺこら': { channelId: 'UC1DCedRgGHBdm81E1llLhOQ' },
  '潤羽るしあ': { channelId: 'UCl_gCybOJRIgOXw6Qb4qJzQ' },
  '星街すいせい': { channelId: 'UC5CwaMl1eIgY8h02uZw7u8A' },
  '天音かなた': { channelId: 'UCZlDXzGoo7d44bwdNObFacg' },
  '桐生ココ': { channelId: 'UCS9uQI-jC3DE0L4IpXyvr6w' },
  '角巻わため': { channelId: 'UCqm3BQLlJfvkTsX_hvm0UmA' },
  '常闇トワ': { channelId: 'UC1uv2Oq6kNxgATlCiez59hw' },
  '姫森ルーナ': { channelId: 'UCa9Y57gfeY0Zro_noHRVrnw' },
  '雪花ラミィ': { channelId: 'UCFKOVgVbGmX65RxO3EtH3iw' },
  '桃鈴ねね': { channelId: 'UCAWSyEs_Io8MtpY3m-zqILA' },
  '獅白ぼたん': { channelId: 'UCUKD-uaobj9jiqB-VXt71mA' },
  '尾丸ポルカ': { channelId: 'UCK9V2B22uJYu3N7eR_BT9QA' }
};

function fetchStreamingSummary(channelId) {
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

function fetchStreamingSchedule(videoId) {
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

function utcToJapanDate(utcDate) {
  const timeZone = 'Asia/Tokyo';
  const japanDate = utcToZonedTime(utcDate, timeZone);
  const pattern = 'HH時mm分';
  const formatedDate = format(japanDate, pattern, { timeZone: timeZone })
  return formatedDate;
};

async function main() {
  try {
    for (let liverName of Object.keys(livers)) {
      const streamingInfo = await fetchStreamingSummary(livers[liverName]['channelId']);
      const videoId = streamingInfo.data.items[0].id.videoId;
      const streamingSchedule = await fetchStreamingSchedule(videoId);
      let scheduledStartTime = streamingSchedule.data.items[0].liveStreamingDetails['scheduledStartTime'];
      scheduledStartTime = utcToJapanDate(scheduledStartTime);
      livers[liverName]["streamingUrl"] = "https://www.youtube.com/watch?v=" + videoId;
      livers[liverName]["scheduledStartTime"] = scheduledStartTime;
    };
  } catch (error) {
    console.log(`エラーが発生しました (${error})`);
  }
};

main()
console.log('run fetch.js');

module.exports = livers;