// Paleta de colores especificada
const colors = {
  darkPurple: '#580D36',
  magenta: '#BC1D75', 
  pink: '#D9539D',
  lightPink: '#FCB6DF'
};

let cols, rows;
let w = 20; // Tamaño de cada celda
let grid = [];
let current;
let stack = [];
let animating = true;
let directionBias = null; // Dirección preferida
let obstacles = []; // Array de obstáculos
let obstacleCount = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  cols = floor(width / w);
  rows = floor(height / w);
  
  initializeMaze();
  frameRate(6); // Velocidad más lenta para mejor control
}

function draw() {
  background(colors.darkPurple);
  
  // Mostrar obstáculos
  drawObstacles();
  
  // Mostrar todas las celdas
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  
  if (animating && current) {
    current.visited = true;
    current.highlight();
    
    // Buscar siguiente celda con bias direccional
    let next = current.checkNeighbors(directionBias);
    
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
      
      // Generar obstáculo aleatorio ocasionalmente
      if (random() < 0.08 && obstacleCount < 15) {
        createRandomObstacle();
      }
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      // Laberinto completado
      setTimeout(() => {
        resetMaze();
      }, 3000);
    }
  }
  
  // Mostrar instrucciones
  showInstructions();
}

function initializeMaze() {
  grid = [];
  stack = [];
  obstacles = [];
  obstacleCount = 0;
  
  // Crear grid de celdas
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  
  current = grid[0];
  
  // Generar algunos obstáculos iniciales
  generateInitialObstacles();
}

function generateInitialObstacles() {
  let initialObstacles = random(5, 12);
  for (let i = 0; i < initialObstacles; i++) {
    createRandomObstacle();
  }
}

function createRandomObstacle() {
  let x = floor(random(1, cols - 1));
  let y = floor(random(1, rows - 1));
  let size = floor(random(1, 4)); // Tamaño del obstáculo
  
  obstacles.push({
    x: x,
    y: y,
    size: size,
    type: floor(random(3)) // Diferentes tipos de obstáculos
  });
  
  obstacleCount++;
}

function drawObstacles() {
  for (let obs of obstacles) {
    let x = obs.x * w;
    let y = obs.y * w;
    
    noStroke();
    
    switch(obs.type) {
      case 0: // Obstáculo sólido
        fill(colors.magenta);
        rect(x, y, w * obs.size, w * obs.size);
        break;
      case 1: // Obstáculo circular
        fill(colors.pink);
        ellipse(x + w/2, y + w/2, w * obs.size);
        break;
      case 2: // Obstáculo en forma de cruz
        fill(colors.lightPink);
        rect(x, y + w/4, w * obs.size, w/2);
        rect(x + w/4, y, w/2, w * obs.size);
        break;
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true]; // top, right, bottom, left
  this.visited = false;
  
  // Verificar si hay obstáculo en esta celda
  this.hasObstacle = function() {
    for (let obs of obstacles) {
      if (this.i >= obs.x && this.i < obs.x + obs.size &&
          this.j >= obs.y && this.j < obs.y + obs.size) {
        return true;
      }
    }
    return false;
  };
  
  // Verificar vecinos con bias direccional
  this.checkNeighbors = function(bias = null) {
    let neighbors = [];
    
    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];
    
    // Agregar vecinos válidos (no visitados y sin obstáculos)
    if (top && !top.visited && !top.hasObstacle()) {
      neighbors.push({cell: top, direction: 'UP'});
    }
    if (right && !right.visited && !right.hasObstacle()) {
      neighbors.push({cell: right, direction: 'RIGHT'});
    }
    if (bottom && !bottom.visited && !bottom.hasObstacle()) {
      neighbors.push({cell: bottom, direction: 'DOWN'});
    }
    if (left && !left.visited && !left.hasObstacle()) {
      neighbors.push({cell: left, direction: 'LEFT'});
    }
    
    if (neighbors.length > 0) {
      // Si hay bias direccional, preferir esa dirección
      if (bias) {
        let biasedNeighbors = neighbors.filter(n => n.direction === bias);
        if (biasedNeighbors.length > 0 && random() < 0.7) {
          return biasedNeighbors[0].cell;
        }
      }
      
      // Selección aleatoria con peso hacia la dirección actual
      let r = floor(random(0, neighbors.length));
      return neighbors[r].cell;
    } else {
      return undefined;
    }
  };
  
  this.highlight = function() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    
    // Efecto pulsante para la celda actual
    let pulse = sin(frameCount * 0.2) * 20 + 235;
    fill(red(color(colors.lightPink)), green(color(colors.lightPink)), 
         blue(color(colors.lightPink)), pulse);
    rect(x, y, w, w);
  };
  
  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;
    
    // No dibujar si hay obstáculo
    if (this.hasObstacle()) return;
    
    stroke(colors.magenta);
    strokeWeight(3); // Líneas más gruesas para mejor visualización
    
    if (this.walls[0]) {
      line(x, y, x + w, y); // Top
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w); // Right
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w); // Bottom
    }
    if (this.walls[3]) {
      line(x, y + w, x, y); // Left
    }
    
    if (this.visited) {
      noStroke();
      fill(colors.pink + '30'); // Mayor transparencia
      rect(x, y, w, w);
    }
  };
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function resetMaze() {
  initializeMaze();
  animating = true;
  directionBias = null;
}

function showInstructions() {
  fill(colors.lightPink);
  textSize(14);
  textAlign(LEFT);
  text("Controles:", 10, 20);
  text("↑↓←→ : Dirigir creación", 10, 40);
  text("ESPACIO: Pausar/Reanudar", 10, 60);
  text("R: Reiniciar", 10, 80);
  text("O: Añadir obstáculo", 10, 100);
  
  // Mostrar dirección actual
  if (directionBias) {
    fill(colors.magenta);
    text("Dirección: " + directionBias, 10, 130);
  }
}

// Control con teclas de flecha y funciones adicionales
function keyPressed() {
  // Control direccional
  if (keyCode === UP_ARROW) {
    directionBias = 'UP';
  } else if (keyCode === DOWN_ARROW) {
    directionBias = 'DOWN';
  } else if (keyCode === LEFT_ARROW) {
    directionBias = 'LEFT';
  } else if (keyCode === RIGHT_ARROW) {
    directionBias = 'RIGHT';
  }
  
  // Controles adicionales
  if (key === ' ') {
    animating = !animating;
  }
  if (key === 'r' || key === 'R') {
    resetMaze();
  }
  if (key === 'o' || key === 'O') {
    createRandomObstacle();
  }
  if (key === 'c' || key === 'C') {
    directionBias = null; // Limpiar bias direccional
  }
}

// Función para añadir obstáculo con clic del mouse
function mousePressed() {
  let gridX = floor(mouseX / w);
  let gridY = floor(mouseY / w);
  
  if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
    obstacles.push({
      x: gridX,
      y: gridY,
      size: 1,
      type: floor(random(3))
    });
    obstacleCount++;
  }
}
