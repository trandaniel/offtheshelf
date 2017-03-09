var db = require('../../config/db') ;
//define profile model
var Profile = db.model('Profile', {
  name: {type: String, required: true},
  email: {type: String, required: true},
  location: {
    street: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
  },
  products: [
    {
      name: {type: String, required: true},
      cost: {type: Number, required: true},
      sellBy: {type: String, required: true},
      posted: {type: String, required: true}
    }
  ]
}) ;

module.exports = Profile ;
