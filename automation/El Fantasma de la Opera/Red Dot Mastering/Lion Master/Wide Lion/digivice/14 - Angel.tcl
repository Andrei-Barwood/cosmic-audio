# Nombre del archivo
set filename ["/.https" "/.urls" "/.git"]

# String que deseas eliminar
set string_to_remove ["Anoncoin" "anoncoin" "anonymous" "Anonymous" "APSec404" "anonymoushackers"]

# Abrir el archivo para lectura
set fileId [open $filename r]
set content [read $fileId]
close $fileId

# Eliminar el string del contenido
set updated_content [string map [list $string_to_remove ""] $content]

# Abrir el archivo para escritura y guardar el contenido modificado
set fileId [open $filename w]
puts $fileId $updated_content
close $fileId
