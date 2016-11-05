// --- Models --- //
var User = require('../models/user.js');

// --- Get Users --- //
exports.getUsers = function(req, res){
  User.find(function(err,users){
    res.send(users);
  });
};

// --- Get Users By Skill Desired --- //
exports.getUsersBySkillsPossessed = function(req, res){
  User.find({"skillsPossessed": { $elemMatch : { $regex : req.params.skill, $options : 'i' }}}, function(err, users){
    if(err){
      return res.status(500).json({err: err.message});
    }
    res.json(users);
  });
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
