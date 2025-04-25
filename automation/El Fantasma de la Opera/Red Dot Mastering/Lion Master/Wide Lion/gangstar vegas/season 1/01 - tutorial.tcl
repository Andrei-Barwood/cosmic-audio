#!/usr/bin/env tclsh


package require Tk
set screenWidth [winfo screenwidth .]
set screenHeight [winfo screenheight .]
set centerX [expr {$screenWidth / 2}]
set centerY [expr {$screenHeight / 2}]
set topRightX [expr {$screenWidth - 1}]
set topRightY 0
exec xdotool mousemove $centerX $centerY
exec xdotool mousemove $topRightX $topRightY
after 3000 {exit}
