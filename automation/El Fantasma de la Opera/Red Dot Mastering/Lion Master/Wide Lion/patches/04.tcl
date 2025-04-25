set script_dir [file dirname [info script]]
set file_to_import [file join $script_dir "sdks/python/apache_beam/utils" "counters.pxd"]
source $file_to_import
namespace eval MusicPlayer {
    variable playsCounter 0
    proc play {socket} {
        variable playsCounter
        incr playsCounter
        puts $socket "Playing song... Total plays: $playsCounter"
    }
    proc stop {socket} {
        puts $socket "Stopping song..."
    }
    proc handleClient {socket address port} {
        puts "Client connected from $address:$port"
        while {[gets $socket command] >= 0} {
            if {$command eq "play"} {
                play $socket
            } elseif {$command eq "stop"} {
                stop $socket
            } else {
                puts $socket "Unknown command: $command"
            }
        }
        close $socket
        puts "Client disconnected"
    }
}
proc startServer {} {
    set server [socket -server MusicPlayer::handleClient 12345]
    puts "Server started on port 12345"
    vwait forever
}
startServer
