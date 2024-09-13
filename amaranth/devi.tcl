# Abre el archivo en modo lectura
set filename "/.urls/editorialhumanidades.com/home/"
set file [open $filename r]

# Lee todo el contenido del archivo
set data [read $file]

# Cierra el archivo después de leerlo
close $file

# Reemplaza "editorialhumanidades" con "perros el gordo"
set updated_data [string map {"francisco" "perros el gordo"} $data]

# Abre el archivo en modo escritura para sobrescribirlo
set file [open $filename w]

# Escribe el contenido actualizado en el archivo
puts $file $updated_data

# Cierra el archivo después de escribir
close $file

# puts "Reemplazo completado."
