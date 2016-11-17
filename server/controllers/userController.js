// --- Models --- //
var User = require('../models/user.js');

// --- Get Users --- //
exports.getUsers = function(req, res){
  User.find(function(err,users){
    res.send(users);
  });
};

// --- Get Users By Skill Desired --- //
exports.getUsersBySearch = function(req, res){
  var noResults = "Sorry, there were no results. Click the filter icon in the top right corner to search again"
  // Just to be safe, return error if there is no skill (since its required)
  if(req.query.skill == ""){
    return res.json({"noResults": noResults});
  }
  else{
    // Decide in whether they want a mentor or mentee
    var skillSearch = {};
    var locationSearch = { $or: [{"state": { $regex : req.query.near, $options : 'i' }}, {"city": { $regex : req.query.near, $options : 'i' }}, {"zip": { $regex : req.query.near, $options : 'i' }} ] };
    var mongoQuery = {};

    // Conditionals for mentor/mentee
    if(req.query.mentorType == "mentor"){
      skillSearch = { "skillsPossessed" : { $elemMatch : { $regex : req.query.skill, $options : 'i' }} }
    }
    else{
      skillSearch = { "skillsDesired" : { $elemMatch : { $regex : req.query.skill, $options : 'i' }} }
    }

    // Conditionals for searching without a location
    if(req.query.near != ""){
      mongoQuery = { $and : [ skillSearch , locationSearch ] }
    }
    else{
      mongoQuery = skillSearch;
    }

    // Queries: if both exists use $and, otherwise use $or
    if(req.query.skill){
      User.find( mongoQuery ,function(err, users){
        if(err){
          return res.status(500).json({err: err.message});
        }
        if(users && users.length != 0){
          res.json(users);
        }
        else{
          return res.json({"noResults": noResults});
        }
      }).limit(10); //max of 10
    }
    else{
      return res.json({"noResults": noResults});
    }
  }

};

// --- Get Users By Skill Wanted --- //
exports.getUsersBySkillsDesired = function(req, res){
  User.find({"skillsDesired": req.params.skill}, function(err, users){
    if(err){
      return res.status(500).json({err: err.message});
    }
    res.json(users);
  });
};

// --- Get User --- //
exports.getUser = function(req, res){
  User.findOne({"username": req.params.username}, function(err, user){
    if(err){
      return res.status(500).json({err: err.message});
    }
    res.json(user);
  });
};

// --- Edit User --- //
exports.editUser = function(req, res, next){
  if(req.user.username == req.params.username){
    User.findOne({username: req.params.username}, function (err, user) {
      // Turn Strings To Arrays since Vue won't seem to let me ugh
      // --- BTW this is a DUPE of what is in AUTH controller
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
      // user.username = req.body.username.replace(/ /g,'');
      // user.password = req.body.password;
      user.name = req.body.name;
      user.email = req.body.email;
      user.avatar = req.body.avatar;
      user.profession = req.body.profession;
      user.company = req.body.company;
      user.city = req.body.city;
      user.state = req.body.state;
      user.zip = req.body.zip;
      user.statement = req.body.statement;
      user.skillsPossessed = skillsPossessed;
      user.skillsDesired = skillsDesired;

      user.save(function (err) {
        if(err) {
            return res.json({message: 'There was an error updating your profile. Please try again'});
        }
        else{
          return res.json({message: 'Profile Updated Successfully'});
        }
      });
    });
  }
  else{
    return res.json({message: "You can't edit that user!"});
  }

};

// --- Delete User --- //
exports.deleteUser = function(req,res){
  // make sure the delete route is the logged in user
  if(req.user.username == req.params.username){
    User.findOne({username: req.params.username}, function (err, user) {
      user.remove({
        username: req.params.username
      },
      function(err,user){
        if(err){
          return res.status(500).json({err: err.message});
        }
        return res.json({message: 'User has been deleted'});
      });
    });
  }
  else{
    return res.json({message: "You can't delete that user!"});
  }
};
