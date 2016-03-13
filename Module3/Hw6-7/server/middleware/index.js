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
const GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = '306dea9ab522b97ad4ea';
const GITHUB_CLIENT_SECRET = 'bf6404a4749b9df48abfc49f60cf133f98a20d21';


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
    
    passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/login/github/callback'
    }, function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }));


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
