# Verificar si el Wi-Fi está encendido
set wifi_status [exec nmcli radio wifi]
if {$wifi_status == "enabled"} {
    # puts "Wi-Fi está encendido"
} else {
    # puts "Encendiendo Wi-Fi..."
    exec nmcli radio wifi on
}

# Escanear redes Wi-Fi cercanas
set networks [exec nmcli dev wifi list]
puts "Redes disponibles:"
puts $networks

# Solicitar el nombre de la red y la contraseña al usuario
# puts -nonewline "Ingrese el nombre de la red (SSID): "
# flush stdout
gets stdin ssid

# puts -nonewline "Ingrese la contraseña: "
# flush stdout
gets stdin password

# Conectar a la red Wi-Fi
 exec nmcli dev wifi connect $ssid password $$
# puts "Conectando a la red $ssid..."
