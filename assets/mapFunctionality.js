var map;
var currentPos = [];
var geomarker;
var geocoder = new google.maps.Geocoder;
var locations;
var markers = [];
var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var profiles;

function initMap() {
  console.log("initiating map");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  })
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      currentPos.push(position.coords.latitude);
      currentPos.push(position.coords.longitude);

      /*
        Creates custom marker for current location.
      */
      var myloc = new google.maps.Marker({
          clickable: false,
          icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                                                          new google.maps.Size(22,22),
                                                          new google.maps.Point(0,18),
                                                          new google.maps.Point(11,11)),
          shadow: null,
          zIndex: 999,
          map: map
      });
      myloc.setPosition(pos);
      //geomarker = new GeolocationMarker(map);
      map.setCenter(pos);
      // GeoMarker = new GeolocationMarker(map);
      console.log("Map set");
      //getLocations();
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("");
    handleLocationError(false, infoWindow, map.getCenter());
  }
  getLocations();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  console.log("Location failed");
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  }

/*
  Get profiles from api
*/
function getLocations(p) {
  console.log("getting locations");
  /*var xhr = new XMLHttpRequest();
  var rootweb = "http://" + window.location.hostname + ":" + window.location.port + "/profiles";
  var profiles;

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log("hello");
      profiles = JSON.parse(xhr.responseText);
      //console.log(profiles);
      locations = profiles;
      setMarkers();
    }
  }
  //alert(rootweb);
  xhr.open('GET', rootweb , true);
  xhr.send(null);*/

  profiles = p;
}

/*
  Set markers of all profiles, up to 26 markers will be show.
*/
function setMarkers() {
  var latlng;
  var infoOutput = "";
  console.log(locations);
  for (var p = 0 ; p < locations.length && p < labels.length ; p++) {
    var mark = locations[p];
    latlng = {lat: parseFloat(mark.location.lat), lng: parseFloat(mark.location.lng)};
    console.log(mark.location.lat, mark.location.lng);
    console.log(labels.charAt(p), typeof labels.charAt(p));
    var marker = new google.maps.Marker({
        position: latlng,
        title: mark.name,
        icon: "http://maps.google.com/mapfiles/marker" + labels.charAt(p) + ".png"
    });
    marker.setMap(map);
    markers.push(marker);
    infoOutput += setoutput(mark, p);
  }
  console.log("````````");
  document.getElementById('displayInfo').innerHTML = infoOutput;
}



/*
  Populates area where business information displayed.
*/
function setoutput(mark, index) {
  console.log("getting display information", mark);
  var address = "<h4>" + mark.location.streetnumber + " " + mark.location.street + "</h4><p>" + mark.location.city + ", " + mark.location.country + "</p>";
  var title = "<div><h2 class=\"innerTitle\">" + labels.charAt(index) + "</h2>" + "<h3 class=\"innerTitle\">" + mark.name + "</h3></div>";
  console.log("<div class=\"innerInfo\" onclick=\"highlightMarker(this.innerHTML)\">" + title + address + "</div>");
  return "<div class=\"innerInfo\" onclick=\"highlightMarker(this.innerHTML)\">" + title + address + "</div>";
}

function highlightMarker(contents) {
  console.log("clicked");
  stopCurrentAnimations();
  var index = labels.indexOf(contents.charAt(contents.indexOf("</h2>") -1)); //Get marker index by relating to position of label A,B,C ec
  var selected = markers[index];
  selected.setAnimation(google.maps.Animation.BOUNCE);
}

function stopCurrentAnimations() {
  for (var i = 0 ; i < markers.length ; i ++) {
    markers[i].setAnimation(null);
  }
}
