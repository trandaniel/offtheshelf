// import db
var db        = require('../../config/db') ;
var mongoose  = require('mongoose') ;

// define product model
var profileAddress = new mongoose.Schema({
  profileId:    {type: String, required: true},
  streetnumber: {type: String, required: true},
  street:       {type: String, required: true},
  country:      {type: String, required: true},
  city:         {type: String, required: true},
  lat:          {type: String, required: true},
  lng:          {type: String, required: true}
}, {
  _id: false
});

var productSchema = new mongoose.Schema({
  name:     {type: String, required: true},
  cost:     {type: Number, required: true},
  stock:    {type: Number, required: true},
  sellBy:   {type: String, required: true},
  posted:   {type: String, required: true},
  profile:  profileAddress
}, {
  versionKey: false
}) ;

var Product = mongoose.model('Product', productSchema) ;

module.exports = Product ;
