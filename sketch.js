// estoy diseñando el nuevo sitio porque ajá el ramen, 
// la ropa, una naranja, son temas re personales 
// con una solucion bastante obvia, cuando actualice algo personal
// te paso el link pero no publico la pagina, mas facil...

// por ahora dale click a play para ver la animacion
// "al interior del cristal" del videoclip "Tarot of Dolls"

let numParts = 24;
let colors = ['#C4BEF7', '#7770B9', '#DFE4E3'];
let points = [];
let t = 0;

function setup() {
  createCanvas(2560, 1664);
  // Configuración inicial de puntos
  let A = createVector(200, 400);
  let B = createVector(1080, 400);
  let C = createVector(200, 100);
  
  // División de la semirrecta AC en 8 partes iguales
  for (let i = 0; i <= numParts; i++) {
    let pt = p5.Vector.lerp(A, C, i / numParts);
    points.push(pt);
  }
  
  frameRate(30);
}

function draw() {
  background("#9990F2");
  
  let A = createVector(200, 400);
  let B = createVector(1080, 400);
  
  // Dibujar el segmento AB
  stroke("#C4BEF7");
  strokeWeight(24);
  line(A.x, A.y, B.x, B.y);
  
  // Dibujar segmentos en la semirrecta AC
  for (let i = 0; i < numParts; i++) {
    let pt = points[i];
    let nextPt = points[i + 1];
    stroke(random(colors));
    line(pt.x, pt.y, nextPt.x, nextPt.y);
  }
  
  // Dibujar líneas paralelas
  for (let i = 0; i < numParts; i++) {
    let parallelPt = p5.Vector.lerp(A, B, i / numParts);
    let pt = points[i];
    stroke(random(colors));
    line(pt.x, pt.y, parallelPt.x, parallelPt.y);
  }
  
  // Animación con movimiento de los puntos en la semirrecta AC
  t += 0.01;
  for (let i = 1; i <= numParts; i++) {
    points[i].y = points[i].y + sin(t + i) * 12;
    points[i].x = points[i].x + cos(t + i) * 12;
  }
}

