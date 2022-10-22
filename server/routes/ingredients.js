var express = require('express')
var router = express.Router()
const OauthController = require('../controllers/oauthcontroller');
const OAuthServer = require('express-oauth-server');

router.oauth = new OAuthServer({
    model: OauthController
});

/* GET users listing. */
router.get('/secret', router.oauth.authenticate(), function (req, res) {
});

module.exports = router
