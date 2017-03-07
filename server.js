var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
//Set port:8080

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/layouts/page.html');
});

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

app.use(express.static(__dirname + '/assets'));
