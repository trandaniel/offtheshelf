// import db
var db = require('../../config/db') ;
var mongoose = require('mongoose') ;

// define product model
var productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  cost: {type: Number, required: true},
  stock: {type: Number, required: true},
  sellBy: {type: String, required: true},
  posted: {type: String, required: true}
}, {
  versionKey: false
}) ;

var Product = mongoose.model('Product', productSchema) ;

module.exports = Product ;
