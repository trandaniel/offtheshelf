var dataloaded = false;
var profiles;
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
    console.log("adsf");
    changeloginUI();
    //document.getElementById('displayusername').innerHTML = sessionStorage.user;
  }
  else {
    console.log("no session");
  }
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
  sessionStorage.name = profile.name.toString();
  sessionStorage.streetnumber = (profile.location.streetnumber);
  sessionStorage.street = profile.location.street;
  sessionStorage.country = profile.location.country;
  sessionStorage.city = profile.location.city;
  sessionStorage.lat = profile.location.lat;
  sessionStorage.lng = profile.location.lng;
  sessionStorage.user = profile.email;
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
