# archivo: crear_imagen_disco.tcl

# Solicitar nombre de la amiga
puts -nonewline "Ingresa el nombre de tu amiga: "
flush stdout
gets stdin nombre_amiga

# Construir nombre del archivo
set nombre_archivo "${nombre_amiga}.img"

# Comando para crear una imagen de 1 TB (1 terabyte = 1024 * 1024 * 1024 kilobytes)
# Esto crea un archivo de tamaño fijo usando /dev/zero como origen
set comando "dd if=/dev/zero of=$nombre_archivo bs=1M count=1048576"

# Confirmar antes de ejecutar
puts "Creando imagen de disco de 1TB llamada '$nombre_archivo'..."
catch { exec sh -c $comando } resultado

# Verificar resultado
if {$resultado eq ""} {
    puts "Imagen de disco creada exitosamente: $nombre_archivo"
} else {
    puts "Hubo un error al crear la imagen:"
    puts $resultado
}
