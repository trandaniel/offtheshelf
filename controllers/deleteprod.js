var router = require('express').Router() ;
var Profile = require('../app/models/profile') ;
var Product = require('../app/models/product') ;

router.post('/', function(req, res, nxt) {
  if(!req.session.profile) {
    res.redirect('../autherr') ;
  }
  else {
    console.log('deleting') ;
    console.log(req.session.products) ;
    console.log(req.session.del) ;
    var session = req.session ;
    var products = session.products ;
    var del = session.del ;
    var sessionProfile = session.profile ;

    var newProdIds ;
    for(var i = 0 ; i < session.profile.prodIds.length ; i++) {
      if(del._id === session.profile.prodIds[i]) {
        newProdIds = session.profile.prodIds.splice(i, 1) ;
        break ;
      }
    }

    for(var i = 0 ; i < products.length ; i++) {
      if(del._id === products[i]._id) {
        req.session.products = products.splice(i, 1) ;
        products = req.session.products ;
        break ;
      }
    }

    Profile.findOneAndUpdate({_id: sessionProfile.id}, {$set: {
      prodIds: newProdIds
    }}, {new: true}, function(err, profile) {
      if(err) {
        return nxt(err) ;
      }
      var info = {
        id:       profile._id,
        name:     profile.name,
        email:    profile.email,
        location: profile.location,
        prodIds:  profile.prodIds
      } ;
      req.session.profile = info ;
    }) ;

    Product.findByIdAndRemove(del._id, function(err, product) {
      if(err) {
        return nxt(err) ;
      }
    }) ;
    session.del = undefined ;
    res.redirect('../prodlist') ;
  }
}) ;

module.exports = router ;
