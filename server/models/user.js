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
  email: {
    type: String
  },
  name: {
    type: String
  }
});

// --- Hide Fields Specified Above from public API --- //
UserSchema.plugin(mongooseHidden);

var User = module.exports = mongoose.model('User', UserSchema);

// --- User Functions (leave after User export) --- //
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
