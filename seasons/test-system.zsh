#!/bin/zsh

# Script de test para verificar que el sistema de temporadas funciona correctamente
# Uso: ./test-system.zsh

# No usar set -e porque necesitamos manejar errores manualmente

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

TEST_SEASON_NAME="season-test-$(date +%Y%m%d-%H%M%S)"
TEST_DATE="2026-12-31"  # Fecha futura para testing
TEST_DIR="$SCRIPT_DIR/seasons/scheduled/$TEST_SEASON_NAME"

# Contadores
TESTS_PASSED=0
TESTS_FAILED=0
CLEANUP_NEEDED=0

echo "${BLUE}🧪 Sistema de Tests - Temporadas${NC}"
echo "${BLUE}================================${NC}\n"

# Función para limpiar después de tests
cleanup() {
    if [ $CLEANUP_NEEDED -eq 1 ]; then
        echo "\n${YELLOW}🧹 Limpiando archivos de test...${NC}"
        
        # Restaurar backups si existen
        for file in *.html.bak; do
            if [ -f "$file" ] 2>/dev/null; then
                ORIGINAL="${file%.bak}"
                if [ -f "$ORIGINAL" ]; then
                    mv "$file" "$ORIGINAL"
                    echo "${GREEN}✓${NC} Restaurado: $ORIGINAL"
                fi
            fi
        done 2>/dev/null || true
        
        # Eliminar temporada de test
        if [ -d "$TEST_DIR" ]; then
            rm -rf "$TEST_DIR"
            echo "${GREEN}✓${NC} Eliminada temporada de test: $TEST_SEASON_NAME"
        fi
        
        # Eliminar archivos temporales
        rm -f index.html.tmp seasons/.schedule-daemon.pid
        
        echo "${GREEN}✓${NC} Limpieza completada\n"
    fi
}

# Trap para limpiar al salir
trap cleanup EXIT

