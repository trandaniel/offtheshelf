var express = require('express') ;
var router  = express.Router() ;

// routes for pages
router.get('/', function(req, res) {
  //console.log(req.session.pid) ;
  console.log(req.session.profile) ;
  res.render('index', {profile: req.session.profile}) ;
}) ;

router.get('/signup', function(req, res) {
  res.sendfile('public/views/business/signup.html') ;
}) ;

router.get('/confirm', function(req, res) {
  res.sendfile('public/views/business/confirm.html') ;
}) ;

router.get('/editprofile', function(req, res) {
  if(!req.session.profile) {
    console.log('no login') ;
    res.render('index') ;
  }
  else {
    res.render('editProfile', {profile: req.session.profile}) ;
  }
  //res.sendfile('public/views/business/editProfile.html')
}) ;

router.get('/addproduct', function(req, res) {
  res.sendfile('public/views/business/addProduct.html')
}) ;

router.get('/productlist', function(req, res) {
  res.sendfile('public/views/business/prodList.html')
}) ;

router.use(express.static(__dirname + '/../assets')) ;

module.exports = router ;
