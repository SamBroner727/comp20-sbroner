

function parse() {

    xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("get", "data.json", true);

    xhr.onreadystatechange = loadMessages;



    function loadMessages() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);

            var div = document.getElementById('messages');   

            for (id in data) {
                div.innerHTML = div.innerHTML + '<p class="message"> <a class="content">' +
                    data[id].content.trim() + '</a> <a class="usrname">' +
                    data[id].username.trim() + '</a> </p>';
            }


        }
    }

    xhr.send();


};

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

}