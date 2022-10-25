const express = require('express');
const router = express.Router();
const OauthController = require('../controllers/oauthcontroller');
const OAuthServer = require('express-oauth-server');

router.oauth = new OAuthServer({
    model: OauthController
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/oauth/token', async (req, res, next) => {
    // TODO: Check user exist in out system
    next()
}, router.oauth.token());
router.post('/oauth/set_client', function (req, res, next) {
    OauthController.setClient(req.body)
        .then((client) => res.json(client))
        .catch((error) => {
            return next(error);
        });
});
router.post('/oauth/signup', function (req, res, next) {
    OauthController.setUser(req.body)
        .then((user) => res.json(user))
        .catch((error) => {
            return next(error);
        });
});

router.post('/token/valid', router.oauth.authenticate(), function (req, res) {
    res.json({
        status: 200,
        message: "ok"
    })
});


module.exports = router;
