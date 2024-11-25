let textX = 'INTERACTION  DESIGN';
let fontSize = 45;
let speed = 0.05;
let textAmplitude = 20;



function setup () {
  createCanvas(600, 600); 
  textFont('Georgia'); 
  textSize(fontSize); 
  textAlign(CENTER, CENTER);
  
}

function draw() {
  background(0); 
  fill( random(255), random(255), random(255) ); 
  
  let startX = width / 2 - textWidth(textX) / 2; 
  
  for (let i = 0; i < textX.length; i++) {
    let charX = startX + textWidth(textX.substring(0, i)) + textWidth(textX[i]) / 2; 
    
    let charY = height / 2 + sin((frameCount * speed) + i) * textAmplitude; 

    text(textX[i], charX, charY); 
}
}