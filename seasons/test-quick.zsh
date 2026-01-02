#!/bin/zsh

# Test rápido - Solo verifica que los scripts existen y son ejecutables
# No hace cambios al proyecto

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

echo "${BLUE}⚡ Test Rápido - Sistema de Temporadas${NC}"
echo "${BLUE}=====================================${NC}\n"

PASSED=0
FAILED=0

check() {
    local name="$1"
    local condition="$2"
    
    if eval "$condition" > /dev/null 2>&1; then
        echo "${GREEN}✓${NC} $name"
        PASSED=$((PASSED + 1))
    else
        echo "${RED}✗${NC} $name"
        FAILED=$((FAILED + 1))
    fi
}

echo "${BLUE}Verificando scripts...${NC}\n"

check "create-season.zsh existe" "[ -f seasons/create-season.zsh ]"
check "apply-season.zsh existe" "[ -f seasons/apply-season.zsh ]"
check "schedule-seasons.zsh existe" "[ -f seasons/schedule-seasons.zsh ]"
check "schedule-seasons-sleep.zsh existe" "[ -f seasons/schedule-seasons-sleep.zsh ]"
check "create-year-seasons.zsh existe" "[ -f seasons/create-year-seasons.zsh ]"
check "test-system.zsh existe" "[ -f seasons/test-system.zsh ]"

echo "\n${BLUE}Verificando permisos...${NC}\n"

check "create-season.zsh es ejecutable" "[ -x seasons/create-season.zsh ]"
check "apply-season.zsh es ejecutable" "[ -x seasons/apply-season.zsh ]"
check "schedule-seasons.zsh es ejecutable" "[ -x seasons/schedule-seasons.zsh ]"
check "test-system.zsh es ejecutable" "[ -x seasons/test-system.zsh ]"

echo "\n${BLUE}Verificando directorios...${NC}\n"

check "Directorio seasons/scheduled existe" "[ -d seasons/scheduled ]"
check "Directorio seasons/templates existe" "[ -d seasons/templates ]"

echo "\n${BLUE}Verificando archivos base...${NC}\n"

check "index.html existe" "[ -f index.html ]"
check "styles.css existe" "[ -f styles.css ]"
check "blog.html existe" "[ -f blog.html ]"

echo "\n${BLUE}Verificando dependencias...${NC}\n"

if command -v jq &> /dev/null; then
    echo "${GREEN}✓${NC} jq disponible (útil para parsear JSON)"
    PASSED=$((PASSED + 1))
else
    echo "${YELLOW}⚠${NC} jq no disponible (el sistema funcionará pero con funcionalidad limitada)"
fi

if command -v python3 &> /dev/null; then
    echo "${GREEN}✓${NC} python3 disponible (necesario para reemplazo automático de juegos)"
    PASSED=$((PASSED + 1))
else
    echo "${YELLOW}⚠${NC} python3 no disponible (el reemplazo de juegos puede requerir edición manual)"
fi

if command -v at &> /dev/null; then
    echo "${GREEN}✓${NC} 'at' command disponible"
    PASSED=$((PASSED + 1))
    
    if pgrep -x "atd" > /dev/null 2>&1 || pgrep -f "atd" > /dev/null 2>&1; then
        echo "${GREEN}✓${NC} 'atd' daemon corriendo"
        PASSED=$((PASSED + 1))
    else
        echo "${YELLOW}⚠${NC} 'atd' no está corriendo (ejecuta: sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist)"
    fi
else
    echo "${YELLOW}⚠${NC} 'at' no disponible (usa schedule-seasons-sleep.zsh como alternativa)"
fi

echo "\n${BLUE}════════════════════════════════${NC}"
echo "${BLUE}  RESUMEN${NC}"
echo "${BLUE}════════════════════════════════${NC}\n"

TOTAL=$((PASSED + FAILED))
if [ $TOTAL -eq 0 ]; then
    TOTAL=1
fi
echo "${GREEN}✓ Pasados: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo "${RED}✗ Fallidos: $FAILED${NC}"
else
    echo "${GREEN}✗ Fallidos: $FAILED${NC}"
fi
echo "${BLUE}Total: $TOTAL${NC}\n"

if [ $FAILED -eq 0 ]; then
    echo "${GREEN}✨ ¡Todo listo! Ejecuta './seasons/test-system.zsh' para tests completos.${NC}\n"
    exit 0
else
    echo "${YELLOW}⚠️  Algunas verificaciones fallaron. Revisa los mensajes arriba.${NC}\n"
    exit 1
fi

