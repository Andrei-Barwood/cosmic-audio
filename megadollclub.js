let particles = [];
let numParticles = 50;
let transitionProgress = 0;
let transitionDirection = 1;
let mouseInfluence = 0;

// Initial color palette for lines
let initialColors = ['#B3ECD8', '#004449', '#177874', '#369D69', '#CDE67E', '#00393C', '#000000', '#093434', '#0F5351', '#141414', '#00F600', '#82FF65'];

// Merged color palette for dots
let mergedColors = ['#000000', '#FFFF00', '#D0D2D6', '#242623'];

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  // Initialize particles
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      endX: random(width),
      endY: random(height),
      baseLength: random(20, 80),
      baseDotSize: random(6, 12),
      angle: random(TWO_PI),
      initialColor: random(initialColors),
      mergedColor: random(mergedColors),
      speed: random(0.5, 2),
      sizeMultiplier: 1,
      distanceToMouse: 0
    });
  }
}

function draw() {
  background(20, 20, 30);
  
  // Calculate mouse influence based on movement
  let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  mouseInfluence = map(mouseSpeed, 0, 50, 0, 2);
  mouseInfluence = constrain(mouseInfluence, 0, 2);
  
  // Update transition progress
  transitionProgress += 0.01 * transitionDirection;
  
  // Reverse direction when reaching limits
  if (transitionProgress >= 1) {
    transitionProgress = 1;
    transitionDirection = -1;
    // Randomize colors when transitioning back
    for (let particle of particles) {
      particle.initialColor = random(initialColors);
      particle.mergedColor = random(mergedColors);
    }
  } else if (transitionProgress <= 0) {
    transitionProgress = 0;
    transitionDirection = 1;
    // Randomize colors when transitioning forward
    for (let particle of particles) {
      particle.initialColor = random(initialColors);
      particle.mergedColor = random(mergedColors);
    }
  }
  
  for (let particle of particles) {
    // Calculate distance to mouse
    particle.distanceToMouse = dist(mouseX, mouseY, particle.x, particle.y);
    
    // Create size variation based on mouse proximity and movement
    let proximityFactor = map(particle.distanceToMouse, 0, 200, 2, 0.5);
    proximityFactor = constrain(proximityFactor, 0.3, 3);
    
    // Add random size variation based on mouse movement
    let randomFactor = 1 + (noise(frameCount * 0.02 + particle.x * 0.01, particle.y * 0.01) - 0.5) * mouseInfluence;
    
    // Combine factors for final size multiplier
    particle.sizeMultiplier = proximityFactor * randomFactor;
    
    // Smooth easing function for transition
    let easeProgress = easeInOutCubic(transitionProgress);
    
    // Interpolate between line and dot states
    let morphFactor = easeProgress;
    
    // Color interpolation with mouse influence
    let currentColor = lerpColor(color(particle.initialColor), color(particle.mergedColor), easeProgress);
    
    // Add brightness variation based on mouse proximity
    let brightnessBoost = map(particle.distanceToMouse, 0, 150, 50, 0);
    currentColor = lerpColor(currentColor, color(255), brightnessBoost / 255);
    
    // Position animation
    particle.x += sin(frameCount * 0.02 + particle.x * 0.01) * particle.speed;
    particle.y += cos(frameCount * 0.015 + particle.y * 0.01) * particle.speed;
    
    // Add slight attraction to mouse when close
    if (particle.distanceToMouse < 100) {
      let attraction = map(particle.distanceToMouse, 0, 100, 0.5, 0);
      particle.x += (mouseX - particle.x) * attraction * 0.01;
      particle.y += (mouseY - particle.y) * attraction * 0.01;
    }
    
    // Wrap around screen
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
    
    // Draw morphing shape with size variations
    push();
    translate(particle.x, particle.y);
    rotate(particle.angle + frameCount * 0.01);
    
    stroke(currentColor);
    fill(currentColor);
    
    if (morphFactor < 0.5) {
      // Line state with variable size
      let strokeWeight_val = map(morphFactor, 0, 0.5, 2, 1) * particle.sizeMultiplier;
      strokeWeight(strokeWeight_val);
      let lineLength = (map(morphFactor, 0, 0.5, particle.baseLength, particle.baseLength * 0.3)) * particle.sizeMultiplier;
      line(-lineLength/2, 0, lineLength/2, 0);
      
      // Add line caps for style
      strokeCap(ROUND);
    } else {
      // Dot state with variable size
      noStroke();
      let dotSize = (map(morphFactor, 0.5, 1, particle.baseLength * 0.3, particle.baseDotSize)) * particle.sizeMultiplier;
      
      // Main dot
      fill(currentColor);
      ellipse(0, 0, dotSize, dotSize);
      
      // Add glow effect for dots with size variation
      for (let r = dotSize * 1.5; r > 0; r -= 2) {
        let alpha = map(r, 0, dotSize * 1.5, 255, 0) * 0.3;
        fill(red(currentColor), green(currentColor), blue(currentColor), alpha);
        ellipse(0, 0, r, r);
      }
    }
    
    pop();
  }
}

// Smooth easing function
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}

// Click to randomize colors
function mousePressed() {
  for (let particle of particles) {
    particle.initialColor = random(initialColors);
    particle.mergedColor = random(mergedColors);
    // Also randomize base sizes
    particle.baseLength = random(20, 80);
    particle.baseDotSize = random(6, 12);
  }
}

// Additional interaction: Key press to reset particles
function keyPressed() {
  if (key === 'r' || key === 'R') {
    // Reset all particles to new random positions
    for (let particle of particles) {
      particle.x = random(width);
      particle.y = random(height);
    }
  }
}
