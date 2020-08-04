var canvas = document.querySelector('myCanvas');

//display size
myCanvas.style.width = "100%";
myCanvas.style.height = "100%";
console.log(myCanvas.style.width);

//resulution
// default is 300x150 px
myCanvas.width =  1000;
myCanvas.height = 1000;


//2D renderings are rendered in pixel coordinates not style coordinates

//Mouse coordinates are Pixels
//not myCanvas.addEventListener("mousemove", mouseEvent);
//becaus you will lose track of events when mouse is off 
window.addEventListener("mousemove", mouseEvent);
window.addEventListener("mousedown", mouseEvent);
window.addEventListener("mouseup", mouseEvent);

const mouse = {
    x: undefined, y:undefined,
    lastX: undefined, lastY: undefined,
    b1: false, b2: false, b3: false,
    buttonNames: ["b1","b2","b3"]
}

function mouseEvent(e) {
    //posistion of canvas
    //{x: ?, y: ?, width: ?, height: ?,top: ?, left: ?, right: ?, bottom: ?}
    var bounds = myCanvas.getBoundingClientRect();
    
    //get mouse coordinates, substract canvas position and any scrolling
    mouse.x = e.pageX - bounds.left - scrollX;
    mouse.y = e.pageY - bounds.top - scrollY;

    //normalize mouse coordinates from 0 to 1 - (0,0) top-left (1,1) bottom-right
    mouse.x /=  bounds.width; 
    mouse.y /=  bounds.height; 
    //then scale to canvas resulution
    mouse.x *= myCanvas.width;
    mouse.y *= myCanvas.height;


    //other mouse events
    if(e.type === "mousedown"){
        mouse[mouse.buttonNames[event.which-1]] = true; // set the button as down
   }else if(e.type === "mouseup"){
        mouse[mouse.buttonNames[event.which-1]] = false; // set the button up
   }
}

//makes use of lots of drawing functions possible
//e.g. context.fillRect();
var context = myCanvas.getContext('2d');

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
        if(this.x+this.radius>myCanvas.width || this.x-radius<0) {
            this.dx = -this.dx;
        }
        if(this.y+this.radius>myCanvas.height || this.y-radius<0) {
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        //mouse
        var distance = 80;
        if(mouse.x - this.x < distance && mouse.x -this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            if(this.radius < 100){
                this.radius += 99;
            }
        } else if(this.radius>radius) {
            this.radius -= 3;
        }

        this.draw();
    }
}

var circleArray = [];
function init() {
    circleArray=[];
    for(var i=0; i<500; i++) {
        var color = random_rgba();
        var radius = Math.random() * 20 + 3;
        var x = Math.random() * (myCanvas.width - radius*2) + radius;
        var y = Math.random() * (myCanvas.height - radius*2) + radius;
        var dy = (Math.random() - 0.5) * 7;
        var dx = (Math.random() - 0.5) * 7;
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    for(var i=0; i<circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();



//random colors
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}