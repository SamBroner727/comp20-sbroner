function init() {

    function startMap() {
        var mapOptions = {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        google.maps.event.addDomListener(window, 'load', initialize);

    }
}


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