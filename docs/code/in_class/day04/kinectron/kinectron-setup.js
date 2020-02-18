let w = 1280;
let h = 720;
let points = [];

let kinectron;

function setup() {
    let canvas = createCanvas(w,h);
    canvas.parent("#sketch")
    //background(0);

    kinectron = new Kinectron("10.75.24.245")
    kinectron.makeConnection();
    kinectron.startTrackedBodies(drawBody);
}

function draw() {

    let handX = body.joints[kinectron.HANDRIGHT].depthX;
    let handY = body.joints[kinectron.HANDRIGHT].depthY;

    let p = new Point(handX, handY);
    points.push(p);
    
    for(let i = 0; i < points.length; i++){
      points[i].draw();
      points[i].update();
      
      if(points[i].age < 0){
        points.shift();
      }
      
    }

}

function drawBody(body){
    background(0);
    for(let i = 0; i < body.joints.length; i++){
        fill(255, 0, 0);
        ellipse(body.joints[i].depthX * width, body.joints[i].depthY * height, 20, 20);

    }


}

class Point {
    constructor(x,y){
      this.pos = createVector(x,y);
      this.color = [255, 0,0,255];
      this.age = 255;
      this.size = this.age/4
      //this.shouldDie = false;
      this.stroke = [0,255,0,255];
    }
    
    draw(){
      fill(this.color);
      stroke(this.stroke);
      ellipse(this.pos.x, this.pos.y,this.size);
      
    }
    
    update(){
      this.age--;
      this.size = this.age/4
      this.color[3]--;
      this.stroke[3]--;
      
      
    }
  }


