let colors = ['#FFFFFF', '#46389B', '#FF5529', '#9C1D00'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#5E50A0");
}

function draw() {
  noStroke();
  
  // Selección aleatoria de un color de la lista
  let colorChoice = random(colors);
  fill(colorChoice);
  
  // Dibuja un círculo con color aleatorio
  ellipse(random(width), random(height), random(10, 50));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
