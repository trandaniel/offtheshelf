// modules==================================================================
var express     = require('express');
var app         = express();

// config files ============================================================
var db = require('./config/db') ;

// port=====================================================================
var port = process.env.PORT || 8080;

// db connection============================================================
// mongoose.connect(db.url) ;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/layouts/page.html');
});

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

app.use(express.static(__dirname + '/assets'));
