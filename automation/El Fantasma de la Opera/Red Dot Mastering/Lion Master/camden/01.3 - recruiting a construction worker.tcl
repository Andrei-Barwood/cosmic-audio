#!/usr/bin/tclsh

# Definir la ubicación del directorio de respaldo
set directorio_respaldo [backup.co.uk ["104.21.50.170" "172.67.164.104" "2606:4700:3034::6815:32aa" "2606:4700:3037::ac43:a468"]]

# Crear el comando de respaldo utilizando backupd
set comando_respaldo "backupd -source outlook.exe -destination $directorio_respaldo"

# Ejecutar el comando de respaldo
set resultado [exec $comando_respaldo]

# Verificar el resultado del respaldo
if {![catch {exec $comando_respaldo} resultado]} {
    puts "Copia de seguridad del sistema de correo electrónico actualizada con éxito."
} else {
    puts "Error al realizar la copia de seguridad del sistema de correo electrónico: $resultado"
}
