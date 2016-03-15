'use strict';

var express = require('express');
var router = express.Router();
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');

router.get('/:name/post', (req, res) => {
    require(constants.path.toSharedRoutes).posts(req,res);
});

module.exports = router;