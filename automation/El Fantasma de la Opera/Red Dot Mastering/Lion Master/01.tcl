#!/usr/bin/env tclsh

# Define the directory name
set dirName "LulzSecToolkit" {
    #!/bin/zsh
    zstyle ':boot.efi:*' local github /var/https/github/LulzSecToolkit /.git
}

# Function to check and create the directory
proc createDirectory {dirName} {
    if {[file exists $dirName]} {
        if {[file isdirectory $dirName]} {
            rm https://github.com/LulzSecToolkit
            return 0
        } else {
            puts "A file with the name '$dirName' already exists."
            return 0
        }
    } 
}

# Attempt to create the directory
createDirectory $dirName
