#!/bin/bash
# Script para limpiar el historial de git eliminando archivos grandes

set -e

# Suprimir warning de git-filter-branch
export FILTER_BRANCH_SQUELCH_WARNING=1

echo "🧹 Limpiando historial de git..."

# Crear backup del branch actual
echo "📦 Creando backup..."
git branch backup-before-cleanup 2>/dev/null || true

# Eliminar archivos grandes del historial usando git filter-branch
echo "🗑️  Eliminando archivos grandes del historial..."

# Lista de archivos/directorios grandes a eliminar
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch -r \
    "images/cine/cine 1.pdf" \
    "2025/descargar/CONCORD - Galeano.zip" \
    "www.suntzutheartofwar.net/" \
    "ocean-pro/" \
    "p5.js" \
    "lib/p5.js" \
    "2025/" \
    "images/cine/" \
    "2025/descargar/" \
  ' --prune-empty --tag-name-filter cat -- --all

# Limpiar referencias
echo "🧼 Limpiando referencias..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "✅ Limpieza completada!"
echo ""
echo "📊 Tamaño actual del repositorio:"
du -sh .git

echo ""
echo "⚠️  IMPORTANTE: Si ya has hecho push a GitHub, necesitarás hacer:"
echo "   git push origin --force --all"
echo "   git push origin --force --tags"
echo ""
echo "⚠️  Si algo sale mal, puedes restaurar con:"
echo "   git checkout backup-before-cleanup"

