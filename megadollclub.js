let envelopes = [];
let score = 0;
let flame;
let gameActive = true;
let gameOver = false;
let gameWon = false;
let particles = [];
let keys = [];
let flameGif;
let envelopesBurned = 0;
let totalEnvelopes = 0;

function preload() {
  // Load the flame GIF
  flameGif = loadImage('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd24xbGpudXU2dDN4czk0bjVvcWg0MmU3MjA1ZnNkYjNibmg5aDNxeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AHeTfHgVFPHgs/giphy.gif');
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  // Initialize flame at the bottom center (only moves horizontally)
  flame = {
    x: width/2,
    y: height - 50,
    size: 120, // Bigger flame
    speed: 10  // Increased speed from 6 to 10
  };
  
  // Start spawning envelopes
  spawnEnvelopes();
}

function draw() {
  background(20, 30, 50);
  
  // Draw sky background with blue gradient
  fill(79, 163, 208, 100); // #4FA3D0
  rect(0, 0, width, height);
  
  if (gameActive) {
    // Player controls: Move flame horizontally with arrow keys
    if (keys[LEFT_ARROW]) {
      flame.x -= flame.speed;
    }
    if (keys[RIGHT_ARROW]) {
      flame.x += flame.speed;
    }
    
    // Constrain flame to horizontal movement at the bottom
    flame.x = constrain(flame.x, 30, width - 30);
    // flame.y stays fixed at height - 50
    
    // Update and display envelopes
    for (let i = envelopes.length - 1; i >= 0; i--) {
      let envelope = envelopes[i];
      
      // Update envelope position - move toward center horizontally
      envelope.y += envelope.speed;
      
      // Add slight horizontal movement toward center for more dynamic motion
      if (envelope.x < width/2) {
        envelope.x += 0.3;
      } else {
        envelope.x -= 0.3;
      }
      
      // Check if envelope is burned by flame
      let d = dist(envelope.x, envelope.y, flame.x, flame.y);
      if (d < flame.size/2 + envelope.size/2) {
        envelopes.splice(i, 1);
        score += 10;
        envelopesBurned++;
        // Create burning particles
        createParticles(envelope.x, envelope.y);
        continue;
      }
      
      // Check if envelope reached the bottom
      if (envelope.y > height + 50) {
        gameOver = true;
        gameActive = false;
      }
    }
    
    // Update and display particles
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.y -= p.speed;
      p.x += random(-1, 1);
      p.life -= 2;
      
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      
      fill(p.r, p.g, p.b, p.life);
      noStroke();
      ellipse(p.x, p.y, p.size);
    }
    
    // Draw flame GIF (fixed at bottom, moving horizontally)
    if (flameGif) {
      imageMode(CENTER);
      image(flameGif, flame.x, flame.y, flame.size, flame.size);
    }
    
    // Spawn new envelopes less frequently
    if (frameCount % 90 === 0) {
      spawnEnvelopes();
    }
    
    // Check for win condition
    if (envelopesBurned >= 30) {
      gameWon = true;
      gameActive = false;
    }
  }
  
  // Draw envelopes
  for (let envelope of envelopes) {
    push();
    translate(envelope.x, envelope.y);
    rotate(frameCount * 0.02);
    
    // Envelope body
    fill(envelope.color);
    stroke(119, 199, 217); // #77C7D9
    strokeWeight(2);
    rectMode(CENTER);
    rect(0, 0, envelope.size, envelope.size/1.5);
    
    // Envelope flap
    fill(envelope.flapColor);
    stroke(119, 199, 217); // #77C7D9
    strokeWeight(2);
    triangle(
      -envelope.size/2, -envelope.size/3,
      envelope.size/2, -envelope.size/3,
      0, -envelope.size/1.5
    );
    
    pop();
  }
  
  // Draw score indicator
  fill(119, 199, 217); // #77C7D9
  noStroke();
  ellipse(30, 30, 20, 20);
  fill(255);
  ellipse(30, 30, 10, 10);
  
  // Draw score bars
  fill(133, 228, 255); // #85E4FF
  noStroke();
  let barCount = min(score / 10, 20);
  for (let i = 0; i < barCount; i++) {
    rect(60 + i * 5, 20, 3, 20);
  }
  
  // Draw reset instructions (top right)
  fill(119, 199, 217); // #77C7D9
  textSize(16);
  textAlign(RIGHT, TOP);
  text("Press 'R' to Reset", width - 20, 20);
  
  // Game over message (loss)
  if (gameOver) {
    fill(255, 100, 100);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2 - 50);
    
    fill(119, 199, 217); // #77C7D9
    textSize(24);
    text("The envelopes reached the bottom!", width/2, height/2);
    text("Envelopes burned: " + envelopesBurned, width/2, height/2 + 40);
    text("Press 'R' to Play Again", width/2, height/2 + 80);
  }
  
  // Game won message (win)
  if (gameWon) {
    fill(100, 255, 100);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("VICTORY!", width/2, height/2 - 50);
    
    fill(119, 199, 217); // #77C7D9
    textSize(24);
    text("You burned 30 envelopes!", width/2, height/2);
    text("Final score: " + score, width/2, height/2 + 40);
    text("Press 'R' to Play Again", width/2, height/2 + 80);
  }
}

function spawnEnvelopes() {
  // Create envelopes that start from the top
  totalEnvelopes += 1;
  envelopes.push({
    x: random(100, width - 100), // Start closer to center horizontally
    y: -50,
    size: random(30, 50),
    speed: random(1, 3),
    color: color(
      random(69, 133),   // R: #458FB2 to #4FA3D0 range
      random(143, 163),  // G: #458FB2 to #4FA3D0 range
      random(178, 208)   // B: #458FB2 to #4FA3D0 range
    ),
    flapColor: color(
      random(119, 133),  // R: #77C7D9 to #458FB2 range
      random(199, 228),  // G: #77C7D9 to #85E4FF range
      random(217, 255)   // B: #77C7D9 to #85E4FF range
    )
  });
}

function createParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: x + random(-10, 10),
      y: y + random(-10, 10),
      size: random(2, 6),
      speed: random(1, 5),
      life: random(50, 100),
      r: random(200, 255),
      g: random(100, 200),
      b: random(0, 100)
    });
  }
}

function keyPressed() {
  keys[keyCode] = true;
  
  // Restart game
  if (key === 'r' || key === 'R') {
    resetGame();
  }
}

function keyReleased() {
  keys[keyCode] = false;
}

function resetGame() {
  envelopes = [];
  particles = [];
  score = 0;
  envelopesBurned = 0;
  totalEnvelopes = 0;
  flame.x = width/2;
  flame.y = height - 50; // Fixed at bottom
  gameActive = true;
  gameOver = false;
  gameWon = false;
  spawnEnvelopes();
}