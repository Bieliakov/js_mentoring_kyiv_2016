var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
	console.log('req.user', req.user);
    req.logout();
    res.redirect('/');
});

module.exports = router;
