var express = require('express');
var router = express.Router();

// router.use('user', require('./user'));

router.get('', (req, res) => {
    console.log('')
    res.send({
        userName: 'test'
    })
});

router.post('', (req, res) => {
    res.send('post')
});

module.exports = router;
