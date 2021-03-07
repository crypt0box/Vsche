const axios = require('axios');

// const hololivers = {
//   "UCp6993wxpyDPHUpavwDFqgg": [
//       "ときのそら",
//       "https://yt3.ggpht.com/a/AATXAJzGvZJuJ92qM5WcfBcDZqPFSj_CGIEYp9VFmA=s288-c-k-c0xffffffff-no-rj-mo"
//   ],
//   "UC1uv2Oq6kNxgATlCiez59hw": [
//       "常闇トワ",
//       "https://yt3.ggpht.com/a/AATXAJxqyp7DhLSSrSYRc5HaLcq5QvJvRp3jDnxTeA=s288-c-k-c0xffffffff-no-rj-mo"
//   ],
//   "UCa9Y57gfeY0Zro_noHRVrnw": [
//       "姫森ルーナ",
//       "https://yt3.ggpht.com/a/AATXAJzzirDjRJkofWVeoE6gVjodJ0VXaJhy4b_CLg=s288-c-k-c0xffffffff-no-rj-mo"
//   ],
// } 

// const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// async function fetchStreamingSummary() {
//   try {
//     const apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + "UCCzUftO8KOVkV4wQG1vkUvg" + "&key=" + YOUTUBE_API_KEY + "&eventType=upcoming&type=video"
//     return await axios.get(apiUrl)
//   } catch (error) {
//     console.log(error);
//   }
// };

// fetchStreamingSummary()
//   .then(result => {
//     const videoId = result.data.items[0].id.videoId
//     const publishTime = result.data.items[0].snippet.publishTime
//   });

// const livers = {
//   '天音かなた': "UCp6993wxpyDPHUpavwDFqgg"
// }

// console.log(livers['天音かなた'])

const format = require('date-fns/format');
// const compareAsc = require('date-fns/compareAsc');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime')
// const timeZone = 'Asia/Tokyo'

// const now = new Date();
// const japanDate = utcToZonedTime(now, timeZone)

// const pattern = 'yyyy.M.d HH:mm'
// const output = format(japanDate, pattern, { timeZone: timeZone })

function utcToJapanDate(utcDate) {
  const timeZone = 'Asia/Tokyo';
  const japanDate = utcToZonedTime(utcDate, timeZone);
  const pattern = 'HH時mm分';
  const formatedDate = format(japanDate, pattern, { timeZone: timeZone })
  return formatedDate;
}

// let livers = {
//   "ときのそら": "UCp6993wxpyDPHUpavwDFqgg",
//   "AZKi": "UC0TXe_LYZ4scaW2XMyi5_kw",
//   "ロボ子さん": "UCDqI2jOz0weumE8s7paEk6g",
//   "さくらみこ": "UC-hM6YJuNYVAmUWxeIr9FeA",
//   "白上フブキ": "UCdn5BQ06XqgXoAxIhbqw5Rg",
//   "夏色まつり": "UCQ0UDLQCjY0rmuxCDE38FGg",
//   "夜空メル": "UCD8HOxPs4Xvsm8H0ZxXGiBw",
//   "赤井はあと": "UC1CfXB_kRs3C-zaeTG3oGyg",
//   "アキ・ローゼンタール": "UCFTLzh12_nrtzqBPsTCqenA",
//   "湊あくあ": "UC1opHUrw8rvnsadT-iGp7Cg",
//   "癒月ちょこ": "UC1suqwovbL1kzsoaZgFZLKg",
//   "百鬼あやめ": "UC7fk0CB07ly8oSl0aqKkqFg",
//   "紫咲シオン": "UCXTpFs_3PqI41qX2d9tL2Rw",
//   "大空スバル": "UCvzGlP9oQwU--Y0r9id_jnA",
//   "大神ミオ": "UCp-5t9SrOQwXMU7iIjQfARg",
//   "猫又おかゆ": "UCvaTdHTWBGv3MKj3KVqJVCw",
//   "戌神ころね": "UChAnqc_AY5_I3Px5dig3X1Q",
//   "不知火フレア": "UCvInZx9h3jC2JzsIzoOebWg",
//   "白銀ノエル": "UCdyqAaZDKHXg4Ahi7VENThQ",
//   "宝鐘マリン": "UCCzUftO8KOVkV4wQG1vkUvg",
//   "兎田ぺこら": "UC1DCedRgGHBdm81E1llLhOQ",
//   "潤羽るしあ": "UCl_gCybOJRIgOXw6Qb4qJzQ",
//   "星街すいせい": "UC5CwaMl1eIgY8h02uZw7u8A",
//   "天音かなた": "UCZlDXzGoo7d44bwdNObFacg",
//   "桐生ココ": "UCS9uQI-jC3DE0L4IpXyvr6w",
//   "角巻わため": "UCqm3BQLlJfvkTsX_hvm0UmA",
//   "常闇トワ": "UC1uv2Oq6kNxgATlCiez59hw",
//   "姫森ルーナ": "UCa9Y57gfeY0Zro_noHRVrnw",
//   "雪花ラミィ": "UCFKOVgVbGmX65RxO3EtH3iw",
//   "桃鈴ねね": "UCAWSyEs_Io8MtpY3m-zqILA",
//   "獅白ぼたん": "UCUKD-uaobj9jiqB-VXt71mA",
//   "尾丸ポルカ": "UCK9V2B22uJYu3N7eR_BT9QA",
// }

