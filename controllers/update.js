var Profile     = require('../app/models/profile') ;
var router      = require('express').Router() ;
var crypto      = require('crypto') ;

router.post('/', function(req, res, nxt) {
  var sessionProfile = req.session.profile ;
  var newname = chooseentry(sessionProfile.name, req.body.editname);
  var newemail = chooseentry(sessionProfile.email, req.body.editemail);
  var newstreetnumber = chooseentry(sessionProfile.location.streetnumber, req.body.editstreetnum);
  var newstreetname = chooseentry(sessionProfile.location.street, req.body.editstreetname);
  var newcountry = chooseentry(sessionProfile.location.country, req.body.editcountry);
  var newcity = chooseentry(sessionProfile.location.city, req.body.editcity);

  if(req.body.newpass) {
    console.log('changing pw') ;
    Profile.findOne({ _id: sessionProfile.id}, function(err, profile) {
      if(profile.validPassword(req.body.currentpass)) {
        if(req.body.newpass === req.body.confirmpass) {
          updatePass(req.body.newpass, sessionProfile.id) ;
        }
        else {
          console.log('password dont match') ;
        }
      }
      else {
        console.log('invalid password update') ;
      }
    }) ;
  }
  Profile.findOneAndUpdate({ _id: sessionProfile.id }, { $set: {
    name: newname,
    email: newemail,
    location: {
        streetnumber: newstreetnumber,
        steet: newstreetname,
        country: newcountry,
        city: newcity
      }
    }}, {new: true} , function(err, profile) {
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
     res.redirect('../editprofile') ;
   }) ;
}) ;

function chooseentry(stringA, stringB) {
  if (stringB == "" || stringB == undefined) {
    return stringA;
  }
  else {
    return stringB;
  }
}

function updatePass(password, id) {
  var salt = crypto.randomBytes(16).toString('hex') ;
  var hash = crypto.pbkdf2Sync(password, salt, 1000, 256, 'sha256').toString('hex') ;

  Profile.findOneAndUpdate({ _id: id}, {$set: {
    salt: salt,
    hash: hash
  }}, {new:true}, function(err, profile) {
    if(err) {
      return nxt(err) ;
    }
  }) ;
}
module.exports = router ;
