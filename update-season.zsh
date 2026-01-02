#!/bin/zsh

# Script para actualizar todas las etiquetas <body> en archivos HTML
# a la temporada season-cloud-of-the-desert
#
# Uso: ./update-season.zsh

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorio actual (donde se ejecuta el script)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "${BLUE}🍭 Actualizando temporadas en archivos HTML...${NC}\n"

# Contador de archivos modificados
COUNT=0

# Buscar todos los archivos HTML y actualizar la clase del body
for file in *.html; do
    # Verificar que el archivo existe
    if [[ ! -f "$file" ]]; then
        continue
    fi
    
    # Verificar si el archivo tiene una etiqueta body con clase season-*
    if grep -q '<body class="season-' "$file" 2>/dev/null || grep -q "<body class='season-" "$file" 2>/dev/null; then
        # Hacer backup del archivo original
        cp "$file" "$file.bak"
        
        # Reemplazar cualquier temporada con season-cloud-of-the-desert
        # Maneja tanto comillas dobles como simples, y espacios alrededor del =
        sed -i '' 's/class[[:space:]]*=[[:space:]]*"season-[^"]*"/class="season-cloud-of-the-desert"/g' "$file"
        sed -i '' "s/class[[:space:]]*=[[:space:]]*'season-[^']*'/class='season-cloud-of-the-desert'/g" "$file"
        
        # Verificar si hubo cambios
        if ! diff -q "$file.bak" "$file" > /dev/null; then
            echo "${GREEN}✓${NC} Actualizado: $file"
            rm "$file.bak"
            ((COUNT++))
        else
            # No hubo cambios, restaurar el backup
            mv "$file.bak" "$file"
        fi
    else
        echo "${YELLOW}⊘${NC} Omitido: $file (no tiene clase season-*)"
    fi
done

echo "\n${BLUE}✨ Proceso completado!${NC}"
echo "${GREEN}   Archivos actualizados: $COUNT${NC}\n"

# Limpiar backups si quedaron (por seguridad)
if ls *.bak 1> /dev/null 2>&1; then
    echo "${YELLOW}⚠️  Archivos .bak encontrados (se restauraron cambios). Limpiando...${NC}"
    rm -f *.bak
fi

echo "${BLUE}🎨 Todas las páginas ahora usan: season-cloud-of-the-desert${NC}\n"

