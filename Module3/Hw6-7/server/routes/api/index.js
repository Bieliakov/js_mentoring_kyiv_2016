var express = require('express');
var router = express.Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/post', require('./post'));
router.use('/logout', require('./logout'));
router.use('/user', require('./user'));
router.use('/image', require('./image'));

router.get('', (req, res) => {
    res.status(200);
    res.send(req.url);
});

module.exports = router;