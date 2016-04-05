
const passport = require('passport');
const appRoot = require('app-root-path').resolve('/');
const express = require('express');
const router = express.Router();
const constants = require(appRoot + 'server/constants');
const helpers = require(constants.path.toHelpers);

router.use('/github', require('./github'));

router.get('', (req, res) => {
    if (req.user) {
        return res.send({username: req.user.username});
    } else {
        return res.send(helpers.invalidData('no user'));
    }
});

// log in
router.post('',
    passport.authenticate('local', {
        successRedirect: '/#wall',
        failureRedirect: '/api/login',
        failureFlash: true
    }),
    (req, res) => {
        res.send('successful login!');
    }
);

module.exports = router;
