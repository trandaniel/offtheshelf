var Profile = require('../app/models/profile') ;
var router = require('express').Router() ;
var passport = require('passport') ;
var LocalStrategy = require('passport-local').Strategy ;

passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    Profile.findOne({email: email}, function(err, email) {
      if(err) {
        return done(err) ;
      }
      if(!email) {
        return done(null, false, {
          message: 'Incorrect email.'
        }) ;
      }
      if(!email.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        }) ;
      }
    }) ;
  }
)) ;

module.exports = router ;
