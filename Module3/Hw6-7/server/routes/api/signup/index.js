const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');

const constants = require(appRoot + 'server/constants');
const helpers = require(constants.path.toHelpers);
var crypto = require('crypto');
var User = require(constants.path.toModels + 'user.js');
var mongoose = require('mongoose');
mongoose.model('User');
var CREATED = 201;

var express = require('express');
var router = express.Router();

// change to different form signup instead of login form
router.get('', (req, res) => {
    // var formTemplate = fs.readFileSync(constants.path.toTemplates + 'components/login/form.html');
    // res.setHeader('Content-Type', constants.HTTP_HEADER_VALUE.CONTENT_TYPE.HTML);
    // res.end(formTemplate);
    res.end('signup get')
});

// signup
router.post('', function(req, res, next) {
	// console.log('req.body', req.body)
	const email = req.body.username;
    // var checkedKeepLoggedIn = request.body.checkedKeepLoggedIn;
    // console.log('checkedKeepLoggedIn', checkedKeepLoggedIn)
    // console.log('request.session', request.session);
    console.log('req.body', req.body);
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return next(err);

        if (user) {
            return res.send(helpers.invalidData('user already exists', 'signup', email));
        }

        var newUser = req.body;
		var modelInstance = new User(req.body);
		console.log('modelInstance', modelInstance);
	    return modelInstance.save()
	        .then(function (result) {
	            res.status(CREATED).json({
	                status: 'success',
	                response: result
	            });
	        })
	        .catch(function (err) {
	            res.send(err);
	        });

        // User.create(req.body, function (err, createdUser) {
	       //  if (err) {
	       //      if (err instanceof mongoose.Error.ValidationError) {
	       //          return helpers.someUncorrectData(email);
	       //      }
	       //      return next(err);
	       //  }
        //     res.send(createdUser);
        //     //return response.redirect('/');
        // });


        // crypto.randomBytes(16, function (err, bytes) {
        //     if (err) return next(err);

        //     var user = {
        //     	_id: email
        //     }
        //     user.salt = bytes.toString('utf8');
        //     user.hash = helpers.hash(req.body.password, user.salt);

        //     User.create(user, function (err, createdUser) {
        //         if (err) {
        //             if (err instanceof mongoose.Error.ValidationError) {
        //                 return helpers.someUncorrectData(email);
        //             }
        //             return next(err);
        //         }

        //         // user created successfully
        //         // request.session.isLoggedIn = true;
        //         // request.session.user = email;
        //         // console.log('request.session.cookie', request.session.cookie)
        //         // if (checkedKeepLoggedIn){
        //         //     request.session.cookie.maxAge = 14 * day ; // 14 days
        //         // } else {
        //         //     //request.session.cookie.expires = false;
        //         //     request.session.cookie.maxAge = day; // day
        //         // }

        //         // console.log('request.session.cookie', request.session.cookie);
        //         // request.session.save(function(err) {
        //         //     console.log('session saved in signup');
        //         // });
        //         // response.send(request.session);

        //         res.send(createdUser);
        //         //return response.redirect('/');
        //     });
        // })
    });

});

// router.post('', (req, res) => {
// 	res.end(req.body)
//     // var formTemplate = fs.readFileSync(constants.path.toTemplates + 'components/login/form.html');
//     // res.setHeader('Content-Type', constants.HTTP_HEADER_VALUE.CONTENT_TYPE.HTML);
//     // res.end(formTemplate);
// });



module.exports = router;