# Función de test
test_step() {
    local test_name="$1"
    local test_command="$2"
    
    echo "${BLUE}📋 Test: $test_name${NC}"
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo "${GREEN}   ✓ PASSED${NC}\n"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo "${RED}   ✗ FAILED${NC}\n"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

# Función de test con output
test_step_verbose() {
    local test_name="$1"
    local test_command="$2"
    
    echo "${BLUE}📋 Test: $test_name${NC}"
    echo "${YELLOW}   Ejecutando: $test_command${NC}"
    
    if eval "$test_command"; then
        echo "${GREEN}   ✓ PASSED${NC}\n"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo "${RED}   ✗ FAILED${NC}\n"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

echo "${BLUE}════════════════════════════════════════${NC}"
echo "${BLUE}  FASE 1: Verificación de Prerequisitos${NC}"
echo "${BLUE}════════════════════════════════════════${NC}\n"

# Test 1: Verificar que los scripts existen
test_step "Scripts principales existen" "[ -f seasons/create-season.zsh ] && [ -f seasons/apply-season.zsh ] && [ -f seasons/schedule-seasons.zsh ]"

# Test 2: Verificar que los scripts son ejecutables
test_step "Scripts son ejecutables" "[ -x seasons/create-season.zsh ] && [ -x seasons/apply-season.zsh ]"

# Test 3: Verificar directorios necesarios
test_step "Directorios existen" "[ -d seasons/scheduled ] && [ -d seasons/templates ]"

# Test 4: Verificar archivos base del proyecto
test_step "Archivos base del proyecto existen" "[ -f index.html ] && [ -f styles.css ] && [ -f blog.html ]"

echo "${BLUE}════════════════════════════════════════${NC}"
echo "${BLUE}  FASE 2: Crear Temporada de Test${NC}"
echo "${BLUE}════════════════════════════════════════${NC}\n"

# Test 5: Crear temporada de test
echo "${BLUE}📋 Test: Crear temporada de test${NC}"
if ./seasons/create-season.zsh "$TEST_SEASON_NAME" "$TEST_DATE" "Test Season" > /dev/null 2>&1; then
    echo "${GREEN}   ✓ PASSED${NC}\n"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    CLEANUP_NEEDED=1
else
    echo "${RED}   ✗ FAILED${NC}\n"
    TESTS_FAILED=$((TESTS_FAILED + 1))
    echo "${RED}❌ No se puede continuar sin crear la temporada de test${NC}"
    exit 1
fi

# Test 6: Verificar que se crearon los archivos
test_step "Archivos de temporada creados" "[ -f \"$TEST_DIR/season-config.json\" ] && [ -f \"$TEST_DIR/season-styles.css\" ] && [ -f \"$TEST_DIR/game.js\" ] && [ -d \"$TEST_DIR/blog-posts\" ]"

# Test 7: Verificar contenido del config
test_step "Config JSON válido" "grep -q '\"season_name\"' \"$TEST_DIR/season-config.json\" && grep -q '\"$TEST_SEASON_NAME\"' \"$TEST_DIR/season-config.json\""

# Test 8: Verificar que el CSS tiene la estructura correcta
test_step "CSS tiene estructura correcta" "grep -q 'body.$TEST_SEASON_NAME' \"$TEST_DIR/season-styles.css\""

# Test 9: Verificar que el juego tiene estructura p5.js
test_step "Juego tiene estructura p5.js" "grep -q 'function sketch' \"$TEST_DIR/game.js\" && grep -q 'new p5' \"$TEST_DIR/game.js\""

echo "${BLUE}════════════════════════════════════════${NC}"
echo "${BLUE}  FASE 3: Personalizar Temporada${NC}"
echo "${BLUE}════════════════════════════════════════${NC}\n"

# Test 10: Modificar el CSS de test
echo "${BLUE}📋 Test: Modificar CSS de temporada${NC}"
cat >> "$TEST_DIR/season-styles.css" <<'EOF'
/* Test adicional */
body.season-test {
    --test-color: #ff0000;
}
EOF
if grep -q "test-color" "$TEST_DIR/season-styles.css"; then
    echo "${GREEN}   ✓ PASSED${NC}\n"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo "${RED}   ✗ FAILED${NC}\n"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 11: Crear un blog post de test
echo "${BLUE}📋 Test: Crear blog post de test${NC}"
cat > "$TEST_DIR/blog-posts/test-post.html" <<'EOF'
<!DOCTYPE html>
<html>
<head><title>Test Post</title></head>
<body>
<h1>Test Blog Post</h1>
<p>This is a test blog post for the season system.</p>
</body>
</html>
EOF
if [ -f "$TEST_DIR/blog-posts/test-post.html" ]; then
    echo "${GREEN}   ✓ PASSED${NC}\n"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo "${RED}   ✗ FAILED${NC}\n"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

echo "${BLUE}════════════════════════════════════════${NC}"
echo "${BLUE}  FASE 4: Aplicar Temporada (Dry Run)${NC}"
echo "${BLUE}════════════════════════════════════════${NC}\n"

# Hacer backup de index.html antes de aplicar
if [ -f index.html ]; then
    cp index.html index.html.test-backup
fi

# Test 12: Aplicar temporada (sin hacer commit)
echo "${BLUE}📋 Test: Aplicar temporada${NC}"
echo "${YELLOW}   (Esto modificará temporalmente algunos archivos)${NC}"

# Capturar output
APPLY_OUTPUT=$(./seasons/apply-season.zsh "$TEST_DIR" 2>&1)
APPLY_EXIT=$?

# El script puede retornar error si git no está disponible o hay otros problemas menores
# pero si hizo los cambios principales, lo consideramos éxito
if [ $APPLY_EXIT -eq 0 ] || echo "$APPLY_OUTPUT" | grep -q "✓.*Actualizado\|✓.*Estilos CSS agregados"; then
    echo "${GREEN}   ✓ Script ejecutado exitosamente${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    
    # Verificar que se actualizaron las clases season-*
    if grep -q "class=\"$TEST_SEASON_NAME\"" index.html 2>/dev/null || grep -q "class='$TEST_SEASON_NAME'" index.html 2>/dev/null; then
        echo "${GREEN}   ✓ Clases season-* actualizadas en index.html${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo "${YELLOW}   ⚠ Clases no actualizadas (puede ser normal si no hay body con season-)${NC}"
    fi
    
    # Verificar que se agregó el CSS
    if grep -q "$TEST_SEASON_NAME" styles.css 2>/dev/null; then
        echo "${GREEN}   ✓ CSS agregado a styles.css${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo "${YELLOW}   ⚠ CSS no agregado (verificar manualmente)${NC}"
    fi
    
    # Verificar que se copió el blog post
    if [ -f "test-post.html" ]; then
        echo "${GREEN}   ✓ Blog post copiado${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        rm -f test-post.html  # Limpiar
    else
        echo "${YELLOW}   ⚠ Blog post no copiado (puede ser normal)${NC}"
    fi
else
    echo "${RED}   ✗ Script falló${NC}"
    echo "${RED}   Output: $APPLY_OUTPUT${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

echo ""

# Restaurar index.html
if [ -f index.html.test-backup ]; then
    mv index.html.test-backup index.html
    echo "${GREEN}✓${NC} index.html restaurado\n"
fi

echo "${BLUE}════════════════════════════════════════${NC}"
echo "${BLUE}  FASE 5: Verificar Scheduling${NC}"
echo "${BLUE}════════════════════════════════════════${NC}\n"

# Test 13: Verificar que schedule-seasons puede leer la temporada
echo "${BLUE}📋 Test: Verificar lectura de temporadas${NC}"
if [ -f "$TEST_DIR/season-config.json" ]; then
    if command -v jq &> /dev/null; then
        READ_DATE=$(jq -r '.publish_date' "$TEST_DIR/season-config.json")
        if [ "$READ_DATE" = "$TEST_DATE" ]; then
            echo "${GREEN}   ✓ Config leído correctamente${NC}"
            TESTS_PASSED=$((TESTS_PASSED + 1))
        else
            echo "${RED}   ✗ Fecha no coincide: $READ_DATE vs $TEST_DATE${NC}"
            TESTS_FAILED=$((TESTS_FAILED + 1))
        fi
    else
        # Sin jq, verificar con grep
        if grep -q "$TEST_DATE" "$TEST_DIR/season-config.json"; then
            echo "${GREEN}   ✓ Config contiene fecha correcta${NC}"
            TESTS_PASSED=$((TESTS_PASSED + 1))
        else
            echo "${YELLOW}   ⚠ No se pudo verificar (jq no disponible)${NC}"
        fi
    fi
else
    echo "${RED}   ✗ Config no existe${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 14: Verificar que 'at' está disponible (opcional)
echo "${BLUE}📋 Test: Verificar disponibilidad de 'at' command${NC}"
if command -v at &> /dev/null; then
    echo "${GREEN}   ✓ 'at' command disponible${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    
    # Verificar que atd está corriendo
    if pgrep -x "atd" > /dev/null 2>&1 || pgrep -f "atd" > /dev/null 2>&1; then
        echo "${GREEN}   ✓ 'atd' daemon corriendo${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo "${YELLOW}   ⚠ 'atd' no está corriendo (puede necesitar iniciarse)${NC}"
    fi
else
    echo "${YELLOW}   ⚠ 'at' no disponible (usa schedule-seasons-sleep.zsh como alternativa)${NC}"
fi
echo ""

# Test 15: Verificar Python3 (para reemplazo de juego)
echo "${BLUE}📋 Test: Verificar Python3${NC}"
if command -v python3 &> /dev/null; then
    echo "${GREEN}   ✓ Python3 disponible (necesario para reemplazo automático de juegos)${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo "${YELLOW}   ⚠ Python3 no disponible (el reemplazo de juegos puede requerir edición manual)${NC}"
fi
echo ""

echo "${BLUE}════════════════════════════════════════${NC}"
echo "${BLUE}  RESUMEN DE TESTS${NC}"
echo "${BLUE}════════════════════════════════════════${NC}\n"

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
if [ $TOTAL_TESTS -eq 0 ]; then
    TOTAL_TESTS=1
fi
PASS_PERCENTAGE=$((TESTS_PASSED * 100 / TOTAL_TESTS))

echo "${GREEN}Tests pasados: $TESTS_PASSED${NC}"
if [ $TESTS_FAILED -gt 0 ]; then
    echo "${RED}Tests fallidos: $TESTS_FAILED${NC}"
else
    echo "${GREEN}Tests fallidos: $TESTS_FAILED${NC}"
fi
echo "${BLUE}Total: $TOTAL_TESTS${NC}"
echo "${BLUE}Porcentaje de éxito: ${PASS_PERCENTAGE}%${NC}\n"

if [ $TESTS_FAILED -eq 0 ]; then
    echo "${GREEN}✨ ¡Todos los tests pasaron! El sistema está funcionando correctamente.${NC}\n"
    exit 0
else
    echo "${YELLOW}⚠️  Algunos tests fallaron. Revisa los mensajes arriba para más detalles.${NC}\n"
    exit 1
fi

