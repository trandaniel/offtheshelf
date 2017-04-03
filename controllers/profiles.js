var Profile = require('../app/models/profile') ;
var router  = require('express').Router() ;

router.get('/', function(req, res, nxt) {
  console.log('asdfa');
  Profile.find().exec(function(err, profiles) {
    if(err) {
       console.log('wtf');
      return nxt(err) ;
    }
    var session = req.session;
    console.log('hello');
    //console.log(profiles);
    var info = [];

    for (var p = 0 ; p < profiles.length ; p++) {
      info.push({'name': profiles[p].name, 'email': profiles[p].email, 'location': profiles[p].location});
    }

    req.session.profiles = info;
    res.json(info);
    //res.redirect('../index');
  }) ;
}) ;

router.get('/:email', function(req, res, nxt) {
  //Profile.findOne({req.body})
  console.log(req.body);
});
module.exports = router;
