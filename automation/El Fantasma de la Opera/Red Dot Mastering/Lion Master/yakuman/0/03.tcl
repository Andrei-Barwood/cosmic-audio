# Script Tcl para controlar el micrófono en Linux usando pactl

# Función para apagar el micrófono
proc mute_mic {} {
    puts "Apagando micrófono..."
    exec pactl set-source-mute @DEFAULT_SOURCE@ 1
}

# Función para encender el micrófono
proc unmute_mic {} {
    puts "Encendiendo micrófono..."
    exec pactl set-source-mute @DEFAULT_SOURCE@ 0
}

# Función para alternar entre encendido y apagado
proc toggle_mic {} {
    # Verificar el estado actual del micrófono
    set status [exec pactl get-source-mute @DEFAULT_SOURCE@]
    
    if {[string match "*yes*" $status]} {
        unmute_mic
    } else {
        mute_mic
    }
}

# Llamada a la función para alternar el micrófono
mute_mic
