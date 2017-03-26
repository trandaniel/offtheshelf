// import db
var db = require('../../config/db') ;
var mongoose = require('mongoose') ;

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
  password: String,
  location: locationSchema
},
{
  versionKey: false
});


var Profile = mongoose.model('Profile', profileSchema);


module.exports = Profile ;
