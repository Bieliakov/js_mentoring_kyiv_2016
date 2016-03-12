
var passport = require('passport');



var day = 24 * 60 * 60 * 1000;

const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
// const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');
var User = require(constants.path.toModels + 'user.js');
var mongoose = require('mongoose');
mongoose.model('User');

var hash = require(constants.path.toHelpers + 'hash.js');
var invalidData = require(constants.path.toHelpers + 'invalidData.js');

var express = require('express');
var router = express.Router();

// check user session
router.get('/session/check_user', function(request, response){
    console.log('request.session', request.session);
    response.send(request.session);
});

router.get('', (req, res) => {
    // var formTemplate = fs.readFileSync(constants.path.toTemplates + 'components/login/form.html');
    // res.setHeader('Content-Type', constants.HTTP_HEADER_VALUE.CONTENT_TYPE.HTML);
    // res.end(formTemplate);
    res.send('hello');
});

// log in
router.post('',
    passport.authenticate('local', {
        // successRedirect: '/api',
        failureRedirect: '/api/login',
        failureFlash: true
    }),
    (req, res) => {
        res.send('successful login!');
    }
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
