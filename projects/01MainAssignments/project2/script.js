let selectedColor;
let paintFlowX = 0;

function preload () {
  myFont = loadFont("venus rising rg.otf"); 
}

function setup() {
  createCanvas(400, 600);
  selectedColor = color(255);
  textAlign(CENTER, CENTER);
  background(30);
}
	
function draw() {
	
	drawColorPicker();
	
  // gradient size
  gradientWidth = 250;
  gradientHeight = 20;
  gradientX = (width - gradientWidth) / 2;
  gradientY = (height - gradientHeight) / 2;

 //shadow
 // fill(0, 0, 0, 50);
 // noStroke();
 // rect(gradientX + 10, gradientY + 10, gradientWidth, gradientHeight);
	
	// draw rectangle around the lamp and text
	fill(30);
  noStroke(); 
  rect(gradientX - 20, gradientY - 10, gradientWidth + 40, gradientHeight + 20); 
	
	fill(30);
  noStroke();
  rect(25, height - 135, 75*2, 45*2 + 10);

  // gradient color
  noStroke();
  for (let i = 0; i < gradientWidth; i++) {
    let r = map(sin((i + paintFlowX) * 0.02), -1, 1, 40, 240);
    let g = map(sin((i + paintFlowX) * 0.02 + PI / 3), -1, 1, 40, 240);
    let b = map(sin((i + paintFlowX) * 0.02 + (2 * PI) / 3), -1, 1, 40, 240);
    let c = color(r, g, b);
    fill(c);
    rect(gradientX + i, gradientY, 1, gradientHeight);
  }
	 
  // animate the flow of paint
  paintFlowX = (paintFlowX + 2) % gradientWidth;

  // draw lamp handles
  handleWidth = 25;
  handleHeight = 9;

  // left handle
  fill(180);
  rect( gradientX - handleWidth / 2, gradientY + gradientHeight / 2 - handleHeight / 2, handleWidth, handleHeight );

  // right handle
  rect( gradientX + gradientWidth - handleWidth / 2, gradientY + gradientHeight / 2 - handleHeight / 2, handleWidth, handleHeight );

  // display the selected color
  fill(selectedColor);
  noStroke();
  rect(50, height - 100, 100, 50);
	
	//text color
	fill(255);
  textSize(10);
	textFont(myFont);
  text("Selected Color", 100, height - 120);
}

function drawColorPicker() {
    noStroke();
    fill(selectedColor);
    ellipse(mouseX, mouseY, 20, 20);
}

function mousePressed() {
	
	if ( mouseX > gradientX && mouseX < gradientX + gradientWidth &&
    mouseY > gradientY && mouseY < gradientY + gradientHeight ) {
	
	  let r = map(sin((PI + paintFlowX) * 0.02), -1, 1, 40, 240);
    let g = map(sin((PI + paintFlowX) * 0.02 + PI / 3), -1, 1, 40, 240);
    let b = map(sin((PI + paintFlowX) * 0.02 + (2 * PI) / 3), -1, 1, 40, 240);
    selectedColor = color(r, g, b);
}
}

