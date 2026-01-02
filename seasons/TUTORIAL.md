# 🎨 Tutorial Completo - Sistema de Temporadas Agendadas

## 📚 Índice

1. [Conceptos Básicos](#conceptos-básicos)
2. [Estructura del Sistema](#estructura-del-sistema)
3. [Tutorial Paso a Paso](#tutorial-paso-a-paso)
4. [Ejemplos Prácticos](#ejemplos-prácticos)
5. [Agendar Múltiples Temporadas](#agendar-múltiples-temporadas)
6. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 🎯 Conceptos Básicos

### ¿Qué es una "Temporada"?

Una **temporada** es un conjunto de cambios que se aplican a tu sitio web en una fecha específica:

- 🎨 **Paleta de colores** personalizada (CSS)
- 🎮 **Juego p5.js** único para el index
- 📝 **Entradas de blog** nuevas
- 🔄 **Cambio automático** de la clase `season-*` en todos los HTML

### ¿Cómo Funciona el Agendamiento?

El sistema permite **crear temporadas ahora** y **programarlas para publicarse automáticamente** en el futuro. Tienes dos opciones:

1. **`at` command**: Usa el sistema de scheduling del OS (recomendado)
2. **`sleep` method**: Proceso en background que espera hasta la fecha

---

## 📁 Estructura del Sistema

```
cosmic-audio/
├── seasons/
│   ├── scheduled/          ← Temporadas agendadas (aquí creas las tuyas)
│   │   └── season-XXX/      ← Cada temporada tiene su carpeta
│   │       ├── season-config.json    ← Configuración (nombre, fecha, colores)
│   │       ├── season-styles.css      ← Paleta de colores CSS
│   │       ├── game.js               ← Juego p5.js para el index
│   │       ├── blog-posts/           ← Entradas de blog (HTML)
│   │       └── README.md              ← Documentación de la temporada
│   ├── templates/           ← Templates de referencia
│   ├── create-season.zsh    ← Crea una nueva temporada
│   ├── apply-season.zsh     ← Aplica una temporada al proyecto
│   ├── schedule-seasons.zsh ← Agenda temporadas con 'at'
│   ├── schedule-seasons-sleep.zsh ← Agenda con 'sleep' (alternativa)
│   ├── create-year-seasons.zsh ← Crea múltiples temporadas
│   └── test-system.zsh      ← Tests del sistema
```

---

## 🚀 Tutorial Paso a Paso

### Paso 1: Crear tu Primera Temporada

#### 1.1. Crear la temporada

```bash
# Formato: ./seasons/create-season.zsh <nombre> <fecha> <nombre-display>
./seasons/create-season.zsh season-neon-dreams 2026-03-01 "Neon Dreams"
```

**Parámetros:**
- `season-neon-dreams`: Nombre técnico (sin espacios, usa guiones)
- `2026-03-01`: Fecha de publicación (formato: YYYY-MM-DD)
- `"Neon Dreams"`: Nombre bonito para mostrar

**Esto crea:**
```
seasons/scheduled/season-neon-dreams/
├── season-config.json
├── season-styles.css
├── game.js
├── blog-posts/
└── README.md
```

#### 1.2. Verificar que se creó

```bash
ls -la seasons/scheduled/season-neon-dreams/
```

Deberías ver todos los archivos listados arriba.

---

### Paso 2: Personalizar la Paleta de Colores

#### 2.1. Abrir el archivo CSS

```bash
nano seasons/scheduled/season-neon-dreams/season-styles.css
# O usa tu editor favorito
```

#### 2.2. Editar los colores

El archivo tiene esta estructura:

```css
/* Temporada: Neon Dreams */
body.season-neon-dreams {
    --wood-dark: #2A1A11;        /* Fondo oscuro base */
    --wood-medium: #4A2E1F;      /* Fondo medio */
    --wood-light: #8B5E3C;       /* Fondo claro */
    --primary-color: #ccff00;    /* Color principal (botones, acentos) */
    --acid-green: #ccff00;        /* Verde ácido (breakcore) */
    --tertiary-color: #ff4400;   /* Color terciario (degradados) */
    /* ... más colores ... */
}
```

**Ejemplo para "Neon Dreams":**

```css
body.season-neon-dreams {
    --wood-dark: #0a0a1a;        /* Azul oscuro neón */
    --wood-medium: #1a1a3a;      /* Azul medio */
    --wood-light: #2a2a5a;       /* Azul claro */
    --primary-color: #ff00ff;    /* Magenta neón */
    --acid-green: #00ffff;       /* Cyan neón */
    --tertiary-color: #ff0080;   /* Rosa neón */
    --secondary-color: #2a2a5a;
    --success-color: #00ffff;
    --olive-accent: #ff00ff;
    --teal-dark: #1a1a3a;
    --teal-darker: #0a0a1a;
    --teal-medium: #2a2a5a;
    --dark-bg: #0a0a1a;
    --darker-bg: #050510;
    --card-bg: rgba(26, 26, 58, 0.95);
    --card-hover-bg: rgba(42, 42, 90, 0.95);
    --text-primary: #ffffff;
    --text-secondary: #00ffff;
    --border-color: #ff00ff;
    --border-accent: #00ffff;
    --glitch-color-1: #ff00ff;
    --glitch-color-2: #00ffff;
}
```

#### 2.3. Guardar y cerrar

En nano: `Ctrl+X`, luego `Y`, luego `Enter`

---

### Paso 3: Crear el Juego p5.js

#### 3.1. Abrir el archivo del juego

```bash
nano seasons/scheduled/season-neon-dreams/game.js
```

#### 3.2. Escribir tu juego

El template básico es:

```javascript
function sketch_neon_game(p) {
    // Colores de la temporada
    let colors = {
        bg: "#0a0a1a",
        primary: "#ff00ff",
        secondary: "#00ffff"
    };
    
    let particles = [];
    
    p.setup = function() {
        p.createCanvas(280, 200).parent('gameCanvas');
        p.frameRate(30);
        
        // Inicializar partículas
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                vx: p.random(-2, 2),
                vy: p.random(-2, 2),
                size: p.random(2, 5)
            });
        }
    };
    
    p.draw = function() {
        p.background(colors.bg, 20); // Fade suave
        
        // Actualizar y dibujar partículas
        for (let part of particles) {
            part.x += part.vx;
            part.y += part.vy;
            
            // Rebote en bordes
            if (part.x < 0 || part.x > p.width) part.vx *= -1;
            if (part.y < 0 || part.y > p.height) part.vy *= -1;
            
            // Dibujar partícula
            p.fill(colors.primary);
            p.noStroke();
            p.circle(part.x, part.y, part.size);
        }
        
        // Título
        p.fill(colors.secondary);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);
        p.text("NEON DREAMS", p.width/2, p.height/2);
    };
}

new p5(sketch_neon_game, 'gameCanvas');
```

**Puntos importantes:**
- La función debe llamarse `sketch_*` (p5.js requiere esto)
- Usa `.parent('gameCanvas')` para que se inserte en el lugar correcto
- Finaliza con `new p5(sketch_*, 'gameCanvas')`

#### 3.3. Guardar

---

### Paso 4: Agregar Entradas de Blog

#### 4.1. Crear el archivo HTML del blog post

```bash
cp blog-post_template.html seasons/scheduled/season-neon-dreams/blog-posts/neon-dreams-post.html
```

#### 4.2. Editar el blog post

```bash
nano seasons/scheduled/season-neon-dreams/blog-posts/neon-dreams-post.html
```

Edita el contenido según necesites. El template ya tiene la estructura básica.

#### 4.3. (Opcional) Agregar más posts

```bash
cp blog-post_template.html seasons/scheduled/season-neon-dreams/blog-posts/segundo-post.html
# Edita segundo-post.html
```

---

### Paso 5: Configurar la Temporada

#### 5.1. Editar el archivo de configuración

```bash
nano seasons/scheduled/season-neon-dreams/season-config.json
```

#### 5.2. Ajustar la configuración

```json
{
  "season_name": "season-neon-dreams",
  "display_name": "Neon Dreams",
  "publish_date": "2026-03-01",
  "description": "Una temporada con estética neón cyberpunk",
  "color_palette": {
    "primary-color": "#ff00ff",
    "acid-green": "#00ffff",
    // ... más colores (opcional, ya están en CSS)
  },
  "game": {
    "type": "p5js",
    "file": "game.js",
    "title": "NEON DREAMS",
    "subtitle": "Cyberpunk Arcade",
    "description": "Mega Doll Arcade",
    "quote": "Welcome to the neon future"
  },
  "blog_posts": [
    {
      "title": "Neon Dreams: El Futuro es Ahora",
      "filename": "neon-dreams-post.html",
      "category": "News",
      "date": "2026-03-01",
      "excerpt": "Explorando la estética cyberpunk..."
    }
  ]
}
```

**Nota:** Los campos en `game` y `blog_posts` son opcionales, pero ayudan a personalizar el título del juego en el index.

---

### Paso 6: Probar la Temporada (Opcional pero Recomendado)

#### 6.1. Aplicar manualmente para probar

```bash
./seasons/apply-season.zsh seasons/scheduled/season-neon-dreams
```

Esto aplica la temporada **ahora** (sin esperar la fecha).

#### 6.2. Verificar los cambios

- Abre `index.html` en tu navegador
- Verifica que los colores cambiaron
- Verifica que el juego funciona
- Verifica que las clases `season-*` se actualizaron

#### 6.3. Revertir si es necesario

Si algo no te gusta, puedes:
- Editar los archivos en `seasons/scheduled/season-neon-dreams/`
- Volver a aplicar con `apply-season.zsh`
- O restaurar manualmente desde git si hiciste commit

---

### Paso 7: Agendar la Temporada

#### Opción A: Usando 'at' command (Recomendado)

##### 7.1. Verificar que 'at' está instalado

```bash
which at
# Debería mostrar: /usr/bin/at o similar
```

Si no está:
```bash
# macOS
brew install at
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist

# Linux
sudo apt-get install at
sudo systemctl start atd
```

##### 7.2. Agendar todas las temporadas

```bash
./seasons/schedule-seasons.zsh
```

Este script:
- Lee todas las temporadas en `seasons/scheduled/`
- Las agenda automáticamente para sus fechas
- Muestra los job numbers

**Output esperado:**
```
📅 Sistema de Agendamiento de Temporadas

🔍 Buscando temporadas en: seasons/scheduled/

📋 Temporada encontrada: Neon Dreams
   📅 Fecha: 2026-03-01
   📁 Directorio: seasons/scheduled/season-neon-dreams
   ✓ Agendado como job #1

✨ Proceso completado!
   Temporadas encontradas: 1
   Temporadas agendadas: 1
```

##### 7.3. Verificar jobs agendados

```bash
atq
# Muestra todos los jobs agendados
```

##### 7.4. Ver detalles de un job

```bash
at -c 1  # Reemplaza 1 con el número del job
```

##### 7.5. Cancelar un job (si es necesario)

```bash
atrm 1  # Reemplaza 1 con el número del job
```

#### Opción B: Usando sleep (Alternativa)

Si no puedes usar 'at', usa el método con sleep:

```bash
# Ejecutar en background
nohup ./seasons/schedule-seasons-sleep.zsh > seasons/schedule.log 2>&1 &

# Ver logs
tail -f seasons/schedule.log

# Detener (si es necesario)
kill $(cat seasons/.schedule-daemon.pid)
```

**Nota:** Este método requiere que el proceso esté corriendo hasta la fecha de publicación.

---

### Paso 8: Verificar que Todo Funciona

#### 8.1. Ejecutar tests

```bash
# Test rápido
./seasons/test-quick.zsh

# Test completo
./seasons/test-system.zsh
```

#### 8.2. Verificar temporadas agendadas

```bash
# Ver jobs (si usas 'at')
atq

# Ver temporadas creadas
ls -la seasons/scheduled/
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Temporada Simple (15 días)

```bash
# 1. Calcular fecha (hoy + 15 días)
FECHA=$(date -v+15d +%Y-%m-%d)  # macOS
# O en Linux: FECHA=$(date -d "+15 days" +%Y-%m-%d)

# 2. Crear temporada
./seasons/create-season.zsh season-quick-test "$FECHA" "Quick Test"

# 3. Personalizar (edita los archivos)
nano seasons/scheduled/season-quick-test/season-styles.css
nano seasons/scheduled/season-quick-test/game.js

# 4. Agendar
./seasons/schedule-seasons.zsh
```

### Ejemplo 2: Múltiples Temporadas para 2026

```bash
# Crear temporadas cada 45 días empezando el 15 de febrero
./seasons/create-year-seasons.zsh 2026-02-15 45

# Esto crea:
# - season-2026_02_15 (15 feb)
# - season-2026_04_01 (1 abr, +45 días)
# - season-2026_05_16 (16 may, +45 días)
# - ... hasta finales de 2026

# Luego personaliza cada una
nano seasons/scheduled/season-2026_02_15/season-styles.css
nano seasons/scheduled/season-2026_04_01/season-styles.css
# ... etc

# Finalmente agenda todas
./seasons/schedule-seasons.zsh
```

### Ejemplo 3: Temporada con Múltiples Blog Posts

```bash
# Crear temporada
./seasons/create-season.zsh season-blog-heavy 2026-06-01 "Blog Heavy"

# Agregar múltiples posts
cp blog-post_template.html seasons/scheduled/season-blog-heavy/blog-posts/post-1.html
cp blog-post_template.html seasons/scheduled/season-blog-heavy/blog-posts/post-2.html
cp blog-post_template.html seasons/scheduled/season-blog-heavy/blog-posts/post-3.html

# Editar cada uno
nano seasons/scheduled/season-blog-heavy/blog-posts/post-1.html
nano seasons/scheduled/season-blog-heavy/blog-posts/post-2.html
nano seasons/scheduled/season-blog-heavy/blog-posts/post-3.html

# Agendar
./seasons/schedule-seasons.zsh
```

---

## 🔄 Agendar Múltiples Temporadas

### Crear Todas las Temporadas de Enero

El script `create-year-seasons.zsh` facilita esto:

```bash
# Crear temporadas cada 45 días
./seasons/create-year-seasons.zsh 2026-02-15 45
```

**Esto crea aproximadamente 8 temporadas para 2026:**
- 2026-02-15
- 2026-04-01
- 2026-05-16
- 2026-06-30
- 2026-08-14
- 2026-09-28
- 2026-11-12
- 2026-12-27

### Personalizar Cada Temporada

Después de crear todas, personaliza cada una:

```bash
# Temporada 1
nano seasons/scheduled/season-2026_02_15/season-styles.css
nano seasons/scheduled/season-2026_02_15/game.js

# Temporada 2
nano seasons/scheduled/season-2026_04_01/season-styles.css
nano seasons/scheduled/season-2026_04_01/game.js

# ... y así sucesivamente
```

### Agendar Todas de Una Vez

```bash
./seasons/schedule-seasons.zsh
```

Esto agenda **todas** las temporadas en `seasons/scheduled/` automáticamente.

---

## ❓ Preguntas Frecuentes

### ¿Puedo modificar una temporada después de agendarla?

**Sí**, pero necesitas:
1. Modificar los archivos en `seasons/scheduled/season-XXX/`
2. Cancelar el job anterior: `atrm <job_number>`
3. Re-agendar: `./seasons/schedule-seasons.zsh`

### ¿Qué pasa si la computadora se apaga?

- **Con 'at'**: Los jobs se guardan en el sistema, se ejecutarán cuando la computadora esté encendida (si la fecha ya pasó, se ejecutará inmediatamente al iniciar)
- **Con sleep**: El proceso se detiene, necesitas reiniciarlo manualmente

### ¿Puedo probar una temporada antes de agendarla?

**Sí:**
```bash
./seasons/apply-season.zsh seasons/scheduled/season-XXX
```

Esto aplica la temporada **ahora** sin esperar la fecha. Luego puedes revertir con git si es necesario.

### ¿Cómo revierto una temporada aplicada?

Si aplicaste manualmente y quieres volver:
```bash
git checkout index.html styles.css  # Si usas git
# O edita manualmente los archivos
```

### ¿Puedo tener múltiples temporadas agendadas?

**Sí**, puedes tener tantas como quieras. El script `schedule-seasons.zsh` agenda todas las que encuentre en `seasons/scheduled/`.

### ¿Los commits y push de git se hacen automáticamente?

**¡Sí!** El sistema ahora hace **commit y push automático** cuando se aplica una temporada agendada. 

Cuando la fecha programada llega y el sistema ejecuta la temporada:

1. ✅ **Commit automático** con la fecha de publicación
2. ✅ **Push automático** al remote configurado (origin/main o el que tengas)
3. ✅ **Verificación** de que hay cambios antes de commitear
4. ✅ **Manejo de errores** - si el push falla, te avisa pero no detiene el proceso

**Requisitos para push automático:**
- Tener un remote configurado: `git remote add origin <url>`
- Tener credenciales configuradas (SSH keys o personal access token)
- Tener permisos de escritura en el repositorio

**Verificar tu configuración:**
```bash
# Ver remotes
git remote -v

# Ver branch actual
git branch --show-current

# Probar push manualmente
git push origin main  # o tu branch
```

Si el push automático falla, verás un mensaje de advertencia pero la temporada se aplicará igual. Puedes hacer push manualmente después si es necesario.

### ¿Qué pasa si cambio la fecha de publicación?

1. Edita `season-config.json` y cambia `publish_date`
2. Cancela el job anterior: `atrm <job_number>`
3. Re-agenda: `./seasons/schedule-seasons.zsh`

---

## 🎓 Resumen del Flujo Completo

```
1. Crear temporada
   └─> ./seasons/create-season.zsh ...

2. Personalizar
   ├─> Editar season-styles.css (colores)
   ├─> Editar game.js (juego)
   └─> Agregar blog-posts/*.html

3. (Opcional) Probar
   └─> ./seasons/apply-season.zsh ...

4. Agendar
   └─> ./seasons/schedule-seasons.zsh

5. Verificar
   └─> atq (ver jobs agendados)
```

---

## 🚨 Troubleshooting

### El script no se ejecuta

```bash
chmod +x seasons/*.zsh
```

### 'at' no funciona

Usa la alternativa con sleep:
```bash
nohup ./seasons/schedule-seasons-sleep.zsh &
```

### Los colores no cambian

Verifica que:
- El CSS tiene la estructura correcta: `body.season-XXX { ... }`
- El nombre de la temporada coincide en `season-config.json` y el CSS
- Ejecutaste `apply-season.zsh` correctamente

### El juego no aparece

Verifica que:
- El juego usa `.parent('gameCanvas')`
- La función se llama `sketch_*`
- Termina con `new p5(sketch_*, 'gameCanvas')`

---

¡Listo! Ahora tienes todo lo necesario para usar el sistema de temporadas agendadas. 🎨✨

