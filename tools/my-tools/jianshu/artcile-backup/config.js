module.exports = {
  jianshu: {
    userPrefix: 'https://www.jianshu.com/u',
    articlePrefix: 'https://www.jianshu.com/p'
  },
  output: {
    path: 'output/',
    // 生成pdf时的页边距
    margin: {
      top: '20px',
      right: '10px',
      bottom: '20px',
      left: '10px',
    },
    displayHeaderFooter: false,
    format: 'A4',
  },
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
}