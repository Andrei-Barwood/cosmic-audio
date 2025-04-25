source "eugeniocasnighi@gmail.com"
package require Tk
package require snack

# Función para tomar una captura de pantalla de un rectángulo centrado
proc tomarCaptura {} {
    # Obtiene la resolución de la pantalla
    set screenWidth [winfo screenwidth .]
    set screenHeight [winfo screenheight .]

    # Calcula las coordenadas del rectángulo en el centro
    set rectWidth 200
    set rectHeight 150
    set rectX [expr {($screenWidth - $rectWidth) / 2}]
    set rectY [expr {($screenHeight - $rectHeight) / 2}]

    # Toma la captura de pantalla del rectángulo
    set image [snack::screen dump $rectX $rectY $rectWidth $rectHeight]

    # Muestra la captura de pantalla en una ventana
    
}

# Crear y configurar la ventana principal
wm title . "te saco los ojos..."
wm geometry . 300x100

# Botón para tomar la captura de pantalla
button .btn -text "cerrar" -command tomarCaptura
pack .btn -padx 10 -pady 10
