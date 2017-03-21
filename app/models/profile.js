// import db
var db = require('../../config/db') ;
var mongoose = require('mongoose') ;

// define profile model
/*var Profile = db.model('Profile', {
  name: {type: String, required: true}, // name of pharmacy
  email: {type: String, required: true, unique: true}, // login
  password: {type:String, required: true},
  location: { // location of pharmacy to be geolocated by map
    street: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
  }
}) ;*/

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
