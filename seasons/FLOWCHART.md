# 📊 Diagrama de Flujo - Sistema de Temporadas

## Flujo Completo Visual

```
┌─────────────────────────────────────────────────────────────┐
│                    CREAR TEMPORADA                           │
│  ./seasons/create-season.zsh <nombre> <fecha> <display>    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  seasons/scheduled/           │
         │  └── season-XXX/              │
         │      ├── season-config.json    │
         │      ├── season-styles.css     │
         │      ├── game.js               │
         │      └── blog-posts/           │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │     PERSONALIZAR              │
         │                               │
         │  1. Editar CSS (colores)     │
         │  2. Crear juego p5.js         │
         │  3. Agregar blog posts        │
         │  4. Configurar JSON           │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │   (OPCIONAL) PROBAR            │
         │  ./seasons/apply-season.zsh   │
         │                               │
         │  ✓ Ver cambios en navegador  │
         │  ✓ Verificar que funciona     │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │      AGENDAR                  │
         │                               │
         │  Opción A: 'at' command       │
         │  ./seasons/schedule-seasons  │
         │                               │
         │  Opción B: sleep method      │
         │  ./seasons/schedule-seasons- │
         │    sleep.zsh &               │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │   ESPERAR FECHA               │
         │                               │
         │  Sistema ejecuta             │
         │  automáticamente              │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │   APLICAR TEMPORADA           │
         │                               │
         │  ✓ Actualizar CSS            │
         │  ✓ Cambiar clases season-*   │
         │  ✓ Reemplazar juego          │
         │  ✓ Agregar blog posts        │
         │  ✓ Preparar commit git       │
         └───────────────────────────────┘
```

## Flujo de Aplicación de Temporada

```
┌─────────────────────────────────────────────────────────────┐
│  apply-season.zsh ejecuta:                                  │
└─────────────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ Paso 1: │    │ Paso 2: │    │ Paso 3: │
    │  CSS    │    │  HTML   │    │  Juego  │
    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │
         │              │              │
         ▼              ▼              ▼
    Agregar CSS    Actualizar      Reemplazar
    a styles.css   clases body     juego en
                   en todos los    index.html
                   HTML
         │              │              │
         └──────────────┼──────────────┘
                        │
                        ▼
                   ┌─────────┐
                   │ Paso 4: │
                   │  Blog   │
                   └────┬────┘
                        │
                        ▼
                   Copiar posts
                   de blog-posts/
                   al directorio
                   raíz
                        │
                        ▼
                   ┌─────────┐
                   │ Paso 5: │
                   │  Git    │
                   └────┬────┘
                        │
                        ▼
                   Preparar commit
                   con fecha futura
```

## Flujo de Agendamiento

```
┌─────────────────────────────────────────────────────────────┐
│  schedule-seasons.zsh                                        │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  Buscar temporadas en         │
         │  seasons/scheduled/           │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  Para cada temporada:         │
         │                               │
         │  1. Leer publish_date         │
         │  2. Verificar que es futura   │
         │  3. Convertir a formato 'at'  │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  Crear script temporal        │
         │  que ejecuta:                 │
         │  apply-season.zsh + commit    │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  Agendar con 'at' command     │
         │  at <fecha> <script>          │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  Sistema OS espera hasta      │
         │  la fecha programada           │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  En la fecha programada:      │
         │  Sistema ejecuta el script    │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │  apply-season.zsh se ejecuta  │
         │  y aplica la temporada        │
         └───────────────────────────────┘
```

## Estructura de Archivos de una Temporada

