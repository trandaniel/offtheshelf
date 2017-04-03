var Product = require('../app/models/product') ;
var router  = require('express').Router() ;

router.post('/', function(req, res, nxt) {
  var searchTerm = req.body.searchTerm.toLowerCase() ;
  console.log('searching') ;
  console.log(searchTerm) ;
  Product.find().exec(function(err, products) {
    if(err) {
      return nxt(err) ;
    }
    else {
      // var allProds = products ;
      var prods = [] ;
      for(var i = 0 ; i < products.length ; i++) {
        if(products[i].name.toLowerCase().match(searchTerm)) {
          prods.push(products[i]) ;
        }
      }
      console.log(prods) ;
      req.session.searchRes = prods ;
      res.redirect('../results') ;
    }
  }) ;
}) ;

module.exports = router ;
