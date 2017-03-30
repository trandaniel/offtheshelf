var Profile        = require('../app/models/profile') ;
var router         = require('express').Router() ;
var expressSession = require('express-session') ;


router.post('/', function(req, res, nxt) {
  Profile.findOne({email: req.body.email}, function(err, profile) {
    if(err) {
      res.send("Login failed") ;
    }
    else {
      if(profile.validPassword(req.body.password)) {
        var info = { 'email': profile.email, 'name': profile.name, 'location': profile.location} ;
        var session = req.session ;
        session.pid = profile._id ;
        console.log(session.pid) ;
        res.send(info) ;
      }
      else {
        res.send('invalid password') ;
      }
    }
  }) ;
}) ;

module.exports = router ;
