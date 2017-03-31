var dataloaded = false;
var profile;
var user; //email
var pass;

/*
  Check to see if user is logged in. Instantiated onload()
*/
function checkLoggedIn() {
  console.log("checking");
  console.log(typeof sessionStorage.login);
  console.log(sessionStorage.user);
  console.log(sessionStorage.name);
  if (sessionStorage.login == "true") {
    console.log("adsf login");
    changeloginUI();
    //document.getElementById('displayusername').innerHTML = sessionStorage.user;
  }
  else {
    console.log("aaaaaaa");
    console.log("no session");
  }
}

function urlencodeFormData(fd){
    var s = '';
    function encode(s){ return encodeURIComponent(s).replace(/%20/g,'+'); }
    for(var pair of fd.entries()){
        if(typeof pair[1]=='string'){
            s += (s?'&':'') + encode(pair[0])+'='+encode(pair[1]);
        }
    }
    return s;
}

function xhrLogin(e) {
  e.preventDefault();
  console.log("fuck");
  var params = new FormData(document.forms["loginform"]);
  var xhr = new XMLHttpRequest();
  //var rootweb = "http://" + window.location.hostname + ":" + window.location.port + "/api/login/:email";
  var profiles;
  //console.log();
  xhr.open('POST', "login"  , true);
  xhr.onreadystatechange = function() {
    if (this.status == 200) {
      console.log("hello");
      if (this.readyState == 4) {
        //console.log(xhr.responseText);
        profile = JSON.parse(xhr.responseText);
        setStorage(profile);
        changeloginUI();
      }

    }
    else {
      console.log("waiting");
    }
  }
  //alert(rootweb);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
  xhr.send(urlencodeFormData(params));

}

function login(e) {
  e.preventDefault();
  console.log("hello");
  var xhr = new XMLHttpRequest();
  var rootweb = "http://" + window.location.hostname + ":" + window.location.port + "/api/profiles";

  user = document.getElementById('username').value;
  pass = document.getElementById('pass').value;
  clearFields();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log("hello");
      profiles = JSON.parse(xhr.responseText);
      console.log(profiles);
      dataloaded = true;
    }
  }
  //alert(rootweb);
  xhr.open('GET', rootweb , true);
  xhr.send(null);
  checkCreds();
}

function clearFields() {
  document.getElementById('username').value = "";
  document.getElementById('pass').value = "";
}

/*
  Check if user and password match
*/
function checkCreds() {
  if (dataloaded == true) {
    console.log("dataloaded");
    for (var index = 0 ; index < profiles.length ; index++) {

      console.log();
      if (user == profiles[index].email.toString() && pass == profiles[index].password.toString()) {
        console.log("login!");
        setStorage(profiles[index]);
        changeloginUI();
        document.getElementById('displayusername').innerHTML = profiles[index].name;
        document.getElementById('loginerror').style.display = "none";
        break;
      }
      else {
        sessionStorage.login = false;
        sessionStorage.user = undefined;
        document.getElementById('loginerror').style.display = "block";
      }
    }
  }
  else {
    setTimeout(checkCreds, 500);
  }
}

/*
  For session information storage
*/
function setStorage(profile) {
  console.log("setting");
  console.log(profile.name, profile.location.street);
  sessionStorage.name = profile.name.toString();
  sessionStorage.streetnumber = (profile.location.streetnumber);
  sessionStorage.street = profile.location.street;
  sessionStorage.country = profile.location.country;
  sessionStorage.city = profile.location.city;
  sessionStorage.lat = profile.location.lat;
  sessionStorage.lng = profile.location.lng;
  sessionStorage.user = profile.email;
  console.log(sessionStorage);
}

function changeloginUI() {
  sessionStorage.login = true;
  document.getElementById('displayusername').innerHTML = sessionStorage.name;
  document.getElementById('username').style.display = "none";
  document.getElementById('pass').style.display = "none";
  document.getElementById('signinbutton').style.display = "none";
  document.getElementById('signupbutton').style.display = "none";
  document.getElementById('displayusername').style.display = "inline-block";
  document.getElementById('logoutbutton').style.display = "inline-block";
}

/*
  Clear session information
*/
function logout() {
  document.getElementById('displayusername').innerHTML = "";
  sessionStorage.login = undefined;
  sessionStorage.user = undefined;
  sessionStorage.name = undefined;
  sessionStorage.location = undefined;
  document.getElementById('username').style.display = "inline-block";
  document.getElementById('pass').style.display = "inline-block";
  document.getElementById('signinbutton').style.display = "inline-block";
  document.getElementById('signupbutton').style.display = "inline-block";
  document.getElementById('displayusername').style.display = "none";
  document.getElementById('logoutbutton').style.display = "none";
}
