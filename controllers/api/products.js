var Product = require('../../app/models/product') ;
var Profile = require('../../app/models/profile') ;
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
  //var currentProductList;
  var date = new Date() ;
  var product = new Product({
    name: req.body.name,
    cost: req.body.cost,
    stock: req.body.stock,
    sellBy: req.body.sellBy,
    posted: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  },{
      versionKey: false
  }) ;
  product.save(function(err, msg) {
    if(err) {
      return nxt(err) ;
    }
    var currentProductList = [];
    Profile.findOne({email: req.body.email}, function(err, profile) {
      if(err) {
        return nxt(err) ;
      }
      if (profile.prodIds != null || profile.prodIds != undefined) {
        currentProductList = profile.prodIds;
      }
      currentProductList.push((msg._id).toString());
    }) ;
    Profile.findOneAndUpdate({email: req.body.email}, {"$push": {"prodIds": msg._id}}, {new:true}, function(err, profile){
     console.log(err);
     res.redirect(201, '../../addProduct');
    });
  });

}) ;
module.exports = router ;
