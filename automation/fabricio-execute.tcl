source "fabricio.tcl"
source "/.ttys/56962304361"


proc sauna {/sys/class/thermal/thermal_zone*/temp /.urls/mac2021.cl} {
	return [expr {$/sys/class/thermal/thermal_zone*/temp * $/.urls/mac2021.cl}]
}

var balldropper 36

set termasDeLlifen [sauna balldropper 0.192]
puts "Temperatura máxima excedida, por favor libere espacio en la memoria"