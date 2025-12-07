let font;
let bounds;
let movement = [];
let c1, c2, c3;
let exploding = false;

function preload() {
  font = loadFont("outward-block.ttf");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  c1 = color('#89fc00'); 
  c2 = color('#dc0073'); 
  c3 = color('#008bf8'); 


  let rawPoints = font.textToPoints("ERROR", 0, 0, 200, {
    sampleFactor: 4, 
    simplifyThreshold: 0,
  });
  bounds = font.textBounds("ERROR", 0, 0, 200);

//points	
for (let p of rawPoints) {
    for (let i = 0; i < 3; i++) {
      movement.push({
        x: p.x,
        y: p.y,
        shiftX: random(-3, 3), 
        shiftY: random(-3, 3),
        seed: random(1000),
		  baseSize: 3, 
		  currentSize: 3, 
		  speedX: 0,
		  speedY:0
		  
      });
    }
  }
}

function draw() {
  background(0);
  fill(255);
  noStroke();
	//text position
  let scaleFactor = 0.8;
  
  let scaleW = (width / bounds.w) * scaleFactor;
  let scaleH = (height / bounds.h) * scaleFactor;
 
  let fontX = -bounds.x * scaleW + width / 2 - (bounds.w * scaleW)/ 2;
  let fontY = -bounds.y * scaleH + height / 2 - (bounds.h * scaleH) / 2;

  
  translate(fontX, fontY);
  
	
  for (let i = 0; i < movement.length; i++) {
    let m = movement[i];
	  
    let nx = noise(m.seed + frameCount * 0.03);
    let ny = noise(m.seed + 1000 + frameCount * 0.03);

    let x = m.x * scaleW + map(nx, 0, 1, -20, 20) + m.shiftX;
    let y = m.y * scaleH + map(ny, 0, 1, -20, 20) + m.shiftY;

	 if (exploding) {
		 
      if (m.speedX === 0 && m.speedY === 0) {
        m.speedX = random(-3, 3);
        m.speedY = random(-3, 3);
      }
    m.x += m.speedX;
      m.y += m.speedY;
    }


	let targetSize = map(mouseX, 0, width, m.baseSize, 1);
    m.currentSize = lerp(m.currentSize, targetSize, 0.1);

	  
    // color
    let colFactor = map(m.currentSize, 1, m.baseSize, 0, 1);
	  let finalColor;

    if (colFactor < 0.5) {
      finalColor = lerpColor(c1, c2, (colFactor* 2));
    } else {
      finalColor = lerpColor(c2, c3, (colFactor- 0.5) * 2);
    }

      fill(finalColor);

    circle(x, y, m.currentSize);
  }
}
function mousePressed() {
  exploding = true;
}