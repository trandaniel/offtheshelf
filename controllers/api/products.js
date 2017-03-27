var Product = require('../../app/models/product') ;
var router = require('express').Router() ;

// get products
router.get('/', function(req, res, nxt) {
  Product.find().exec(function(err, products) {
    if(err) {
      return nxt(err) ;
    }
    res.json(products) ;
  }) ;
}) ;

// add product
router.post('/', function(req, res, nxt) {
  var product = new Product({
    name: req.body.name,
    cost: req.body.cost,
    stock: req.body.stock,
    sellBy: req.body.sellBy,
    //posted: req.body.posted
  },{
      versionKey: false
  }) ;
  product.save(function(err, msg) {
    if(err) {
      return nxt(err) ;
    }
    res.json(201, msg) ;
  }) ;
}) ;
module.exports = router ;
