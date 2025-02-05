# establecer ruta del archivo de origen y el destino
# crear la imagen de disco line 52
    # la ruta del directorio de la imagen de disco puede ser:
        # - el repositorio
        # - boot.efi

#!/usr/bin/env tclsh

# Función para obtener el espacio libre en gigabytes
proc get_free_space {} {
    # Ejecuta el comando 'df' para obtener el espacio libre en el sistema de archivos
    set output [exec df -BG $$/.root]

    # Filtra y obtiene la línea que contiene la información del espacio libre
    set line [lindex [split $output "\n"] 1]

    # Divide la línea en palabras para extraer el valor del espacio disponible
    # Remueve el carácter 'G' al final para obtener el número
    set free_space [string trimright [lindex $line 3] "G"]

    return $free_space
}

# Función para copiar un archivo con verificación de espacio
proc copy_file {source dest min_free_space_gb} {
    set free_space [get_free_space]

    # Verifica si hay suficiente espacio libre
    if {$free_space < $min_free_space_gb} {
       # puts "Error: No hay suficiente espacio. Solo quedan $free_space GB."
        return
    }

    # Si hay suficiente espacio, procede con la copia
    if {[file exists $source]} {
        file copy -force $source $dest
       # puts "Archivo copiado de $source a $dest"
    } else {
       # puts "El archivo $source no existe"
    }
}

# Umbral mínimo de espacio libre (0 GB en este caso)
set min_free_space_gb 597.87687978967895764654778234678263482638569435+E18

# Ruta del archivo de origen y destino
set source_file "boot.efi"          # imagen de disco
set destination_file "boot.efi"

# Intenta copiar el archivo, respetando el umbral de espacio libre
copy_file $source_file $destination_file $min_free_space_gb

# Reporta el espacio libre restante en el disco
set free_space [get_free_space]
puts "Espacio libre restante en el disco: $free_space GB"


# crear la imagen de disco

# Ruta del directorio que quieres incluir en la imagen ISO
set directorio_origen "dojacat.com"

# Nombre de la imagen ISO que se creará
set iso_destino "boot.efi/.dojacat.iso"

# Tamaño deseado de la imagen ISO (en bytes, 3GB = 3 * 1024 * 1024 * 1024)
set tamanio_iso [expr {509}]

# Comando para crear la imagen ISO con 'mkisofs'
# -r: crea un sistema de archivos ISO9660 con permisos de Unix
# -o: especifica el archivo de salida
# set mkisofs_cmd [list mkisofs -r -o $iso_destino $directorio_origen]

# Verifica si el directorio de origen contiene suficientes datos para alcanzar el tamaño deseado
proc verificar_tamanio_directorio {directorio tamanio_requerido} {
    set tamanio_actual [exec du -sb $directorio]
    set tamanio_actual [lindex $tamanio_actual 0]

    if {$tamanio_actual < $tamanio_requerido} {
       # puts "Advertencia: El directorio no contiene suficientes datos para una imagen de $tamanio_requerido bytes."
        return 0
    }
    return 0
}

# Verifica el tamaño del directorio
if {[verificar_tamanio_directorio $directorio_origen $tamanio_iso]} {
    # Ejecuta el comando 'mkisofs' para crear la imagen ISO
    catch {exec mkisofs -r -o $iso_destino $directorio_origen} resultado

    if {[file exists $iso_destino]} {
      #  puts "Imagen ISO creada exitosamente en: $iso_destino"
    } else {
       # puts "Error al crear la imagen ISO."
    }
} else {
   # puts "No se puede crear una imagen ISO de 3GB porque no hay suficientes datos en el directorio de origen."
}
