// modules==================================================================
var express         = require('express');
var mongoose        = require('mongoose') ;
var bodyParser      = require('body-parser') ;
var methodOverride  = require('method-override') ;
var session         = require('express-session') ;
var app             = express();
// config files ============================================================

// sess options ============================================================


// port=====================================================================
var port = process.env.PORT || 3000;

// parser===================================================================
app.use(bodyParser.json()) ;
app.use(bodyParser.json({type: 'application/vnd.api+json'})) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(methodOverride('X-HTTP-Method-Override')) ;
// app.use(sessions({secret: 'blargadeeblargblarg',
//   duration: 24 * 60 * 60 * 1000,
//   activeDuration: 1000 * 60 * 5}));

// init session ============================================================
app.use(session({
  secret: process.env.secretWords,
  resave: false,
  saveUninitialized: false,
  cookie: {}
})) ;

session.profile = null ;

app.set('view engine', 'ejs') ;
// add controllers =========================================================

app.use(express.static(__dirname + '/public'), require('./controllers/static'));

// routes===================================================================
app.use('/login', require('./controllers/login')) ;
app.use('/logout', require('./controllers/logout')) ;
app.use('/register', require('./controllers/register')) ;
app.use('/update', require('./controllers/update')) ;
app.use('/addprod', require('./controllers/addprod')) ;

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

exports = module.exports = app ;
