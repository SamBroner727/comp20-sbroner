//URL and XMLHttpRequest info
var http = new XMLHttpRequest();
var url = "https://ancient-mesa-5081.herokuapp.com/sendLocation";
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
    getMyLocation();
    checkresponse();
}

function checkresponse() {
    http.onreadystatechange = function() { //Call a function when the state changes

        if (http.readyState == 4 && http.status == 200) {
            makeMarkers();
            renderMe();
        }
    }
}

function getMyLocation() {
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser

        // Updates location to browsers location.
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;

            // my log in
            params = "login=PatFitzgerald&" + "lat=" + myLat + "&lng=" + myLng;
            http.send(params);
            // renderMap();
        });
    } else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
    }
}

function renderMe() {
    me = new google.maps.LatLng(myLat, myLng);

    map.panTo(me);

    // Create a marker
    marker = new google.maps.Marker({
        position: me,
        title: "PatFitzgerald"
    });
    marker.setMap(map);


    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(
            '<div> <p id="username">Pat Fitzgerald </p>' +
                '<img src="pat_fitzgerald.jpg" alt="Pat Fitzgerald, winningest coach in Northwestern Football History"> '
            + '</div>'
            );
        infowindow.open(map, marker);
    });
}


function makeMarkers() {

    var data = JSON.parse(http.responseText);

    var marker;
    var latlng

    for (var user in data) {

        latlng = new google.maps.LatLng(data[user].lat, data[user].lng);
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: data[user].login
        });

        marker.setMap(map);
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.close();
            infowindow.setContent('<div id="message"> <p id="username"> ' + 
                this.title + '</p> <p id="distance">'+ 
                calculateDistance(this.position.lat(), this.position.lng()) + 
                'mi </p> </div>');

            infowindow.open(map, this);
        });
    }
}

//Function to convert to Radians
function toRad(x) {
   return x * Math.PI / 180;
}

//Calculate distance from "me" using Haversine formula
function calculateDistance(latitude, longitude) {

    var R = 6371000
    var myLatRad = toRad(myLat);
    var myLngRad = toRad(myLng);


    latitude = toRad(latitude);

    longitude = toRad(longitude);

    dLat = latitude - myLatRad;
    dLng = longitude - myLngRad;

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(myLatRad) * Math.cos(latitude) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c / 1609.34;

}
