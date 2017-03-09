// import db
var db = require('../../config/db') ;

// define product model
var Product = db.model('Product', {
  name: {type: String, required: true},
  cost: {type: Number, required: true},
  stock: {type: Number, required: true},
  sellBy: {type: String, required: true},
  posted: {type: String, required: true}
}) ;

module.exports = Product ;
