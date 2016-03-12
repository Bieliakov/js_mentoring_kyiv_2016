var bodyParser = require('body-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const config = require(appRoot + 'config.env.js');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

module.exports = function (app) {




        // app.use(express.static('public'));
        // app.use(express.cookieParser());


        // app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(flash());
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
    app.use(passport.initialize());
    app.use(passport.session());
    // app.use(app.router);

    passport.use(new LocalStrategy(/*{
      usernameField: '_id',
      passwordField: 'hash'
    },*/
      function(username, password, done) {
        console.log('username', username)
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.authenticate(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));
    

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    

    
    

    // expose session to views
    // app.use(function (req, res, next) {
    //     res.locals.session = req.session;
    //     next();
    // })
}
