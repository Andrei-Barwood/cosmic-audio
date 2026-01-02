#!/bin/zsh

# Script para crear múltiples temporadas para todo el año 2026
# Cada temporada se publica cada 45 días
# Uso: ./create-year-seasons.zsh [start-date] [interval-days]
# Ejemplo: ./create-year-seasons.zsh 2026-02-15 45

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

START_DATE="${1:-2026-02-15}"
INTERVAL_DAYS="${2:-45}"

echo "${BLUE}📅 Creando temporadas para 2026${NC}"
echo "${BLUE}   Fecha inicial: $START_DATE${NC}"
echo "${BLUE}   Intervalo: cada $INTERVAL_DAYS días${NC}\n"

# Función para sumar días a una fecha
add_days() {
    local date_str="$1"
    local days="$2"
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        date -j -v+${days}d -f "%Y-%m-%d" "$date_str" "+%Y-%m-%d" 2>/dev/null || {
            # Si falla, usar Python como fallback
            python3 -c "from datetime import datetime, timedelta; d = datetime.strptime('$date_str', '%Y-%m-%d'); print((d + timedelta(days=$days)).strftime('%Y-%m-%d'))"
        }
    else
        # Linux
        date -d "$date_str + $days days" "+%Y-%m-%d" 2>/dev/null || {
            python3 -c "from datetime import datetime, timedelta; d = datetime.strptime('$date_str', '%Y-%m-%d'); print((d + timedelta(days=$days)).strftime('%Y-%m-%d'))"
        }
    fi
}

# Crear temporadas hasta finales de 2026
CURRENT_DATE="$START_DATE"
SEASON_NUM=1
CREATED_COUNT=0

while true; do
    YEAR=$(echo "$CURRENT_DATE" | cut -d'-' -f1)
    
    # Parar si pasamos de 2026
    if [ "$YEAR" -gt 2026 ]; then
        break
    fi
    
    # Crear nombre de temporada
    SEASON_NAME="season-$(echo "$CURRENT_DATE" | tr '-' '_')"
    DISPLAY_NAME="Temporada $SEASON_NUM - $(date -j -f "%Y-%m-%d" "$CURRENT_DATE" "+%B %Y" 2>/dev/null || date -d "$CURRENT_DATE" "+%B %Y" 2>/dev/null || echo "$CURRENT_DATE")"
    
    echo "${BLUE}📋 Creando: $DISPLAY_NAME${NC}"
    echo "   📅 Fecha: $CURRENT_DATE"
    echo "   📁 Nombre: $SEASON_NAME"
    
    # Crear temporada
    if ./seasons/create-season.zsh "$SEASON_NAME" "$CURRENT_DATE" "$DISPLAY_NAME" > /dev/null 2>&1; then
        echo "${GREEN}   ✓${NC} Creada exitosamente\n"
        ((CREATED_COUNT++))
    else
        echo "${RED}   ❌ Error al crear${NC}\n"
    fi
    
    # Calcular siguiente fecha
    CURRENT_DATE=$(add_days "$CURRENT_DATE" "$INTERVAL_DAYS")
    ((SEASON_NUM++))
    
    # Limitar a máximo 12 temporadas por seguridad
    if [ $SEASON_NUM -gt 12 ]; then
        echo "${YELLOW}⚠️  Límite de 12 temporadas alcanzado${NC}"
        break
    fi
done

echo "${BLUE}✨ Proceso completado!${NC}"
echo "${GREEN}   Temporadas creadas: $CREATED_COUNT${NC}\n"

echo "${YELLOW}💡 Próximos pasos:${NC}"
echo "1. Personaliza cada temporada en ${BLUE}seasons/scheduled/${NC}"
echo "2. Edita las paletas de colores, juegos y blog posts"
echo "3. Agenda todas las temporadas: ${BLUE}./seasons/schedule-seasons.zsh${NC}\n"

echo "${YELLOW}📝 Para personalizar una temporada:${NC}"
echo "   ${BLUE}nano seasons/scheduled/season-*/season-config.json${NC}"
echo "   ${BLUE}nano seasons/scheduled/season-*/season-styles.css${NC}"
echo "   ${BLUE}nano seasons/scheduled/season-*/game.js${NC}\n"

