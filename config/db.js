var mongoose = require('mongoose') ;

var mongo_URI = process.env.mongo_URI;

mongoose.Promise = global.Promise ;
if (mongo_URI)
  mongoose.connect(mongo_URI, function(err, database) {
    if(err) {
      throw err ;
    }
    db = database;
    console.log('Connected') ;
  }) ;

module.exports = mongoose ;
