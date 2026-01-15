// Juego: Poison - Manzanas Venenosas
// Temporada: Evil Trees

function sketch_poison_game(p) {
    // Colores del bosque embrujado
    let colors = {
        bg: "#060606",           // Fondo muy oscuro
        tree: "#2a1a3a",         // Púrpura oscuro para árboles
        apple: "#ff4400",        // Naranja rojizo para manzanas venenosas
        text: "#ff6600",         // Naranja para texto
        shadow: "#1a0a1a"        // Sombra púrpura
    };
    
    let trees = [];
    let apples = [];
    let collected = 0;
    let totalApples = 0;
    let gameOver = false;
    let gameWon = false;
    let startTime = 0;
    let gameStarted = false;
    
    // Configuración
    let treeCount = 3;
    let appleSpawnRate = 0.02;
    let appleSpeed = 1.5;
    let basketX = 0;
    let basketY = 0;
    let basketWidth = 40;
    let basketHeight = 20;
    
    p.setup = function() {
        p.createCanvas(280, 200).parent('gameCanvas');
        p.frameRate(30);
        
        // Crear árboles
        for (let i = 0; i < treeCount; i++) {
            trees.push({
                x: (i + 1) * (p.width / (treeCount + 1)),
                y: p.height - 20,
                width: 30,
                height: 80
            });
        }
        
        basketX = p.width / 2;
        basketY = p.height - 15;
    };
    
    function spawnApple() {
        if (p.random(1) < appleSpawnRate && trees.length > 0) {
            let tree = p.random(trees);
            apples.push({
                x: tree.x + p.random(-10, 10),
                y: tree.y - tree.height,
                vx: p.random(-0.5, 0.5),
                vy: appleSpeed + p.random(0.5),
                size: 8 + p.random(4)
            });
            totalApples++;
        }
    }
    
    function updateBasket() {
        // Seguir el mouse en X
        basketX = p.constrain(p.mouseX, basketWidth/2, p.width - basketWidth/2);
    }
    
    function checkCollisions() {
        for (let i = apples.length - 1; i >= 0; i--) {
            let apple = apples[i];
            
            // Actualizar posición
            apple.x += apple.vx;
            apple.y += apple.vy;
            
            // Rebotar en bordes laterales
            if (apple.x < 0 || apple.x > p.width) {
                apple.vx *= -1;
            }
            
            // Colisión con canasta
            if (apple.y + apple.size/2 > basketY - basketHeight/2 &&
                apple.y - apple.size/2 < basketY + basketHeight/2 &&
                apple.x > basketX - basketWidth/2 &&
                apple.x < basketX + basketWidth/2) {
                apples.splice(i, 1);
                collected++;
                
                // Sonido visual
                p.fill(colors.apple);
                p.circle(apple.x, apple.y, 20);
            }
            
            // Si cae al suelo, game over
            if (apple.y > p.height) {
                gameOver = true;
            }
        }
    }
    
    function drawTree(tree) {
        // Tronco
        p.fill(colors.tree);
        p.noStroke();
        p.rect(tree.x - tree.width/2, tree.y - tree.height, tree.width, tree.height);
        
        // Ramas (triángulos)
        p.fill(colors.shadow);
        p.triangle(
            tree.x - tree.width, tree.y - tree.height,
            tree.x + tree.width, tree.y - tree.height,
            tree.x, tree.y - tree.height - 30
        );
        
        // Detalles del tronco
        p.stroke(colors.shadow);
        p.strokeWeight(1);
        p.line(tree.x, tree.y - tree.height, tree.x, tree.y);
    }
    
    function drawBasket() {
        // Canasta
        p.fill(colors.tree);
        p.stroke(colors.apple);
        p.strokeWeight(2);
        p.rect(basketX - basketWidth/2, basketY - basketHeight/2, basketWidth, basketHeight, 3);
        
        // Detalles de la canasta
        p.line(basketX - basketWidth/2 + 5, basketY - basketHeight/2, 
               basketX - basketWidth/2 + 5, basketY + basketHeight/2);
        p.line(basketX + basketWidth/2 - 5, basketY - basketHeight/2, 
               basketX + basketWidth/2 - 5, basketY + basketHeight/2);
    }
    
    function drawApple(apple) {
        // Manzana venenosa
        p.fill(colors.apple);
        p.noStroke();
        p.circle(apple.x, apple.y, apple.size);
        
        // Brillo
        p.fill(colors.text);
        p.circle(apple.x - 2, apple.y - 2, apple.size * 0.4);
        
        // Tallo
        p.stroke(colors.shadow);
        p.strokeWeight(1);
        p.line(apple.x, apple.y - apple.size/2, apple.x, apple.y - apple.size/2 - 3);
    }
    
    p.draw = function() {
        // Fondo con fade
        p.background(colors.bg, 40);
        
        // Patrón de fondo sutil (bosque)
        p.fill(colors.shadow);
        p.noStroke();
        for (let i = 0; i < 5; i++) {
            p.rect(i * 60, p.height - 10, 40, 10);
        }
        
        if (!gameStarted) {
            // Pantalla de inicio
            p.fill(colors.text);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(16);
            p.text("POISON", p.width/2, p.height/2 - 20);
            p.textSize(10);
            p.text("INDIGESTIÓN!", p.width/2, p.height/2);
            p.textSize(8);
            p.text("Click to start", p.width/2, p.height/2 + 20);
            return;
        }
        
        if (gameOver) {
            // Pantalla de game over
            p.fill(colors.apple);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(18);
            p.text("DIARRHH DUDES", p.width/2, p.height/2 - 10);
            p.fill(colors.text);
            p.textSize(12);
            p.text("Score: " + collected, p.width/2, p.height/2 + 10);
            p.textSize(10);
            p.text("Click to restart", p.width/2, p.height/2 + 25);
            return;
        }
        
        if (gameWon) {
            // Pantalla de victoria
            p.fill(colors.text);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(16);
            p.text("ALL POISONED!", p.width/2, p.height/2 - 10);
            p.textSize(12);
            p.text("Collected: " + collected, p.width/2, p.height/2 + 10);
            return;
        }
        
        // Dibujar árboles
        for (let tree of trees) {
            drawTree(tree);
        }
        
        // Actualizar canasta
        updateBasket();
        drawBasket();
        
        // Spawn de manzanas
        spawnApple();
        
        // Dibujar manzanas
        for (let apple of apples) {
            drawApple(apple);
        }
        
        // Verificar colisiones
        checkCollisions();
        
        // UI
        p.fill(colors.text);
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(12);
        p.text("Poison: " + collected, 5, 5);
        p.textSize(8);
        p.text("Total: " + totalApples, 5, 18);
        
        // Condición de victoria (recoger todas las manzanas que aparezcan)
        if (totalApples > 0 && collected === totalApples && apples.length === 0) {
            gameWon = true;
        }
    };
    
    p.mousePressed = function() {
        if (!gameStarted) {
            gameStarted = true;
            startTime = p.millis();
        } else if (gameOver || gameWon) {
            // Reset
            apples = [];
            collected = 0;
            totalApples = 0;
            gameOver = false;
            gameWon = false;
            gameStarted = true;
        }
    };
}

new p5(sketch_poison_game, 'gameCanvas');
