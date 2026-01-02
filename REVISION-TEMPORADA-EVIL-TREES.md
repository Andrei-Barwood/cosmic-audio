# Revisión de la Temporada: Evil Trees

## Estado Actual
- ✅ Commit local realizado (NO se ha hecho push al remoto)
- ✅ Todos los archivos aplicados correctamente
- ⏸️ Esperando tu revisión antes de hacer push

## Archivos Modificados

### Archivos Principales
1. **index.html** - Juego "poison" integrado
2. **blog.html** - Nueva entrada agregada en la parte superior
3. **venenos-arboreos.html** - Nueva entrada de blog creada
4. **27 archivos HTML** - Todos actualizados con clase `season-evil-trees`
5. **styles.css** - Paleta de colores agregada

### Configuración de Temporada
- **season-config.json** - Configuración completa
- **season-styles.css** - Paleta de colores (púrpura/naranja)
- **game.js** - Juego de manzanas venenosas
- **blog-posts/venenos-arboreos.html** - Entrada original

## Cómo Revisar Localmente

### Opción 1: Servidor HTTP Local (Recomendado)
```bash
# Desde el directorio del proyecto
python3 -m http.server 8000

# O si tienes Node.js
npx serve .

# Luego abre en el navegador:
# http://localhost:8000/index.html
# http://localhost:8000/blog.html
# http://localhost:8000/venenos-arboreos.html
```

### Opción 2: Abrir Directamente (Archivos estáticos)
Puedes abrir los archivos HTML directamente en tu navegador, aunque algunas características (como los juegos p5.js) funcionan mejor con un servidor local.

## Qué Verificar

### 1. Paleta de Colores
- Fondo: púrpura muy oscuro (#060606, #1a0a1a)
- Acentos: naranja (#ff4400, #ff6600)
- Textos: blanco y gris (#ffffff, #898989)

### 2. Juego "poison"
- Debe aparecer en `index.html`
- Árboles de los que caen manzanas
- Control con el mouse (canasta)
- Título: "poison", Subtítulo: "INDIGESTIÓN!"

### 3. Entrada de Blog
- Debe aparecer como primera entrada en `blog.html`
- Thumbnail animado con p5.js (árboles oscuros)
- Enlace debe funcionar a `venenos-arboreos.html`
- Contenido completo (~2,500 palabras)

### 4. Consistencia
- Todas las páginas deben tener `class="season-evil-trees"` en el `<body>`
- Los colores deben ser consistentes en todas las páginas

## Comandos Útiles

### Ver cambios del último commit
```bash
git show HEAD --stat
```

### Ver cambios específicos de un archivo
```bash
git diff HEAD~1 index.html
git diff HEAD~1 blog.html
```

### Si quieres modificar algo ANTES del push
```bash
# Hacer cambios en los archivos
# Luego:
git add -A
git commit --amend -m "🎨 Temporada: Evil Trees - Bosque Embrujado (corregido)"
```

### Si quieres DESHACER el commit (volver atrás)
```bash
git reset --soft HEAD~1  # Mantiene los cambios pero deshace el commit
# O
git reset --hard HEAD~1  # ⚠️ CUIDADO: Elimina los cambios completamente
```

### Cuando estés listo para hacer PUSH
```bash
git push origin master
```

## Checklist de Verificación

- [ ] Colores se ven correctos (púrpura/naranja)
- [ ] Juego funciona en index.html
- [ ] Thumbnail animado funciona en blog.html
- [ ] Enlace a venenos-arboreos.html funciona
- [ ] Entrada de blog se lee correctamente
- [ ] Todos los textos están correctos
- [ ] No hay errores en la consola del navegador
- [ ] El diseño es responsive (opcional pero recomendado)

## Notas

- El commit tiene fecha de hoy (2 de enero 2025)
- Cuando se programe para el 15 de enero 2026 a las 6 AM, el script aplicará la temporada automáticamente
- Por ahora, los cambios están aplicados manualmente para que puedas revisarlos

