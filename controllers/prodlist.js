var Product = require('../app/models/product') ;
var router  = require('express').Router() ;

router.get('/', function(req, res, nxt) {
  if(!req.session.profile) {
    res.redirect('../autherr') ;
  }
  else {
    var ids = req.session.profile.prodIds ;
    req.session.products = [] ;
    console.log(ids) ;
    for(var i = 0 ; i < ids.length ; i++) {
      Product.findOne({_id: ids[i]}, function(err, product) {
        if(err) {
          return nxt(err) ;
        }
        req.session.products.push(product);
      }) ;
    }

    // allow time for queries to complete
    setTimeout(checkProds, 1000) ;
    function checkProds(a, b) {
      if(!req.session.products.length === ids.length) {
        setTimeout(checkProds, 1000) ;
      }
      else {
        // console.log(req.session.products) ;
        res.redirect('../productlist') ;
      }
    }
  }
}) ;

module.exports = router ;
