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
    req.session.signedup = undefined ;
    res.redirect('../editprofile') ;
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
}) ;

router.get('/addproduct', function(req, res) {
  if(!req.session.profile) {
    console.log('you must be logged in u fuk') ;
    res.redirect('../autherr') ;
  }
  else {
    res.render('pharm/addProduct', {profile: req.session.profile}) ;
  }
}) ;

router.get('/productlist', function(req, res) {
  res.sendfile('public/views/business/prodList.html')
}) ;

router.get('/autherr', function(req, res) {
  res.render('error/autherr', {profile: req.session.profile}) ;
}) ;

router.use(express.static(__dirname + '/../assets')) ;

module.exports = router ;
