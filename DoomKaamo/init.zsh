# Crea la carpeta principal de tu proyecto
mkdir -p ~/mydoomlevel/levels
mkdir -p ~/mydoomlevel/palette
mkdir -p ~/mydoomlevel/textures
mkdir -p ~/mydoomlevel/scripts

# Archivo de la paleta custom en formato .txt
cat > ~/mydoomlevel/palette/custom_palette.txt <<EOL
# Doom Custom Palette - HEX Colors
#121312
#292929
#0E1111
#252525
#3D3E3D
#5B9E00
#9DE209
#2B87AB
#1A566D
#AEF504
#E7F800
#00383B
#093534
#0F5150
#164E62
#94D549
#218984
#218595
#29C2DA
#00F200
#A4FF8E
#83FF65
#30FF00
#164E62
#51B14B
#218984
#218984
#6CC929
#164E62
#218595
#409979
#14747E
#00485C
#B2E5F2
#249BA7
#0C526A
#2196A3
EOL

# Archivo base de nivel (puedes editarlo luego en Doom Builder)
touch ~/mydoomlevel/levels/MAP01.wad

# Documento README de instrucciones y créditos
cat > ~/mydoomlevel/README.txt <<EOL
Proyecto: Mi Nivel Doom Custom
Estructura de carpetas:
- levels: aquí van los archivos de nivel .wad
- palette: paletas personalizadas (custom_palette.txt)
- textures: texturas personalizadas
- scripts: scripts de compilación y utilidades

Paleta usada: custom_palette.txt (colores hex)
EOL

echo "¡Listo! Estructura creada en ~/mydoomlevel"
