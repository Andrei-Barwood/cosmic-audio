#!/bin/zsh

# Script helper para crear una nueva temporada
# Uso: ./create-season.zsh <season-name> <publish-date> [display-name]
# Ejemplo: ./create-season.zsh season-neon-dreams 2026-03-01 "Neon Dreams"

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

if [ $# -lt 2 ]; then
    echo "${RED}❌ Error: Faltan argumentos${NC}"
    echo "Uso: ./create-season.zsh <season-name> <publish-date> [display-name]"
    echo "Ejemplo: ./create-season.zsh season-neon-dreams 2026-03-01 \"Neon Dreams\""
    exit 1
fi

SEASON_NAME="$1"
PUBLISH_DATE="$2"
DISPLAY_NAME="${3:-$SEASON_NAME}"

SCHEDULED_DIR="$SCRIPT_DIR/seasons/scheduled"
SEASON_DIR="$SCHEDULED_DIR/$SEASON_NAME"

echo "${BLUE}🎨 Creando nueva temporada: $DISPLAY_NAME${NC}\n"

# Crear directorio
mkdir -p "$SEASON_DIR"
mkdir -p "$SEASON_DIR/blog-posts"

# Crear archivo de configuración
cat > "$SEASON_DIR/season-config.json" <<EOF
{
  "season_name": "$SEASON_NAME",
  "display_name": "$DISPLAY_NAME",
  "publish_date": "$PUBLISH_DATE",
  "description": "Nueva temporada creada automáticamente",
  "color_palette": {
    "wood-dark": "#2A1A11",
    "wood-medium": "#4A2E1F",
    "wood-light": "#8B5E3C",
    "primary-color": "#ccff00",
    "acid-green": "#ccff00",
    "tertiary-color": "#ff4400",
    "secondary-color": "#8B5E3C",
    "success-color": "#ccff00",
    "olive-accent": "#00ffff",
    "teal-dark": "#5c3a2a",
    "teal-darker": "#1a0f0a",
    "teal-medium": "#6B4E3D",
    "dark-bg": "#2A1A11",
    "darker-bg": "#1a0f0a",
    "card-bg": "rgba(42, 26, 17, 0.95)",
    "card-hover-bg": "rgba(74, 46, 31, 0.95)",
    "text-primary": "#f0e6d2",
    "text-secondary": "#cba885",
    "border-color": "#ccff00",
    "border-accent": "#00ffff",
    "glitch-color-1": "#00ffff",
    "glitch-color-2": "#ff00ff"
  },
  "game": {
    "type": "p5js",
    "file": "game.js",
    "title": "Game Title",
    "subtitle": "Game Subtitle",
    "description": "Game Description",
    "quote": "Game Quote"
  },
  "blog_posts": []
}
EOF

# Crear template de CSS para la temporada
cat > "$SEASON_DIR/season-styles.css" <<EOF
/* Temporada: $DISPLAY_NAME */
body.$SEASON_NAME {
    /* Personaliza estos colores según tu paleta */
    --wood-dark: #2A1A11;
    --wood-medium: #4A2E1F;
    --wood-light: #8B5E3C;
    --primary-color: #ccff00;
    --acid-green: #ccff00;
    --tertiary-color: #ff4400;
    --secondary-color: #8B5E3C;
    --success-color: #ccff00;
    --olive-accent: #00ffff;
    --teal-dark: #5c3a2a;
    --teal-darker: #1a0f0a;
    --teal-medium: #6B4E3D;
    --dark-bg: #2A1A11;
    --darker-bg: #1a0f0a;
    --card-bg: rgba(42, 26, 17, 0.95);
    --card-hover-bg: rgba(74, 46, 31, 0.95);
    --text-primary: #f0e6d2;
    --text-secondary: #cba885;
    --border-color: #ccff00;
    --border-accent: #00ffff;
    --glitch-color-1: #00ffff;
    --glitch-color-2: #ff00ff;
}
EOF

# Crear template de juego p5.js
cat > "$SEASON_DIR/game.js" <<'GAME_EOF'
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
        p.background(colors.bg);
        
        // Tu juego aquí
        p.fill(colors.primary);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);
        p.text("Tu juego aquí", p.width/2, p.height/2);
    };
}

new p5(sketch_season_game, 'gameCanvas');
GAME_EOF

# Crear README para la temporada
cat > "$SEASON_DIR/README.md" <<EOF
# Temporada: $DISPLAY_NAME

**Fecha de publicación:** $PUBLISH_DATE

## Estructura

- \`season-config.json\` - Configuración de la temporada
- \`season-styles.css\` - Estilos CSS personalizados
- \`game.js\` - Juego p5.js para el index
- \`blog-posts/\` - Entradas de blog (HTML)

## Personalización

1. Edita \`season-config.json\` para ajustar la configuración
2. Modifica \`season-styles.css\` para cambiar la paleta de colores
3. Reemplaza \`game.js\` con tu juego p5.js personalizado
4. Agrega entradas de blog en \`blog-posts/\` (archivos HTML)

## Aplicar manualmente

\`\`\`bash
./seasons/apply-season.zsh seasons/scheduled/$SEASON_NAME
\`\`\`

## Agendar automáticamente

\`\`\`bash
./seasons/schedule-seasons.zsh
\`\`\`
EOF

echo "${GREEN}✓${NC} Temporada creada en: $SEASON_DIR"
echo "${GREEN}✓${NC} Archivos creados:"
echo "   - season-config.json"
echo "   - season-styles.css"
echo "   - game.js"
echo "   - README.md"
echo "   - blog-posts/ (directorio)\n"

echo "${BLUE}📝 Próximos pasos:${NC}"
echo "1. Edita \`$SEASON_DIR/season-config.json\` para personalizar"
echo "2. Modifica \`$SEASON_DIR/season-styles.css\` con tu paleta de colores"
echo "3. Reemplaza \`$SEASON_DIR/game.js\` con tu juego p5.js"
echo "4. Agrega entradas de blog en \`$SEASON_DIR/blog-posts/\`\n"

echo "${YELLOW}💡 Para agendar esta temporada:${NC}"
echo "   ${BLUE}./seasons/schedule-seasons.zsh${NC}\n"

