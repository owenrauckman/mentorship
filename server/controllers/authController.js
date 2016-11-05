// --- Dependencies --- //
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var authController = require('../controllers/passportController');

// --- Models --- //
var User = require('../models/user');

// --- Register User --- //
exports.registerUser = function(req, res, err){
  if(!req.body.email || !req.body.password || !req.body.name || !req.body.username){
    res.json({ sucess: false, message: 'Please enter an email/password to register'}); //TODO: make this route
  }
  if(err){
    res.json({msg: 'username or email already exists'}); // flash msg here? probably just data
  }
  else{
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      name: req.body.name
    });
    //takes in the new user and the callback from the model
    User.createUser(newUser, function(err, user){
      if(err) throw err;
    });
    res.json({msg: 'going back to sign in link'});
  }
};

// --- Login User --- //
exports.loginUser = function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err); //500
    }
    // Generate JSON response reflecting signup
    if(!user){
      return res.send({ success : false, message : 'signinfailed' });
    }
    //must use req.login for custom login functionality
    req.logIn(user, function(err) {
      if(err) return next(err);
      return res.send({ success : true, message : 'signin succeeded', user: user});
    });
  })(req, res, next);
};

// --- Check If logged In --- //
exports.isLoggedIn = function(req, res){
  if(req.user){
    res.send({state: 'success', user: req.user});
  }
  else{
    res.send({state: 'failure', user: null});
  }
};

// --- Logout User --- //
exports.logout = function(req, res){
  req.logout(); //that's all. Needing to blow away session data?
  res.json({msg: 'logged out!'});
};
