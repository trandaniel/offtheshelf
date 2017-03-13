var Profile = require('../../app/models/profile') ;
var router = require('express').Router() ;

// get profile
router.get('/', function(req, res, nxt) {
  Profile.find().exec(function(err, profiles) {
    if(err) {
      return nxt(err) ;
    }
    res.json(profiles) ;
  }) ;
}) ;

// add profile
router.post('/', function(req, res, nxt) {
  var profile = new Profile({
    name: req.body.name,
    email: req.body.email,
    location: {
      street: req.body.street,
      country: req.body.country,
      city: req.body.city,
      lat: req.body.lat,
      lng: req.body.lng
    }
  }) ;
  profile.save(function(err, msg) {
    if(err) {
      return nxt(err) ;
    }
    res.json(201, msg) ;
  }) ;
}) ;

module.exports = router ;
