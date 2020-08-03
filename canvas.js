//puts html object in javascript variable
//looks for html object called canvas
var canvas = document.querySelector('canvas');

var mousePressed = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//makes use of lots of drawing functions possible
//e.g. context.fillRect();
var context = canvas.getContext('2d');

//keyup,keypress
window.addEventListener("keydown", checkKeyPress, false);
window.addEventListener("mousemove", checkMousePos, false);
window.addEventListener("mousedown", checkMousePress, false);

function checkMousePress(e) {
    var z = Math.random() * 100;
    var color = random_rgba();
    context.beginPath();
    context.arc(e.x,e.y,z,0,Math.PI * 2,false);
    context.strokeStyle = color;
    context.stroke();
}

function checkMousePos(e) {
    
}

function checkKeyPress(e) {
    context.beginPath();
    context.moveTo(window.innerWidth/2,window.innerHeight/2);
    if (e.keyCode == "65") {
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var color = random_rgba();
        context.lineTo(x,y);
        context.strokeStyle = color;
        context.stroke();
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var z = Math.random() * 100;
        var color = random_rgba();
        context.beginPath();
        context.arc(x,y,z,0,Math.PI * 2,false);
        context.strokeStyle = color;
        context.stroke();
    }
    if (e.keyCode == "66") {
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var z = Math.random() * 100;
        var color = random_rgba();
        context.beginPath();
        context.arc(x,y,z,0,Math.PI * 2,false);
        context.strokeStyle = color;
        context.stroke();
    }
}







//rectangle
//context.fillStyle = 'rgba(255,0,0,0.1)';
//context.fillRect(100, 100, 200, 200);


//line
//context.beginPath();
//context.moveTo(50,300);
//context.lineTo(300,100);
//context.lineTo(900,900);
//context.strokeStyle = "blue";
//context.stroke();

//arc/circle
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

/*for (var i = 0; i<999; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var color = random_rgba();
    context.beginPath();
    context.arc(x,y,50,0,Math.PI * 2,false);
    context.strokeStyle = color;
    context.stroke();
}
*/

/*context.beginPath();
context.moveTo(window.innerWidth/2,window.innerHeight/2);
for (var i = 0; i<5000; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    context.lineTo(x,y);
}
context.stroke();
*/