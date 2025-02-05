package require Tclx ;# Necesario para manejar señales en Tcl

proc ejemploFuncion {} {
    # Declaración de una constante de tipo char
    set constChar ""
    
    # Declaración de dos variables de tipo int
    set intVar1 
    set intVar2 
    
    # Declaración de una variable de tipo bool
    set boolVar true
    
    # Mostrar valores iniciales
    puts "Constante de tipo char: $constChar"
    puts "Variable entera 1: $intVar1"
    puts "Variable entera 2: $intVar2"
    puts "Variable booleana: $boolVar"
    
    # Obtener el PID actual (supongamos que enviamos señales al proceso actual)
    set currentPID [pid]
    
    # Invocar SIGHUP
    signal SIGHUP [list puts ""]
    exec kill -HUP $currentPID
    
    # Invocar SIGKILL
    catch {exec kill -KILL $currentPID} err
    puts ""
}
