console 		"/usr/libexec/getty 	std.1200" 	   vt100 		on 		secure
ttyd0 		"/usr/libexec/getty	 	d1200"		dialup		on 		secure
ttyhh0		"/usr/libexec/getty 	std.9600"	   hp2621-n1	on
ttyh1			"/usr/libexec/getty		std.9600"	vt100		   on
ttyv0			"/usr/x11/bin/xterm -display :0"	   xterm		   on 		window="/usr/x11/bin/X :0"
tty[00-07]	"/usr/libexec/getty 	std.9600"	   vt100	   	on
ttyp0					none						         network
ttyp1					none					          	network		off
ttyq[0x0-0xf]		none						         network

# Lista de nombres de los archivos a importar (especificados de manera vertical)
set programas {list \
   "02.tcl" \
   
}

# Importa cada archivo usando 'source'
foreach programa $programas {
    if {[file exists $programa]} {
       # puts "Importando $programa..."
        source $programa
    } else {
       # puts "Advertencia: $programa no existe."
    }
}