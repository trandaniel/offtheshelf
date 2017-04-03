var map;
var currentPos = [];
var geomarker;
var geocoder ;
var timeout = null;
var myloc;

var snum = document.getElementById("snum");
var sn = document.getElementById("sn");
var ct = document.getElementById("ct");
var cn = document.getElementById('cn');


// Init a timeout variable to be used below
var timeout = null;

// Listen for keystroke events
sn.onkeyup =ct.onkeyup =cn.onkeyup =snum.onkeyup = function (e) {

  // Clear the timeout if it has already been set.
  // This will prevent the previous task from executing
  // if it has been less than <MILLISECONDS>
  console.log('event detected');
  clearTimeout(timeout);
  // Make a new timeout set to go off in 800ms
  timeout = setTimeout(function () {
    geocode();
  }, 500);
};

function initMap() {
  console.log("initiating map");

  map = new google.maps.Map(document.getElementById('editmap'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  })
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: parseFloat(document.getElementById('lat').value),
        lng: parseFloat(document.getElementById('lng').value)
      };
      currentPos.push(pos.lat);
      currentPos.push(pos.lng);

      /*
      Creates custom marker for current location.
      */
      myloc = new google.maps.Marker({
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
      //reverseGeo(currentPos[0], currentPos[1]);
      //getLocations();
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("");
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function reverseGeo(lati, long) {
  console.log('reverse geo');
  var latlng = new google.maps.LatLng(parseFloat(lati), parseFloat(long));
  //console.log(latlng);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    console.log('entered geocode');
    if (status == google.maps.GeocoderStatus.OK) {
      if (results) {
        map.setZoom(12);
        document.getElementById('reverseGeo').innerHTML = results[0].formatted_address;
        document.getElementById('reverseGeo').style.display = "block";

        for (var c = 0 ; c < results[0].address_components.length ; c++) {
          //console.log('~~~~', c);
          inputfields(results[0].address_components[c]);
        }
        document.getElementById('lat').value = lati;
        document.getElementById('lng').value = long;
      } else {
        console.log("no results");
        window.alert('No results found');
      }
    } else {
      console.log("geocoder failed");
      window.alert('Geocoder failed due to: ' + status);
    }
  });
  console.log('end reverseGeo');
}

function inputfields(components) {
  //console.log(components);
  for (var c = 0 ; c < components.types.length ; c++) {
    //console.log(components.types[c]);
    if (components.types[c] == "street_number") {
      //console.log("street_number", components.short_name);
      document.getElementById('streetnumber').value = components.short_name;
    }
    if (components.types[c] == "route") {
      //console.log("street_number", components.short_name);
      document.getElementById('route').value = components.long_name;
    }
    if (components.types[c] == "locality") {
      //console.log("street_number", components.short_name);
      document.getElementById('locality').value = components.long_name;
    }
    if (components.types[c] == "country") {
      //console.log("street_number", components.short_name);
      document.getElementById('country').value = components.long_name;
    }
  }
}

function geocode() {
  geocoder = new google.maps.Geocoder();
  var streetnumber = (document.getElementById('snum').value === undefined ? document.getElementById('csnum').value : document.getElementById('snum').value);
  var streetname = (document.getElementById('snum').value === undefined ? document.getElementById('csn').value : document.getElementById('sn').value);;
  var cityname = (document.getElementById('snum').value === undefined ? document.getElementById('ccn').value : document.getElementById('ccn').value);;
  var countryname = (document.getElementById('snum').value === undefined ? document.getElementById('cct').value : document.getElementById('cct').value);;

  var address = streetnumber + " " + streetname + ', ' +
  cityname + ', ' + countryname;
  console.log(address);
  geocoder.geocode({
    'address': address
  },
  function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      console.log('Results: ', results[0]);
      myloc.setPosition(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      document.getElementById('lat').value = results[0].geometry.location.lat();
      document.getElementById('lng').value = results[0].geometry.location.lng();
      //document.getElementById('reverseGeo').innerHTML = results[0].formatted_address;
    }
  });
}
