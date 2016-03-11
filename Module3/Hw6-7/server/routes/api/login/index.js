var User = require('../../../models/user.js');
var mongoose = require('mongoose');
mongoose.model('User');
var passport = require('passport');
var hash = require('../../../helpers/hash.js');
var crypto = require('crypto');

var day = 24 * 60 * 60 * 1000;

var invalidData = require('../../../helpers/invalidData.js');
const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
// const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');

var express = require('express');
var router = express.Router();

// check user session
router.get('/session/check_user', function(request, response){
    console.log('request.session', request.session);
    response.send(request.session);
});

router.get('', (req, res) => {
    var formTemplate = fs.readFileSync(constants.path.toTemplates + 'components/login/form.html');
    res.setHeader('Content-Type', constants.HTTP_HEADER_VALUE.CONTENT_TYPE.HTML);
    res.end(formTemplate);
});

// log in
router.post('',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

// app.post(/^\/user\/check_user\/?$/, function(request, response, next){
//     console.log('request.body', request.body);
//     console.log('request.session', request.session);

//     var email = request.body._id;
//     console.log('userName', email);
//     var pass = request.body.password;
//     var checkedKeepLoggedIn = request.body.checkedKeepLoggedIn;
//     console.log(checkedKeepLoggedIn);


//     User.findById(email, function (err, user) {
//         if (err) throw err; // return next(err)     in express

//         if (!user) {
//             return response.send(invalidData('no user', 'login', email));
//         }

//         // check pass
//         if (user.hash != hash(pass, user.salt)) {
//             return response.send(invalidData('wrong password', 'login', email));
//         }

//         if (checkedKeepLoggedIn){
//             request.session.cookie.maxAge = 14 * day ; // 14 days
//         } else {
//             //request.session.cookie.expires = false;
//             request.session.cookie.maxAge = day; // day
//         }

//         request.session.isLoggedIn = true;
//         request.session.user = email;

//         request.session.reload(function(err) {
//             if (err) throw err;
//             console.log('session reload in login');
//         });
//         response.send(request.session);
//         //response.redirect('/');
//     });

// });

// signup
router.post(/^\/user\/?$/, function(request, response, next) {
    var email = request.body._id;
    console.log('userName', email);
    var pass = request.body.password;
    var checkedKeepLoggedIn = request.body.checkedKeepLoggedIn;
    console.log('checkedKeepLoggedIn', checkedKeepLoggedIn)
    console.log('request.session', request.session);

    User.findById(email, function (err, user) {
        if (err) return next(err);

        if (user) {
            return response.send(invalidData('user already exists', 'signup', email));
        }

        crypto.randomBytes(16, function (err, bytes) {
            if (err) return next(err);

            var user = { _id: email };
            user.salt = bytes.toString('utf8');
            user.hash = hash(pass, user.salt);

            User.create(user, function (err, createdUser) {
                if (err) {
                    if (err instanceof mongoose.Error.ValidationError) {
                        return someUncorrectData(email);
                    }
                    return next(err);
                }

                // user created successfully
                request.session.isLoggedIn = true;
                request.session.user = email;
                console.log('request.session.cookie', request.session.cookie)
                if (checkedKeepLoggedIn){
                    request.session.cookie.maxAge = 14 * day ; // 14 days
                } else {
                    //request.session.cookie.expires = false;
                    request.session.cookie.maxAge = day; // day
                }

                console.log('request.session.cookie', request.session.cookie);
                request.session.save(function(err) {
                    console.log('session saved in signup');
                });
                response.send(request.session);
                //return response.redirect('/');
            });
        })
    });

});

// logout
router.post(/^\/user\/logout\/?$/, function (request, response) {
    console.log('in logout');
    console.log('request.session', request.session);
    console.log('request.session.user', request.session.user);
    request.session.isLoggedIn = false;
    request.session.user = null;
    response.send(request.session);
    //request.redirect('/');
});


module.exports = router;


function someUncorrectData(email){
    console.log('there are some uncorrect data validation on the backend for', email, 'email');
}
