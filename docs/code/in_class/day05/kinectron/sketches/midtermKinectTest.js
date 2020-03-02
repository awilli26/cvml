let w = 400;
let h = 400;
//let img;
let particles = [];
let kinectron;

let pink;

//new
//linked right?
function preload() {
  pink = loadImage("docs/code/in_class/day05/kinectron/images/pinkBG.jpg");
}

function setup() {
  createCanvas(w, h);
  colorMode(HSB, 255);
  
  
  noStroke();
  
  kinectron = new Kinectron("10.75.29.87");
  kinectron.makeConnection();
  
  //new
  kinectron.startTrackedBodies(drawBody);
  kinectron.setKinectType("windows");
  kinectron.startKey(makePink);
  console.log(kinectron);
}

function draw() {
  background(255, 90, 255);
  
  
  let center = createVector(w/2,h/2);
  let mousePos = createVector(mouseX, mouseY);
  let headPos = createVector(body.joints[3].depthX*w,body.joints[3].depthY*h);
  let leftHand = createVector(body.joints[7].depthX*w, body.joints[7].depthY*h);
  let rightHand = createVector(body.joints[11].depthX*w, body.joints[11].depthY*h);
 
  let ld = dist(leftHand.x, leftHand.y, headPos.x, headPos.y);
  let rd = dist(rightHand.x, rightHand.y, headPos.x, headPos.y);
  
  // // if the mouse is pressed, repel the particles away from the mouse position
  // // otherwise, draw the particles toward the mouse position

  //body.joints[7].depthY && body.joints[11].depthY >= body.joints[3].depthY

  if(ld < 20 && rd <20 ) {
    forceScaler = 20;
  } else {
    forceScaler = -30;
  }
  
  
   let p = new Particle(w/2,h/2);
  particles.push(p);
  

  // loop through all the particles
  for(let i = 0; i < particles.length; i++) {
    
    let p = particles[i]; // this way, we don't have to always type particles[i]
    
    let d = dist(headPos.x,headPos.y, p.pos.x, p.pos.y);
    
    let magnitude = forceScaler / (d+6);
    
    let forceDirection = p.pos.sub(headPos);
    
    forceDirection.normalize();
    
    let newForce = forceDirection.mult(magnitude);
    
    p.force.add(newForce);
    
    p.update();
    p.draw();
    
    if(particles[i].age < 0){
      particles.shift();

  }
  

  }
}
//new
function makePink(img) {
  // once a kinectron image is loaded
  loadImage(img.src, function(loadedImage) {
    //draw the pink image, then the kinectron key image
    image(pink, 0, 0);
    image(loadedImage, 0, 0);
  });
}

class Particle {
  
  // In addition to the usual particle attributes we apply in the
  // constructor, there is now a 'force' attribute, which is used to
  // influence where the particle should move, and how fast it should
  // get there.
  constructor(x,y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-20, 20), random(-20, 20));
    this.accel = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.color = [0, 0, 0,255];
    this.radius = 10;
    this.force = createVector(0, 0);
    this.drag = 0.97;
    this.age = random(255, 300);

  }
  
  update() {
    this.vel.add(this.force);
    this.vel.mult(this.drag);
    this.pos.add(this.vel);
    
    this.age--;
    this.color[4]--;

  }
  
  draw() {
        
    // draw the particle using the image we loaded above
    fill(this.color);
    ellipse( this.pos.x, this.pos.y, this.radius);
    
    
  }
}
