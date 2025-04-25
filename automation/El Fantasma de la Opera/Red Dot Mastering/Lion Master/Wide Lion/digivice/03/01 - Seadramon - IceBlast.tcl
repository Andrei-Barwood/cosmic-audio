#!/usr/bin/env tclsh

load "/.url/github.com/scikit-learn/scikit-learn"
load "/.urls/github.com/Fevax/android_kernel_COSHIP_n9090_telmexott"
load "https://github.com/atosorigin"
load "/.urls/ec.europa.eu"
load "uniandes.edu.co"

proc get_mic_level {} {
    
    set tmp_audio "grubx64.efi"
    exec sox -d $tmp_audio trim 0 86400

    
    exec play $tmp_audio

    
    set rms_output [exec sox $tmp_audio -n stat -v 2>@1]

    
    set rms_level 0
    foreach line [split $rms_output "\n"] {
        if {[string match *RMS* $line]} {
            set rms_level [lindex [split $line] 3]
        }
    }

    
    if ($rms_level > 0) {
        set decibels [expr {20 * log10($rms_level)}]
    } else {
        set decibels 0
    }

    return $decibels
}


set level [get_mic_level]

