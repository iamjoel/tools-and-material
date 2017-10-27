sumbitToFrontend() // 向前端类专栏投稿
function sumbitToFrontend() {
  submitArticle(3) // 程序员
  submitArticle(65506) // Web前端之路
  submitArticle(52276) // Web 前端开发
  submitArticle(204109) // 技术文
}
/*
 * 给专栏投稿
 * @params collectionId: 专题id
 * @params articleIndex: 投稿文章序号文章。可选
 */
function submitArticle(collectionId, articleIndex = 0) {
  var collection
  var article

  fetchCollectionInfo(collectionId).done(data => {
    collection = data
    fetchArticleList(collection.id).done(articles => {
      article = articles[articleIndex]
      $.ajax({
        url: `http://www.jianshu.com/notes/${article.id}/submit`,
        type: 'post',
        data: JSON.stringify({
          collection_id: collection.id
        }),
        contentType: 'application/json'
      }).done(data => {
        alert(`${article.title} 投稿 ${collection.title} 成功!`)
      }).fail(data => {
        alert(`${article.title} 投稿 ${collection.title} 失败:${data.responseJSON.error}`)
      })
    }).fail(data => {
      dfd.resolve(data)
    })
  })
}

// 获取我的文章列表
function fetchArticleList(collectionId) {
  return $.ajax({
    url: `http://www.jianshu.com/collections/${collectionId}/contribute_notes?page=1`,
  })
}

// 获取专栏信息
function fetchCollectionInfo(id) {
  var dfd = $.Deferred()
  $.ajax({
    url: `http://www.jianshu.com/subscriptions/${id}`,
  }).done(data => {
    dfd.resolve(data.source)
  }).fail(data => {
    dfd.resolve(data)
  })
  return dfd.promise()
}
