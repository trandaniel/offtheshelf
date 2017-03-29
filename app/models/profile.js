// import db and modules
var db = require('../../config/db') ;
var mongoose = require('mongoose') ;
var crypto = require('crypto') ;

//variable required to dictate how JSON object will look
var locationSchema = new mongoose.Schema({
  street: {type: String, required: true},
  country: {type: String, required: true},
  city: {type: String, required: true},
  lat: {type: String, required: true},
  lng: {type: String, required: true}
}, {
  _id: false
});

var profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  hash: String,
  salt: String,
  location: locationSchema,
  prodIds: [String]
},
{
  versionKey: false
});

profileSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex') ;
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex') ;
} ;

profileSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex') ;
  return hash === this.hash ;
}

var Profile = mongoose.model('Profile', profileSchema);


module.exports = Profile ;
