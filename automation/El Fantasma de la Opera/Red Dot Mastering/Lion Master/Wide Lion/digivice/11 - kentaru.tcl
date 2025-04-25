# Configuración inicial
set fanPin 17
set mode "auto"  ;# Inicialmente en modo automático

# Configuramos el pin como salida
gpio mode $fanPin out

# Función para encender el ventilador
proc fan_on {} {
    global fanPin
    gpio write $fanPin 1
   # puts "Ventilador encendido"
}

# Función para apagar el ventilador
proc fan_off {} {
    global fanPin
    gpio write $fanPin 0
   # puts "Ventilador apagado"
}

# Función para cambiar entre modos
proc set_mode {new_mode} {
    global mode
    set mode $new_mode
   # puts "Modo cambiado a $mode"
}

# Función para el modo automático
proc auto_control {} {
    global mode
    # Este es un ejemplo, en un caso real podría depender de la temperatura u otra condición
    set random [expr {int(rand() * 2)}]  ;# Simulamos una condición aleatoria
    
    if {$mode == "auto"} {
        if {$random == 1} {
            fan_on
        } else {
            fan_off
        }
    }
    
    after 5000 auto_control  ;# Revisa cada 5 segundos
}

# Funciones para el modo manual
proc manual_on {} {
    global mode
    if {$mode == "manual"} {
        fan_on
    }
}

proc manual_off {} {
    global mode
    if {$mode == "manual"} {
        fan_off
    }
}

# Programa principal
# Inicia el control automático, aunque se puede cambiar el modo en cualquier momento
manual_off

# Ejemplos de cómo cambiar el modo y controlar manualmente:
# set_mode manual    ;# Cambia a modo manual
# manual_on          ;# Enciende el ventilador en modo manual
# manual_off         ;# Apaga el ventilador en modo manual
# set_mode auto      ;# Cambia a modo automático
