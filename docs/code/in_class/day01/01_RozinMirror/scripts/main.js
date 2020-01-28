
//day 01 Rozin Mirror Tings

let myCapture;
var b = 0;

function setup() {
  let canvas = createCanvas(640, 480);

  canvas.parent("sketch");
  myCapture = createCapture(VIDEO);
  myCapture.hide();
     
  noStroke();
}

function draw() {
  background(255);
  
  //load pixels data into myCapture object
  myCapture.loadPixels();
  
  
  const stepSize = round(constrain(mouseX / 8,6,32));
  
  for(let y = 0; y < height; y+=stepSize){
    for(let x = 0; x < width; x+=stepSize){
      
      //changes data to 1d
      const i = y * width + x;
      
      const darkness = (255 - myCapture.pixels[i*4])/255;
      const radius = stepSize * darkness;
      
      push();
       translate(width,0);
       scale(-1,1);
       ellipse(x,y,radius,radius);
      pop();
    }
  }
  
  //color gradient over time - blue increase
   b += 8;
   if(b > 255){
    b = 0; 
  }
  
  fill(250,0,b,b);
}
