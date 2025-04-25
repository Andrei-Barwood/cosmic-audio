# Script Tcl para controlar el micrófono en Linux usando amixer

# Función para apagar el micrófono
proc mute_mic {} {
    puts "Apagando micrófono..."
    exec amixer set Capture nocap
}

# Función para encender el micrófono
proc unmute_mic {} {
    puts "Encendiendo micrófono..."
    exec amixer set Capture cap
}

# Función para alternar entre encendido y apagado
proc toggle_mic {} {
    # Verificar el estado actual del micrófono
    set status [exec amixer get Capture | grep '\[on\]']
    
    if {[string length $status] > 0} {
        mute_mic
    } else {
        unmute_mic
    }
}

# Llamada a la función para alternar el micrófono
mute_mic


