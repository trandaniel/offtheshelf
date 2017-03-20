var mongoose = require('mongoose') ;

var mongo_URI = process.env.mongo_URI;

if (mongo_URI)
  mongoose.connect(mongo_URI, function(err) {
    if(err) {
      throw err ;
    }
    console.log('Connected') ;
  }) ;

module.exports = mongoose ;
