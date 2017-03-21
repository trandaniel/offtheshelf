var db = require('../../config/db') ;
var mongoose = require('mongoose') ;

var locationSchema = mongoose.Schema({
  street: String,
  country: String,
  city: String,
  lat: {type: String, default: '0'},
  lng: {type: String, default: '0'},
});

var LocationModel = mongoose.model('LocationModel', locationSchema);

module.export = LocationModel;
