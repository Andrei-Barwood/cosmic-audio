let butterflies = [];
let maxButterflies = 24;

let colors = [
  [175, 102, 0],    // Converted from "#AF6600"
  [0, 0, 0],
  [234, 51, 35],    // Converted from "#EA3323"
  [0, 0, 0]
];

// Pyramid variables
let pyramidAngleX = 0;
let pyramidAngleY = 0;
let pyramidAngleZ = 0;
let pyramidSize = 6;
let targetPyramidSize = 192;
let basePyramidSize = 1;

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  noFill();
  strokeWeight(6);
}

function draw() {
  background(0, 0, 0);
  
  // Update pyramid rotations for 3D effect
  pyramidAngleX += 0.01;
  pyramidAngleY += 0.008;
  pyramidAngleZ += 0.006;
  
  // Smoothly interpolate pyramid size towards target
  pyramidSize += (targetPyramidSize - pyramidSize) * random( 2.1);
  
  // Check distance from mouse to center of canvas for pyramid size changes
  let centerX = 0;
  let centerY = 0;
  let mouseDistance = dist(mouseX - width/2, mouseY - height/2, centerX, centerY);
  
  // If mouse is near the center (pyramid), change size randomly
  if (mouseDistance < 960) {
    if (frameCount % 20 === 0) {
      targetPyramidSize = random(1, 384);
    }
  } else {
    targetPyramidSize = basePyramidSize;
  }
  
  // Draw rotating 3D pyramid at center
  push();
  translate(0, 0, 0);
  rotateX(pyramidAngleX);
  rotateY(pyramidAngleY);
  rotateZ(pyramidAngleZ);
  
  strokeWeight(24);
  stroke("#6E171B");
  fill(110, 23, 27, 100);
  
  // Create 3D pyramid using safe vertex values
  let s = pyramidSize; // Ensure we have a valid number
  
  beginShape(TRIANGLES);
  
  // Front face
  vertex(0, -s, 0);      // apex
  vertex(-s, s, -s);     // base1
  vertex(s, s, -s);      // base2
  
  // Right face
  vertex(0, -s, 0);      // apex
  vertex(s, s, -s);      // base2
  vertex(s, s, s);       // base3
  
  // Back face
  vertex(0, -s, 0);      // apex
  vertex(s, s, s);       // base3
  vertex(-s, s, s);      // base4
  
  // Left face
  vertex(0, -s, 0);      // apex
  vertex(-s, s, s);      // base4
  vertex(-s, s, -s);     // base1
  
  // Base - triangle 1
  vertex(-s, s, -s);     // base1
  vertex(s, s, -s);      // base2
  vertex(s, s, s);       // base3
  
  // Base - triangle 2
  vertex(-s, s, -s);     // base1
  vertex(s, s, s);       // base3
  vertex(-s, s, s);      // base4
  
  endShape();
  pop();
  
  // Convert mouse coordinates for butterfly system
  let adjustedMouseX = mouseX - width/2;
  let adjustedMouseY = mouseY - height/2;
  
  // Add new butterflies when mouse is moving
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (dist(mouseX, mouseY, pmouseX, pmouseY) > 16 && butterflies.length < maxButterflies) {
      butterflies.push(new Butterfly(adjustedMouseX, adjustedMouseY));
    }
  }
  
  // Update and display butterflies
  for (let i = butterflies.length - 1; i >= 0; i--) {
    butterflies[i].update();
    butterflies[i].display();
    if (butterflies[i].isDead()) {
      butterflies.splice(i, 1);
    }
  }
}

class Butterfly {
  constructor(x, y) {
    this.pos = createVector(x || 0, y || 0);
    this.vel = createVector(random(-2, 8), random(-12, 2));
    this.acc = createVector(-0.8, 0);
    this.life = 255;
    this.maxLife = 255;
    this.wingPhase = random(TWO_PI);
    this.wingSpeed = random(1.12);
    this.size = random(4, 96);
    
    // Ensure we get valid color values
    let colorIndex = floor(random(colors.length));
    this.colorR = colors[colorIndex][0];
    this.colorG = colors[colorIndex][1];
    this.colorB = colors[colorIndex][2];
    this.scatterForce = random(1.2, 19.2);
  }
  
