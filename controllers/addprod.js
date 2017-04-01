var Profile = require('../app/models/profile') ;
var Product = require('../app/models/product') ;
var router  = require('express').Router() ;

router.post('/', function(req, res, nxt) {
  //var currentProductList;
  var session = req.session ;
  var date = new Date() ;
  var inDate = req.body.sellBy.split('-') ;
  for(var i = 0 ; i < inDate.length ; i++) {
    inDate[i] = parseInt(inDate[i]) ;
  }

  if(inDate[0] <= date.getFullYear() && inDate[1] <= (date.getMonth() + 1) && inDate[2] <= date.getDate()) {
    console.log('cannot add product that has to be sold in the past') ;
    res.redirect('../addproduct') ;
  }
  else {
    var product = new Product({
      name: req.body.name,
      cost: req.body.cost,
      stock: req.body.stock,
      sellBy: inDate[0] + "-" + (inDate[1] + 1) + "-" + inDate[2],
      posted: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    },{
        versionKey: false
    }) ;
    product.save(function(err, msg) {
      if(err) {
        return nxt(err) ;
      }
      Profile.findOneAndUpdate({_id: session.profile.id}, {$push: {prodIds: msg._id}}, {new:true}, function(err, profile) {
       if(err) {
         return nxt(err) ;
       }
       var info = {
         id:       profile.id,
         name:     profile.name,
         email:    profile.email,
         location: profile.location,
         prodIds:  profile.prodIds
       } ;
       req.session.profile = info ;
       res.redirect('../productList');
      });
    });
  }
}) ;

module.exports = router ;
