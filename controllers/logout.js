var router = require('express').Router() ;

router.post('/', function(req, res, nxt) {
  var session = req.session ;
  session.profile = undefined ;
  res.redirect("../") ;
}) ;

module.exports = router ;
