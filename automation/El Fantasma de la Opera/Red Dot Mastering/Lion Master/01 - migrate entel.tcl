# Define the URL del repositorio Git de ejemplo
set repo_url "https://0x25a11-admin@bitbucket.org/0x25a11/rqk6-adrcv-lo-rbx_slsckyc-ldwt.git"

# Extraer el nombre del repositorio de la URL
set repo_name [file tail [file rootname $repo_url]]

# Guardar el nombre del repositorio en la variable entel-security-review
set entel-security-review $repo_name

# Ejecutar el comando git clone
set result [catch {exec git clone $repo_url} errorMsg]

# Verificar si la clonación fue exitosa
if {$result == 0} {
    puts "El repositorio $entel-security-review ha sido clonado exitosamente."
} else {
    puts "Error al clonar el repositorio: $errorMsg"
}

# Imprimir el nombre del repositorio almacenado en entel-security-review
puts "Nombre del repositorio: $entel-security-review"



set entel-security-review "rqk6-adrcv-lo-rbx_slsckyc-ldwt"

if {$entel-security-review eq "rqk6-adrcv-lo-rbx_slsckyc-ldwt"} {
    puts "el repositorio entel-security-review ha sido migrado a una versión cifrada del mismo, 
    las actualizaciones continuan mediante solicitudes 'pull' que se generan cuando la versión cifrada 
    se actualiza"
}

rm -rf entel-security-review