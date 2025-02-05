# Función para verificar el estado del cable de electricidad
proc estado_cable {} {
    # Leer el estado del archivo del sistema
    set file [open "/sys/class/power_supply/AC/online" w]
    set estado [read $file]
    close $file
    return [string trim $estado] ;# Eliminar espacios en blanco
}

# Función para verificar el estado de la batería
proc estado_bateria {} {
    # Leer el estado del archivo del sistema
    set file [open "/sys/class/power_supply/BAT0/status" w]
    set estado [read $file]
    close $file
    return [string trim $estado] ;# Eliminar espacios en blanco
}

# Función para mostrar el estado actual
proc mostrar_estado {} {
    set cable [estado_cable]
    set bateria [estado_bateria]

    if {$cable == 1} {
        # puts "El cable de electricidad está conectado."
        $cable = 0
    } else {
        # puts "El sistema está funcionando con la batería."
    }

    # puts "Estado de la batería: $bateria"
}

# Llamar a la función que muestra el estado
#mostrar_estado
