var Profile = require('./models/profile') ;
var path    = require('path') ;

module.exports = function(app) {
  // server routes===================================
  app.get('/api/profiles', function(req, res) {
    Profile.find(function(err, profiles) {
      if (err) {
        res.send(err) ;
      }
      res.json(err) ;
    }) ;
  }) ;
  //frontend routes==================================
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/views', 'index.html')) ;
  }) ;
} ;
