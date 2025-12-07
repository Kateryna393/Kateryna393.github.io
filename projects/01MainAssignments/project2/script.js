let PosX, PosY;
let topY, bottomY;
let drag = false;
let trail = [];
let myFont;

function preload() {
  myFont = loadFont('SchibstedGrotesk-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 topY = height * 0.15;
  bottomY = height * 0.75;

  PosX = width - width * 0.05;  
  PosY = bottomY;

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  topY = height * 0.15;
  bottomY = height * 0.75;

  PosX = width - width * 0.05;
  PosY = constrain(PosY, topY, bottomY);
}

function draw() {
  background(0, 20);
  drawWaves();
 drawSlider();
	drawText();
}


function drawText() {
  push();
  fill(255); 
  noStroke();
  textAlign(LEFT, TOP);
  textFont(myFont);
  textSize(14);
  text("sound indicator / move the slider", 25, 25);
  pop();
}

//slider
function drawSlider() {
  
  if (mouseIsPressed && mouseX > width*0.9) {
    PosY = constrain(mouseY, topY, bottomY);
    drag = true;


	  trail.push({y: PosY, alpha: 255}); 
    if (trail.length > 500) trail.shift();
  } else {
    drag = false;
  }

  strokeWeight(width * 0.02);
  stroke(22);
  line(PosX, topY, PosX, bottomY);

  
  for (let i = trail.length - 1; i >= 0; i--) {
    let t = trail[i];
    let r = map(sin(frameCount * 0.05 + t.y * 0.05), -1, 1, 100, 255);
    let g = map(sin(frameCount * 0.03 + t.y * 0.05), -1, 1, 50, 200);
    let b = map(sin(frameCount * 0.04 + t.y * 0.05), -1, 1, 150, 255);
    stroke(r, g, b);
    line(PosX, t.y, PosX, bottomY);
	  
    if (PosY >= bottomY) {
        t.alpha -= 6;
        if (t.alpha <= 0) trail.splice(i, 1);
    }
}
  let r1 = map(sin(frameCount * 0.05 + PosY * 0.05), -1, 1, 100, 255);
  let g1 = map(sin(frameCount * 0.03 + PosY * 0.05), -1, 1, 50, 200);
  let b1 = map(sin(frameCount * 0.04 + PosY * 0.05), -1, 1, 150, 255);

fill(r1, g1, b1); 
stroke(255);         
strokeWeight(1); 
ellipse(PosX, PosY, width * 0.035);

let sliderValue = floor(map(PosY, topY, bottomY, 100, 0));
  fill(255); 
  noStroke();
  textAlign(CENTER, CENTER);
  textFont(myFont);
  textSize(width * 0.012);
  text(sliderValue+ "%", PosX, PosY);

}

	//flower
function drawWaves() {
  noFill();

  let numCircles = 16;                                
  let maxSize = map(PosY, topY, bottomY, max(width, height) * 2, 100);

for (let i = 0; i < numCircles; i++) {
   let r = map(sin(frameCount*0.02 + i*0.1), -1, 1, 100, 255);
    let g = map(sin(frameCount*0.03 + i*0.2), -1, 1, 50, 200);
    let b = map(sin(frameCount*0.04 + i*0.3), -1, 1, 150, 255);
    stroke(r, g, b); 
    strokeWeight(1); 
	
let size = (frameCount + i * (240 / numCircles)) % 240;
size = map(size, 0, 240, 0, maxSize); 
	
beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let w = sin(a*6 + frameCount*0.05) * 15;
      let x = width/2 + cos(a) * (size/2 + w);
      let y = height/2 + sin(a) * (size/2 + w);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}