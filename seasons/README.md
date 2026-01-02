# Sistema de Temporadas Automatizado

Este sistema te permite crear y agendar múltiples temporadas para tu sitio web, cada una con su propia paleta de colores, juego p5.js y entradas de blog.

## 🎯 Características

- ✅ Crear temporadas con paletas de colores personalizadas
- ✅ Incluir juegos p5.js únicos por temporada
- ✅ Agregar entradas de blog específicas
- ✅ Agendar publicación automática (cada 45 días durante 2026)
- ✅ Commits de git con fechas programadas

## 📁 Estructura

```
seasons/
├── templates/              # Templates de referencia
│   └── season-template.json
├── scheduled/             # Temporadas agendadas
│   └── season-YYYY-MM-DD/ # Una carpeta por temporada
│       ├── season-config.json
│       ├── season-styles.css
│       ├── game.js
│       ├── blog-posts/
│       └── README.md
├── apply-season.zsh        # Script para aplicar una temporada
├── schedule-seasons.zsh    # Script para agendar con 'at'
├── schedule-seasons-sleep.zsh  # Script alternativo con sleep
└── create-season.zsh      # Helper para crear nuevas temporadas
```

## 🚀 Uso Rápido

### 1. Crear una nueva temporada

```bash
./seasons/create-season.zsh season-neon-dreams 2026-03-01 "Neon Dreams"
```

Esto crea:
- `seasons/scheduled/season-neon-dreams/` con todos los archivos necesarios
- Templates de configuración, CSS y juego

### 2. Personalizar la temporada

Edita los archivos en `seasons/scheduled/season-neon-dreams/`:

