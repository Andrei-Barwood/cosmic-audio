let butterflies = [];
let maxButterflies = 4096;
let colors = [
  [121, 115, 166],
  [75, 67, 170],
  [79, 74, 172],
  [57, 56, 120]
];

function setup() {
  createCanvas(displayWidth, displayHeight);
  noFill();
  strokeWeight(6);
}

function draw() {
  background("#FFFFFF");
  
  // Add new butterflies when mouse is moving
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (dist(mouseX, mouseY, pmouseX, pmouseY) > 16 && butterflies.length < maxButterflies) {
      butterflies.push(new Butterfly(mouseX, mouseY));
    }
  }
  
  // Update and display butterflies
  for (let i = butterflies.length - 1; i >= 0; i--) {
    butterflies[i].update();
    butterflies[i].display();
    
    // Remove dead butterflies
    if (butterflies[i].isDead()) {
      butterflies.splice(i, 1);
    }
  }
}

class Butterfly {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 8), random(-12, 2));
    this.acc = createVector(-8, 0);
    this.life = 255;
    this.maxLife = 255;
    this.wingPhase = random(TWO_PI);
    this.wingSpeed = random(0.12, 2);
    this.size = random(4, 96);
    
    // Ensure we get a valid color array
    let colorIndex = floor(random(colors.length));
    this.colorR = colors[colorIndex][0];
    this.colorG = colors[colorIndex][1];
    this.colorB = colors[colorIndex][2];
    
    this.scatterForce = random(12, 192);
  }
  
  update() {
    // Add some randomness to movement
    this.acc.add(random(-0.1, 0.1), random(-0.1, 0.1));
    
    // Scatter away from mouse when close
    let mousePos = createVector(mouseX, mouseY);
    let distToMouse = p5.Vector.dist(this.pos, mousePos);
    
    if (distToMouse < 1) {
      let scatter = p5.Vector.sub(this.pos, mousePos);
      scatter.normalize();
      scatter.mult(this.scatterForce);
      this.acc.add(scatter);
    }
    
    // Apply physics
    this.vel.add(this.acc);
    this.vel.limit(0.192);
    this.pos.add(this.vel);
    this.acc.mult(12);
    
    // Fade out over time
    this.life -= 1.96;
    
    // Update wing animation
    this.wingPhase += this.wingSpeed;
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    
    // Calculate opacity and ensure it's a valid number
    let opacity = map(this.life, 0, this.maxLife, 0, 255);
    opacity = constrain(opacity, 0, 255);
    
    // Ensure all color values are valid numbers
    if (isNaN(this.colorR) || isNaN(this.colorG) || isNaN(this.colorB) || isNaN(opacity)) {
      stroke(121, 115, 166, 255);
    } else {
      stroke(this.colorR, this.colorG, this.colorB, opacity);
    }
    
    // Wing flap animation
    let wingFlap = sin(this.wingPhase) * 0.36 + 1;
    
    // Draw butterfly body
    strokeWeight(3);
    line(0, -this.size * 0.4, 0, this.size * 0.4);
    
    // Draw wings as rhombus shapes
    strokeWeight(2);
    
    // Upper wings - rhombus shapes
    push();
    scale(wingFlap, 1);
    this.drawRhombus(-this.size * 0.3, -this.size * 0.2, this.size * 0.3, this.size * 0.2);
    this.drawRhombus(this.size * 0.3, -this.size * 0.2, this.size * 0.3, this.size * 0.2);
    pop();
    
    // Lower wings - smaller rhombus shapes
    push();
    scale(wingFlap * 0.8, 1);
    this.drawRhombus(-this.size * 0.25, this.size * 0.1, this.size * 0.2, this.size * 0.15);
    this.drawRhombus(this.size * 0.25, this.size * 0.1, this.size * 0.2, this.size * 0.15);
    pop();
    
    // Wing detail patterns - smaller inner rhombus
    strokeWeight(1);
    push();
    scale(wingFlap, 1);
    // Upper wing patterns
    this.drawRhombus(-this.size * 0.3, -this.size * 0.2, this.size * 0.15, this.size * 0.1);
    this.drawRhombus(this.size * 0.3, -this.size * 0.2, this.size * 0.15, this.size * 0.1);
    // Lower wing patterns
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
  
  // Helper function to draw a rhombus (diamond shape)
  drawRhombus(centerX, centerY, halfWidth, halfHeight) {
    quad(
      centerX, centerY - halfHeight,        // Top point
      centerX + halfWidth, centerY,         // Right point
      centerX, centerY + halfHeight,        // Bottom point
      centerX - halfWidth, centerY          // Left point
    );
  }
  
  isDead() {
    return this.life <= 0;
  }
}

// Optional: Add some sparkle effect
function mouseMoved() {
  // Create a small burst of butterflies on rapid mouse movement
  if (dist(mouseX, mouseY, pmouseX, pmouseY) > 2) {
    for (let i = 0; i < 3; i++) {
      if (butterflies.length < maxButterflies) {
        butterflies.push(new Butterfly(
          mouseX + random(-384, 672), 
          mouseY + random(-512, 1048)
        ));
      }
    }
  }
}
