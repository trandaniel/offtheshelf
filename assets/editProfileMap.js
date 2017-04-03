var map;
var geocoder;
var currentPos = [];

function initMap() {
  console.log("initiating profile map");
  map = new google.maps.Map(document.getElementById('editmap'), {
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
      reverseGeo(currentPos[0], currentPos[1]);
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
