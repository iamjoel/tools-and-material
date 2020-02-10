var config = require('./config') 
var puppeteer = require('puppeteer')
var fs = require('fs')
var fsExtra = require('fs-extra')
var path = require('path')

const isDebug = true
const SPLIT = '@@@@@@@@@@@'
index()


async function index() {
  const browser = await puppeteer.launch({
    headless: !isDebug,
    // devtools: true,
  });

  try {
    // await getAllArticle(browser, 'EhUmA3') // 很多文章
    // await getAllArticle(browser, 'a5301268013b') // 有不少文章。star
    // await getAllArticle(browser, 'b41122e8d776') // 只有一页文章
    // await getAllArticle(browser, '65df078621c0') // 有少量一些文章
    await getAllArticle(browser, '82a143ac3f03')
  } catch(e) {
    console.log(e)
  }

  console.log('恭喜，所有文章下载完成！')
  
  browser.close()
}

async function getAllArticle(browser, userId) {
  let page = await browser.newPage();
  await page.goto(`${config.jianshu.userPrefix}/${userId}`)
  let user = await page.evaluate(async () => {
    // 将页面滚动到最底部
     await new Promise((resolve, reject) => {
      let totalHeight = 0
      let distance = 100
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance
        if(totalHeight >= scrollHeight){
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
    var articles = Array.from(document.querySelectorAll('.note-list a.title'))
                  .map(link => {
                    return {
                      id: link.getAttribute('href').split('/').slice(-1),
                      title: link.textContent
                    }
                    
                  })
    return {
      articles,
      info: {name: document.querySelector('.name').textContent}
    }

  })
  var {articles, info} = user
  console.log(`${info.name}总共有${articles.length}篇文章`)

  const outputFoldPath = resolve(`${config.output.path}/${info.name}_${userId}`);
  fsExtra.ensureDir(`${outputFoldPath}/article`)
  
  var nav = []
  var navObj = {}
  for(var i = 0; i < articles.length; i++) {
    // TODO 发现文章下载过，不做重复下载
    let articleInfo =  await download(browser, articles[i].id, outputFoldPath)
    let [categoryName, title, articleId] = articleInfo.split(SPLIT)
    if(!navObj[categoryName]) {
      navObj[categoryName] = []
    }
    navObj[categoryName].push({id: articleId, title: title})
  }
  nav = Object.keys(navObj).map(categoryName => {
    return {
      categoryName,
      articleList: navObj[categoryName]
    }
  })

  var htmlTemplate = fs.readFileSync(resolve('index_template.html'), 'UTF-8')

  htmlTemplate = htmlTemplate
                    .replace('{author}', info.name)
                    .replace('{data}', JSON.stringify(nav, null, '\t'))
  fsExtra.outputFileSync(`${outputFoldPath}/index.html`, htmlTemplate)
}

async function download(browser, articleId, outputFoldPath) {
  let page = await browser.newPage();
  var url = `${config.jianshu.articlePrefix}/${articleId}`
  page.setUserAgent(config.userAgent)
  try {
    await page.goto(url)
  } catch(e) {
    // 请求超时，重试3次。 为了反爬虫。
    await retry(3, async () => {
      await page.goto(url)
    })
  }

  // 页面上下文中加 log
  page.on('console', msg => console.log(msg.text()))

  let pageInfo = await page.evaluate(async () => {
    const title = document.querySelector('.title').textContent
    const categoryName = document.querySelector('.notebook span').textContent
    console.log(`开始下载: ${title}`)

    var style = document.createElement('style')
    style.innerHTML = `
    html body {padding-top: 40px!important;}
    .note {padding-top:0 !important;}
    .post {padding-top:0 !important;}
    .title{margin-top: 0 !important;margin-bottom: 20px !important;}`
    document.body.appendChild(style)
    // 将页面滚动到最底部
    await new Promise((resolve, reject) => {
      let totalHeight = 0
      let distance = 100
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance
        if(totalHeight >= scrollHeight){
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })

    // 删除页面上干扰的内容
    removeDOM('.navbar-fixed-top')
    removeDOM('.author')
    removeDOM('#free-reward-panel')
    removeDOM('.show-foot')
    removeDOM('.follow-detail')
    removeDOM('.meta-bottom')
    removeDOM('#comment-list')
    removeDOM('.note-bottom')
    removeDOM('#fixed-ad-container')
    removeDOM('.side-tool')
    removeDOM('#web-note-ad-1')
    
    // 加载图片
    try {
      const imgs = Array.from(document.querySelectorAll('.show-content img'))
      
      await Promise.all(imgs.filter(img => !img.complete).map(img => {
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve); // 也算成功吧
        });
      }))

    } catch(e) {
      const div = document.createElement('div');
        div.innerHTML = e
      document.body.appendChild(div)
    }

    function removeDOM(selector) {
      if(document.querySelector(selector)) {
        document.querySelector(selector).remove()
      } else {
        console.log(`未找到元素: ${selector}`)
      }
    }
    

    return {
      wh: {
        width: 680, // 620 是主题内容的宽度
        height: document.body.clientHeight,
      },
      title,
      categoryName
    }
  });

  await page.setViewport(pageInfo.wh);

  var outputConfig = config.output

  var downloadPath = `${outputFoldPath}/article/${pageInfo.title.replace(/\//g, '_')}.png`
  await page.screenshot({
    fullPage: true,
    path: downloadPath
  })
  console.log(`下载完成: ${pageInfo.title}。`)
  await page.close()
  return `${pageInfo.categoryName}${SPLIT}${pageInfo.title}${SPLIT}${articleId}`
}

async function retry(times, fn) {
  if(times > 0) {
    await timeout(1000) // 歇1秒再试
    try {
      console.log(`倒数第${times}次重试！`)
      await fn()
    } catch(e) {
      await retry(times--, fn)
    }
  } else {
    console.log('重试失败!')
  }
}

function resolve(dir, dir2 = ''){
  return path.posix.join(__dirname, './', dir, dir2);
}

function timeout(delay) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          try {
              resolve(1)
          } catch (e) {
              reject(0)
          }
      }, delay)
  })
}


