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
exports.editUser = function(req, res){
  var id = req.params.id;
  var user = req.body;
  //new true FORCES mongoose to return the new updated data instead
  User.findByIdAndUpdate(id, user, {new:true}, function(err, user){
    //TODO: go through the same Validation that you do on signup
    if(err){
      return res.status(500).json({err: err.message});
    }
    res.json({'user': user, message: 'user updated!'});
  });
};

// --- Delete User --- //
exports.deleteUser = function(req,res){
  User.remove({
    _id: req.params.id
  },
  function(err,user){
    if(err){
      return res.status(500).json({err: err.message});
    }
    res.json({message: 'User has been deleted'});
  });
};
