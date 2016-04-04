const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('', passport.authenticate('github'));

// GitHub will call this URL
router.get('/callback', passport.authenticate('github'), (req, res) => {
        if (req.user) {
			res.send(req.user);
		}
	}
);

module.exports = router;
