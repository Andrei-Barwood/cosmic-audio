#!/bin/zsh

# Script alternativo usando sleep (no requiere 'at')
# Este script se ejecuta en background y espera hasta la fecha de publicación
# Uso: ./schedule-seasons-sleep.zsh &
# O mejor: nohup ./schedule-seasons-sleep.zsh > schedule.log 2>&1 &

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
PID_FILE="$SCRIPT_DIR/seasons/.schedule-daemon.pid"

echo "${BLUE}📅 Sistema de Agendamiento de Temporadas (Sleep Method)${NC}\n"

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

chmod +x "$APPLY_SCRIPT"

# Función para calcular segundos hasta una fecha
calculate_seconds_until() {
    local target_date="$1"
    local current_epoch=$(date +%s)
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        local target_epoch=$(date -j -f "%Y-%m-%d" "$target_date" "+%s" 2>/dev/null || echo "0")
    else
        # Linux
        local target_epoch=$(date -d "$target_date" +%s 2>/dev/null || echo "0")
    fi
    
    if [ "$target_epoch" -eq 0 ] || [ -z "$target_epoch" ]; then
        echo "0"
        return
    fi
    
    local diff=$((target_epoch - current_epoch))
    echo "$diff"
}

# Función para procesar una temporada
process_season() {
    local season_dir="$1"
    local config_file="$season_dir/season-config.json"
    
    if [ ! -f "$config_file" ]; then
        return 1
    fi
    
    # Leer fecha
    if command -v jq &> /dev/null; then
        local publish_date=$(jq -r '.publish_date' "$config_file")
        local season_name=$(jq -r '.display_name' "$config_file")
    else
        local publish_date=$(grep -o '"publish_date"[[:space:]]*:[[:space:]]*"[^"]*"' "$config_file" | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
        local season_name=$(grep -o '"display_name"[[:space:]]*:[[:space:]]*"[^"]*"' "$config_file" | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
    fi
    
    if [ -z "$publish_date" ] || [ "$publish_date" = "null" ]; then
        return 1
    fi
    
    local seconds_until=$(calculate_seconds_until "$publish_date")
    
    if [ "$seconds_until" -le 0 ]; then
        echo "${YELLOW}⚠️  $season_name: fecha ya pasó${NC}"
        return 1
    fi
    
    echo "${BLUE}📋 Agendando: $season_name${NC}"
    echo "   📅 Fecha: $publish_date"
    echo "   ⏱️  Esperando: $((seconds_until / 86400)) días, $((seconds_until % 86400 / 3600)) horas"
    
    # Crear un proceso en background que espera y luego aplica la temporada
    (
        sleep "$seconds_until"
        echo "${GREEN}🚀 Aplicando temporada: $season_name${NC}"
        "$APPLY_SCRIPT" "$season_dir"
        
        # Opcional: hacer commit
        if [ -d ".git" ]; then
            git add -A
            GIT_DATE="$publish_date 12:00:00"
            GIT_AUTHOR_DATE="$GIT_DATE" GIT_COMMITTER_DATE="$GIT_DATE" git commit -m "🎨 Temporada: $season_name" || true
            # git push || true  # Descomenta si quieres push automático
        fi
    ) &
    
    echo "${GREEN}   ✓${NC} Proceso en background iniciado (PID: $!)\n"
    return 0
}

# Procesar todas las temporadas
SEASON_COUNT=0
for season_dir in "$SCHEDULED_DIR"/*/; do
    if [ ! -d "$season_dir" ]; then
        continue
    fi
    
    if process_season "$season_dir"; then
        ((SEASON_COUNT++))
    fi
done

# Guardar PID del proceso principal
echo $$ > "$PID_FILE"

echo "${BLUE}✨ Proceso completado!${NC}"
echo "${GREEN}   Temporadas agendadas: $SEASON_COUNT${NC}"
echo "${YELLOW}💡 Este script está corriendo en background.${NC}"
echo "${YELLOW}💡 Para detenerlo: kill \$(cat $PID_FILE)${NC}"
echo "${YELLOW}💡 Para ver procesos: ps aux | grep schedule-seasons${NC}\n"

# Mantener el script corriendo
wait

