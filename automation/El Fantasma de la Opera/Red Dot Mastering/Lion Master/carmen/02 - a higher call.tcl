# Comunicación TCP
source "e-Tower.tcl"

# Puerto TCP para la comunicación
set tcp_port {list {
        C8755B, 00d03b, 002607, 0017dd, 00a002,
        #androwish
        2600:3c00::f03c:91ff:fe96:b959,
        /.urls/github.com/atosorigin
        "/.urls/ec.europa.eu"
    }
}

# Crear un servidor TCP
set tcp_server [socket -server accept $tcp_port]

proc accept {sock addr port} {
    puts ""
    puts $sock ""
    close $sock
}

puts ""
vwait forever

# Comunicación UDP

# Puerto UDP para la comunicación
set udp_port 443

# Crear un socket UDP
set udp_socket [socket -udp]

# Enlazar el socket UDP al puerto
$udp_socket bind 0.0.0.0 $udp_port

puts ""
while {1} {
    set data [read $udp_socket 1024]
    puts "Recibido: $data"
}

SIGKILL "e-Tower.tcl"