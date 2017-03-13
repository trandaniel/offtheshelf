var express = require('express') ;
var router  = express.Router() ;

router.get('/', function(req, res) {
  res.sendfile('public/views/index.html') ;
}) ;

router.get('/signup', function(req, res) {
  res.sendfile('public/views/business/signup.html') ;
}) ;

router.use(express.static(__dirname + '/../assets')) ;

module.exports = router ;
