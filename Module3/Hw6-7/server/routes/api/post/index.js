const mongoose = require('mongoose');
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const Post = require(constants.path.toModels + 'post.js');

var express = require('express');
var router = express.Router();

// function loggedIn(req, res, next) {
//     if (req.user) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// }

router.get('', (req, res) => {
	if (req.user) {
		//
	}
	console.log('req.user', req.user)
    // var formTemplate = fs.readFileSync(constants.path.toTemplates + 'components/login/form.html');
    // res.setHeader('Content-Type', constants.HTTP_HEADER_VALUE.CONTENT_TYPE.HTML);
    // res.end(formTemplate);
    res.send(req.user);
});

router.post('', (req, res) => {
    // var body = req.body.body;
    // var title = req.body.title;
    // console.log('req.user', req.user)



    // var user = req.session.user;

    // BlogPost.create({
    //     body: body
    //   , title: title
    //   , author: user
    //  }, function (err, post) {
    //    if (err) return next(err);
    //    res.redirect('/post/' + post.id);
    // });
    // res.send('posts');
});

module.exports = router;