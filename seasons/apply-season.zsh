#!/bin/zsh

# Script para aplicar una temporada completa
# Uso: ./apply-season.zsh <season-directory>
# Ejemplo: ./apply-season.zsh seasons/scheduled/season-2026-02-15

set -e

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar argumentos
if [ $# -eq 0 ]; then
    echo "${RED}❌ Error: Debes especificar el directorio de la temporada${NC}"
    echo "Uso: ./apply-season.zsh <season-directory>"
    exit 1
fi

SEASON_DIR="$1"
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

# Verificar que el directorio existe
if [ ! -d "$SEASON_DIR" ]; then
    echo "${RED}❌ Error: El directorio $SEASON_DIR no existe${NC}"
    exit 1
fi

# Verificar que existe el archivo de configuración
CONFIG_FILE="$SEASON_DIR/season-config.json"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "${RED}❌ Error: No se encontró season-config.json en $SEASON_DIR${NC}"
    exit 1
fi

echo "${BLUE}🎨 Aplicando temporada desde: $SEASON_DIR${NC}\n"

# Leer configuración (requiere jq, si no está disponible usamos un método alternativo)
if command -v jq &> /dev/null; then
    SEASON_NAME=$(jq -r '.season_name' "$CONFIG_FILE")
    DISPLAY_NAME=$(jq -r '.display_name' "$CONFIG_FILE")
    PUBLISH_DATE=$(jq -r '.publish_date' "$CONFIG_FILE")
else
    # Método alternativo sin jq (básico)
    SEASON_NAME=$(grep -o '"season_name"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
    DISPLAY_NAME=$(grep -o '"display_name"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
    PUBLISH_DATE=$(grep -o '"publish_date"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
fi

echo "${GREEN}📋 Temporada: $DISPLAY_NAME ($SEASON_NAME)${NC}"
echo "${GREEN}📅 Fecha de publicación: $PUBLISH_DATE${NC}\n"

# 1. Actualizar CSS con la nueva paleta de colores
echo "${BLUE}🎨 Paso 1: Actualizando paleta de colores en styles.css...${NC}"
if [ -f "$SEASON_DIR/season-styles.css" ]; then
    # Si existe un archivo CSS específico, agregarlo al final de styles.css
    echo "\n/* =========================================\n   TEMPORADA: $DISPLAY_NAME\n   Aplicada automáticamente el $PUBLISH_DATE\n   ========================================= */" >> styles.css
    cat "$SEASON_DIR/season-styles.css" >> styles.css
    echo "${GREEN}✓${NC} Estilos CSS agregados"
else
    echo "${YELLOW}⚠️  No se encontró season-styles.css, usando configuración JSON...${NC}"
    # Aquí podrías generar el CSS desde el JSON si es necesario
fi

# 2. Actualizar todas las clases body en los archivos HTML
echo "${BLUE}🔄 Paso 2: Actualizando clases season-* en archivos HTML...${NC}"
COUNT=0
for file in *.html; do
    if [[ ! -f "$file" ]]; then
        continue
    fi
    
    if grep -q '<body class="season-' "$file" 2>/dev/null || grep -q "<body class='season-" "$file" 2>/dev/null; then
        # Hacer backup
        cp "$file" "$file.bak"
        
        # Reemplazar cualquier temporada con la nueva
        sed -i '' "s/class[[:space:]]*=[[:space:]]*\"season-[^\"]*\"/class=\"$SEASON_NAME\"/g" "$file"
        sed -i '' "s/class[[:space:]]*=[[:space:]]*'season-[^']*'/class='$SEASON_NAME'/g" "$file"
        
        if ! diff -q "$file.bak" "$file" > /dev/null; then
            echo "${GREEN}✓${NC} Actualizado: $file"
            rm "$file.bak"
            ((COUNT++))
        else
            mv "$file.bak" "$file"
        fi
    fi
done
echo "${GREEN}   Archivos actualizados: $COUNT${NC}\n"

# 3. Actualizar el juego p5.js en index.html
echo "${BLUE}🎮 Paso 3: Actualizando juego en index.html...${NC}"
if [ -f "$SEASON_DIR/game.js" ]; then
    # Hacer backup
    cp index.html index.html.bak
    
    # Leer el nuevo juego
    NEW_GAME=$(cat "$SEASON_DIR/game.js")
    
    # Leer configuración del juego si existe
    if command -v jq &> /dev/null; then
        GAME_TITLE=$(jq -r '.game.title // "L-POP 🍭"' "$CONFIG_FILE")
        GAME_SUBTITLE=$(jq -r '.game.subtitle // "yes it means fried butter"' "$CONFIG_FILE")
        GAME_DESC=$(jq -r '.game.description // "Mega Doll Arcade"' "$CONFIG_FILE")
        GAME_QUOTE=$(jq -r '.game.quote // "Fench Butter matharfackar"' "$CONFIG_FILE")
    else
        GAME_TITLE="L-POP 🍭"
        GAME_SUBTITLE="yes it means fried butter"
        GAME_DESC="Mega Doll Arcade"
        GAME_QUOTE="Fench Butter matharfackar"
    fi
    
    # Crear el bloque completo del juego
    GAME_BLOCK="<!-- season game -->

<script>
$NEW_GAME
</script>



<script>
document.addEventListener('keydown', function(event) {
  // Block arrow keys and spacebar
  if (
    [\"ArrowUp\",\"ArrowDown\",\"ArrowLeft\",\"ArrowRight\",\" \"].includes(event.key)
  ) {
    event.preventDefault();
  }
}, false);
</script>"
    
    # Reemplazar el bloque del juego (desde <!-- season game --> hasta el último </script> antes de </body>)
    # Usar awk para hacer el reemplazo de manera más segura
    awk -v new_game="$GAME_BLOCK" -v game_title="$GAME_TITLE" -v game_subtitle="$GAME_SUBTITLE" -v game_desc="$GAME_DESC" -v game_quote="$GAME_QUOTE" '
    /<!-- season game -->/ {
        in_game_block = 1
        print "<!-- season game -->"
        print "<script>"
        # El juego se insertará aquí, pero necesitamos leerlo de otra manera
        next
    }
    in_game_block && /<\/script>/ && !/document\.addEventListener/ {
        in_game_block = 0
        # Aquí insertaríamos el nuevo juego, pero es complejo con awk
        # Por ahora, usamos un método más simple con sed
        next
    }
    !in_game_block {
        print
    }
    ' index.html.bak > index.html.tmp || cp index.html.bak index.html
    
    # Método más simple: usar Python o Perl para reemplazo multilínea
    # Por ahora, usamos un método con marcadores
    if command -v python3 &> /dev/null; then
        python3 <<PYTHON_EOF
import re

with open('index.html.bak', 'r') as f:
    content = f.read()

# Encontrar el bloque del juego (desde <!-- season game --> hasta el último </script> antes de </body>)
# Patrón: desde <!-- season game --> hasta </script> seguido de </body>
pattern = r'(<!-- season game -->.*?</script>\s*<script>.*?</script>\s*)'

game_block = f"""<!-- season game -->

<script>
{open('$SEASON_DIR/game.js').read()}
</script>



<script>
document.addEventListener('keydown', function(event) {{
  // Block arrow keys and spacebar
  if (
    ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(event.key)
  ) {{
    event.preventDefault();
  }}
}}, false);
</script>"""

new_content = re.sub(pattern, game_block, content, flags=re.DOTALL)

# También actualizar el título y subtítulo del juego si están en el HTML
title_pattern = r'(<p style="font-size: 1\.5rem; color: var\(--primary-color\); margin-bottom: 0\.5rem;">)[^<]*(</p>)'
subtitle_pattern = r'(<p style="font-size: 1\.2rem; margin-bottom: 0\.5rem;">)[^<]*(</p>)'
desc_pattern = r'(<p style="color: var\(--text-secondary\);">)[^<]*(</p>)')
quote_pattern = r'(<p style="font-size: 0\.9rem; margin: 0; color: var\(--text-secondary\);">")[^"]*("</p>)')

new_content = re.sub(title_pattern, r'\1$GAME_TITLE\2', new_content)
new_content = re.sub(subtitle_pattern, r'\1$GAME_SUBTITLE\2', new_content)
new_content = re.sub(desc_pattern, r'\1$GAME_DESC\2', new_content)
new_content = re.sub(quote_pattern, r'\1$GAME_QUOTE\2', new_content)

with open('index.html', 'w') as f:
    f.write(new_content)
PYTHON_EOF
        
        if [ -f index.html ] && ! diff -q index.html.bak index.html > /dev/null; then
            echo "${GREEN}✓${NC} Juego actualizado en index.html"
            rm index.html.bak
        else
            echo "${YELLOW}⚠️  No se pudo actualizar automáticamente, verifica manualmente${NC}"
            mv index.html.bak index.html
        fi
    else
        echo "${YELLOW}⚠️  Python3 no disponible, actualiza el juego manualmente${NC}"
        echo "${YELLOW}   Reemplaza el contenido entre <!-- season game --> y </script> en index.html${NC}"
        rm -f index.html.bak
    fi
    
    echo "${GREEN}✓${NC} Juego listo"
else
    echo "${YELLOW}⚠️  No se encontró game.js, manteniendo juego actual${NC}"
fi

# 4. Agregar entradas de blog
echo "${BLUE}📝 Paso 4: Agregando entradas de blog...${NC}"
BLOG_COUNT=0
if [ -d "$SEASON_DIR/blog-posts" ]; then
    for blog_file in "$SEASON_DIR/blog-posts"/*.html; do
        if [ -f "$blog_file" ]; then
            FILENAME=$(basename "$blog_file")
            cp "$blog_file" "$FILENAME"
            echo "${GREEN}✓${NC} Blog post agregado: $FILENAME"
            ((BLOG_COUNT++))
        fi
    done
fi
echo "${GREEN}   Entradas agregadas: $BLOG_COUNT${NC}\n"

# 5. Hacer commit de git (si estamos en un repo git)
echo "${BLUE}📦 Paso 5: Preparando commit de git...${NC}"
if [ -d ".git" ]; then
    # Agregar todos los cambios
    git add -A
    
    # Crear commit con fecha de publicación
    COMMIT_MSG="🎨 Temporada: $DISPLAY_NAME - Publicada el $PUBLISH_DATE"
    
    # Usar la fecha de publicación para el commit (si es en el futuro, git la respetará al hacer push)
    if command -v gdate &> /dev/null; then
        # macOS con coreutils
        GIT_DATE=$(gdate -d "$PUBLISH_DATE" +"%Y-%m-%d %H:%M:%S")
    else
        # Linux o macOS sin coreutils
        GIT_DATE=$(date -j -f "%Y-%m-%d" "$PUBLISH_DATE" "+%Y-%m-%d 00:00:00" 2>/dev/null || date -d "$PUBLISH_DATE" "+%Y-%m-%d 00:00:00" 2>/dev/null || echo "")
    fi
    
    if [ -n "$GIT_DATE" ]; then
        echo "${GREEN}✓${NC} Commit preparado para fecha: $GIT_DATE"
        echo "${YELLOW}💡 Para hacer commit con fecha futura, ejecuta:${NC}"
        echo "   ${BLUE}GIT_AUTHOR_DATE='$GIT_DATE' GIT_COMMITTER_DATE='$GIT_DATE' git commit -m '$COMMIT_MSG'${NC}"
        echo "   ${YELLOW}O simplemente: git commit -m '$COMMIT_MSG'${NC}"
    else
        echo "${YELLOW}⚠️  No se pudo parsear la fecha, haciendo commit normal${NC}"
        echo "   ${BLUE}git commit -m '$COMMIT_MSG'${NC}"
    fi
else
    echo "${YELLOW}⚠️  No es un repositorio git${NC}"
fi

echo "\n${GREEN}✨ Temporada aplicada exitosamente!${NC}"
echo "${BLUE}🎨 Todas las páginas ahora usan: $SEASON_NAME${NC}\n"

