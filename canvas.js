//puts html object in javascript variable
//looks for html object called canvas
var canvas = document.querySelector('canvas');

var mousePressed = false;

canvas.width = 1280;
canvas.height = 800;

//makes use of lots of drawing functions possible
//e.g. context.fillRect();
var context = canvas.getContext('2d');

//keyup,keypress
window.addEventListener("keydown", checkKeyPress, false);
window.addEventListener("mousemove", mouseMove, false);
window.addEventListener("mousedown", checkMousePress, false);
window.addEventListener("touchmove", touchMove, false);

function checkMousePress(e) {
  /*
    var z = Math.random() * 100;
    var color = random_rgba();
    context.beginPath();
    context.arc(e.x,e.y,z,0,Math.PI * 2,false);
    context.strokeStyle = color;
    context.stroke();
*/
}


var mouse = {
    x: undefined,
    y: undefined
}
function touchMove(e) {
    mouse.x=e.x;
    mouse.y=e.y;
} 

function mouseMove(e) {
    mouse.x=e.x;
    mouse.y=e.y;
}

function checkKeyPress(e) {
    context.beginPath();
    context.moveTo(window.innerWidth/2,window.innerHeight/2);
    if (e.keyCode == "65") {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var color = random_rgba();
        context.lineTo(x,y);
        context.strokeStyle = color;
        context.stroke();
    }
    if (e.keyCode == "66") {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var z = Math.random() * 100;
        var color = random_rgba();
        context.beginPath();
        context.arc(x,y,z,0,Math.PI * 2,false);
        context.strokeStyle = color;
        context.stroke();
    }
}

function Circle(x,y,dx,dy,radius,color) {
    this.x=x;
    this.y=y; 
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.color=color;

    //anonymous function (like lambda expressions?)
    this.draw = function() {
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        context.strokeStyle = color;
        context.fillStyle = color;
        context.stroke();
        context.fill();
    }
    this.update = function() {
        if(this.x+this.radius>canvas.width || this.x-radius<0) {
            this.dx = -this.dx;
        }
        if(this.y+this.radius>canvas.height || this.y-radius<0) {
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        //mouse
        var distance = 70;
        if(mouse.x - this.x < distance && mouse.x -this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            this.radius += 3;
        } else if(this.radius >radius) {
            this.radius -= 3;
        }

        this.draw();
    }
}

var circleArray = [];
for(var i=0; i<100; i++) {
    var color = random_rgba();
    var radius = 20;
    var x = Math.random() * (canvas.width - radius*2) + radius;
    var y = Math.random() * (canvas.height - radius*2) + radius;
    var dy = (Math.random() - 0.5) * 20;
    var dx = (Math.random() - 0.5) * 20;
    circleArray.push(new Circle(x, y, dx, dy, radius, color));
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0; i<circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();


/*
var colora = random_rgba();
var xa = Math.random() * canvas.width;
var ya = Math.random() * canvas.height;
var dy = (Math.random() - 0.5) * 20;
var dx = (Math.random() - 0.5) * 20;
var radius = 100;

function animate() {
    //loop for animation
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    context.arc(xa,ya,radius,0,Math.PI * 2,false);
    context.strokeStyle = colora;
    context.stroke();

    if(xa+radius>canvas.width || xa-radius<0) {
        dx = -dx;
        colora = random_rgba();
    }
    if(ya+radius>canvas.height || ya-radius<0) {
        dy = -dy;
        colora = random_rgba();
    }
    xa+=dx;
    ya+=dy;
}

animate();
*/
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