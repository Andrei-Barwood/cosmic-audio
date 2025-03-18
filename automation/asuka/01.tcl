#!/usr/bin/tclsh

# Configuración del idioma del teclado en Android a Alemán (de)
set keyboard_id "de"  ;# Código del idioma alemán

# Verifica si ADB está disponible
set adb_check [exec which adb]
if {[string match "*adb*" $adb_check]} {
    puts "ADB encontrado, continuando..."
} else {
    puts "Error: ADB no encontrado. Asegúrate de tenerlo instalado."
    exit
}

# Obtener el nombre del teclado actual
set current_ime [exec adb shell settings get secure default_input_method]
puts "Teclado actual: $current_ime"

# Listar teclados disponibles
puts "Listando teclados disponibles..."
set ime_list [exec adb shell ime list -s]
puts "Teclados disponibles:\n$ime_list"

# Buscar un teclado alemán en la lista
set german_keyboard ""
foreach ime $ime_list {
    if {[string match "*de*" $ime]} {
        set german_keyboard $ime
        break
    }
}

if {$german_keyboard == ""} {
    puts "No se encontró un teclado alemán instalado."
    exit
} else {
    puts "Seleccionando teclado: $german_keyboard"
    exec adb shell ime set $german_keyboard
    puts "Teclado cambiado a $german_keyboard"
}
