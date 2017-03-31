var Profile     = require('../app/models/profile') ;
var router      = require('express').Router() ;


router.post('/', function(req, res, nxt) {
  var newname = chooseentry(req.body.name, req.body.editname);
  var newemail = chooseentry(req.body.email, req.body.editemail);
  var newpassword = chooseentry(req.body.currentpass, req.body.newpass);
  var newstreetnumber = chooseentry(req.body.streetnum, req.body.editstreetnum);
  var newstreetname = chooseentry(req.body.streetname, req.body.editstreetname);
  var newcountry = chooseentry(req.body.country, req.body.editcountry);
  var newcity = chooseentry(req.body.city, req.body.editcity);

  Profile.findOneAndUpdate({ email: req.body.email }, { "$set": { "name": newname, email: newemail,
  password: newpassword, 'location.streetnumber': newstreetnumber,
  'location.street': newstreetname, 'location.country': newcountry,
  'location.city': newcity}}, {new:true}, function(err, profile){
   if(err) {
     return nxt(err) ;
   }
   res.redirect('../editprofile') ;
 }) ;
}) ;

function chooseentry(stringA, stringB) {
  if (stringB == "" || stringB == undefined) {
    return stringA;
  }
  else {
    return stringB;
  }
}

module.exports = router ;
