var db = require('../../config/db') ;
//define profile model
var Profile = db.model('Profile', {
  name: {type: String, required: true}
}) ;

module.exports = Profile ;
