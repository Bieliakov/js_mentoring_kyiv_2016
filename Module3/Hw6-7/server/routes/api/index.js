var express = require('express');
var router = express.Router();

router.use('/login', require('./login'));

router.get('', (req, res) => {
    res.send(req.url)
});

module.exports = router;