// --- Dependencies --- //
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// --- Models --- //
var User = require('../models/user');

// --- Passport Local Strategy --- //
passport.use(new LocalStrategy(
	function(username, password, done) {
	  User.getUserByUsername(username, function(err, user){
	    if(err) throw err;
	    if(!user){
	      return done(null, false, {message: 'Unknown user'});
	    }
	    User.comparePassword(password, user.password, function(err, isMatch){
	      if(err) throw err;
	      if(isMatch){
	        return done(null, user);
	      }
	      else{
	        return done(null, false, {message: 'Invalid password'})
	      }
	    });
	  });
	}
));

// --- Serialize and Deserialize User --- //
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// --- Pass to protect/show api data --- //
exports.ensureAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	else{
		return res.send('NOT AUTHENTICATED');
	}
}
