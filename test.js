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

// const format = require('date-fns/format');
// const compareAsc = require('date-fns/compareAsc');
// const utcToZonedTime = require('date-fns-tz/utcToZonedTime')
// const timeZone = 'Asia/Tokyo'

// const now = new Date();
// console.log("now", now)
// const japanDate = utcToZonedTime(now, timeZone)

// const pattern = 'yyyy.M.d HH:mm'
// const output = format(japanDate, pattern, { timeZone: timeZone })
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
const YOUTUBE_API_KEY = ''
async function fetchStreamingSummary(channelId) {
  try {
    const apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&key=" + YOUTUBE_API_KEY + "&eventType=upcoming&type=video";
    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

fetchStreamingSummary(livers['湊あくあ'])
  .then(res => console.log(res.data))