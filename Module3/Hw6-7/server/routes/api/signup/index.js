const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const helpers = require(constants.path.toHelpers);
var User = require(constants.path.toModels + 'user.js');

var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
    res.end('signup get')
});

// signup
router.post('', function(req, res, next) {
	const email = req.body.username;
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return next(err);

        if (user) {
            return res.send(helpers.invalidData('user already exists', 'signup', email));
        }
        var newUser = req.body;
		var modelInstance = new User(req.body);
	    return modelInstance.save()
	        .then(function (result) {
	            res.status(constants.STATUS.CREATED).json({
	                status: 'success',
	                response: result
	            });
	        })
	        .catch(function (err) {
	            res.send(err);
	        });
    });
});

module.exports = router;
