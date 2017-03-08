var mongoose = require('mongoose') ;

//define profile model
module.exports = mongoose.model('Profile', {
  name: {type: String, default: ''}
}) ;
