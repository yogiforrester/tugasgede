var express          = require( 'express' )
  , app              = express.Router()
  , passport         = require( 'passport' )
  , util             = require( 'util' )
  , cookieParser     = require( 'cookie-parser' )
  , session          = require( 'express-session' )
  , RedisStore       = require( 'connect-redis' )( session )
  , FacebookStrategy   = require( 'passport-facebook' ).Strategy;

  
var FACEBOOK_CLIENT_ID    = "381425499165693"
, FACEBOOK_CLIENT_SECRET  = "98f2603780b3690013868ca54cdb3ade";

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(obj, done) {
done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID:     FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,

  callbackURL: "http://localhost:3500/auth/facebook/callback",
},
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(function(err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
}
));

app.use( cookieParser()); 
app.use( session({ secret: 'Dino Barus',
    proxy:  true,
    resave: true,
    saveUninitialized: true
    }));
app.use( passport.initialize());
app.use( passport.session());

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: [
       'email', 'profile'] 
}));

app.get( '/auth/facebook/callback', 
    	passport.authenticate( 'facebook', { 
    		successRedirect: '/',
    		failureRedirect: '/login'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }

  module.exports= app;