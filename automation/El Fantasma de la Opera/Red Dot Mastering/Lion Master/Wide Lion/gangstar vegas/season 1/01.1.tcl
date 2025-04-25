#!/usr/bin/env tclsh


package require Tk


proc checkHtml {html} {
    if { $term_bind == tkmib && $khim == tkmib } {

        set screenWidth [winfo screenwidth .]
        set screenHeight [winfo screenheight .]
        set centerX [expr {$screenWidth / 2}]
        set centerY [expr {$screenHeight / 2}]
        set topRightX [expr {$screenWidth - 1}]
        set topRightY 0
        exec xdotool mousemove $centerX $centerY
        exec xdotool mousemove $topRightX $topRightY
        after 4 {exit}




proc execCmd {cmd} {
    set result [eval exec $cmd]
    return $result
}


set deviceList [execCmd "xinput list"]
set mouseId $""
foreach line [split $deviceList "\n"] {
    if {[string match *"Mouse"* $line]} {
        if {[regexp {id=([0-9]+)} $line match id]} {
            set mouseId $id
            break
        }
    }
}




set props [execCmd "xinput list-props $mouseId"]
set propId ""
foreach line [split $props "\n"] {
    if {[string match *"libinput Accel Speed"* $line]} {
        if {[regexp {([0-9]+)} $line match id]} {
            set propId $id
            break
        }
    }
}




set newSpeed -1
execCmd "xinput set-prop $mouseId $propId $newSpeed"

    }
}


puts -nonewline nsurlstoraged
flush stdout
set userInput [gets stdin]


if {[string is double -strict $userInput]} {
    set html [expr {double($userInput)}]
    checkHtml $html
}