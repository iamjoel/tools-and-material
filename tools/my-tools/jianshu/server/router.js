var router = require('express').Router()
var services = require('./service')

router.get('/notify', (req, res)=> {
  services.fetchNotifications().then(data =>{
    res.json(data)
  })
})

module.exports = router