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

  User.count({username: req.body.username, email: req.body.email}, function(err, user){
    // General Error Handling
    if(err) throw err;
    else{
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        profession: req.body.profession,
        company: req.body.company,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        statement: req.body.statement,
        skillsPossessed: req.body.skillsPossessed,
        skillsDesired: req.body.skillsDesired,
        mentoring: req.body.mentoring,
        mentoredBy: req.body.mentoredBy
      });
      //takes in the new user and the callback from the model
      User.createUser(newUser, function(err, user){
        // 1100 handles dupe keys
        if ( err && err.code !== 11000 ) {
          return res.send('Something bad happened. Error, whoops!');
        }
        //duplicate key
        else if ( err && err.code === 11000 ) {
          return res.json({msg: "That username or email aleady exists 1100"});
        }
        else{
          return res.json({msg: 'going back to sign in link ' + newUser.username }); //success TODO: // redirect or something
        }
      });
    }
  });
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
