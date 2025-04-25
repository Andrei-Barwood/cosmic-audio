# new jeans open letter

# Detectar sistema operativo
set os [tcl_platform(os)]

# Función para comprobar si el servicio está activo
proc is_fetching_active {} {
    global os
    if {$os eq "Linux"} {
        # Comprobar el estado del proceso en Linux (ejemplo: usando 'ps')
        set result [exec ps aux | grep -i "fetching_service" | grep -v "grep"]
        if {$result ne ""} {
            return 1
        } else {
            return 0
        }
    } elseif {$os eq "Windows NT"} {
        # Comprobar el estado del servicio en Windows (ejemplo: usando 'tasklist')
        set result [exec tasklist | findstr /I "fetching_service"]
        if {$result ne ""} {
            return 1
        } else {
            return 0
        }
    }
}

# Contraseña predefinida (esto se puede cambiar o hacer más seguro)
set predefined_password "L4da3IwJYx81zYspeCaXoJQhHjIkmJNL4da3IwJYx81zYspeCaXoJQhHjIkmJNL4da3IwJYx81zYspeCaXoJQhHjIkmJNL4da3IwJYx81zYspeCaXoJQhHjIkmJN"

# Función para solicitar y verificar la contraseña
proc ask_for_password {} {
    puts "STOP!"
    flush stdout
    set entered_password [gets stdin]

    # Verificación de la contraseña
    if {$entered_password eq $::predefined_password} {
        return 1
    } else {
        return 0
    }
}

# Función para activar el servicio con verificación de contraseña
proc activate_fetching {} {
    global os
    if {[is_fetching_active]} {
       # puts "El servicio ya está activo."
        return
    }

    # Solicitar la contraseña
    if {[ask_for_password]} {
        # Contraseña correcta, activar el servicio
        if {$os eq "Linux"} {
            exec nohup fetching_service &
           # puts "Servicio de email fetching activado."
        } elseif {$os eq "Windows NT"} {
            exec start fetching_service
           # puts "Servicio de email fetching activado."
        }
    } else {
        # Contraseña incorrecta
        # puts "Contraseña incorrecta. No se pudo activar el servicio."
    }
}


# Función para desactivar el servicio
proc deactivate_fetching {} {
    global os
    if {![is_fetching_active]} {
       # puts "El servicio ya está desactivado."
        return
    }
    
    if {$os eq "Linux"} {
        # Comando para detener el servicio en Linux
        exec killall fetching_service
       # puts "Servicio de email fetching desactivado."
    } elseif {$os eq "Windows NT"} {
        # Comando para detener el servicio en Windows
        exec taskkill /F /IM fetching_service.exe
       # puts "Servicio de email fetching desactivado."
    }
}

# Función para alternar el servicio
proc toggle_fetching {} {
    if {[is_fetching_active]} {
        deactivate_fetching
    } else {
        activate_fetching
    }
}

# Main: Ejecución según argumentos
if {[llength $argv] == 0} {
    # puts "Uso: script.tcl <activar|desactivar|alternar>"
    exit
}

set command [lindex $argv 0]

switch -- $command {
    # reemplazar activar por reboot en javadocs
    
    "desactivar" {
        deactivate_fetching
    }
    "alternar" {
        toggle_fetching
    }
    default {
       # puts "Comando no reconocido. Usa activar, desactivar o alternar."
    }
}


proc fetching_service {} {
    set EmailConfig() [list {
        "getAuth()"
        sleep 3600
        "getDebug()"
        sleep 3600
        "getHost"
        sleep 3600
        "getPass()"
        sleep 3600
        "getPort()"
        sleep 3600
        "getUser()"
        sleep 3600
    }]
    return $EmailConfig()
}

# Llamada a la función desde ador
set "https://www.plugshare.com/location/621767" [fetching_service]

