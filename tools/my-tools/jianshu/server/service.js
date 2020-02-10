var request = require('request')

const JIANSHU_SERVER = 'http://www.jianshu.com'
// loggeredCoodie 的值是简书登录后，页面输入 document.cookie 的值。
// _session_id 是 http only 的。。。
const loggeredCoodie = `xxx`
  // 获取消息通知
var fetchNotifications = (loginedCookieValue) => {
  // return new Promise((resolve,reject)=> {
    var url = `${JIANSHU_SERVER}/notifications?type=follows&page=1`
    var j = generatorLoginCookieJar(loginedCookieValue, url)
    request({
      url: url,
      jar: j,
      headers: {
        'Accept': 'application/json'
      }
    }, function (error, response, body) {
      console.log(body)
      // resolve(body)
    })
  // })
}
// http://www.jianshu.com/u/EhUmA3?order_by=shared_at&_pjax=%23list-container

// 获取文章列表 TODO 有没有接口 获得用户id EhUmA3
var fetchArticles = (loginedCookieValue) => {
  var url = `${JIANSHU_SERVER}/u/EhUmA3?order_by=shared_at`
  var j = generatorLoginCookieJar(loginedCookieValue, url)
  request({
    url: url,
    jar: j,
    headers: {
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    var neededInfo = ['id', 'title', 'shared_at']
    var note = JSON.parse(body).notes.map(article => {
      var res = {}
      neededInfo.forEach(key => {
        res[key] = article[key]
      })
      return res
    })
    console.log(note)
  })
}

// 获取专题
var fetchCollections = (loginedCookieValue, q) => {
  var url = `${JIANSHU_SERVER}/search/do?q=${encodeURIComponent(q)}&type=collection&page=1&order_by=top`
  var j = generatorLoginCookieJar(loginedCookieValue, url)
  request({
    url: url,
    jar: j,
    headers: {
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    var neededInfo = ['id', 'title', 'public_notes_count','likes_count']
    var collection = JSON.parse(body).entries.map(article => {
      var res = {}
      neededInfo.forEach(key => {
        res[key] = article[key]
      })
      return res
    })
    console.log(collection)
  })
}

// 投稿
var submitArticle = (loginedCookieValue, articleId, collectionId) => {
  var url = `${JIANSHU_SERVER}/notes/${articleId}/submit`
  var j = generatorLoginCookieJar(loginedCookieValue, url)
  request({
    url: url,
    jar: j,
    method: 'POST',
    json: true,
    body: {
      collection_id: collectionId
    },
    headers: {
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    console.log(body)
  })
}

function generatorLoginCookieJar(loginedCookieValue, url) {
  var j = request.jar();
  loginedCookieValue.split(';').forEach(item => {
    // console.log(item)
    var cookie = request.cookie(item.trim())
    j.setCookie(cookie, url)
  })
  // console.log(j)
  return j
}

fetchNotifications(loggeredCoodie)
// fetchArticles(loggeredCoodie)
// fetchCollections(loggeredCoodie, '前端')
// submitArticle(loggeredCoodie, 11819604, 937)

/*
 专栏 id 1084 Web 前端之路
 文章 11819604 vue-router2 写法示例
*/

module.exports = {
  fetchNotifications: ()=> {
    return fetchNotifications(loggeredCoodie)
  }
}