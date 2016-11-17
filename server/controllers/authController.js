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
    // Create the user
    else{
      // Turn Strings To Arrays since Vue won't seem to let me ugh
      var skillsPossessed, skillsDesired;
      if(req.body.skillsPossessed || req.body.skillsDesired){
        skillsPossessed = req.body.skillsPossessed.split(',');
        skillsDesired = req.body.skillsDesired.split(',');

        skillsPossessed.forEach(function(skill, index, arr){
          arr[index] = skill.trim();
        });
        skillsDesired.forEach(function(skill, index, arr){
          arr[index] = skill.trim();
        });
      }
      var newUser = new User({
        username: req.body.username.replace(/ /g,''),
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
        profession: req.body.profession,
        company: req.body.company,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        statement: req.body.statement,
        skillsPossessed: skillsPossessed,
        skillsDesired: skillsDesired,
      });
      //takes in the new user and the callback from the model
      User.createUser(newUser, function(err, user){
        // Check if username or email already exists (only usename here...cause email ist )
        User.count({username: newUser.username}, function(err, count){
          if(count > 0){
            err = "nah";
          }
        });

        //1100 handles dupe keys
        if ( err && err.code !== 11000 ) {
          return res.json({message: "Whoops! Something didn't work. Please try again"});
        }
        //duplicate key
        else if ( err && err.code === 11000 ) {
          return res.json({message: "That username or email address is already in use"});
        }
        else if (err == "nah"){
          return res.json({message: "That username or email address is already in use"});
        }
        else{
          return res.json({message: 'Congratulations, ' + newUser.username + " You have successfully signed up!", user: newUser}); //success TODO: // redirect or something
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
      return res.send({ success : false, message : 'login failed, please try again.' });
    }
    //must use req.login for custom login functionality
    req.logIn(user, function(err) {
      if(err) return next(err);
      return res.send({ success : true, message : 'logged in', user: user});
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
  res.json({message: 'logged out'});
};
