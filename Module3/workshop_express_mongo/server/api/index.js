var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));


router.get('', (req, res) => {
    res.send(req.url)
});

module.exports = router;