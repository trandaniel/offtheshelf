var Profile     = require('../app/models/profile') ;
var router      = require('express').Router() ;
var crypto      = require('crypto') ;

router.post('/', function(req, res, nxt) {
  if(req.session.badPass === undefined || req.session.badPass === true) {
    req.session.badPass = false ;
  }

  if(req.session.nonMatch === undefined || req.session.nonMatch === true) {
    req.session.nonMatch = false ;
  }

  if(req.session.validPass === undefined || req.session.validPass === false) {
    req.session.validPass = true ;
  }

  if(req.session.stnum === undefined || req.session.stnum === false) {
    req.session.stnum = true ;
  }

  var sessionProfile = req.session.profile ;
  var newname = chooseentry(sessionProfile.name, req.body.editname);
  var newemail = chooseentry(sessionProfile.email, req.body.editemail);
  var newstreetnumber = chooseentry(sessionProfile.location.streetnumber, req.body.editstreetnum);
  var newstreetname = chooseentry(sessionProfile.location.street, req.body.editstreetname);
  var newcountry = chooseentry(sessionProfile.location.country, req.body.editcountry);
  var newcity = chooseentry(sessionProfile.location.city, req.body.editcity);
  var newlat = chooseentry(sessionProfile.location.lat, req.body.lat);
  var newlng = chooseentry(sessionProfile.location.lng, req.body.lng);

  if(isNaN(newstreetnumber)) {
    req.session.stnum = false ;
    res.redirect('../editprofile') ;
  }
  else {
    if(req.body.newpass) {
      Profile.findOne({ _id: sessionProfile.id}, function(err, profile) {
        if(profile.validPassword(req.body.currentpass)) {
          if(req.body.newpass === req.body.confirmpass) {
            var passwordChecker = req.body.newpass.search(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ;
            if(!(passwordChecker === -1)) {
              updatePass(req.body.newpass, sessionProfile.id) ;
            }
            else {
              //console.log('password must contain at least 1 capital, 8 characters and digit') ;
              req.session.badPass = true ;
              res.redirect('../editprofile') ;
            }
          }
          else {
            //console.log('password dont match') ;
            req.session.nonMatch = true ;
            res.redirect('../editprofile') ;
          }
        }
        else {
          //console.log('invalid password update') ;
          req.session.validPass = false ;
          res.redirect('../editprofile') ;
        }
      }) ;
    }

    Profile.findOneAndUpdate({ _id: sessionProfile.id }, { $set: {
      name: newname,
      email: newemail,
      location: {
        streetnumber: newstreetnumber,
        street: newstreetname,
        country: newcountry,
        city: newcity,
        lat:  newlat,
        lng:  newlng
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
  }
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
    if(err){
      return err ;
    }
  }) ;
}

module.exports = router ;
