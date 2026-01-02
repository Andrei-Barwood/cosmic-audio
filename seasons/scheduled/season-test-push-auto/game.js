// Template de juego p5.js para la temporada
// Reemplaza este contenido con tu juego personalizado

function sketch_season_game(p) {
    // Colores de la temporada (ajusta según tu paleta)
    let colors = {
        bg: "#0E1111",
        primary: "#E7F800",
        secondary: "#00383B",
        accent: "#B2E5F2"
    };
    
    p.setup = function() {
        p.createCanvas(280, 200).parent('gameCanvas');
        p.frameRate(30);
    };
    
    p.draw = function() {
        p.background(colors.bg, 20); // Fade suave
        
        // Juego de prueba: Partículas verdes
        for (let i = 0; i < 20; i++) {
            let x = p.width/2 + p.sin(p.frameCount * 0.01 + i) * 50;
            let y = p.height/2 + p.cos(p.frameCount * 0.01 + i) * 50;
            p.fill(colors.primary);
            p.noStroke();
            p.circle(x, y, 5);
        }
        
        // Título
        p.fill(colors.primary);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(14);
        p.text("TEST PUSH", p.width/2, p.height/2);
    };
}

new p5(sketch_season_game, 'gameCanvas');
