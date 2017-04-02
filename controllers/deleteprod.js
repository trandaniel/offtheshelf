var router = require('express').Router() ;
var Profile = require('../app/models/profile') ;
var Product = require('../app/models/product') ;

router.post('/', function(req, res, nxt) {
  var session = req.session ;
  var products = session.products ;
  var delete = session.delete ;
  var sessionProfile = session.profile ;

  Profile.findOneAndUpdate({_id: sessionProfile.id} function(err, profile) {

  }) ;
}) ;
