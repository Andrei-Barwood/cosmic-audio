# 🧪 Guía de Testing - Sistema de Temporadas

## Scripts de Test Disponibles

### 1. `test-quick.zsh` - Test Rápido

**Uso:**
```bash
./seasons/test-quick.zsh
```

**Qué hace:**
- ✅ Verifica que todos los scripts existen
- ✅ Verifica permisos de ejecución
- ✅ Verifica que los directorios necesarios existen
- ✅ Verifica dependencias (jq, python3, at)
- ⚠️ **NO hace cambios** al proyecto

**Cuándo usarlo:**
- Antes de empezar a trabajar
- Para verificar que la instalación está correcta
- Para verificar dependencias

**Ejemplo de output:**
```
⚡ Test Rápido - Sistema de Temporadas
=====================================

Verificando scripts...
✓ create-season.zsh existe
✓ apply-season.zsh existe
...

✓ Pasados: 18
✗ Fallidos: 0
Total: 18

✨ ¡Todo listo! Ejecuta './seasons/test-system.zsh' para tests completos.
```

---

### 2. `test-system.zsh` - Test Completo

**Uso:**
```bash
./seasons/test-system.zsh
```

**Qué hace:**
- ✅ Crea una temporada de test completa
- ✅ Verifica que se crean todos los archivos necesarios
- ✅ Personaliza la temporada (CSS, blog post)
- ✅ Aplica la temporada al proyecto
- ✅ Verifica que los cambios se aplican correctamente
- ✅ **Limpia automáticamente** todos los cambios al finalizar

**Cuándo usarlo:**
- Para verificar que todo el flujo funciona
- Después de hacer cambios en los scripts
- Antes de usar el sistema en producción

**Fases del test:**

1. **FASE 1: Verificación de Prerequisitos**
   - Scripts existen
   - Scripts son ejecutables
   - Directorios existen
   - Archivos base del proyecto existen

2. **FASE 2: Crear Temporada de Test**
   - Crea temporada con `create-season.zsh`
   - Verifica archivos creados
   - Verifica estructura de archivos

3. **FASE 3: Personalizar Temporada**
   - Modifica CSS
   - Crea blog post de test

4. **FASE 4: Aplicar Temporada (Dry Run)**
   - Aplica temporada con `apply-season.zsh`
   - Verifica cambios en HTML
   - Verifica cambios en CSS
   - Restaura archivos originales

5. **FASE 5: Verificar Scheduling**
   - Verifica lectura de configuración
   - Verifica disponibilidad de 'at'
   - Verifica Python3

**Ejemplo de output:**
```
🧪 Sistema de Tests - Temporadas
================================

════════════════════════════════════════
  FASE 1: Verificación de Prerequisitos
════════════════════════════════════════

📋 Test: Scripts principales existen
   ✓ PASSED

...

════════════════════════════════════════
  RESUMEN DE TESTS
════════════════════════════════════════

Tests pasados: 15
Tests fallidos: 0
Total: 15
Porcentaje de éxito: 100%

✨ ¡Todos los tests pasaron! El sistema está funcionando correctamente.
```

---

## Interpretando los Resultados

### Test Rápido

- **Todos pasan (✓)**: El sistema está listo para usar
- **Algunos fallan (✗)**: Revisa qué falló y corrige:
  - Si falta un script: verifica que todos los archivos estén presentes
  - Si falta permiso: ejecuta `chmod +x seasons/*.zsh`
  - Si falta dependencia: instala jq, python3 o at según sea necesario

### Test Completo

- **Todos pasan**: El sistema funciona correctamente, puedes usarlo con confianza
- **Algunos fallan**: 
  - Revisa los mensajes de error específicos
  - Verifica que los scripts tengan permisos de ejecución
  - Asegúrate de que las dependencias estén instaladas
  - Revisa que los archivos base del proyecto existan

---

## Solución de Problemas Comunes

### "Script no es ejecutable"

```bash
chmod +x seasons/*.zsh
```

### "jq no disponible"

```bash
# macOS
brew install jq

# Linux
sudo apt-get install jq
```

El sistema funcionará sin jq, pero con funcionalidad limitada (usará métodos alternativos).

### "python3 no disponible"

```bash
# macOS (generalmente ya está instalado)
# Linux
sudo apt-get install python3
```

Sin python3, el reemplazo automático de juegos puede requerir edición manual.

### "at command no disponible"

```bash
# macOS
brew install at
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist

# Linux
sudo apt-get install at
sudo systemctl start atd
```

Sin 'at', puedes usar `schedule-seasons-sleep.zsh` como alternativa.

### "Test completo falla al aplicar temporada"

- Verifica que `index.html` existe y tiene la estructura esperada
- Verifica que `styles.css` existe
- Revisa los permisos de escritura en el directorio

---

## Ejecutar Tests en CI/CD

Si quieres integrar los tests en un pipeline CI/CD:

```bash
# Test rápido (sin cambios)
./seasons/test-quick.zsh

# Test completo (con limpieza automática)
./seasons/test-system.zsh
```

Ambos scripts retornan:
- `exit 0` si todos los tests pasan
- `exit 1` si algún test falla

---

## Mejores Prácticas

1. **Ejecuta test-quick primero**: Es rápido y no hace cambios
2. **Ejecuta test-system antes de usar en producción**: Verifica todo el flujo
3. **Revisa los mensajes**: Los tests te dirán exactamente qué está fallando
4. **Corrige problemas antes de continuar**: No uses el sistema si los tests fallan

---

## Agregar Tus Propios Tests

Puedes extender `test-system.zsh` para agregar tus propios tests:

```bash
# Agregar un test personalizado
test_step "Mi test personalizado" "[ -f mi-archivo.txt ]"
```

O crear un nuevo script de test específico para tus necesidades.

