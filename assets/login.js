var dataloaded = false;
var profiles;
var user;
var pass;
var name;

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

function checkCreds() {
  if (dataloaded == true) {
    console.log("dataloaded");
    for (var index = 0 ; index < profiles.length ; index++) {
      console.log(profiles[index].email);
      console.log(profiles[index].password);
      if (user == profiles[index].email.toString() && pass == profiles[index].password.toString()) {
        console.log("login!");
        sessionStorage.name = profiles[index].name.toString();
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

function changeloginUI() {
  sessionStorage.login = true;
  sessionStorage.user = user;
  console.log(sessionStorage.name);
  document.getElementById('displayusername').innerHTML = sessionStorage.name;
  document.getElementById('username').style.display = "none";
  document.getElementById('pass').style.display = "none";
  document.getElementById('signinbutton').style.display = "none";
  document.getElementById('signupbutton').style.display = "none";
  document.getElementById('displayusername').style.display = "inline-block";
  document.getElementById('logoutbutton').style.display = "inline-block";
}

function logout() {
  document.getElementById('displayusername').innerHTML = "";
  sessionStorage.login = undefined;
  sessionStorage.user = undefined;
  sessionStorage.name = undefined;
  document.getElementById('username').style.display = "inline-block";
  document.getElementById('pass').style.display = "inline-block";
  document.getElementById('signinbutton').style.display = "inline-block";
  document.getElementById('signupbutton').style.display = "inline-block";
  document.getElementById('displayusername').style.display = "none";
  document.getElementById('logoutbutton').style.display = "none";
}
