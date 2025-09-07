let maze = [];
let player;
let treasure;
let mazeSize = 21; // Odd number for proper maze generation
let cellSize = 20;
let gameWon = false;
let mazeUpdateTimer = 0;
let mazeUpdateInterval = 60000; // 10 seconds
let treasureFound = false;
let moveTimer = 0;
let moveSpeed = 100;

// Color palette
const colors = {
  wall: '#1E093C',      // Dark purple
  path: '#662F89',      // Medium purple
  player: '#EA428B',    // Pink
  treasure: '#BF89D1',  // Light purple
  visited: '#8D5DA4',   // Medium-light purple
  background: '#CCB2D3', // Light background
  text: '#FFFFFF'       // White
};

function setup() {
  // Use full display dimensions
  createCanvas(displayWidth, displayHeight);
  
  // Calculate optimal cell size based on display dimensions
  let availableWidth = displayWidth - 250; // Leave space for UI panel
  let availableHeight = displayHeight - 100; // Leave space for margins
  
  // Calculate cell size to fit the maze optimally
  cellSize = min(floor(availableWidth / mazeSize), floor(availableHeight / mazeSize));
  
  // Ensure minimum cell size for playability
  cellSize = max(cellSize, 15);
  
  // Initialize player position
  player = {
    x: 1,
    y: 1,
    trail: []
  };
  
  generateMaze();
  placeTreasure();
}

function draw() {
  background(colors.background);
  
  // Handle continuous movement for faster controls
  handleMovement();
  
  // Update maze periodically
  mazeUpdateTimer += deltaTime;
  if (mazeUpdateTimer > mazeUpdateInterval && !treasureFound) {
    generateMaze();
    placeTreasure();
    // Reset player position
    player.x = 1;
    player.y = 1;
    player.trail = [];
    mazeUpdateTimer = 0;
  }
  
  drawMaze();
  drawPlayer();
  drawTreasure();
  drawUI();
  
  checkWinCondition();
}

function handleMovement() {
  if (treasureFound) return;
  
  moveTimer += deltaTime;
  
  // Check if enough time has passed for next move
  if (moveTimer >= moveSpeed) {
    let moved = false;
    let newX = player.x;
    let newY = player.y;
    
    // Check which keys are currently pressed
    if (keyIsDown(UP_ARROW)) {
      newY--;
      moved = true;
    } else if (keyIsDown(DOWN_ARROW)) {
      newY++;
      moved = true;
    } else if (keyIsDown(LEFT_ARROW)) {
      newX--;
      moved = true;
    } else if (keyIsDown(RIGHT_ARROW)) {
      newX++;
      moved = true;
    }
    
    // Move if valid position and a key was pressed
    if (moved && isValidMove(newX, newY)) {
      player.x = newX;
      player.y = newY;
      moveTimer = 0; // Reset timer
    } else if (moved) {
      // Reset timer even if move was invalid to prevent stuttering
      moveTimer = 0;
    }
  }
}

function isValidMove(x, y) {
  // Check if new position is valid (within bounds and not a wall)
  return x >= 0 && x < mazeSize && 
         y >= 0 && y < mazeSize && 
         maze[y][x] === 1;
}

function generateMaze() {
  // Initialize maze with walls
  maze = [];
  for (let y = 0; y < mazeSize; y++) {
    maze[y] = [];
    for (let x = 0; x < mazeSize; x++) {
      maze[y][x] = 0; // 0 = wall, 1 = path
    }
  }
  
  // Generate maze using recursive backtracking
  let stack = [];
  let current = {x: 1, y: 1};
  maze[current.y][current.x] = 1;
  
  while (true) {
    let neighbors = getUnvisitedNeighbors(current.x, current.y);
    
    if (neighbors.length > 0) {
      let next = neighbors[floor(random(neighbors.length))];
      
      // Remove wall between current and next
      let wallX = current.x + (next.x - current.x) / 2;
      let wallY = current.y + (next.y - current.y) / 2;
      maze[wallY][wallX] = 1;
      maze[next.y][next.x] = 1;
      
      stack.push(current);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      break;
    }
  }
}

function getUnvisitedNeighbors(x, y) {
  let neighbors = [];
  let directions = [
    {x: 0, y: -2}, // Up
    {x: 2, y: 0},  // Right
    {x: 0, y: 2},  // Down
    {x: -2, y: 0}  // Left
  ];
  
  for (let dir of directions) {
    let newX = x + dir.x;
    let newY = y + dir.y;
    
    if (newX > 0 && newX < mazeSize - 1 && 
        newY > 0 && newY < mazeSize - 1 && 
        maze[newY][newX] === 0) {
      neighbors.push({x: newX, y: newY});
    }
  }
  
  return neighbors;
}

function placeTreasure() {
  // Place treasure in a random path cell (not at player start)
  let pathCells = [];
  for (let y = 0; y < mazeSize; y++) {
    for (let x = 0; x < mazeSize; x++) {
      if (maze[y][x] === 1 && !(x === 1 && y === 1)) {
        pathCells.push({x: x, y: y});
      }
    }
  }
  
  if (pathCells.length > 0) {
    let randomCell = pathCells[floor(random(pathCells.length))];
    treasure = {x: randomCell.x, y: randomCell.y, visible: false};
    
    // Make treasure "hidden in plain sight" - sometimes visible
    setTimeout(() => {
      treasure.visible = random() > 0.3; // 70% chance to be visible
    }, random(2000, 5000)); // Appear after 2-5 seconds
  }
}

