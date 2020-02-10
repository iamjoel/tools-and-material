var googleTTS = require('google-tts-api');

// 不翻墙会报错
// FetchError: network timeout at: https://translate.google.com
googleTTS('Hello World', 'en', 1)   // speed normal = 1 (default), slow = 0.24
.then(function (url) {
  console.log(url); // https://translate.google.com/translate_tts?...
})
.catch(function (err) {
  console.error(err.stack);
});