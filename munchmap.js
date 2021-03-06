var map, foodMap, dispoMap;
    var infowindow;
    var pos;
    function test () {
    var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pos,
        radius: 1000,
        type: ['restaurant']
      }, callback);
}

initMap()

    function initMap() {
       var pyrmont = {lat: 25.7617, lng: -80.1918};
       var pyrmont2 = {lat: 25.7644, lng: -80.1918};
       var pyrmont3 = {lat: 25.7622, lng: -80.1918};

       var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

         function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }
     map = new google.maps.Map(document.getElementById('map'), {
       center: pyrmont,
       zoom: 15
     });
     
     dispoMap = new google.maps.Map(document.getElementById('dispoMap'), {
      center: pyrmont2,
      zoom: 14
    });

    foodMap = new google.maps.Map(document.getElementById('foodMap'), {
      center: pyrmont3,
      zoom: 13
    });

   
      infowindow = new google.maps.InfoWindow();
      
      if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };
         //infoWindow.setPosition(pos);
         //infoWindow.setContent('Location found.');
         //infoWindow.open(map);
         map.setCenter(pos);
         dispoMap.setCenter(pos);
         foodMap.setCenter(pos);
         test()
       }, function() {
         handleLocationError(true, infoWindow, map.getCenter());
       });
     } else {
       // Browser doesn't support Geolocation
       handleLocationError(false, infoWindow, map.getCenter());
     }
 

   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      
     infoWindow.setPosition(pos);
     infoWindow.setContent(browserHasGeolocation ?
                           'Error: The Geolocation service failed.' :
                           'Error: Your browser doesn\'t support geolocation.');
     infoWindow.open(map);
   }

    }


    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;

      var marker = new google.maps.Marker({
        map: map, 
        position: placeLoc
        
      });



      

      var marker2 = new google.maps.Marker({
        map: foodMap, 
        position: place.geometry.location
        
      });

      var marker3 = new google.maps.Marker({
        map: dispoMap, 
        position: place.geometry.location
        
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name)
        infowindow.open(map, this);
      });
    }

