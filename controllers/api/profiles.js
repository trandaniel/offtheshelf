var Profile = require('../../app/models/profile') ;
var router = require('express').Router() ;
var mongoose = require('mongoose') ;
var ObjectID = mongoose.Types.ObjectId ;


// get profile
router.get('/', function(req, res, nxt) {
  Profile.find().exec(function(err, profiles) {
    if(err) {
      return nxt(err) ;
    }
    res.json(profiles) ;
  }) ;
}) ;

// get single profile by objID
router.get('/:id', function(req, res, nxt) {
  Profile.findOne({_id: new ObjectID(req.params.id)}, function(err, msg) {
    if(err) {
      return nxt(err) ;
    }
    res.json(201, msg) ;
  }) ;
}) ;

// add profile
router.post('/', function(req, res, nxt) {

  var profile = new Profile({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    location: {
      street: req.body.street,
      country: req.body.country,
      city: req.body.city,
      lat: "test",
      lng: "Test"
    }
  },{
    versionKey: false
  }) ;
  //console.log(mongoose.db);
  /*mongoose.collection("profiles").insertOne(profile, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });*/
  profile.save(function(err, msg) {
    if(err) {
      return nxt(err) ;
    }
    //res.json(201, msg) ;
    res.redirect(201, '../../confirm');
  }) ;
}) ;

module.exports = router ;
