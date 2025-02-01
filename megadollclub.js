// Duración de cada ruta 
// en número de fotogramas
let routeDuration = 504; 
// Contador para el avance de la ruta actual
let step = 0;

// Puntos que definen la curva:
// A: punto inicial y final (ancla de la curva)
// B y C: puntos de control aleatorios
let A, B, C;

// Arreglo donde se guardarán los puntos de la trayectoria
let trajectory = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Fondo blanco
  background("#E7D462");
  // Inicializamos una ruta aleatoria
  initRoute();
}

function initRoute() {
  // Se elige A, B y C de forma aleatoria dentro del canvas
  A = createVector(random(width), random(height));
  B = createVector(random(width), random(height));
  C = createVector(random(width), random(height));
  // Reiniciamos la trayectoria y el contador
  trajectory = [];
  step = 0;
}

function draw() {
  background("#E7D462");
  
  // Parámetro t entre 0 y 1 para recorrer la curva
  let t = step / routeDuration;
  
  // Usamos la fórmula de la curva cúbica de Bézier con P0 = A, P1 = B, P2 = C y P3 = A:
  // P(t) = (1-t)^3 * A + 3*(1-t)^2*t * B + 3*(1-t)*t^2 * C + t^3 * A
  //      = A * [(1-t)^3 + t^3] + 3*B*(1-t)^2*t + 3*C*(1-t)*t^2
  let coeffA = pow(1 - t, 3) + pow(t, 3);
  let coeffB = 3 * pow(1 - t, 2) * t;
  let coeffC = 3 * (1 - t) * pow(t, 2);
  
  // Calculamos la posición actual
  let pos = p5.Vector.mult(A, coeffA);
  pos.add(p5.Vector.mult(B, coeffB));
  pos.add(p5.Vector.mult(C, coeffC));
  
  // Guardamos la posición actual (se usa copy() para evitar referencias)
  trajectory.push(pos.copy());
  
  // Dibujar la trayectoria recorrida
  stroke("#EF9C54");
  strokeWeight(2016);
  noFill();
  beginShape();
  for (let i = 0; i < trajectory.length; i++) {
    vertex(trajectory[i].x, trajectory[i].y);
  }
  endShape();
  
  // Dibujar el punto en la posición actual
  fill("#E7D462");
  stroke("#FAF5AB");
  strokeWeight(36);
  ellipse(pos.x, pos.y, 10, 10);
  
  // Incrementamos el contador de pasos
  step++;
  
  // Cuando se completa la ruta (t >= 1), reiniciamos con nuevos puntos aleatorios
  if (step > routeDuration) {
    initRoute();
  }
}
