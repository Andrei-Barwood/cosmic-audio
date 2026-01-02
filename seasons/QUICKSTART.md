# 🚀 Guía Rápida - Sistema de Temporadas

## Resumen

Sí, es totalmente posible hacer lo que quieres:
- ✅ Crear nuevas temporadas con videojuegos p5.js
- ✅ Agregar entradas de blog
- ✅ Personalizar paletas de colores
- ✅ Programar commits para publicarse en 15 días (o cualquier fecha)
- ✅ Agendar múltiples temporadas para todo 2026

## 🎯 Flujo Rápido (15 días)

### 1. Crear una temporada para publicar en 15 días

```bash
# Calcular fecha (hoy + 15 días)
FECHA=$(date -v+15d +%Y-%m-%d)  # macOS
# O en Linux: FECHA=$(date -d "+15 days" +%Y-%m-%d)

./seasons/create-season.zsh season-mi-temporada "$FECHA" "Mi Temporada"
```

### 2. Personalizar

```bash
# Editar paleta de colores
nano seasons/scheduled/season-mi-temporada/season-styles.css

# Crear tu juego p5.js
nano seasons/scheduled/season-mi-temporada/game.js

# Agregar blog posts
cp blog-post_template.html seasons/scheduled/season-mi-temporada/blog-posts/mi-post.html
nano seasons/scheduled/season-mi-temporada/blog-posts/mi-post.html
```

### 3. Agendar

```bash
# Opción A: Usando 'at' (recomendado)
./seasons/schedule-seasons.zsh

# Opción B: Usando sleep (alternativa)
nohup ./seasons/schedule-seasons-sleep.zsh > seasons/schedule.log 2>&1 &
```

## 📅 Agendar Múltiples Temporadas (Cada 45 días en 2026)

### Crear todas las temporadas de una vez

```bash
# Crear temporadas cada 45 días empezando el 15 de febrero
./seasons/create-year-seasons.zsh 2026-02-15 45
```

Esto creará:
- Temporada 1: 2026-02-15
- Temporada 2: 2026-04-01 (+45 días)
- Temporada 3: 2026-05-16 (+45 días)
- Temporada 4: 2026-06-30 (+45 días)
- ... y así hasta finales de 2026

### Personalizar cada temporada

```bash
# Editar temporada 1
nano seasons/scheduled/season-2026_02_15/season-styles.css
nano seasons/scheduled/season-2026_02_15/game.js

# Editar temporada 2
nano seasons/scheduled/season-2026_04_01/season-styles.css
nano seasons/scheduled/season-2026_04_01/game.js

# ... etc
```

### Agendar todas

```bash
./seasons/schedule-seasons.zsh
```

Esto agendará automáticamente todas las temporadas para publicarse en sus fechas programadas.

## 🎨 Ejemplo: Crear Temporada Completa

```bash
# 1. Crear
./seasons/create-season.zsh season-neon 2026-03-01 "Neon Dreams"

# 2. Personalizar CSS (paleta de colores)
cat > seasons/scheduled/season-neon/season-styles.css <<'EOF'
body.season-neon {
    --wood-dark: #0a0a1a;
    --wood-medium: #1a1a3a;
    --wood-light: #2a2a5a;
    --primary-color: #ff00ff;
    --acid-green: #00ffff;
    --tertiary-color: #ff0080;
    /* ... más colores ... */
}
EOF

# 3. Crear juego p5.js
cat > seasons/scheduled/season-neon/game.js <<'EOF'
function sketch_neon_game(p) {
    p.setup = function() {
        p.createCanvas(280, 200).parent('gameCanvas');
    };
    p.draw = function() {
        p.background(10, 10, 26);
        p.fill(255, 0, 255);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("NEON GAME", p.width/2, p.height/2);
    };
}
new p5(sketch_neon_game, 'gameCanvas');
EOF

# 4. Agregar blog post
cp blog-post_template.html seasons/scheduled/season-neon/blog-posts/neon-post.html
# Editar el blog post...

# 5. Agendar
./seasons/schedule-seasons.zsh
```

## ⚙️ Estrategias de Agendamiento

### Estrategia 1: Usando 'at' command (Mejor para producción)

**Ventajas:**
- ✅ No requiere proceso corriendo
- ✅ Usa el sistema de scheduling del OS
- ✅ Más confiable

**Requisitos:**
```bash
# macOS
brew install at
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist

# Linux
sudo apt-get install at
sudo systemctl start atd
```

**Uso:**
```bash
./seasons/schedule-seasons.zsh
```

### Estrategia 2: Usando sleep (Alternativa)

**Ventajas:**
- ✅ No requiere instalación adicional
- ✅ Funciona en cualquier sistema

**Desventajas:**
- ⚠️ Requiere proceso corriendo
- ⚠️ Se pierde si reinicias la computadora

**Uso:**
```bash
# Ejecutar en background
nohup ./seasons/schedule-seasons-sleep.zsh > seasons/schedule.log 2>&1 &

# Ver logs
tail -f seasons/schedule.log

# Detener
kill $(cat seasons/.schedule-daemon.pid)
```

### Estrategia 3: Cron (Para servidores)

Si tienes acceso a cron, puedes crear un cron job que ejecute el script diariamente:

```bash
# Agregar a crontab
0 0 * * * cd /path/to/cosmic-audio && ./seasons/schedule-seasons.zsh
```

## 📝 Commits con Fecha Futura

El sistema prepara commits con la fecha de publicación. Para hacer commit con fecha futura:

```bash
# El script ya prepara esto, pero si quieres hacerlo manualmente:
GIT_AUTHOR_DATE='2026-02-15 12:00:00' GIT_COMMITTER_DATE='2026-02-15 12:00:00' \
git commit -m "🎨 Temporada: Mi Temporada"
```

**Nota:** Los commits con fecha futura funcionan, pero necesitas hacer `git push` manualmente después de la fecha programada (o automatizarlo).

## 🔍 Verificar y Debugging

```bash
# Ver temporadas creadas
ls -la seasons/scheduled/

# Ver jobs agendados (si usas 'at')
atq

# Ver detalles de un job
at -c <job_number>

# Cancelar un job
atrm <job_number>

# Probar aplicar una temporada manualmente
./seasons/apply-season.zsh seasons/scheduled/season-mi-temporada
```

## 💡 Tips Importantes

1. **Crea todas las temporadas en enero**: Así puedes personalizarlas con calma
2. **Prueba manualmente primero**: Usa `apply-season.zsh` para verificar
3. **Backup antes de aplicar**: El script hace backups automáticos
4. **Revisa los logs**: Si algo falla, revisa `seasons/schedule.log`
5. **Commits futuros**: Git permite fechas futuras, pero el push debe ser manual o automatizado

## 🎯 Ejemplo Completo: Todo el Año 2026

```bash
# Enero: Crear todas las temporadas
./seasons/create-year-seasons.zsh 2026-02-15 45

# Personalizar cada una (toma tu tiempo)
# Edita season-styles.css, game.js, blog-posts de cada temporada

# Febrero: Agendar todas
./seasons/schedule-seasons.zsh

# ¡Listo! Las temporadas se publicarán automáticamente cada 45 días
```

---

¿Preguntas? Revisa `seasons/README.md` para documentación completa.

