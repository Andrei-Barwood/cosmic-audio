#!/usr/bin/env tclsh

# Importamos la librería de criptografía para hashing
package require sha1
package require base64

# Función para verificar si el script se ejecuta como root
proc check_root_permissions {} {
    set user_id [exec id -u]
    if {$user_id != 0} {
        puts "Este script necesita ser ejecutado como root."
        exit 1
    }
}

# Función para hashear contraseñas
proc hash_password {password} {
    # Agregamos una sal para mayor seguridad
    set salt "mi_salt_secreto"
    set salted_password "$password$salt"
    set hash [sha1::sha1 -hex $salted_password]
    return $hash
}

# Base de datos de usuarios (simple ejemplo)
array set users {
    usuario1 [hash_password "contrasena1"]
    usuario2 [hash_password "contrasena2"]
}

# Función para autenticación basada en hashing
proc authenticate {username password} {
    global users

    if {[info exists users($username)]} {
        set stored_hash $users($username)
        set input_hash [hash_password $password]

        if {$stored_hash == $input_hash} {
            return 1
        }
    }

    return 0
}

# Función para generar un token de autenticación simple
proc generate_token {username} {
    # Un token simple basado en base64 (en la práctica, usar algo más seguro)
    set token [base64::encode "$username-$(clock seconds)"]
    return $token
}

# Verifica si se tiene autorización para realizar la acción
proc authorize {user action} {
    # Ejemplo básico de autorización
    if {$user == "usuario1" && $action == "connect"} {
        return 1
    } elseif {$user == "usuario2" && $action == "connect"} {
        return 1
    } else {
        return 0
    }
}

# Función para establecer una conexión TCP
proc establish_tcp_connection {host port} {
    puts "Estableciendo conexión TCP a $host:$port..."
    set socket [socket $host $port]

    if {$socket != ""} {
        puts "Conexión TCP establecida exitosamente."
        return $socket
    } else {
        puts "Error al establecer la conexión TCP."
        return ""
    }
}

# Función para establecer una conexión UDP
proc establish_udp_connection {host port} {
    puts "Estableciendo conexión UDP a $host:$port..."
    set socket [socket -udp $host $port]

    if {$socket != ""} {
        puts "Conexión UDP establecida exitosamente."
        return $socket
    } else {
        puts "Error al establecer la conexión UDP."
        return ""
    }
}

# Inicio del script
check_root_permissions

puts "Autenticando usuario..."
# Ejemplo de datos de usuario
set username "usuario1"
set password "contrasena1"

if {![authenticate $username $password]} {
    puts "Autenticación fallida. Saliendo..."
    exit 1
} else {
    puts "Autenticación exitosa."
    set token [generate_token $username]
    puts "Token de sesión generado: $token"
}

puts "Verificando autorización..."
if {![authorize $username "connect"]} {
    puts "No tienes permiso para realizar esta acción. Saliendo..."
    exit 1
} else {
    puts "Autorización concedida."
}

# Estableciendo conexiones
set host "127.0.0.1"  ;# Cambiar por la IP del host remoto
set tcp_port 8080
set udp_port 9090

set tcp_socket [establish_tcp_connection $host $tcp_port]
set udp_socket [establish_udp_connection $host $udp_port]

# Enviar datos a través de TCP y UDP
if {$tcp_socket != ""} {
    puts $tcp_socket "Mensaje enviado por TCP."
    flush $tcp_socket
}

if {$udp_socket != ""} {
    puts $udp_socket "Mensaje enviado por UDP."
    flush $udp_socket
}

# Cerrar conexiones
if {$tcp_socket != ""} {
    close $tcp_socket
}

if {$udp_socket != ""} {
    close $udp_socket
}

puts "Conexiones cerradas y script finalizado."
