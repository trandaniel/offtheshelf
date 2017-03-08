// modules==================================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose') ;
var bodyParser     = require('body-parser') ;
var methodOverride = require('method-override') ;

// config files ============================================================
var db = require('./config/db') ;

// port=====================================================================
var port = process.env.PORT || 8080;

// db connection============================================================
mongoose.connect(db.url) ;

// parser===================================================================
app.use(bodyParser.json()) ;
app.use(bodyParser.json({type: 'application/vnd.api+json'})) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(methodOverride('X-HTTP-Method-Override')) ;

app.use(express.static(__dirname + '/public'));

// routes===================================================================
require('./app/routes')(app) ;

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/layouts/page.html');
// });

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

exports = module.exports = app ;
