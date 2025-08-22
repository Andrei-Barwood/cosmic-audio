let butterflies = [];
let maxButterflies = 192;
let colors = [
  [121, 115, 166],
  [75, 67, 170],
  [79, 74, 172],
  [57, 56, 120]
];

function setup() {
  createCanvas(displayWidth, displayHeight);
  noFill();
  strokeWeight(36);
}

function draw() {
  background(255, 255, 255);
  
  // Add new butterflies when mouse is moving
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (dist(mouseX, mouseY, pmouseX, pmouseY) > 2 && butterflies.length < maxButterflies) {
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
    this.vel = createVector(random(-24, 72), random(-100, 2));
    this.acc = createVector(0, 0);
    this.life = 255;
    this.maxLife = 255;
    this.wingPhase = random(TWO_PI);
    this.wingSpeed = random(0.72, 6);
    this.size = random(2, 6);
    
    // Ensure we get a valid color array
    let colorIndex = floor(random(colors.length));
    this.colorR = colors[colorIndex][0];
    this.colorG = colors[colorIndex][1];
    this.colorB = colors[colorIndex][2];
    
    this.scatterForce = random(0.2, 12);
  }
  
  update() {
    // Add some randomness to movement
    this.acc.add(random(-0.1, 0.1), random(-0.1, 0.1));
    
    // Scatter away from mouse when close
    let mousePos = createVector(mouseX, mouseY);
    let distToMouse = p5.Vector.dist(this.pos, mousePos);
    
    if (distToMouse < 3) {
      let scatter = p5.Vector.sub(this.pos, mousePos);
      scatter.normalize();
      scatter.mult(this.scatterForce);
      this.acc.add(scatter);
    }
    
    // Apply physics
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // Fade out over time
    this.life -= 12.72;
    
    // Update wing animation
    this.wingPhase += this.wingSpeed;
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    
    // Calculate alpha and ensure it's a valid number
    let opacity = map(this.life, 0, this.maxLife, 0, 255); // Changed from 'alpha' to 'opacity'
    opacity = constrain(opacity, 0, 255); // Ensure opacity is within valid range
    
    // Ensure all color values are valid numbers
    if (isNaN(this.colorR) || isNaN(this.colorG) || isNaN(this.colorB) || isNaN(opacity)) {
      // Fallback color if something goes wrong
      stroke(121, 115, 166, 255);
    } else {
      stroke(this.colorR, this.colorG, this.colorB, opacity);
    }
    
    // Wing flap animation
    let wingFlap = sin(this.wingPhase) * 0.3 + 1;
    
    // Draw butterfly body
    strokeWeight(3);
    line(0, -this.size * 0.4, 0, this.size * 0.4);
    
    // Draw wings
    strokeWeight(2);
    
    // Upper wings
    push();
    scale(wingFlap, 1);
    ellipse(-this.size * 0.3, -this.size * 0.2, this.size * 0.6, this.size * 0.4);
    ellipse(this.size * 0.3, -this.size * 0.2, this.size * 0.6, this.size * 0.4);
    pop();
    
    // Lower wings
    push();
    scale(wingFlap * 0.8, 1);
    ellipse(-this.size * 0.25, this.size * 0.1, this.size * 0.4, this.size * 0.3);
    ellipse(this.size * 0.25, this.size * 0.1, this.size * 0.4, this.size * 0.3);
    pop();
    
    // Wing details
    strokeWeight(1);
    push();
    scale(wingFlap, 1);
    // Upper wing patterns
    ellipse(-this.size * 0.3, -this.size * 0.2, this.size * 0.3, this.size * 0.2);
    ellipse(this.size * 0.3, -this.size * 0.2, this.size * 0.3, this.size * 0.2);
    // Lower wing patterns
    ellipse(-this.size * 0.25, this.size * 0.1, this.size * 0.2, this.size * 0.15);
    ellipse(this.size * 0.25, this.size * 0.1, this.size * 0.2, this.size * 0.15);
    pop();
    
    // Antennae
    strokeWeight(1);
    line(-2, -this.size * 0.4, -4, -this.size * 0.5);
    line(2, -this.size * 0.4, 4, -this.size * 0.5);
    circle(-4, -this.size * 0.5, 2);
    circle(4, -this.size * 0.5, 2);
    
    pop();
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
          mouseX + random(-192, 192), 
          mouseY + random(-192, 192)
        ));
      }
    }
  }
}
