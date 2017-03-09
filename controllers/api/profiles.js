var Profile = require('../../app/models/profile') ;
var router = require('express').Router() ;

//reading info
router.get('/', function(req, res, nxt) {
  Profile.find().exec(function(err, profiles) {
    if(err) {
      return nxt(err) ;
    }
    res.json(profiles) ;
  }) ;
}) ;

//adding
router.post('/', function(req, res, nxt) {
  var profile = new Profile({
    name: req.body.name
  }) ;
  profile.save(function(err, msg) {
    if(err) {
      return nxt(err) ;
    }
    res.json(201, msg) ;
  }) ;
}) ;
module.exports = router ;
