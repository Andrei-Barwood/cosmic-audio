// Array para almacenar la paleta de colores
        let palette = [];

        // Variables para los colores actuales de las líneas (interpolados)
        let currentLineColor1;
        let currentLineColor2;

        // Variables para los colores de inicio y destino de la interpolación
        let startLineColor1;
        let targetLineColor1;
        let startLineColor2;
        let targetLineColor2;

        // Variables para el color actual del fondo (interpolado)
        let currentBackgroundColor;
        // Variables para el color de inicio y destino del fondo
        let startBackgroundColor;
        let targetBackgroundColor;

        // Variables para las coordenadas actuales del punto de intersección (interpoladas)
        let currentIntersectionX, currentIntersectionY;

        // Variables para las coordenadas de inicio y destino del punto de intersección
        let startIntersectionX, startIntersectionY;
        let targetIntersectionX, targetIntersectionY;

        // Variables para los ángulos actuales de las dos líneas (interpolados)
        let currentAngle1, currentAngle2;

        // Variables para los ángulos de inicio y destino de la interpolación
        let startAngle1, startAngle2;
        let targetAngle1, targetAngle2;

        // Variables para controlar el tiempo de la transición
        let transitionStartTime = 0;
        let transitionDuration = 3000; // Duración de la transición en milisegundos (3 segundos)
        let newTargetInterval = 3000; // Intervalo para elegir nuevos objetivos (3 segundos)

        /**
         * Función de configuración de p5.js. Se ejecuta una vez al inicio.
         */
        function setup() {
            // Crea un canvas que ocupa el 80% del ancho y alto de la ventana
            createCanvas(windowWidth, windowHeight);
            // Define la paleta de colores proporcionada
            palette = [
                '#AB3266', // Rosa oscuro
                '#F5415F', // Rosa rojizo brillante
                '#F6B8D2', // Rosa claro
                '#BF5D93', // Rosa apagado
                '#A02699', // Rosa púrpura
                '#FD41F8'  // Rosa eléctrico
            ];

            // Inicializa los colores y posiciones de inicio y destino para la primera "transición"
            // Esto asegura que haya valores válidos al inicio.
            startLineColor1 = color(palette[0]);
            startLineColor2 = color(palette[1]);
            startBackgroundColor = color(palette[2]); // Inicializa el color de fondo
            currentBackgroundColor = startBackgroundColor; // Establece el color de fondo inicial

            startIntersectionX = width / 2;
            startIntersectionY = height / 2;
            startAngle1 = 0;
            startAngle2 = PI / 2;

            // Llama a la función para establecer los primeros objetivos aleatorios
            setNewRandomTargets();
        }

        /**
         * Función de dibujo de p5.js. Se ejecuta continuamente en un bucle.
         */
        function draw() {
            // Calcula el progreso de la transición (0 a 1)
            let elapsed = millis() - transitionStartTime;
            let lerpAmount = min(1, elapsed / transitionDuration); // Asegura que no exceda 1

            // Interpola los colores de las líneas
            currentLineColor1 = lerpColor(startLineColor1, targetLineColor1, lerpAmount);
            currentLineColor2 = lerpColor(startLineColor2, targetLineColor2, lerpAmount);

            // Interpola el color del fondo
            currentBackgroundColor = lerpColor(startBackgroundColor, targetBackgroundColor, lerpAmount);
            background(currentBackgroundColor); // Aplica el color de fondo interpolado

            // Interpola el punto de intersección
            currentIntersectionX = lerp(startIntersectionX, targetIntersectionX, lerpAmount);
            currentIntersectionY = lerp(startIntersectionY, targetIntersectionY, lerpAmount);

            // Interpola los ángulos de las líneas
            currentAngle1 = lerp(startAngle1, targetAngle1, lerpAmount);
            currentAngle2 = lerp(startAngle2, targetAngle2, lerpAmount);

            // Comprueba si ha pasado el intervalo para elegir nuevos objetivos
            if (elapsed > newTargetInterval) {
                setNewRandomTargets(); // Establece nuevos objetivos para la siguiente transición
                transitionStartTime = millis(); // Reinicia el tiempo de inicio de la transición
            }

            strokeWeight(4); // Grosor de las líneas

            // Dibuja la primera línea
            stroke(currentLineColor1); // Establece el color interpolado de la primera línea
            // Calcula los puntos de la línea 1 extendiéndose más allá del canvas
            let x1 = currentIntersectionX + cos(currentAngle1) * max(width, height) * 1.5;
            let y1 = currentIntersectionY + sin(currentAngle1) * max(width, height) * 1.5;
            let x2 = currentIntersectionX - cos(currentAngle1) * max(width, height) * 1.5;
            let y2 = currentIntersectionY - sin(currentAngle1) * max(width, height) * 1.5;
            line(x1, y1, x2, y2); // Dibuja la línea

            // Dibuja la segunda línea
            stroke(currentLineColor2); // Establece el color interpolado de la segunda línea
            // Calcula los puntos de la línea 2 extendiéndose más allá del canvas
            let x3 = currentIntersectionX + cos(currentAngle2) * max(width, height) * 1.5;
            let y3 = currentIntersectionY + sin(currentAngle2) * max(width, height) * 1.5;
            let x4 = currentIntersectionX - cos(currentAngle2) * max(width, height) * 1.5;
            let y4 = currentIntersectionY - sin(currentAngle2) * max(width, height) * 1.5;
            line(x3, y3, x4, y4); // Dibuja la línea

            // Dibuja el punto de intersección
            fill("#EAE28B"); // Color blanco semi-transparente para el punto
            noStroke(); // Sin borde para el punto
            ellipse(currentIntersectionX, currentIntersectionY, 384, 384); // Dibuja un círculo en la intersección
        }

        /**
         * Función para establecer nuevos objetivos aleatorios para la interpolación.
         * Los valores actuales se convierten en los valores de inicio para la próxima transición.
         */
        function setNewRandomTargets() {
            // Establece los colores actuales de las líneas como los colores de inicio para la próxima transición
            startLineColor1 = currentLineColor1 || color(palette[0]); // Usa un valor por defecto si es la primera vez
            startLineColor2 = currentLineColor2 || color(palette[1]);

            // Elige dos índices de color distintos de la paleta para los nuevos objetivos de línea
            let idx1 = floor(random(palette.length));
            let idx2 = floor(random(palette.length));
            while (idx1 === idx2) { // Asegura que los colores sean diferentes
                idx2 = floor(random(palette.length));
            }
            targetLineColor1 = color(palette[idx1]); // Asigna el primer color objetivo
            targetLineColor2 = color(palette[idx2]); // Asigna el segundo color objetivo

            // Establece el color de fondo actual como el color de inicio para la próxima transición
            startBackgroundColor = currentBackgroundColor || color(palette[2]);
            // Elige un nuevo color de fondo aleatorio de la paleta
            targetBackgroundColor = color(random(palette));

            // Establece el punto de intersección actual como el punto de inicio para la próxima transición
            startIntersectionX = currentIntersectionX || width / 2;
            startIntersectionY = currentIntersectionY || height / 2;

            // Elige un punto de intersección aleatorio dentro de un área central del canvas para el nuevo objetivo
            targetIntersectionX = random(width * 0.25, width * 0.75);
            targetIntersectionY = random(height * 0.25, height * 0.75);

            // Establece los ángulos actuales como los ángulos de inicio para la próxima transición
            startAngle1 = currentAngle1 || 0;
            startAngle2 = currentAngle2 || PI / 2;

            // Elige dos ángulos aleatorios para las líneas para los nuevos objetivos
            targetAngle1 = random(TWO_PI);
            targetAngle2 = random(TWO_PI);
            // Asegura que los ángulos no sean paralelos o anti-paralelos para evitar líneas superpuestas
            // y garantizar una intersección clara
            while (abs(abs(targetAngle1 - targetAngle2) - PI) < 0.1 || abs(targetAngle1 - targetAngle2) < 0.1) {
                targetAngle2 = random(TWO_PI); // Re-elige el segundo ángulo si es problemático
            }
        }

        /**
         * Función que se ejecuta cuando la ventana del navegador cambia de tamaño.
         */
        function windowResized() {
            // Redimensiona el canvas para que se ajuste al 80% del nuevo tamaño de la ventana
            resizeCanvas(windowWidth * 0.8, windowHeight * 0.8);
            // Vuelve a establecer nuevos objetivos aleatorios para asegurar que las líneas se ajusten y sean visibles
            // y reinicia la transición para que se adapte al nuevo tamaño.
            setNewRandomTargets();
            transitionStartTime = millis();
        }