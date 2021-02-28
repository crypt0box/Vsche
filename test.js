// const axios = require('axios');

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
const compareAsc = require('date-fns/compareAsc');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime')
const timeZone = 'Asia/Tokyo'

const now = new Date();
console.log("now", now)
const japanDate = utcToZonedTime(now, timeZone)

const pattern = 'yyyy.M.d HH:mm'
const output = format(japanDate, pattern, { timeZone: timeZone })

