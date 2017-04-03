var Profile        = require('../app/models/profile') ;
var router         = require('express').Router() ;

router.post('/', function(req, res, nxt) {
  Profile.findOne({email: req.body.email}, function(err, profile) {
    if(err || !profile) {
      req.session.valid = false ;
      res.redirect("../") ;
    }
    else {
      //console.log(profile) ;
      //console.log(req.body.password) ;
      if(profile.validPassword(req.body.password)) {
        var info = {
          id:       profile._id,
          name:     profile.name,
          email:    profile.email,
          location: profile.location,
          prodIds:  profile.prodIds
        } ;
        var session = req.session ;
        //store session with profile object excluding hash and salt
        req.session.profile = info ;
        res.redirect('../') ;
      }
      else {
        console.log('invalid password') ;
        req.session.valid = false ;
        res.redirect("../") ;
      }
    }
  }) ;
}) ;

module.exports = router ;
