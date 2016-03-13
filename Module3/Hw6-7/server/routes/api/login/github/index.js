var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('', passport.authenticate('github'));

// //GitHub will call this URL
// router.get('/callback', passport.authenticate('github', {
//   successRedirect: '/success',
//   failureRedirect:'/error'
// }));

router.get('/callback', passport.authenticate('github'), (req, res) => {
		if (req.user) {
			res.send(req.user);
		}
		console.log('req.user', req.user)
		console.log('github is calling this url', req.url);
	}
);



module.exports = router