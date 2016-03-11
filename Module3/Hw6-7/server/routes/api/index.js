var express = require('express');
var router = express.Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));

router.get('', (req, res) => {
    res.status(200);
    res.send(req.url);
});

module.exports = router;