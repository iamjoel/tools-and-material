var express = require('express')

var app = express()

app.use(require('./router'))

app.use(function (req, res, next) {
  res.type('application/json')
  res.header('Access-Control-Allow-Origin', 'example.com')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.listen(3000, function () {
  console.info('listen 3000')
});