let curves = []; // Array para almacenar todas las curvas
        let maxCurves = 12; // Número máximo de curvas en pantalla
        let curveSpawnInterval = 24; // Intervalo de tiempo (en frames) para generar nuevas curvas
        let lastCurveSpawnTime = 0;

        // Nueva paleta de colores en RGB
        const colorPalette = [
            [199, 172, 189],
            [188, 114, 143],
            [135, 127, 130],
            [1, 0, 0] // Este color se usará principalmente para el fondo, pero también puede aparecer en las curvas
        ];

        // Clase para representar una curva individual
        class Curve {
            constructor() {
                this.type = floor(random(3)); // 0: arc, 1: bezier, 2: quadratic
                this.points = []; // Puntos de control o parámetros para la curva
                // Selecciona un color aleatorio de la paleta
                const selectedColor = colorPalette[floor(random(colorPalette.length))];
                this.color = color(selectedColor[0], selectedColor[1], selectedColor[2]);
                this.alpha = 0; // Transparencia inicial para el efecto de aparición
                this.state = 'appearing'; // Estado de la curva: 'appearing', 'visible', 'disappearing'
                this.lifeSpan = random(300, 800); // Duración total de la curva en frames
                this.currentLife = 0; // Vida actual de la curva
                this.connectingLines = []; // Array para almacenar las líneas de conexión
                this.lineSpawnInterval = 10; // Intervalo para generar nuevas líneas
                this.lastLineSpawnTime = 0;
                this.maxConnectingLines = 3; // Máximo de líneas de conexión por curva

                this.initCurve(); // Inicializa los puntos de la curva según su tipo
            }

            // Inicializa los parámetros específicos de la curva
            initCurve() {
                let margin = 50; // Margen para que las curvas no se salgan del borde
                let x1 = random(margin, width - margin);
                let y1 = random(margin, height - margin);
                let x2 = random(margin, width - margin);
                let y2 = random(margin, height - margin);

                if (this.type === 0) { // Arc
                    this.points.push(x1, y1); // Centro
                    this.points.push(random(50, 200)); // Radio
                    this.points.push(random(TWO_PI)); // Ángulo inicial
                    this.points.push(random(this.points[2] + PI / 4, this.points[2] + PI * 1.5)); // Ángulo final
                } else if (this.type === 1) { // Bezier
                    this.points.push(x1, y1); // Punto inicial
                    this.points.push(random(width), random(height)); // Punto de control 1
                    this.points.push(random(width), random(height)); // Punto de control 2
                    this.points.push(x2, y2); // Punto final
                } else { // Quadratic
                    this.points.push(x1, y1); // Punto inicial
                    this.points.push(random(width), random(height)); // Punto de control
                    this.points.push(x2, y2); // Punto final
                }
            }

            // Actualiza el estado de la curva (aparición/desaparición, vida, líneas)
            update() {
                this.currentLife++;

                // Lógica de aparición y desaparición
                if (this.state === 'appearing') {
                    this.alpha += 5; // Aumenta la transparencia
                    if (this.alpha >= 255) {
                        this.alpha = 255;
                        this.state = 'visible';
                    }
                } else if (this.state === 'visible') {
                    if (this.currentLife > this.lifeSpan * 0.7) { // Empieza a desaparecer al 70% de su vida
                        this.state = 'disappearing';
                    }
                } else if (this.state === 'disappearing') {
                    this.alpha -= 5; // Disminuye la transparencia
                    if (this.alpha <= 0) {
                        this.alpha = 0;
                        // La curva se eliminará del array 'curves' en el bucle principal
                    }
                }

                // Generar líneas de conexión
                if (frameCount - this.lastLineSpawnTime > this.lineSpawnInterval && this.connectingLines.length < this.maxConnectingLines) {
                    this.generateConnectingLines();
                    this.lastLineSpawnTime = frameCount;
                }

                // Eliminar líneas de conexión antiguas
                if (this.connectingLines.length > 0) {
                    this.connectingLines.forEach(connLine => connLine.alpha -= 3); // Hacer que las líneas se desvanezcan
                    this.connectingLines = this.connectingLines.filter(connLine => connLine.alpha > 0);
                }
            }

            // Dibuja la curva y sus líneas de conexión
            display() {
                push();
                noFill();
                stroke(this.color, this.alpha); // Establece el color de la curva con transparencia
                strokeWeight(random(1, 4)); // Grosor de línea aleatorio

                // Dibuja la curva según su tipo
                if (this.type === 0) { // Arc
                    arc(this.points[0], this.points[1], this.points[2] * 2, this.points[2] * 2, this.points[3], this.points[4]);
                } else if (this.type === 1) { // Bezier
                    bezier(this.points[0], this.points[1], this.points[2], this.points[3], this.points[4], this.points[5], this.points[6], this.points[7]);
                } else { // Quadratic
                    quadraticBezier(this.points[0], this.points[1], this.points[2], this.points[3], this.points[4], this.points[5]);
                }

                // Dibuja las líneas de conexión
                this.connectingLines.forEach(connLine => {
                    stroke(connLine.color, connLine.alpha);
                    strokeWeight(1);
                    line(connLine.p1.x, connLine.p1.y, connLine.p2.x, connLine.p2.y);
                });
                pop();
            }

            // Genera una línea de conexión
            generateConnectingLines() {
                let p1, p2;
                let curveSpaceX, curveSpaceY, curveSpaceW, curveSpaceH;

                // Define un espacio aproximado alrededor de la curva para los puntos "internos"
                // Esto es una simplificación; para una detección precisa, se necesitaría la caja delimitadora real de la curva.
                if (this.type === 0) { // Arc
                    curveSpaceX = this.points[0] - this.points[2];
                    curveSpaceY = this.points[1] - this.points[2];
                    curveSpaceW = this.points[2] * 2;
                    curveSpaceH = this.points[2] * 2;
                } else if (this.type === 1) { // Bezier
                    let minX = min(this.points[0], this.points[2], this.points[4], this.points[6]);
                    let maxX = max(this.points[0], this.points[2], this.points[4], this.points[6]);
                    let minY = min(this.points[1], this.points[3], this.points[5], this.points[7]);
                    let maxY = max(this.points[1], this.points[3], this.points[5], this.points[7]);
                    curveSpaceX = minX - 20;
                    curveSpaceY = minY - 20;
                    curveSpaceW = (maxX - minX) + 40;
                    curveSpaceH = (maxY - minY) + 40;
                } else { // Quadratic
                    let minX = min(this.points[0], this.points[2], this.points[4]);
                    let maxX = max(this.points[0], this.points[2], this.points[4]);
                    let minY = min(this.points[1], this.points[3], this.points[5]);
                    let maxY = max(this.points[1], this.points[3], this.points[5]);
                    curveSpaceX = minX - 20;
                    curveSpaceY = minY - 20;
                    curveSpaceW = (maxX - minX) + 40;
                    curveSpaceH = (maxY - minY) + 40;
                }

                // Asegurar que el espacio de la curva esté dentro de los límites del canvas
                curveSpaceX = max(0, curveSpaceX);
                curveSpaceY = max(0, curveSpaceY);
                curveSpaceW = min(width - curveSpaceX, curveSpaceW);
                curveSpaceH = min(height - curveSpaceY, curveSpaceH);

                // Punto dentro del espacio de la curva
                p1 = createVector(random(curveSpaceX, curveSpaceX + curveSpaceW), random(curveSpaceY, curveSpaceY + curveSpaceH));

                // Punto fuera del espacio de la curva
                let outsideAttempts = 0;
                do {
                    p2 = createVector(random(width), random(height));
                    outsideAttempts++;
                    // Evitar bucles infinitos si es imposible encontrar un punto fuera
                    if (outsideAttempts > 1000) break;
                } while (p2.x > curveSpaceX && p2.x < curveSpaceX + curveSpaceW && p2.y > curveSpaceY && p2.y < curveSpaceY + curveSpaceH);

                // Longitud aleatoria para la línea
                let desiredLength = random(50, 200);
                let currentLength = p1.dist(p2);

                if (currentLength > 0) {
                    // Normalizar el vector y escalarlo a la longitud deseada
                    let dir = p2.copy().sub(p1).normalize();
                    p2 = p1.copy().add(dir.mult(desiredLength));
                }

                // Asegurarse de que p2 esté dentro del canvas
                p2.x = constrain(p2.x, 0, width);
                p2.y = constrain(p2.y, 0, height);

                this.connectingLines.push({
                    p1: p1,
                    p2: p2,
                    color: this.color, // Las líneas usan el mismo color de la curva
                    alpha: 255 // Las líneas empiezan con opacidad total
                });
            }
        }

        // Función auxiliar para dibujar una curva cuadrática (p5.js no tiene una directamente)
        function quadraticBezier(x1, y1, cx, cy, x2, y2) {
            beginShape();
            vertex(x1, y1);
            quadraticVertex(cx, cy, x2, y2);
            endShape();
        }

        function setup() {
            createCanvas(windowWidth, windowHeight); // Canvas ocupa el 80% del ancho y alto de la ventana
            background(colorPalette[3][0], colorPalette[3][1], colorPalette[3][2]); // Color de fondo oscuro (1,0,0)
            angleMode(RADIANS); // Usar radianes para los ángulos
            frameRate(60); // 60 frames por segundo
            resetAnimation(); // Inicia la animación
        }

        function draw() {
            // Fondo semi-transparente para crear un efecto de rastro
            background(colorPalette[3][0], colorPalette[3][1], colorPalette[3][2], 30); // Usar el color 1,0,0 con transparencia

            // Generar nuevas curvas
            if (frameCount - lastCurveSpawnTime > curveSpawnInterval && curves.length < maxCurves) {
                curves.push(new Curve());
                lastCurveSpawnTime = frameCount;
            }

            // Actualizar y mostrar cada curva
            for (let i = curves.length - 1; i >= 0; i--) {
                curves[i].update();
                curves[i].display();

                // Eliminar curvas que han desaparecido
                if (curves[i].alpha <= 0 && curves[i].state === 'disappearing') {
                    curves.splice(i, 1);
                }
            }
        }

        // Función para manejar el redimensionamiento de la ventana
        function windowResized() {
            resizeCanvas(windowWidth * 0.8, windowHeight * 0.8);
            resetAnimation(); // Reinicia la animación al redimensionar
        }

        // Función para reiniciar la animación
        function resetAnimation() {
            curves = []; // Vacía el array de curvas
            lastCurveSpawnTime = 0;
            background(colorPalette[3][0], colorPalette[3][1], colorPalette[3][2]); // Limpia el fondo con el color 1,0,0
        }

        // Reiniciar la animación al presionar cualquier tecla
        function keyPressed() {
            resetAnimation();
        }