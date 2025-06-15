let rectPlanes = [];
let triPlanes = [];
let rotation = 0;

let palette = [];

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  palette = [
    color(-9, 32, 63),       // Azul oscuro
    color(167, 147, 60),    // Amarillo/marrón
    color("#f0dda4"),    // Verde/azulado
    color(-244, 233, 222)    // Rosa claro
  ];
  
  // Ajustamos los colores negativos a valores válidos
  palette = palette.map(c => {
    let r = (red(c) + 256) % 256;
    let g = (green(c) + 256) % 256;
    let b = (blue(c) + 256) % 256;
    return color(r, g, b);
  });

  // Definimos 3 planos rectangulares
  for (let i = 0; i < 3; i++) {
    rectPlanes.push({
      w: 1300,
      h: 1150,
      x: random(-200, 200),
      y: random(-100, 100),
      z: random(-200, 200),
      rot: createVector(random(TWO_PI), random(TWO_PI), random(TWO_PI)),
      color: palette[i % palette.length]
    });
  }

  // Definimos 4 planos triangulares
  for (let i = 0; i < 4; i++) {
    triPlanes.push({
      vertices: [
        createVector(random(-200, 200), random(-200, 200), random(-200, 200)),
        createVector(random(-200, 200), random(-200, 200), random(-200, 200)),
        createVector(random(-200, 200), random(-200, 200), random(-200, 200))
      ],
      color: palette[(i + 1) % palette.length]
    });
  }

  noStroke();
}

function draw() {
  background("#09203F");
  orbitControl();
  rotateY(rotation * 0.5);
  rotateX(rotation * 0.3);

  // Dibujar planos rectangulares
  for (let rp of rectPlanes) {
    push();
    translate(rp.x, rp.y, rp.z);
    rotateX(rp.rot.x + rotation);
    rotateY(rp.rot.y + rotation);
    rotateZ(rp.rot.z + rotation);
    fill(rp.color);
    plane(rp.w, rp.h);
    pop();
  }

  // Dibujar planos triangulares
  for (let tp of triPlanes) {
    push();
    fill(tp.color);
    beginShape();
    for (let v of tp.vertices) {
      vertex(v.x, v.y, v.z);
    }
    endShape(CLOSE);
    pop();
  }

  // Dibujar puntos de intersección (simulados)
  for (let i = 0; i < rectPlanes.length; i++) {
    for (let j = 0; j < triPlanes.length; j++) {
      let centerR = createVector(rectPlanes[i].x, rectPlanes[i].y, rectPlanes[i].z);
      let centerT = triPlanes[j].vertices[0].copy().add(triPlanes[j].vertices[1]).add(triPlanes[j].vertices[2]).div(3);
      let midpoint = p5.Vector.lerp(centerR, centerT, 0.5);
      
      push();
      translate(midpoint.x, midpoint.y, midpoint.z);
      fill(255);
      sphere(12); // Punto de intersección "gigante"
      pop();

      // Dibujar línea entre centros rotando
      push();
      translate(midpoint.x, midpoint.y, midpoint.z);
      rotateY(rotation * 2);
      stroke(255, 100);
      line(-30, 0, 0, 30, 0, 0);
      noStroke();
      pop();
    }
  }

  rotation += 0.01;
}
