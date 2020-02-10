var puppeteer = require('puppeteer')

index()

async function index() {
  const browser = await puppeteer.launch({
    headless: false,
    // devtools: true,
  });
  let page = await browser.newPage();
  await page.goto(`https://www.jianshu.com/sign_in`, {
    waitUntil: 'networkidle0'
  })
  
  // 输入帐号密码，点登录
  // session_email_or_mobile_number
  // session_password
  // await page.type('#session_email_or_mobile_number', 'tel')
  // await page.type('#session_password', 'pass')

  page.click('#sign-in-form-submit-btn')

  // 等待登录成功
  await page.waitForNavigation({
    timeout: 0
  })

  // 分析粉丝
  await page.goto(`https://www.jianshu.com/notifications#/follows`)
  console.log('登录成功')

  var fanNames = Array.from(page.$$('.follow-list .info .user'))
  // 
  fanNames.forEach(fanEl => {
    console.log(fanEl.textContent)
  })

}