- **season-config.json**: Configuración general, paleta de colores, blog posts
- **season-styles.css**: Estilos CSS personalizados (se agregan a styles.css)
- **game.js**: Tu juego p5.js personalizado
- **blog-posts/**: Agrega archivos HTML de entradas de blog

### 3. Agendar la temporada

#### Opción A: Usando 'at' command (recomendado)

```bash
# Asegúrate de que 'at' esté instalado
# macOS: brew install at
# Linux: sudo apt-get install at

./seasons/schedule-seasons.zsh
```

Esto agenda todas las temporadas en `seasons/scheduled/` para publicarse en sus fechas programadas.

#### Opción B: Usando sleep (alternativa)

```bash
# Ejecuta en background
nohup ./seasons/schedule-seasons-sleep.zsh > seasons/schedule.log 2>&1 &
```

Este método mantiene un proceso corriendo que espera hasta cada fecha.

### 4. Aplicar manualmente (opcional)

Si quieres probar o aplicar una temporada manualmente:

```bash
./seasons/apply-season.zsh seasons/scheduled/season-neon-dreams
```

## 📅 Agendar Múltiples Temporadas para 2026

Para crear temporadas cada 45 días durante 2026:

```bash
# Crear temporadas desde enero
./seasons/create-season.zsh season-01 2026-02-15 "Temporada 1"
./seasons/create-season.zsh season-02 2026-04-01 "Temporada 2"  # +45 días
./seasons/create-season.zsh season-03 2026-05-16 "Temporada 3"  # +45 días
./seasons/create-season.zsh season-04 2026-06-30 "Temporada 4"  # +45 días
# ... y así sucesivamente

# Luego agenda todas
./seasons/schedule-seasons.zsh
```

## 🎨 Personalizar Paleta de Colores

Edita `season-styles.css` en cada temporada. Ejemplo:

```css
body.season-neon-dreams {
    --wood-dark: #1a0033;
    --wood-medium: #4a0080;
    --wood-light: #7f00cc;
    --primary-color: #ff00ff;
    --acid-green: #00ffff;
    /* ... más colores ... */
}
```

## 🎮 Crear Juego p5.js

Reemplaza `game.js` con tu juego. El juego debe:
- Crear un canvas con `.parent('gameCanvas')`
- Usar la función `sketch_*` para p5.js
- Finalizar con `new p5(sketch_*, 'gameCanvas')`

Ejemplo mínimo:
```javascript
function sketch_my_game(p) {
    p.setup = function() {
        p.createCanvas(280, 200).parent('gameCanvas');
    };
    p.draw = function() {
        p.background(0);
        // Tu juego aquí
    };
}
new p5(sketch_my_game, 'gameCanvas');
```

## 📝 Agregar Entradas de Blog

1. Crea archivos HTML en `seasons/scheduled/season-XXX/blog-posts/`
2. Usa el template de `blog-post_template.html` como referencia
3. El script las copiará automáticamente al directorio raíz

## 🧪 Testing

### Test Rápido (Solo Verificación)

Ejecuta un test rápido que solo verifica que los scripts existen y son ejecutables, sin hacer cambios:

```bash
./seasons/test-quick.zsh
```

Este test verifica:
- ✅ Que todos los scripts existen
- ✅ Que tienen permisos de ejecución
- ✅ Que los directorios necesarios existen
- ✅ Que las dependencias están disponibles (jq, python3, at)

### Test Completo (Con Ejecución Real)

Ejecuta un test completo que crea una temporada de prueba, la aplica y verifica todo el flujo:

```bash
./seasons/test-system.zsh
```

Este test:
- ✅ Crea una temporada de test
- ✅ Verifica que se crean todos los archivos
- ✅ Aplica la temporada (con restauración automática)
- ✅ Verifica que los cambios se aplican correctamente
- ✅ Limpia todos los archivos de test al finalizar

**Nota:** El test completo hace cambios temporales pero los restaura automáticamente al finalizar.

## 🔧 Troubleshooting

### 'at' command no disponible

**macOS:**
```bash
brew install at
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist
```

**Linux:**
```bash
sudo apt-get install at
sudo systemctl start atd
```

### Ver jobs agendados

```bash
atq  # Lista jobs
at -c <job_number>  # Ver detalles
atrm <job_number>  # Cancelar
```

### Usar método sleep en lugar de 'at'

Si 'at' no funciona, usa el script alternativo:
```bash
nohup ./seasons/schedule-seasons-sleep.zsh > seasons/schedule.log 2>&1 &
```

### Commits con fecha futura

El script prepara los commits con la fecha de publicación. Para hacer commit con fecha futura:

```bash
GIT_AUTHOR_DATE='2026-02-15 12:00:00' GIT_COMMITTER_DATE='2026-02-15 12:00:00' git commit -m "🎨 Temporada: Neon Dreams"
```

## 📋 Checklist para Nueva Temporada

- [ ] Crear temporada con `create-season.zsh`
- [ ] Personalizar `season-config.json`
- [ ] Editar `season-styles.css` con paleta de colores
- [ ] Crear/reemplazar `game.js` con juego p5.js
- [ ] Agregar entradas de blog en `blog-posts/`
- [ ] Probar manualmente con `apply-season.zsh`
- [ ] Agendar con `schedule-seasons.zsh`

## 🎯 Ejemplo Completo

```bash
# 1. Crear temporada
./seasons/create-season.zsh season-cyber-punk 2026-03-15 "Cyber Punk"

# 2. Editar configuración
nano seasons/scheduled/season-cyber-punk/season-config.json

# 3. Personalizar CSS
nano seasons/scheduled/season-cyber-punk/season-styles.css

# 4. Crear juego
nano seasons/scheduled/season-cyber-punk/game.js

# 5. Agregar blog posts
cp blog-post_template.html seasons/scheduled/season-cyber-punk/blog-posts/my-post.html
nano seasons/scheduled/season-cyber-punk/blog-posts/my-post.html

# 6. Probar
./seasons/apply-season.zsh seasons/scheduled/season-cyber-punk

# 7. Agendar
./seasons/schedule-seasons.zsh
```

## 💡 Tips

- Crea todas las temporadas de enero para todo el año
- Usa nombres descriptivos para las temporadas
- Guarda backups antes de aplicar temporadas
- Revisa los logs si algo falla: `cat seasons/schedule.log`
- Los commits con fecha futura funcionan, pero necesitas hacer push manualmente después

---

¡Disfruta creando temporadas increíbles! 🎨✨

