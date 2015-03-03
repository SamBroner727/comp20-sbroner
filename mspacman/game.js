function init() {

        var canvas = document.getElementById('game_canvas');

        if (canvas.getContext) {
                var ctx = canvas.getContext("2d");

                var sprite = new Image();
                sprite.src = 'pacman10-hp-sprite.png';
                sprite.alt = 'A sprite of pacman';

// context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

                sprite.onload = function() {
                        ctx.drawImage(sprite, 320, 0, 464, 137, 0, 0, 464, 137);
                        ctx.drawImage(sprite, 82, 21, 20, 20, 39, 30, 20, 20);
                        console.log("Image Loaded");
                };
        } else {
                alert ('You should probably get a browser that supports Canvas');
        }
};


// var img = new Image();   // Create new img element
// img.addEventListener("load", function() {
//   // execute drawImage statements here
// }, false);
// img.src = 'myImage.png'; // Set source path

// var img = new Image();
//     img.src = '/images/backdrop.jpg';