```
season-neon-dreams/
│
├── season-config.json          ← Configuración principal
│   ├── season_name            ← "season-neon-dreams"
│   ├── display_name           ← "Neon Dreams"
│   ├── publish_date           ← "2026-03-01"
│   ├── color_palette          ← Referencia de colores
│   ├── game                   ← Info del juego
│   └── blog_posts             ← Lista de posts
│
├── season-styles.css           ← Paleta de colores CSS
│   └── body.season-neon-dreams {
│       --primary-color: #ff00ff;
│       --acid-green: #00ffff;
│       ...
│   }
│
├── game.js                     ← Juego p5.js
│   └── function sketch_neon_game(p) {
│       p.setup = function() { ... };
│       p.draw = function() { ... };
│   }
│   new p5(sketch_neon_game, 'gameCanvas');
│
├── blog-posts/                 ← Entradas de blog
│   ├── post-1.html
│   ├── post-2.html
│   └── ...
│
└── README.md                   ← Documentación
```

## Decisiones del Sistema

```
¿Quieres crear una temporada?
    │
    ├─> SÍ → create-season.zsh
    │         └─> Crea estructura básica
    │
    └─> NO → ¿Ya existe?
                │
                ├─> SÍ → Ir a personalizar
                │
                └─> NO → Crear primero

¿Quieres probar antes de agendar?
    │
    ├─> SÍ → apply-season.zsh (manual)
    │         └─> Aplica ahora para probar
    │
    └─> NO → Ir a agendar

¿Qué método de agendamiento usar?
    │
    ├─> 'at' command disponible?
    │   │
    │   ├─> SÍ → schedule-seasons.zsh
    │   │         └─> Usa 'at' (recomendado)
    │   │
    │   └─> NO → schedule-seasons-sleep.zsh
    │             └─> Usa sleep (alternativa)
    │
    └─> ¿Múltiples temporadas?
        │
        ├─> SÍ → create-year-seasons.zsh
        │         └─> Crea varias de una vez
        │
        └─> NO → create-season.zsh
                  └─> Crea una sola
```

## Timeline Visual

```
Hoy (Enero 2026)
│
├─> Crear temporada 1
│   └─> season-2026-02-15
│       ├─> Personalizar
│       └─> Agendar
│
├─> Crear temporada 2
│   └─> season-2026-04-01
│       ├─> Personalizar
│       └─> Agendar
│
├─> Crear temporada 3
│   └─> season-2026-05-16
│       ├─> Personalizar
│       └─> Agendar
│
└─> ... (más temporadas)

─────────────────────────────────────────

15 Feb 2026
│
└─> ⚡ Sistema aplica temporada 1
    └─> Cambios visibles en el sitio

─────────────────────────────────────────

1 Abr 2026
│
└─> ⚡ Sistema aplica temporada 2
    └─> Cambios visibles en el sitio

─────────────────────────────────────────

16 May 2026
│
└─> ⚡ Sistema aplica temporada 3
    └─> Cambios visibles en el sitio

─────────────────────────────────────────
```

## Comandos Rápidos de Referencia

```
┌─────────────────────────────────────────────────────────────┐
│  CREAR                                                      │
├─────────────────────────────────────────────────────────────┤
│  ./seasons/create-season.zsh <nombre> <fecha> <display>   │
│  ./seasons/create-year-seasons.zsh <fecha-inicio> <días>  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PERSONALIZAR                                               │
├─────────────────────────────────────────────────────────────┤
│  nano seasons/scheduled/season-XXX/season-styles.css      │
│  nano seasons/scheduled/season-XXX/game.js                 │
│  nano seasons/scheduled/season-XXX/blog-posts/*.html       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PROBAR                                                     │
├─────────────────────────────────────────────────────────────┤
│  ./seasons/apply-season.zsh seasons/scheduled/season-XXX  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  AGENDAR                                                    │
├─────────────────────────────────────────────────────────────┤
│  ./seasons/schedule-seasons.zsh                            │
│  ./seasons/schedule-seasons-sleep.zsh &                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  VERIFICAR                                                  │
├─────────────────────────────────────────────────────────────┤
│  atq                    # Ver jobs agendados              │
│  at -c <job>            # Ver detalles de job             │
│  atrm <job>             # Cancelar job                     │
│  ./seasons/test-quick.zsh                                  │
└─────────────────────────────────────────────────────────────┘
```

---

**💡 Tip:** Imprime este diagrama o mantenlo abierto mientras trabajas con el sistema.

