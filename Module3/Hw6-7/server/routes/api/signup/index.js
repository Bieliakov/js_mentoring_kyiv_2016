const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
// const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');


var express = require('express');
var router = express.Router();

// change to different form signup instead of login form
router.get('', (req, res) => {
    var formTemplate = fs.readFileSync(constants.path.toTemplates + 'components/login/form.html');
    res.setHeader('Content-Type', constants.HTTP_HEADER_VALUE.CONTENT_TYPE.HTML);
    res.end(formTemplate);
});

module.exports = router;