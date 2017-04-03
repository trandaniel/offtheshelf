var express = require('express') ;
var router  = express.Router() ;

// routes for pages
router.get('/', function(req, res) {
  if(req.session.valid === undefined) {
    req.session.valid = true ;
  }
  res.render('index', {profile: req.session.profile, valid: req.session.valid}) ;
}) ;

router.get('/404', function(req, res) {
  res.render('error/404', {profile: req.session.profile, products: req.session.products}) ;
}) ;
router.get('/index', function(req, res) {
  res.redirect('../') ;
}) ;

router.get('/signup', function(req, res) {
  if(req.session.nonMatch === undefined) {
    req.session.nonMatch = false ;
  }
  if(req.session.badPass === undefined) {
    req.session.badPass = false ;
  }
  if(req.session.valid === undefined) {
    req.session.valid = true ;
  }
  if(!req.session.profile) {
    res.render('pharm/signup', {profile: req.session.profile, nonMatch: req.session.nonMatch, badPass: req.session.badPass, valid: req.session.valid}) ;
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
  if(req.session.badPass === undefined) {
    req.session.badPass = false ;
  }
  if(req.session.nonMatch === undefined) {
    req.session.nonMatch = false ;
  }
  if(req.session.validPass === undefined) {
    req.session.validPass = true ;
  }
  if(!req.session.profile) {
    console.log('no login') ;
    res.render('index') ;
  }
  else {
    res.render('pharm/editProfile', {profile: req.session.profile, badPass: req.session.badPass, nonMatch: req.session.nonMatch, validPass: req.session.validPass}) ;
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
  if(!req.session.profile) {
    console.log('hello who are u') ;
    res.redirect('../autherr') ;
  }
  else if(!req.session.products) {
    console.log('hello u dont have shit') ;
    res.redirect('../prodlist') ;
  }
  else {
    console.log('hi looking for list') ;
    console.log(req.session.profile) ;
    console.log(req.session.products) ;
    res.render('pharm/prodlist', {profile: req.session.profile, products: req.session.products}) ;
  }
}) ;

router.get('/autherr', function(req, res) {
  if(req.session.valid === undefined) {
    req.session.valid = true ;
  }
  res.render('error/autherr', {profile: req.session.profile, valid: req.session.valid}) ;
}) ;

router.get('/confirmdelete', function(req, res) {
  console.log('howd u get here you lil shit') ;
  res.redirect('../404')
}) ;

router.post('/confirmdelete', function(req, res) {
  if(!req.session.profile) {
    console.log('nope wrong place') ;
    res.redirect('../autherr') ;
  }
  else if(!req.session.products) {
    console.log('u still dont have shit') ;
    res.redirect('../prodlist') ;
  }
  else {
    var deleteObj ;
    for(var i = 0 ; i < req.session.products.length ; i++) {
      if(req.body.obj === req.session.products[i]._id) {
        deleteObj = req.session.products[i] ;
        break ;
      }
    }
    req.session.del = deleteObj ;
    res.render('pharm/confirmdelete', {
      profile: req.session.profile,
      products: req.session.products,
      del: deleteObj
    }) ;
  }
}) ;

router.use(express.static(__dirname + '/../assets')) ;

module.exports = router ;
