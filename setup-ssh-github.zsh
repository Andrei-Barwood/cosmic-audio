#!/bin/zsh
# Script para configurar SSH con GitHub y cambiar remote a SSH

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "${BLUE}🔐 Configurando SSH para GitHub...${NC}\n"

# 1. Verificar si ya existe una clave SSH
SSH_KEY_PATH="$HOME/.ssh/id_ed25519"
if [ -f "$SSH_KEY_PATH" ]; then
    echo "${YELLOW}⚠️  Ya existe una clave SSH en: $SSH_KEY_PATH${NC}"
    read "?¿Quieres usar la clave existente? (y/n): " use_existing
    if [[ "$use_existing" =~ ^[Yy]$ ]]; then
        echo "${GREEN}✓ Usando clave existente...${NC}\n"
        KEY_PATH="$SSH_KEY_PATH"
    else
        # Generar nueva clave
        echo "${BLUE}Generando nueva clave SSH...${NC}"
        ssh-keygen -t ed25519 -C "andresbarbudo@icloud.com" -f "$SSH_KEY_PATH" -N ""
        KEY_PATH="$SSH_KEY_PATH"
    fi
else
    # Generar nueva clave SSH
    echo "${BLUE}📝 Generando nueva clave SSH...${NC}"
    ssh-keygen -t ed25519 -C "andresbarbudo@icloud.com" -f "$SSH_KEY_PATH" -N ""
    KEY_PATH="$SSH_KEY_PATH"
fi

# 2. Iniciar ssh-agent y agregar la clave
echo "\n${BLUE}🔑 Agregando clave al ssh-agent...${NC}"
eval "$(ssh-agent -s)" > /dev/null 2>&1

# Verificar si la clave ya está agregada
if ssh-add -l | grep -q "$(ssh-keygen -lf "$KEY_PATH" | awk '{print $2}')" 2>/dev/null; then
    echo "${GREEN}✓ Clave ya está en el ssh-agent${NC}"
else
    ssh-add "$KEY_PATH"
    echo "${GREEN}✓ Clave agregada al ssh-agent${NC}"
fi

# 3. Mostrar la clave pública
echo "\n${YELLOW}═══════════════════════════════════════════════════════════${NC}"
echo "${YELLOW}📋 Tu clave pública SSH (cópiala):${NC}"
echo "${YELLOW}═══════════════════════════════════════════════════════════${NC}\n"
cat "${KEY_PATH}.pub"
echo "\n${YELLOW}═══════════════════════════════════════════════════════════${NC}\n"

# 4. Instrucciones para agregar a GitHub
echo "${BLUE}📝 Siguiente paso:${NC}"
echo "1. Ve a: ${GREEN}https://github.com/settings/keys${NC}"
echo "2. Click en ${GREEN}'New SSH key'${NC}"
echo "3. Título: ${GREEN}MacBook Air - Cosmic Audio${NC} (o el que prefieras)"
echo "4. Pega la clave pública mostrada arriba"
echo "5. Click en ${GREEN}'Add SSH key'${NC}\n"

read "?¿Ya agregaste la clave a GitHub? (y/n): " key_added

if [[ ! "$key_added" =~ ^[Yy]$ ]]; then
    echo "${YELLOW}⚠️  Por favor agrega la clave a GitHub primero y luego ejecuta este script de nuevo.${NC}"
    exit 1
fi

# 5. Probar conexión SSH con GitHub
echo "\n${BLUE}🔍 Probando conexión SSH con GitHub...${NC}"
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    echo "${GREEN}✓ Conexión SSH exitosa con GitHub!${NC}\n"
else
    echo "${RED}✗ Error: No se pudo conectar con GitHub${NC}"
    echo "${YELLOW}Verifica que agregaste la clave correctamente.${NC}"
    exit 1
fi

# 6. Cambiar remote a SSH
echo "${BLUE}🔄 Cambiando remote de HTTPS a SSH...${NC}"
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")

if [[ "$CURRENT_REMOTE" == *"git@github.com"* ]]; then
    echo "${GREEN}✓ El remote ya está configurado como SSH${NC}"
else
    # Extraer usuario y repo del URL actual
    if [[ "$CURRENT_REMOTE" == *"https://github.com"* ]]; then
        REPO_PATH=$(echo "$CURRENT_REMOTE" | sed 's|https://github.com/||' | sed 's|\.git$||')
        NEW_REMOTE="git@github.com:${REPO_PATH}.git"
    else
        # Asumir el repo actual
        NEW_REMOTE="git@github.com:Andrei-Barwood/cosmic-audio.git"
    fi
    
    git remote set-url origin "$NEW_REMOTE"
    echo "${GREEN}✓ Remote cambiado a: $NEW_REMOTE${NC}"
fi

# 7. Verificar configuración final
echo "\n${BLUE}📊 Configuración final:${NC}"
echo "${GREEN}Remote URL:${NC} $(git remote get-url origin)"
echo "${GREEN}Clave SSH:${NC} $KEY_PATH"
echo "${GREEN}Estado:${NC} $(git status --porcelain 2>/dev/null | wc -l | xargs) cambios pendientes\n"

echo "${GREEN}✅ ¡Configuración SSH completada!${NC}\n"
echo "${BLUE}Ahora puedes hacer push con:${NC}"
echo "  ${GREEN}git push origin --force --all${NC}\n"

