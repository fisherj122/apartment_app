function createGmap(dataFromServer) {
  handler = Gmaps.build('Google');
  handler.buildMap({
      provider: {},
      internal: {id: 'apartment_map'}
    },
    function() {
      showLocations(dataFromServer);
    }
  );
};

function all_create_Gmap(dataFromServer) {
  handler = Gmaps.build('Google');
  handler.buildMap({
      provider: {},
      internal: {id: 'all_apartment_map'}
    },
    function() {
      markers = handler.addMarkers(dataFromServer);
      handler.bounds.extendWith(markers);
      handler.fitMapToBounds();
    }
  );
};

function placeMakers(dataFromServer, markers) {
  markers = handler.addMarkers(dataFromServer);
  handler.bounds.extendWith(markers);
  handler.fitMapToBounds();
}

function showLocations(dataFromServer) {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      // Add our position to the collection of markers
      markers = [];
      dataFromServer[dataFromServer.length] = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        infowindow: "You!"
      };
      placeMakers(dataFromServer, markers);
    });
  } else {
      alert("Geolocation is not available.");
      placeMakers(dataFromServer, markers)
  }
}

function loadAndCreateGmap() {
  // Only load map data if we have a map on the page
  if ($('#apartment_map').length > 0) {
    // Access the data-apartment-id attribute on the map element
    var apartmentId = $('#apartment_map').attr('data-apartment-id');

    $.ajax({
      dataType: 'json',
      url: '/apartments/' + apartmentId + '/map_location',
      method: 'GET',
      success: function(dataFromServer) {
        createGmap(dataFromServer);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Getting map data failed: " + errorThrown);
      }
    });
  }

  if ($('#all_apartment_map').length > 0) {
    // Access the data-apartment-id attribute on the map element

    $.ajax({
      dataType: 'json',
      url: '/apartments/all_map_locations',
      method: 'GET',
      success: function(dataFromServer) {
        all_create_Gmap(dataFromServer);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Getting map data failed: " + errorThrown);
      }
    });
  }
};

// Create the map when the page loads the first time
$(document).on('ready', loadAndCreateGmap);
// Create the map when the contents is loaded using turbolinks
// To be 'turbolinks:load' in Rails 5
$(document).on('page:load', loadAndCreateGmap);