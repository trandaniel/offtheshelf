var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
//Set port:3000

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/layouts/page.html');
});

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

app.use(express.static(__dirname + '/assets'));
