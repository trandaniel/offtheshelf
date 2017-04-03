var Profile = require('../app/models/profile') ;
var router  = require('express').Router() ;


router.post('/', function(req, res, nxt) {

  if(req.session.nonMatch === undefined || req.session.nonMatch === true) {
    req.session.nonMatch === false ;
  }

  if(req.session.badPass === undefined || req.session.badPass === true) {
    req.session.badPass === false ;
  }

  if(req.session.stnum === undefined || req.session.stnum === false) {
    req.session.stnum = true ;
  }

  if(req.session.valid === undefined || req.session.valid === false) {
    req.session.valid = true ;
  }

  var passwordChecker = req.body.password.search(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ;

  if(isNaN(req.body.streetnumber)) {
    console.log('st num not num') ;
    req.session.stnum = false ;
  }

  if(passwordChecker === -1) {
    console.log('password must meet requirements') ;
    req.session.badPass = true ;
    //res.redirect('../signup') ;
  }
  if(!req.body.password === req.body.confirmpass) {
    console.log('passwords must match') ;
    req.session.nonMatch = true ;
    //res.redirect('../signup') ;
  }

  if(req.session.nonMatch || req.session.badPass || !req.session.stnum) {
    console.log("errors") ;
    res.render('pharm/signup', {
      profile: req.session.profile,
      nonMatch: req.session.nonMatch,
      badPass: req.session.badPass,
      valid: req.session.valid,
      stnum: req.session.stnum
    }) ;
  }

  else {
    req.session.badPass  = false ;
    req.session.nonMatch = false ;
    var profile = new Profile({
      name: req.body.name,
      email: req.body.email,
      location: {
        streetnumber: req.body.streetnumber,
        street: req.body.street,
        country: req.body.country,
        city: req.body.city,
        lat: req.body.lat,
        lng: req.body.lng
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
