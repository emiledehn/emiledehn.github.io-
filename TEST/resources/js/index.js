

//////////////////////////////////////////////////////////////////////////////
// MOUSE HANDLING
var mouse = {
    x: undefined, y: undefined
}

function onMouseMove(event) {
	mouse.x = event.point.x;
    mouse.y = event.point.y;
    if(event.point.x>view.bounds.width-25||event.point.x<25||event.point.y>view.bounds.height-25||event.point.y<25) {
        mouse.x = undefined;
        mouse.y = undefined;
    } 
}
//////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////
// SCALING
var originalSize = view.bounds.width;
var originalSize2 = view.bounds.width;
var sizeFactor;
var sizeFactor2;
var norm = 1 + ((view.bounds.width - 1024) / 1024);



function onResize(event) {
    sizeFactor = 1 + (view.bounds.width - originalSize) / originalSize;
    sizeFactor2 = 1 + (view.bounds.width - originalSize2) / originalSize2;
    originalSize = view.bounds.width;
  
    console.log("hi");

    //circle resizing
    circles.scale(sizeFactor);
    circles.position = view.center;
}
//////////////////////////////////////////////////////////////////////////////

var circleAmount = 400;

function init() {
    spawnCircles(circleAmount);
}

function onFrame(event) {
    moveCircles();
}


var circRadius = [];
var circles = new Group;

function spawnCircles() {
    for(var i=0; i<circleAmount; i++) {
        var color = random_rgba();
        var radius = (Math.random() * 20 + 10) * norm;
        var x = Math.random() * (view.bounds.width - radius*2*norm) + radius*norm;
        var y = Math.random() * (view.bounds.height - radius*2*norm) + radius*norm;
        circRadius.push(radius);
        circles.children.push(new Path.Circle(x, y, radius));
        circles.children[i].fillColor = color;
    }
}

var dx = [];
var dy = [];
for(var i=0; i<circleAmount; i++) {
    dx.push((Math.random() - 0.5) * 5);
    dy.push((Math.random() - 0.5) * 5);
}

function moveCircles() {
    for(var i=0; i<circleAmount; i++) {
        if(circles.children[i].position.x+radius(circles.children[i])>paper.view.bounds.width || circles.children[i].position.x-radius(circles.children[i])<0) {
            dx[i] = -dx[i];
        }
        if(circles.children[i].position.y+radius(circles.children[i])>paper.view.bounds.height || circles.children[i].position.y-radius(circles.children[i])<0) {
            dy[i] = -dy[i];
        }
        circles.children[i].position.x += dx[i];
        circles.children[i].position.y += dy[i];
    }
    for(var i=0; i<circleAmount; i++) {
        var distance = 75 * sizeFactor2;
        if(mouse.x - circles.children[i].position.x < distance && mouse.x -circles.children[i].position.x > -distance && mouse.y - circles.children[i].position.y < distance && mouse.y - circles.children[i].position.y > -distance) {
            circles.children[i].fillColor.hue -=2;
            if(radius(circles.children[i]) < circRadius[i]*3*sizeFactor2){
                circles.children[i].scale(2);
            
            } 		
        } else if(radius(circles.children[i]) > circRadius[i]*sizeFactor2) {
            circles.children[i].scale(0.95);
            //if(circles.children[i].fillColor.hue != 250 & circles.children[i].fillColor.hue >= -110) {
            //    circles.children[i].fillColor.hue -=10;
            //}

            // 0 rot
            // 250 blau
        }
    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function radius(path) {
    return (path.bounds.width / 2 + path.strokeWidth / 2);
}

init();
