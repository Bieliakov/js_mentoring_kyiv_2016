var bodyParser = require('body-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const config = require(appRoot + 'server/config');


module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    //app.use(cookieParser());
    app.use(expressSession({
        secret: 'secret',
        store: new MongoStore(
            {
                url: config.mongoURL
                //ttl: 14 * 24 * 60 * 60 // = 14 days. Default
            }
        ),
        resave: false,
        saveUninitialized: true
    }));

    // expose session to views
    // app.use(function (req, res, next) {
    //     res.locals.session = req.session;
    //     next();
    // })
}
