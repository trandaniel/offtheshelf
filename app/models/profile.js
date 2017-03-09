// import db
var db = require('../../config/db') ;

// define profile model
var Profile = db.model('Profile', {
  name: {type: String, required: true}, // name of pharmacy
  email: {type: String, required: true}, // login
  location: { // location of pharmacy to be geolocated by map
    street: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
  }
}) ;

module.exports = Profile ;
