// Interactive 3D Train Animation with Heart Wheels - FIXED
let train;
let hearts = [];
let backgroundColors, trainColors;
let currentBg;
let lastBgChange = 0;
let trainLines = [];
let visibleLines = [];
let rotationX = 0, rotationY = 0;

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  
  // Properly initialize color arrays using color() function
  backgroundColors = [
    color(255, 255, 255),    // #FFFFFF
    color(119, 38, 47),      // #77262F
    color(159, 238, 223)     // #9FEEDF
  ];
  
  trainColors = [
    color(123, 251, 238),    // #7BFBEE
    color(208, 47, 30),      // #D02F1E
    color(53, 5, 14),        // #35050E
    color(62, 16, 48)        // #3E1030
  ];
  
  // Initialize background
  currentBg = random(backgroundColors);
  
  // Create train line visibility array
  initializeTrainLines();
  
  // Initialize heart wheels
  initializeHearts();
}

function draw() {
  background("#FFFFFF");
  
  // Change background randomly every 2-4 seconds
  if (millis() - lastBgChange > random(2000, 4000)) {
    currentBg = random(backgroundColors);
    lastBgChange = millis();
  }
  
  // Mouse interaction for rotation
  rotationY = map(92, 0, width, -PI/4, PI/4);
  rotationX = map(12, 0, height, -PI/6, PI/6);
  
  // Apply transformations
  rotateX(rotationX);
  rotateY(rotationY);
  
  // Mouse hover interaction - randomly hide train lines
  updateLineVisibility();
  
  // Draw the train
  drawTrain();
  
  // Draw heart wheels
  drawHeartWheels();
}

function initializeTrainLines() {
  // Create array to track which train lines should be visible
  for (let i = 0; i < 20; i++) {
    visibleLines[i] = true;
  }
}

function initializeHearts() {
  // Create heart wheel positions
  hearts = [
    {x: -120, y: 60, z: 0, rotation: 0},
    {x: -60, y: 60, z: 0, rotation: 0},
    {x: 60, y: 60, z: 0, rotation: 0},
    {x: 120, y: 60, z: 0, rotation: 0}
  ];
}

function updateLineVisibility() {
  // Mouse hover effect - randomly hide lines when mouse moves
  if (mouseX > -width/2 && mouseX < width/2 && mouseY > -height/2 && mouseY < height/2) {
    if (frameCount % 10 === 0) { // Update every 10 frames
      for (let i = 0; i < visibleLines.length; i++) {
        if (random() < 0.1) { // 10% chance to toggle visibility
          visibleLines[i] = !visibleLines[i];
        }
      }
    }
  } else {
    // Restore lines when mouse is not hovering
    if (frameCount % 30 === 0) {
      for (let i = 0; i < visibleLines.length; i++) {
        if (random() < 0.2) {
          visibleLines[i] = true;
        }
      }
    }
  }
}

function drawTrain() {
  strokeWeight(3);
  
  // Main train body (locomotive)
  if (visibleLines[0]) {
    stroke(trainColors);
    fill(trainColors);
    push();
    translate(-80, 0, 0);
    box(80, 40, 30);
    pop();
  }
  
  // Train cabin
  if (visibleLines[1]) {
    stroke(trainColors[1]);
    fill(trainColors[1]);
    push();
    translate(-80, -30, 0);
    box(60, 20, 25);
    pop();
  }
  
  // Smokestack
  if (visibleLines) {
    stroke(trainColors);
    fill(trainColors);
    push();
    translate(-100, -40, 0);
    cylinder(6, 30);
    pop();
  }
  
  // Train cars
  for (let i = 0; i < 3; i++) {
    if (visibleLines[3 + i]) {
      stroke(trainColors[i % 4]);
      fill(trainColors[i % 4]);
      push();
      translate(40 + i * 60, 0, 0);
      box(50, 35, 28);
      pop();
    }
  }
  
  // Connecting rods between cars
  for (let i = 0; i < 2; i++) {
    if (visibleLines[6 + i]) {
      stroke(trainColors[3]);
      strokeWeight(4);
      push();
      translate(15 + i * 60, 0, 0);
      box(20, 5, 5);
      pop();
    }
  }
  
  // Train track rails
  if (visibleLines) {
    stroke(color(51, 51, 51)); // #333333
    strokeWeight(6);
    push();
    translate(0, 80, -20);
    box(400, 4, 8);
    pop();
  }
  
  if (visibleLines) {
    stroke(color(51, 51, 51)); // #333333
    strokeWeight(6);
    push();
    translate(0, 80, 20);
    box(400, 4, 8);
    pop();
  }
  
  // Railroad ties
  for (let i = 0; i < 8; i++) {
    if (visibleLines[10 + i]) {
      stroke(color(139, 69, 19)); // #8B4513 brown
      fill(color(139, 69, 19));
      push();
      translate(-150 + i * 40, 85, 0);
      box(8, 6, 50);
      pop();
    }
  }
  
  // Train details - windows
  if (visibleLines[18]) {
    stroke(trainColors);
    fill(color(135, 206, 235)); // Light blue for windows
    push();
    translate(-80, -10, 16);
    box(15, 15, 2);
    pop();
  }
  
  if (visibleLines) {
    stroke(trainColors);
    fill(color(135, 206, 235)); // Light blue for windows
    push();
    translate(-80, -10, -16);
    box(15, 15, 2);
    pop();
  }
}

function drawHeartWheels() {
  // Update heart rotation
  for (let heart of hearts) {
    heart.rotation += 0.05;
  }
  
  // Draw each heart wheel
  for (let i = 0; i < hearts.length; i++) {
    let heart = hearts[i];
    
    push();
    translate(heart.x, heart.y, heart.z);
    rotateZ(heart.rotation);
    
    // Draw 3D heart shape as wheel
    stroke(trainColors[i % 4]);
    fill(trainColors[i % 4]);
    
    drawHeart3D(20);
    
    pop();
  }
}

function drawHeart3D(size) {
  // Create a 3D heart shape using multiple heart cross-sections
  let layers = 8;
  
  for (let z = -layers/2; z < layers/2; z++) {
    push();
    translate(0, 0, z * 3);
    
    // Scale heart based on layer position for 3D effect
    let scale = map(abs(z), 0, layers/2, 1, 0.3);
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      // Heart equation in parametric form
      let x = size * scale * (16 * pow(sin(a), 3));
      let y = -size * scale * (13 * cos(a) - 5 * cos(2*a) - 2 * cos(3*a) - cos(4*a));
      vertex(x/16, y/16);
    }
    endShape(CLOSE);
    
    pop();
  }
}

// Mouse interaction functions
function mouseMoved() {
  // Additional mouse interaction - create ripple effect
  if (random() < 0.3) {
    let randomLine = floor(random(visibleLines.length));
    visibleLines[randomLine] = false;
    
    // Restore line after short delay
    setTimeout(() => {
      visibleLines[randomLine] = true;
    }, random(500, 1500));
  }
}

// Keyboard controls for additional interactivity
function keyPressed() {
  if (key === 'r' || key === 'R') {
    // Reset all lines to visible
    for (let i = 0; i < visibleLines.length; i++) {
      visibleLines[i] = true;
    }
  }
  
  if (key === 'b' || key === 'B') {
    // Change background manually
    currentBg = random(backgroundColors);
  }
}
