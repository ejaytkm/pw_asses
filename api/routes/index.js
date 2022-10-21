var express = require('express')
var router = express.Router()

// const UserInfoModel = require('../database/models').UserInfo
// const db = require('../database/models')

/* GET home page. */
router.get('/', function (req, res, next) {
  /* for (var i = 0; i < 100; i++) {
    console.log(uuidv5("andricsee.dev" + i + "@gmail.com", uuidv4()));
  }
  */
  res.render('index', { title: 'Express' })
})

module.exports = router
