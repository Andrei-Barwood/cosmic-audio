#!/bin/zsh

# Script para agendar múltiples temporadas
# Uso: ./schedule-seasons.zsh
# Lee las temporadas de seasons/scheduled/ y las agenda usando 'at' command

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

SCHEDULED_DIR="$SCRIPT_DIR/seasons/scheduled"
APPLY_SCRIPT="$SCRIPT_DIR/seasons/apply-season.zsh"

echo "${BLUE}📅 Sistema de Agendamiento de Temporadas${NC}\n"

# Verificar que existe el directorio
if [ ! -d "$SCHEDULED_DIR" ]; then
    echo "${RED}❌ Error: El directorio $SCHEDULED_DIR no existe${NC}"
    exit 1
fi

# Verificar que el script de aplicación existe
if [ ! -f "$APPLY_SCRIPT" ]; then
    echo "${RED}❌ Error: No se encontró apply-season.zsh${NC}"
    exit 1
fi

# Hacer el script ejecutable
chmod +x "$APPLY_SCRIPT"

# Verificar si 'at' está disponible
if ! command -v at &> /dev/null; then
    echo "${RED}❌ Error: El comando 'at' no está disponible${NC}"
    echo "${YELLOW}💡 En macOS, instala con: brew install at${NC}"
    echo "${YELLOW}💡 O usa el método alternativo con sleep (ver schedule-seasons-sleep.zsh)${NC}"
    exit 1
fi

# Verificar que el daemon 'at' esté corriendo
if ! pgrep -x "atd" > /dev/null; then
    echo "${YELLOW}⚠️  El daemon 'atd' no está corriendo. Iniciándolo...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist 2>/dev/null || echo "${YELLOW}   Puede que necesites permisos de administrador${NC}"
    else
        # Linux
        sudo systemctl start atd 2>/dev/null || echo "${YELLOW}   Puede que necesites permisos de administrador${NC}"
    fi
fi

echo "${BLUE}🔍 Buscando temporadas en: $SCHEDULED_DIR${NC}\n"

SEASON_COUNT=0
SCHEDULED_COUNT=0

# Buscar todas las temporadas en subdirectorios
for season_dir in "$SCHEDULED_DIR"/*/; do
    if [ ! -d "$season_dir" ]; then
        continue
    fi
    
    CONFIG_FILE="$season_dir/season-config.json"
    if [ ! -f "$CONFIG_FILE" ]; then
        echo "${YELLOW}⚠️  Omitiendo: $(basename "$season_dir") (no tiene season-config.json)${NC}"
        continue
    fi
    
    ((SEASON_COUNT++))
    
    # Leer fecha de publicación
    if command -v jq &> /dev/null; then
        PUBLISH_DATE=$(jq -r '.publish_date' "$CONFIG_FILE")
        SEASON_NAME=$(jq -r '.display_name' "$CONFIG_FILE")
    else
        PUBLISH_DATE=$(grep -o '"publish_date"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
        SEASON_NAME=$(grep -o '"display_name"[[:space:]]*:[[:space:]]*"[^"]*"' "$CONFIG_FILE" | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
    fi
    
    if [ -z "$PUBLISH_DATE" ] || [ "$PUBLISH_DATE" = "null" ]; then
        echo "${YELLOW}⚠️  Omitiendo: $(basename "$season_dir") (fecha inválida)${NC}"
        continue
    fi
    
    echo "${BLUE}📋 Temporada encontrada: $SEASON_NAME${NC}"
    echo "   📅 Fecha: $PUBLISH_DATE"
    echo "   📁 Directorio: $season_dir"
    
    # Convertir fecha a formato para 'at'
    # Formato: YYYY-MM-DD -> MMDDHHmm YYYY (para at)
    YEAR=$(echo "$PUBLISH_DATE" | cut -d'-' -f1)
    MONTH=$(echo "$PUBLISH_DATE" | cut -d'-' -f2)
    DAY=$(echo "$PUBLISH_DATE" | cut -d'-' -f3)
    
    # Usar mediodía (12:00) como hora por defecto
    AT_TIME="${MONTH}${DAY}1200 ${YEAR}"
    
    # Verificar si la fecha es en el futuro
    CURRENT_DATE=$(date +%Y%m%d)
    SEASON_DATE="${YEAR}${MONTH}${DAY}"
    
    if [ "$SEASON_DATE" -lt "$CURRENT_DATE" ]; then
        echo "${YELLOW}   ⚠️  Esta fecha ya pasó, omitiendo agendamiento${NC}\n"
        continue
    fi
    
    # Crear script temporal que se ejecutará con 'at'
    TEMP_SCRIPT=$(mktemp)
    cat > "$TEMP_SCRIPT" <<EOF
#!/bin/zsh
cd "$SCRIPT_DIR"
"$APPLY_SCRIPT" "$season_dir"

# Hacer commit y push (opcional, descomenta si quieres)
# git add -A
# GIT_AUTHOR_DATE='$PUBLISH_DATE 12:00:00' GIT_COMMITTER_DATE='$PUBLISH_DATE 12:00:00' git commit -m "🎨 Temporada: $SEASON_NAME"
# git push
EOF
    
    chmod +x "$TEMP_SCRIPT"
    
    # Agendar con 'at'
    echo "$TEMP_SCRIPT" | at "$AT_TIME" 2>&1 | while read line; do
        if echo "$line" | grep -q "job"; then
            JOB_NUM=$(echo "$line" | grep -o '[0-9]*')
            echo "${GREEN}   ✓${NC} Agendado como job #$JOB_NUM"
            ((SCHEDULED_COUNT++))
        elif echo "$line" | grep -q "warning"; then
            echo "${YELLOW}   ⚠️  $line${NC}"
        else
            echo "   $line"
        fi
    done
    
    echo ""
done

echo "${BLUE}✨ Proceso completado!${NC}"
echo "${GREEN}   Temporadas encontradas: $SEASON_COUNT${NC}"
echo "${GREEN}   Temporadas agendadas: $SCHEDULED_COUNT${NC}\n"

# Mostrar jobs agendados
echo "${BLUE}📋 Jobs agendados actualmente:${NC}"
atq 2>/dev/null || echo "${YELLOW}   (No hay jobs agendados o 'at' no está configurado)${NC}"
echo ""

echo "${YELLOW}💡 Para ver jobs agendados: atq${NC}"
echo "${YELLOW}💡 Para cancelar un job: atrm <job_number>${NC}"
echo "${YELLOW}💡 Para ver detalles de un job: at -c <job_number>${NC}\n"

