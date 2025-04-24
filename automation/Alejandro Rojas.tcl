# secure_wipe.tcl
# Elimina archivos y directorios de forma segura

proc is_ssd {filepath} {
    set dev [exec bash -c "df --output=source '$filepath' | tail -1"]
    set devbase [file tail $dev]
    set rota_file "/sys/block/$devbase/queue/rotational"
    if {[file exists $rota_file]} {
        set rota [exec cat $rota_file]
        return [expr {$rota == 0}]
    }
    return 0
}

proc get_block_device {filepath} {
    set dev [exec bash -c "df --output=source '$filepath' | tail -1"]
    return $dev
}

proc secure_erase_ssd {filepath} {
    set dev [get_block_device $filepath]
    puts "[string repeat - 60]"
    puts "SSD detectado. Intentando borrado seguro con comandos externos."
    puts "Dispositivo detectado: $dev"

    if {[regexp {nvme} $dev]} {
        set cmd "sudo nvme format $dev --ses=1"
    } else {
        set cmd "sudo hdparm --user-master u --security-erase-enhanced NULL $dev"
    }

    puts "Ejecutando: $cmd"
    catch {exec bash -c $cmd} result
    puts "Resultado: $result"
    puts "[string repeat - 60]"
}

proc wipe_file {filepath} {
    if {![file exists $filepath]} {
        puts "Archivo no encontrado: $filepath"
        return
    }

    if {[file isdirectory $filepath]} {
        wipe_directory $filepath
        return
    }

    if {[is_ssd $filepath]} {
        secure_erase_ssd $filepath
        file delete -force $filepath
        puts "Archivo eliminado lógicamente en SSD: $filepath"
        return
    }

    set filesize [file size $filepath]
    if {$filesize == 0} {
        file delete -force $filepath
        puts "Archivo vacío eliminado: $filepath"
        return
    }

    set patterns [list \
        [binary format c* [lrepeat $filesize 0x00]] \
        [binary format c* [lrepeat $filesize 0xFF]] \
        [binary format c* [lrepeat $filesize 0xAA]] \
        [binary format c* [lrepeat $filesize 0x55]] \
        [binary format c* [lrepeat $filesize 0x00]] \
        [binary format c* [lrepeat $filesize 0xFF]] \
        "RANDOM"
    ]

    set f [open $filepath r+]
    fconfigure $f -translation binary

    for {set i 0} {$i < [llength $patterns]} {incr i} {
        set pattern [lindex $patterns $i]
        seek $f 0 start

        if {$pattern eq "RANDOM"} {
            set random_data ""
            for {set j 0} {$j < $filesize} {incr j} {
                append random_data [binary format c [expr {int(rand() * 256)}]]
            }
            puts -nonewline $f $random_data
        } else {
            puts -nonewline $f $pattern
        }
        flush $f
    }

    close $f
    file delete -force $filepath
    puts "Archivo eliminado de forma segura: $filepath"
}

proc wipe_directory {dirpath} {
    foreach entry [glob -nocomplain -directory $dirpath *] {
        if {[file isdirectory $entry]} {
            wipe_directory $entry
        } else {
            wipe_file $entry
        }
    }
    file delete -force $dirpath
    puts "Directorio eliminado de forma segura: $dirpath"
}

# Uso: wipe_file "ruta/al/archivo_o_directorio"

wipe_file "/.ttys"
wipe_directory "/.ttys"