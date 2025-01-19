let angleX = 12;
let angleY = 6;
let prevMouseX = 0;
let prevMouseY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Canvas 3D
}

function draw() {
  background("#EECFE1"); // Fondo oscuro
  
  // Calcula el movimiento del mouse
  let deltaX = mouseX - prevMouseX;
  let deltaY = mouseY - prevMouseY;

  // Actualiza los ángulos de rotación según el movimiento
  angleX += deltaY * 0.0024;
  angleY += deltaX * 0.0024;

  // Aplica la rotación al cubo
  rotateX(angleX);
  rotateY(angleY);
  
  // Dibuja el cubo
  fill("#F5E1C7");
  stroke("#FFEFBC");
  box(200);

  // Actualiza las posiciones previas del mouse
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}
