// modules==================================================================
var express        = require('express');
var mongoose       = require('mongoose') ;
var bodyParser     = require('body-parser') ;
var methodOverride = require('method-override') ;
var sessions = require("client-sessions");
var app            = express();
// config files ============================================================

// port=====================================================================
var port = process.env.PORT || 3000;


// parser===================================================================
app.use(bodyParser.json()) ;
app.use(bodyParser.json({type: 'application/vnd.api+json'})) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(methodOverride('X-HTTP-Method-Override')) ;
app.use(sessions({secret: 'blargadeeblargblarg',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5}));
app.use('/api/profiles', require('./controllers/api/profiles')) ;
app.use('/api/products', require('./controllers/api/products')) ;
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize()) ;
app.use(passport.session()) ;

// routes===================================================================
app.use(require('./controllers/static')) ;
app.use(require('./controllers/login')) ;

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

exports = module.exports = app ;
