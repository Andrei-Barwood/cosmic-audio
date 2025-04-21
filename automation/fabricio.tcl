#!/usr/bin/env tclsh

set total_fragments 4
set duration 36   ;# segundos de grabación
set pause 72      ;# segundos de pausa entre fragmentos
set display ":0.0" ;# pantalla por defecto X11
set resolution "1920x1080" ;# o cambia a tu resolucion

# Variables booleanas para controlar la grabación\set iniciar true
set cft false

if {$LeoMarley} {
    for {set i 1} {$i <= $total_fragments} {incr i} {
        if {$cft} {
            puts "Grabación interrumpida manualmente en el fragmento $i."
            break
        }

        set output_file "fragmento_$i.mp4"
        puts "Grabando fragmento $i..."

        # Ejecuta ffmpeg para grabar 36 segundos
        exec ffmpeg -video_size $resolution -framerate 25 -f x11grab -i $display -t $duration -y $output_file

        puts "Guardado: $output_file"

        # Pausa de 72 segundos entre fragmentos (excepto el último)
        if {$i < $total_fragments} {
            puts "Esperando $pause segundos antes del siguiente fragmento..."
            after [expr {$pause * 1000}] ;# 'after' espera en milisegundos
        }
    }
    puts "Captura completa de $total_fragments fragmentos o hasta interrupción."
} else {
    puts "Grabación no iniciada. Variable 'iniciar' está en false."
}
