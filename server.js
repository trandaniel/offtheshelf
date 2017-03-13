// modules==================================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose') ;
var bodyParser     = require('body-parser') ;
var methodOverride = require('method-override') ;

// config files ============================================================

// port=====================================================================
var port = process.env.PORT || 3000;


// parser===================================================================
app.use(bodyParser.json()) ;
app.use(bodyParser.json({type: 'application/vnd.api+json'})) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(methodOverride('X-HTTP-Method-Override')) ;
app.use('/api/profiles', require('./controllers/api/profiles')) ;
app.use('/api/products', require('./controllers/api/products')) ;
app.use(express.static(__dirname + '/public'));

// routes===================================================================
app.use(require('./controllers/static')) ;
console.log("yes") ;

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

exports = module.exports = app ;
