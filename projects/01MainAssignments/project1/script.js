let textX = 'INTERACTION';
let fontSize = 20;
let speed = 0.02;
let textAmplitude = 50;
let waveStretch = 0.7;
let spacing = 20;
 
function setup () {  
  createCanvas(600, 600); 
  myFont = loadFont("venus rising rg.otf"); 
  textSize(fontSize); 
	textFont(myFont);
  textAlign(CENTER, CENTER);
}

function draw() {
	background(0, 10);

  let startX = width / 4 - textWidth(textX) / 4;
	let totalWidth = 0;
	
	//colors
	for (let i = 0; i < textX.length; i++) {
		  let colorShift = frameCount * 0.01 + i;
	    let r = map(sin(frameCount * 0.01 +  i), -1, 1, 100, 255);
      let g = map(sin(frameCount * 0.015 +i), -1, 1, 100, 255);
      let b = map(sin(frameCount * 0.02 + i), -1, 1, 100, 255);
      fill(r, g, b);
  
	//calculate the position
  let charX = startX + textWidth(textX.substring(0, i)) + textWidth(textX[i]) / 2 + i * spacing;
  let charY = height / 2 + sin((frameCount * speed) + i * waveStretch) * textAmplitude; 

  text(textX[i], charX, charY); 
}
}
	function keyPressed() {
  if (key = ' ') {
    textAmplitude = random(20, 100);
  }
	
}