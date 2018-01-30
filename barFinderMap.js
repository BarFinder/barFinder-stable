        /*
         * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
         * https://developers.google.com/maps/documentation/javascript/geolocation
         * https://developers.google.com/web/fundamentals/native-hardware/user-location/#ask_permission_responsibly
         * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
         */

        function initMap() {
          let mapCanvas = document.getElementById("map");
          let mapOptions = {
              center: new google.maps.LatLng(59.33, 18.06),
              zoom: 12
          };

          let map = new google.maps.Map(mapCanvas, mapOptions);

          var infoWindow = new google.maps.InfoWindow({map: map});

          // Try HTML5 geolocation
          if ( navigator.geolocation ) {
            function success(position) {
              // Location found, show map with these coordinates
              let pos = {
                lat: position.coords.latitude, 
                lng: position.coords.longitude
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              map.setCenter(pos);
            }

            function fail(error) {
              handleLocationError(true, infoWindow, map.getCenter());  // Failed to find location
            }

            // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
            navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});

            

          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter()); 
          }

          function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
          }

        // Add an overlay to the map of current lat/lng with a beer icon
        let image = {
          url: "https://avatars0.githubusercontent.com/u/35840202?s=200&v=4",
          size: new google.maps.Size(160, 160),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(10, 10),
          scaledSize: new google.maps.Size(30, 30)
        };
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(59.33, 18.06),
          map: map,
          title: "You are here",
          icon: image
        });
      }