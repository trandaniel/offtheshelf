var express = require('express') ;
var router  = express.Router() ;

// routes for pages
router.get('/', function(req, res) {
  //console.log(req.session.pid) ;
  console.log(req.session.profile) ;
  res.render('index', {profile: req.session.profile}) ;
}) ;

router.get('/index', function(req, res) {
  res.redirect('../') ;
}) ;
router.get('/signup', function(req, res) {
  if(!req.session.profile) {
    res.render('pharm/signup', {profile: req.session.profile}) ;
  }
  else {
    console.log('already logged in') ;
    res.redirect('../editprofile') ;
  }
}) ;

router.get('/confirm', function(req, res) {
  if(!req.session.signedup) {
    res.redirect('../') ;
  }
  else {
    res.render('pharm/confirm', {profile: req.session.profile}) ;
  }
}) ;

router.get('/editprofile', function(req, res) {
  if(!req.session.profile) {
    console.log('no login') ;
    res.render('index') ;
  }
  else {
    res.render('pharm/editProfile', {profile: req.session.profile}) ;
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
