// --- Dependencies --- //
var mongoose = require('mongoose');
var mongooseHidden = require('mongoose-hidden')({ defaultHidden: { password: true, __v: true } }); //for hiding password, version, etc from api
var bcrypt = require('bcrypt');

// --- User Schema --- //
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String,
    hide: true
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  avatar: {
    type: String
  },
  profession: {
    type: String
  },
  company: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  statement: {
    type: String
  },
  skillsPossessed: {
    type: Array
  },
  skillsDesired: {
    type: Array
  }
});

// --- Hide Fields Specified Above from public API --- //
UserSchema.plugin(mongooseHidden);

var User = module.exports = mongoose.model('User', UserSchema);

// --- User Functions (leave after User export) --- //
module.exports.createUser = function(newUser, callback){
  //hash the password
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      //Store hash in your password DB.
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback)
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
