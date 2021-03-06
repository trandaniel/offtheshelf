// modules======================================================================
var express         = require('express');
var mongoose        = require('mongoose') ;
var bodyParser      = require('body-parser') ;
var methodOverride  = require('method-override') ;
var session         = require('express-session') ;
var app             = express();
// config files ================================================================

// port=========================================================================
var port = process.env.PORT || 3000;

// parser=======================================================================
app.use(require('heroku-ssl-redirect')(['production']));
app.use(bodyParser.json()) ;
app.use(bodyParser.json({type: 'application/vnd.api+json'})) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(methodOverride('X-HTTP-Method-Override')) ;

// init session ================================================================
app.use(session({
  secret: process.env.secretWords,
  resave: false,
  saveUninitialized: false,
  cookie: {}
})) ;

// set view engine =============================================================
app.set('view engine', 'ejs') ;

// routes and controllers=======================================================
app.use(express.static(__dirname + '/views'), require('./controllers/static'));

app.use('/login', require('./controllers/login')) ;
app.use('/logout', require('./controllers/logout')) ;
app.use('/register', require('./controllers/register')) ;
app.use('/update', require('./controllers/update')) ;
app.use('/addprod', require('./controllers/addprod')) ;
app.use('/prodlist', require('./controllers/prodlist')) ;
app.use('/getprofiles', require('./controllers/profiles'));
app.use('/deleteprod', require('./controllers/deleteprod')) ;
app.use('/search', require('./controllers/search')) ;
//404 error page================================================================
app.use('*', function(req, res, nxt) {
  if(req.session.valid === undefined) {
    req.session.valid = true ;
  }
  res.status(404) ;
  res.redirect('../404') ;
}) ;

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

exports = module.exports = app ;
