var Profile = require('../../app/models/profile') ;
var router = require('express').Router() ;
var mongoose = require('mongoose') ;
var bodyParser     = require('body-parser') ;
var ObjectID = mongoose.Types.ObjectId ;

var methodOverride = require('method-override');
router.use(methodOverride('_method'));

// get profile
router.get('/', function(req, res, nxt) {
  console.log("getting");
  Profile.find().exec(function(err, profiles) {
    if(err) {
      return nxt(err) ;
    }
    res.json(profiles) ;
  }) ;
}) ;

// get single profile by objID
router.post('/:email', function(req, res, nxt) {
  Profile.findOne({email: req.body.email}, function(err, profile) {
    if (err) {
      res.send("login failed");
    }
    else {
      if (profile.validPassword(req.body.password)) {
        var info = { 'email': profile.email, 'name': profile.name, 'location': profile.location}
        res.send(info);
      }
      else {
        res.send("invalid username/password");
      }
    }
  });
}) ;

/*
  Function called on PUT request during form submission.
  All information is in form (req.body), including currents.
*/
router.put('/', function(req, res, nxt) {
  res.send("Put Request");
  var newname = chooseentry(req.body.name, req.body.editname);
  var newemail = chooseentry(req.body.email, req.body.editemail);
  var newpassword = chooseentry(req.body.currentpass, req.body.newpass);
  var newstreetnumber = chooseentry(req.body.streetnum, req.body.editstreetnum);
  var newstreetname = chooseentry(req.body.streetname, req.body.editstreetname);
  var newcountry = chooseentry(req.body.country, req.body.editcountry);
  var newcity = chooseentry(req.body.city, req.body.editcity);

  //Updating document
  Profile.findOneAndUpdate({ email: req.body.email }, { "$set": { "name": newname, email: newemail,
  password: newpassword, 'location.streetnumber': newstreetnumber,
  'location.street': newstreetname, 'location.country': newcountry, 'location.city': newcity}}, {new:true}, function(err, profile){
   console.log(err);
  });
});

/*
  Check if field submitted was empty.
*/
function chooseentry(stringA, stringB) {
  if (stringB == "" || stringB == undefined) {
    return stringA;
  }
  else {
    return stringB;
  }
}

// add profile, triggered on POST request
router.post('/', function(req, res, nxt) {

  var profile = new Profile({
    name: req.body.name,
    email: req.body.email,
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

  // set password using hash and salt in profile model
  profile.setPassword(req.body.password) ;

  profile.save(function(err, msg) {
    if(err) {
      return nxt(err) ;
    }
    //res.json(201, msg) ;
    res.redirect(201, '../../confirm');
  }) ;
}) ;

module.exports = router ;
