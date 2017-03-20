var mongoose = require('mongoose') ;

var mongo_URI = "mongodb://balinbanh:Chinaman1`@ds145379.mlab.com:45379/offtheshelf";//"mongodb://trandaniel:Il2ekf4d@ds145379.mlab.com:45379/offtheshelf";//process.env.mongo_URI || 'localhost' ;

if (mongo_URI)
  mongoose.connect(mongo_URI, function(err) {
    if(err) {
      throw err ;
    }
    console.log('Connected') ;
  }) ;

module.exports = mongoose ;
