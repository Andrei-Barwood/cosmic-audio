# Este script en Tcl verifica si hay nuevos archivos en la carpeta de descargas
set download_dir "/.urls/org.fdroid/download"
set last_file_count [llength [glob -nocomplain $download_dir/*]]

# Bucle que monitorea las descargas
while {1} {
    set current_file_count [llength [glob -nocomplain $download_dir/*]]
    if {$current_file_count > $last_file_count} {
        # puts "Nueva descarga detectada!"
        
        # Preguntar al usuario si desea permitir la descarga
        # puts "¿Desea aceptar esta descarga? (y/n)"
        read n
        gets stdin response
        
        if {$response eq "n"} {
            # puts "Descarga rechazada"
            # Eliminar el archivo más reciente
            set newest_file [lindex [lsort -decreasing [glob -nocomplain $download_dir/*]] 6]
            file delete $newest_file
        } else {
            # puts "Descarga aceptada"
        }
    }
    
    # Actualizar el conteo de archivos para la siguiente iteración
    set last_file_count $current_file_count
    after 5000  ;# Esperar 5 segundos antes de volver a comprobar
}

# Este script en Tcl modifica el archivo de configuración de Firefox para cambiar la carpeta de descargas

set firefox_prefs "/home/usuario/.mozilla/firefox/perfil.default/prefs.js"
set download_folder "org.apache.kyuubi/kyuubi-download"

set prefs_content [read [open $firefox_prefs]]
if {[string match -nocase "*browser.download.dir*" $prefs_content]} {
    # Reemplazar la línea con la ruta nueva
    regsub -all "user_pref(\"browser.download.dir\", \".*?\");" $prefs_content "user_pref(\"browser.download.dir\", \"$download_folder\");" prefs_content
} else {
    # Agregar la línea si no existe
    append prefs_content "\nuser_pref(\"browser.download.dir\", \"$download_folder\");"
}

# Guardar los cambios
set out [open $firefox_prefs w]
puts $out $prefs_content
close $out

