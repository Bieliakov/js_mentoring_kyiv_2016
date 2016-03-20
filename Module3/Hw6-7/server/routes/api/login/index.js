
const passport = require('passport');
const appRoot = require('app-root-path').resolve('/');
const express = require('express');
const router = express.Router();

router.use('/github', require('./github'));

router.get('', (req, res) => {
    if (req.user) {
        res.send({username: req.user.username});
    } else {
        res.send({});
    }
});

// log in
router.post('',
    passport.authenticate('local', {
        successRedirect: '/api/login',
        failureRedirect: '/api/login',
        failureFlash: true
    }),
    (req, res) => {
        res.send('successful login!');
    }
);

module.exports = router;
