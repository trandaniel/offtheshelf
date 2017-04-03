var Profile = require('../app/models/profile') ;
var Product = require('../app/models/product') ;
var router  = require('express').Router() ;

router.post('/', function(req, res, nxt) {
  //var currentProductList;
  if(req.session.badProd === undefined || req.session.badProd === true) {
    req.session.badProd = false ;
  }

  if(req.session.costNum === undefined || req.session.costNum === false) {
    req.session.costNum = true ;
  }

  if(req.session.stockNum === undefined || req.session.stockNum === false) {
    req.session.stockNum = true ;
  }

  var session = req.session ;
  var date = new Date() ;
  var inDate = req.body.sellBy.split('-') ;
  for(var i = 0 ; i < inDate.length ; i++) {
    inDate[i] = parseInt(inDate[i]) ;
  }

  if(inDate[0] < date.getFullYear()) {
    console.log('cannot add product that has to be sold in the past') ;
    req.session.badProd = true ;
    res.redirect('../addproduct') ;
  }
  else if(inDate[0] === date.getFullYear() && inDate[1] < (date.getMonth() + 1)) {
    console.log('cannot add product that has to be sold in the past') ;
    req.session.badProd = true ;
    res.redirect('../addproduct') ;
  }
  else if(inDate[0] === date.getFullYear() && inDate[1] === (date.getMonth() + 1) && inDate[2] <= date.getDate()) {
    console.log('cannot add product that has to be sold in the past') ;
    req.session.badProd = true ;
    res.redirect('../addproduct') ;
  }

  else if(isNaN(req.body.cost)) {
    req.session.costNum = false ;
    res.redirect('../addproduct')
  }

  else if(isNaN(req.body.stock)) {
    req.session.stockNum = false ;
    res.redirect('../addproduct') ;
  }

  else {
    var product = new Product({
      name:   req.body.name,
      cost:   req.body.cost,
      stock:  req.body.stock,
      sellBy: inDate[0] + "-" + (inDate[1]) + "-" + inDate[2],
      posted: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      profile: {
        profileId:     req.session.profile.id,
        streetnumber:  req.session.profile.location.streetnumber,
        street:        req.session.profile.location.street,
        country:       req.session.profile.location.country,
        city:          req.session.profile.location.city,
        lat:           req.session.profile.location.lat,
        lng:           req.session.profile.location.lng
      }
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
       res.redirect('../prodlist');
      });
    });
  }
}) ;

module.exports = router ;
