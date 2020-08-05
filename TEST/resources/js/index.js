var mouse = {
	x: undefined,
	y: undefined
}

function onMouseDown(event) {
	
}

function onMouseMove(event) {
	mouse.x = event.point.x;
	mouse.y = event.point.y;
}

function movingCircle(x,y,radius,dx,dy,color) {
	this.x=x;
    this.y=y; 
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
	this.color=color;
	this.circle;

	this.draw = function() {
		this.circle = new Path.Circle(this.x,this.y,this.radius);
		this.circle.fillColor = color;
	}
	this.update = function() {
		if(this.circle.position.x+this.radius>paper.view.bounds.width || this.circle.position.x-radius<0) {
            this.dx = -this.dx;
        }
        if(this.circle.position.y+this.radius>paper.view.bounds.height || this.circle.position.y-radius<0) {
            this.dy = -this.dy;
        }
        this.circle.position.x+=this.dx;
        this.circle.position.y+=this.dy;
        this.circle.fillColor.hue -= 3;
		
		
        var distance = 100;
        if(mouse.x - this.circle.position.x < distance && mouse.x -this.circle.position.x > -distance && mouse.y - this.circle.position.y < distance && mouse.y - this.circle.position.y > -distance) {
			if(this.circle.bounds.width/2 < radius*5){
				this.circle.scale(2);
            } 
		} else if(this.circle.bounds.width/2 > radius) {
			this.circle.scale(0.95);
        }
	}
}


var circleArray = [];
function init() {
    circleArray=[];
	for(var i=0; i<500; i++) {
        var color = random_rgba();
        var radius = Math.random() * 20;
        var x = Math.random() * (view.bounds.width - radius*2) + radius;
        var y = Math.random() * (view.bounds.height - radius*2) + radius;
        var dy = (Math.random() - 0.5) * 7;
        var dx = (Math.random() - 0.5) * 7;
		circleArray.push(new movingCircle(x, y, radius, dx, dy, color));
		circleArray[i].draw();
    }
   
}

function onFrame(event) {
    for(var i=0; i<circleArray.length; i++) {
        circleArray[i].update();
    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

init();
