var mongoose = require('mongoose') ;

var mongo_URI = process.env.mongo_URI;

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
                
mongoose.Promise = global.Promise ;
if (mongo_URI)
  mongoose.connect(mongo_URI, options, function(err, database) {
    if(err) {
      throw err ;
    }
    db = database;
    console.log('Connected') ;
  }) ;

module.exports = mongoose ;
