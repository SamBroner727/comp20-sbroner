function parse() {

        xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open("get", "http://messagehub.herokuapp.com/messages.json", true);

        xhr.onreadystatechange = loadMessages;


        
        function loadMessages(){
                if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log("In my callback function " + xhr);
                        data = JSON.parse(xhr.responseText);

                        var div = document.getElementById('messages');
                        // div.innerHTML = '<div class="check">';
                        // console.log(div.innerHTML);

                        for(id in data) {
                                div.innerHTML= div.innerHTML + '<p class="message"> <a class="content">' +
                                                data[id].content.trim() + '</a> <a class="usrname">' +
                                                 data[id].username.trim() + '</a> </p>';
                        }

                        console.log(div.innerHTML);
                        // div.innerHTML = div.innerHTML.append('</div>') ;

                }
        }

        xhr.send();


};