var Profile = require('../app/models/profile') ;
var router  = require('express').Router() ;


router.post('/', function(req, res, nxt) {
  var passwordChecker = req.body.password.search(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ;
  if(!req.body.password === req.body.confirmpass) {
    console.log('passwords must match') ;
    res.redirect('../signup') ;
  }
  if(passwordChecker === -1) {
    console.log('password must meet requirements') ;
    res.redirect('../signup') ;
  }
  else {
    var profile = new Profile({
      name: req.body.name,
      email: req.body.email,
      location: {
        streetnumber: req.body.streetnumber,
        street: req.body.street,
        country: req.body.country,
        city: req.body.city,
        lat: "test",
        lng: "Test"
      },
      prodIds: []
    },{
      versionKey: false
    }) ;

    // set password using hash and salt in profile model

    profile.setPassword(req.body.password) ;

    profile.save(function(err, msg) {
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
      req.session.signedup = true ;
      res.redirect('../confirm');
    }) ;
  }
}) ;

module.exports = router ;