let livers = {
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
}

const YOUTUBE_API_KEY = 'AIzaSyCfQ1Q-75SEpRKR9VWV24WENK-Xjjtyjms';
// async function fetchStreamingSummary(channelId) {
//   try {
//     const today = new Date(new Date().setHours(0, 0, 0, 0));
//     const apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&key=" + YOUTUBE_API_KEY + "&eventType=upcoming&publishedAfter=" + today.toISOString() + "&type=video";
//     const response = await axios.get(apiUrl);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

function fetchStreamingSummary(channelId) {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&key=" + YOUTUBE_API_KEY + "&eventType=upcoming&publishedAfter=" + today.toISOString() + "&type=video";
  return axios.get(apiUrl)
    .then(response => {
      if (!response) {
        return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
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
        return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
      } else {
        return response;
      }
    })
};

async function main() {
  try {
    const liverName = '兎田ぺこら';
    const streamingInfo = await fetchStreamingSummary(livers[liverName]['channelId']);
    const videoId = streamingInfo.data.items[0].id.videoId;
    const streamingSchedule = await fetchStreamingSchedule(videoId);
    const scheduledStartTime = streamingSchedule.data.items[0].liveStreamingDetails['scheduledStartTime'];
    livers[liverName]["streamingUrl"] = "https://www.youtube.com/watch?v=" + videoId;
    livers[liverName]["scheduledStartTime"] = scheduledStartTime;
    console.log(livers[liverName]);
  } catch (error) {
    console.log(`エラーが発生しました (${error})`);
  }
}

Object.keys(livers).forEach(e => {
  console.log(e)
});
// async function fetchStreamingSchedule(videoId) {
//   try {
//     const apiUrl = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + videoId + "&key=" + YOUTUBE_API_KEY;
//     const response = await axios.get(apiUrl);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// fetchStreamingSummary(livers['白上フブキ'])
//   .then(result => {
//     const videoId = result.data.items[0].id.videoId;
//     fetchStreamingSchedule(videoId)
//       .then(result => {
//         const scheduledStartTime = result.data.items[0].liveStreamingDetails['scheduledStartTime'];
//         const scheduledJapanStartTime = utcToJapanDate(scheduledStartTime);
//       })
//       .catch(error => {
//         console.log("fetchStreamingScheduleError", error)
//       });
//   })
//   .catch(error => {
//   console.log("fetchStreamingSummaryError", error)
//   });

// const today = new Date(new Date().setHours(0, 0, 0, 0));
