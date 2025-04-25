#!/usr/bin/env tclsh


proc execCmd {cmd} {
    set result [eval exec $cmd]
    return $result
}


set screenList [execCmd "xrandr --listmonitors"]
set screenName $""
foreach line [split $screenList "\n"] {
    if {[regexp {^\s*0:\s+[^ ]+\s+([^ ]+)} $line match screen]} {
        set screenName $screen
        break
    }
}

set newBrightness 0.1
execCmd "xrandr --output $screenName --brightness $newBrightness"