  update() {
    // Add some randomness to movement
    this.acc.add(random(-0.01, 0.01), random(-0.01, 0.01));
    
    // Scatter away from mouse when close
    let adjustedMouseX = mouseX - width/2;
    let adjustedMouseY = mouseY - height/2;
    let mousePos = createVector(adjustedMouseX, adjustedMouseY);
    let distToMouse = p5.Vector.dist(this.pos, mousePos);
    
    if (distToMouse < 100 && distToMouse > 0) {
      let scatter = p5.Vector.sub(this.pos, mousePos);
      if (scatter.mag() > 0) {
        scatter.normalize();
        let scatterAmount = constrain(this.scatterForce / max(distToMouse, 1), 0, 5);
        scatter.mult(scatterAmount);
        this.acc.add(scatter);
      }
    }
    
    // Apply physics
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    
    // CRITICAL FIX: Reset acceleration to zero
    this.acc.set(0, 0);
    
    // Keep butterflies within reasonable bounds
    this.pos.x = constrain(this.pos.x, -width, width);
    this.pos.y = constrain(this.pos.y, -height, height);
    
    // Fade out over time
    this.life -= 1.96;
    // Update wing animation
    this.wingPhase += this.wingSpeed;
  }
  
  display() {
    // Safety check for position values
    let posX = isFinite(this.pos.x) ? this.pos.x : 0;
    let posY = isFinite(this.pos.y) ? this.pos.y : 0;
    
    push();
    translate(posX, posY, 0);
    
    // Calculate opacity
    let opacity = map(this.life, 0, this.maxLife, 0, 255);
    opacity = constrain(opacity, 0, 255);
    
    // Ensure all color values are valid
    if (!isFinite(this.colorR) || !isFinite(this.colorG) || !isFinite(this.colorB)) {
      stroke(234, 51, 35);
    } else {
      stroke(this.colorR, this.colorG, this.colorB, opacity);
    }
    
    // Wing flap animation
    let wingFlap = sin(this.wingPhase) * 0.36 + 1;
    
    // Draw butterfly body
    stroke(177, 129, 0);
    strokeWeight(1);
    line(0, -this.size * 0.4, 0, this.size * 0.4);
    
    // Draw wings as rhombus shapes
    strokeWeight(2);
    // Upper wings
    push();
    scale(wingFlap, 1);
    this.drawRhombus(-this.size * 0.3, -this.size * 0.2, this.size * 0.3, this.size * 0.2);
    this.drawRhombus(this.size * 0.3, -this.size * 0.2, this.size * 0.3, this.size * 0.2);
    pop();
    
    // Lower wings
    push();
    scale(wingFlap * 0.8, 1);
    this.drawRhombus(-this.size * 0.25, this.size * 0.1, this.size * 0.2, this.size * 0.15);
    this.drawRhombus(this.size * 0.25, this.size * 0.1, this.size * 0.2, this.size * 0.15);
    pop();
    
    // Wing detail patterns
    strokeWeight(1);
    push();
    scale(wingFlap, 1);
    this.drawRhombus(-this.size * 0.3, -this.size * 0.2, this.size * 0.15, this.size * 0.1);
    this.drawRhombus(this.size * 0.3, -this.size * 0.2, this.size * 0.15, this.size * 0.1);
    this.drawRhombus(-this.size * 0.25, this.size * 0.1, this.size * 0.1, this.size * 0.075);
    this.drawRhombus(this.size * 0.25, this.size * 0.1, this.size * 0.1, this.size * 0.075);
    pop();
    
    // Antennae
    strokeWeight(1);
    line(-2, -this.size * 0.4, -4, -this.size * 0.5);
    line(2, -this.size * 0.4, 4, -this.size * 0.5);
    circle(-4, -this.size * 0.5, 2);
    circle(4, -this.size * 0.5, 2);
    pop();
  }
  
  drawRhombus(centerX, centerY, halfWidth, halfHeight) {
    quad(
      centerX, centerY - halfHeight,
      centerX + halfWidth, centerY,
      centerX, centerY + halfHeight,
      centerX - halfWidth, centerY
    );
  }
  
  isDead() {
    return this.life <= 0;
  }
}

function mouseMoved() {
  if (dist(mouseX, mouseY, pmouseX, pmouseY) > 2) {
    for (let i = 0; i < 3; i++) {
      if (butterflies.length < maxButterflies) {
        butterflies.push(new Butterfly(
          (mouseX - width/2) + random(-384, 672),
          (mouseY - height/2) + random(-512, 1048)
        ));
      }
    }
  }
}