function drawMaze() {
  // Center the maze on screen
  let mazeWidth = mazeSize * cellSize;
  let mazeHeight = mazeSize * cellSize;
  let offsetX = (displayWidth - mazeWidth - 250) / 2; // Account for UI panel
  let offsetY = (displayHeight - mazeHeight) / 2;
  
  push();
  translate(offsetX, offsetY);
  
  for (let y = 0; y < mazeSize; y++) {
    for (let x = 0; x < mazeSize; x++) {
      let cellX = x * cellSize;
      let cellY = y * cellSize;
      
      // Check if player has been near this cell
      let playerNear = player.trail.some(pos => 
        abs(pos.x - x) <= 1 && abs(pos.y - y) <= 1
      );
      
      if (maze[y][x] === 0) {
        fill(colors.wall);
      } else if (playerNear || (abs(player.x - x) <= 1 && abs(player.y - y) <= 1)) {
        fill(colors.visited);
      } else {
        fill(colors.path);
      }
      
      noStroke();
      rect(cellX, cellY, cellSize, cellSize);
    }
  }
  pop();
}

function drawPlayer() {
  // Center the maze on screen
  let mazeWidth = mazeSize * cellSize;
  let offsetX = (displayWidth - mazeWidth - 250) / 2;
  let offsetY = (displayHeight - mazeSize * cellSize) / 2;
  
  fill(colors.player);
  noStroke();
  ellipse(offsetX + player.x * cellSize + cellSize/2, 
          offsetY + player.y * cellSize + cellSize/2, 
          cellSize * 0.7, cellSize * 0.7);
  
  // Add player to trail
  if (frameCount % 30 === 0) {
    player.trail.push({x: player.x, y: player.y});
    if (player.trail.length > 50) {
      player.trail.shift();
    }
  }
}

function drawTreasure() {
  if (treasure && treasure.visible && !treasureFound) {
    // Center the maze on screen
    let mazeWidth = mazeSize * cellSize;
    let offsetX = (displayWidth - mazeWidth - 250) / 2;
    let offsetY = (displayHeight - mazeSize * cellSize) / 2;
    
    // Draw treasure chest with a subtle glow effect
    let treasureX = offsetX + treasure.x * cellSize + cellSize/2;
    let treasureY = offsetY + treasure.y * cellSize + cellSize/2;
    
    // Glow effect
    for (let i = 5; i > 0; i--) {
      fill(red(colors.treasure), green(colors.treasure), blue(colors.treasure), 30);
      ellipse(treasureX, treasureY, cellSize * i * 0.3, cellSize * i * 0.3);
    }
    
    // Treasure chest
    fill(colors.treasure);
    stroke(colors.text);
    strokeWeight(2);
    rect(treasureX - cellSize/4, treasureY - cellSize/4, 
         cellSize/2, cellSize/2, 3);
    
    // Chest details
    line(treasureX - cellSize/4, treasureY, treasureX + cellSize/4, treasureY);
    ellipse(treasureX, treasureY - cellSize/8, 4, 4);
  }
}

function drawUI() {
  // Position UI panel on the right side of screen
  let panelX = displayWidth - 230;
  let panelY = 20;
  let panelWidth = 200;
  let panelHeight = 200;
  
  // Game info panel
  fill(colors.wall);
  noStroke();
  rect(panelX, panelY, panelWidth, panelHeight, 10);
  
  fill(colors.text);
  textAlign(LEFT);
  textSize(16);
  text("TREASURE HUNT", panelX + 15, panelY + 25);
  
  textSize(12);
  text("Use arrow keys to move", panelX + 15, panelY + 50);
  text("Hold keys for fast move!", panelX + 15, panelY + 70);
  
  // Display screen info
  text("Screen: " + displayWidth + "x" + displayHeight, panelX + 15, panelY + 95);
  text("Cell size: " + cellSize + "px", panelX + 15, panelY + 115);
  
  // Timer until next maze update
  let timeLeft = (mazeUpdateInterval - mazeUpdateTimer) / 1000;
  text("Next maze: " + ceil(timeLeft) + "s", panelX + 15, panelY + 140);
  
  if (treasure && treasure.visible) {
    fill(colors.treasure);
    text("✨ Treasure visible!", panelX + 15, panelY + 160);
  }
  
  if (treasureFound) {
    fill(colors.player);
    textSize(16);
    text("🏆 TREASURE FOUND!", panelX + 15, panelY + 180);
    
    fill(colors.text);
    textSize(12);
    text("Press R to restart", panelX + 15, panelY + 200);
  }
}

function keyPressed() {
  if (treasureFound && (key === 'r' || key === 'R')) {
    // Restart game
    treasureFound = false;
    gameWon = false;
    player.x = 1;
    player.y = 1;
    player.trail = [];
    mazeUpdateTimer = 0;
    generateMaze();
    placeTreasure();
    return;
  }
}

function checkWinCondition() {
  if (treasure && treasure.visible && 
      player.x === treasure.x && player.y === treasure.y && 
      !treasureFound) {
    treasureFound = true;
    gameWon = true;
  }
}

// Handle window resizing
function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
  
  // Recalculate cell size for new dimensions
  let availableWidth = displayWidth - 250;
  let availableHeight = displayHeight - 100;
  cellSize = min(floor(availableWidth / mazeSize), floor(availableHeight / mazeSize));
  cellSize = max(cellSize, 15); // Minimum cell size
}
