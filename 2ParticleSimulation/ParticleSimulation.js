// HTML5 Canvas Particle Simulation
// Gavin Mack
// Programming problem 2 for LEEPS lab application
// Starter code taken from this tutorial:
// http://thecodeplayer.com/walkthrough/make-a-particle-system-in-html5-canvas

//Initializing the canvas
var canvas;
var ctx;

//Lets create an array of particles
var particles;

//Canvas dimensions
var W; var H;
var x; var y;

//Lets create a function which will help us to create multiple particles
function create_particle() {
	//Random position
	this.x = Math.random()*W;
	this.y = Math.random()*H;
	
	//Random velocity
	this.vx = Math.random()*20-10;
	this.vy = Math.random()*20-10;
	
	//Random colors
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	this.color = "rgba("+r+", "+g+", "+b+", 0.5)";
	
	//Size of 10
	this.radius = 10;
}

//Lets animate the particle
function draw() {
	//Moving this BG paint code insde draw() will help remove the trail
	//of the particle
	//Lets paint the canvas black
	//But the BG paint shouldn't blend with the previous frame
	ctx.globalCompositeOperation = "source-over";
	//Lets reduce the opacity of the BG paint to give the final touch
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(0, 0, W, H);
	
	//Lets blend the particle with the BG
	ctx.globalCompositeOperation = "lighter";
	
	//Lets draw particles from the array now
	for(var t = 0; t < particles.length; t++) {
		var p = particles[t];
		
		ctx.beginPath();
		
		//Time for some colors
		var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.4, "white");
		gradient.addColorStop(0.4, p.color);
		gradient.addColorStop(1, "black");
		
		ctx.fillStyle = gradient;
		ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
		ctx.fill();
		
		//Increment x&y by velocity
		p.x += p.vx;
		p.y += p.vy;
		
		//Canvas wraps around
		if(p.x < 0) p.x = W;
		if(p.y < 0) p.y = H;
		if(p.x > W) p.x = 0;
		if(p.y > H) p.y = 0;
	}
}

var changeColor = function() {
	for(var i = 0; i<particles.length; i++) {
		var r = Math.random()*255>>0;
		var g = Math.random()*255>>0;
		var b = Math.random()*255>>0;
		particles[i].color = "rgba("+r+", "+g+", "+b+", 0.5)";
	}
};

$(document).ready(function () {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	particles = [];
	W = 500; H = 400;
	x = 100; y = 100;
	
	//Adds particle on mouse click
	canvas.onclick = function() {
		particles.push(new create_particle());
	}

	//Resets canvas to 10 particles
	document.getElementById('btn').onclick = function() {
		particles = [];
		for(var i=0; i<10; i++) {
			particles.push(new create_particle());
		}
	}
	
	for(var i = 0; i < 10; i++) {
		//This will add 50 particles to the array with random positions
		particles.push(new create_particle());
	}
	
	setInterval(draw, 33);
	setInterval(changeColor, 3000);
});

