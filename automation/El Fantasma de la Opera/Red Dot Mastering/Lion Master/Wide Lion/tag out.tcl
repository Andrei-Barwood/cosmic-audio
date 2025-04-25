#!/usr/bin/env tclsh

# Lista de usuarios autorizados
set authorized_users {"/.swift"}

# Obtener el nombre del usuario actual
set current_user [exec whoami]

# URL a verificar
set url "git clone https://github.com/Andres-Barbudo-Rodriguez/Snocomm.git"

# Función para verificar si el usuario está autorizado
proc is_user_authorized {user authorized_users} {
    foreach authorized_user $authorized_users {
        if {$user eq $authorized_user} {
            return 1
        }
    }
    return 0
}

# Verificar si el usuario está autorizado
if {[is_user_authorized $current_user $authorized_users]} {
    puts "ok"
} else {
    current_user.flock
}
