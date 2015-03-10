function parse() {

        xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open("get", "data.json", true);

        xhr.onreadystatechange = loadMessages;


        
        function loadMessages(){
                if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log("In my callback function " + xhr);
                        data = JSON.parse(xhr.responseText);

                        var div = document.getElementById('messages');
                        div.innerHTML = '<div>';
                        
                        for(id in data) {
                                div.innerHTML= div.innerHTML + '<p class="message"> <span class="content">' +
                                                data[id].content + '</span> <span class="usrname">' 
                                                + data[id].username + '</span> </p>';
                        }
                        div.innerHTML = div.innerHTML + '</div>';
//                                 div.innerHTML= <p class="message"> data[id].content </p> + div.innerHTML;

                }
        }

        xhr.send();


};