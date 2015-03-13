//URL and XMLHttpRequest info
var http = new XMLHttpRequest();
var url = "https://secret-about-box.herokuapp.com/sendLocation";
http.open("POST", url, true);
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");



var myLat = 0;
var myLng = 0;
var params = "";
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);

var myOptions = {
    zoom: 8,
    center: me,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;


function init() {
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    console.log("Call before getMyLocation()");
    getMyLocation();
    checkresponse();
    makeMarkers();
    console.log("Call after getMyLocation()");
}

function checkresponse() {
    http.onreadystatechange = function() { //Call a function when the state changes

        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
}

function getMyLocation() {
    console.log("In getMyLocation()");
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser

        // Updates location to browsers location.
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;

            // my log in
            params = "login=PatFitzgerald&" + "lat=" + myLat + "&lng=" + myLng;
            http.send(params);
            console.log(params);
            renderMap();
        });
    } else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }
    console.log("Leaving getMyLocation()");
}

function renderMap() {
    me = new google.maps.LatLng(myLat, myLng);

    // Update map and go there...
    map.panTo(me);

    // Create a marker
    marker = new google.maps.Marker({
        position: me,
        title: "Here I Am!"
    });
    marker.setMap(map);

    // Open info window on click of marker
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
    });


    // Calling Google Places API
    // var request = {
    //     location: me,
    //     radius: '500',
    //     types: ['food']
    // };

    // service = new google.maps.places.PlacesService(map);
    // service.search(request, callback);
}

// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         alert("Got places back!");
//         places = results;
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }
//     }
// }

function makeMarkers() {
    
    console.log(http.responseText);

    var data = JSON.parse(http.responseText);

    var marker;
    var latlng

    for(var user in data) {

        latlng = new google.maps.LatLng(user.lat, user.lng);
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: user.login
        });
        marker.setMap(map);
    }   

});

// To add the marker to the map, call setMap();
marker.setMap(map);
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.close();
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

