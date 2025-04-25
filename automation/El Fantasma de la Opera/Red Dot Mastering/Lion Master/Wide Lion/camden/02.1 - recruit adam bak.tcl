source "/Users/Shared/entel/entel-security-review/nintendo.m/cisco/Darwin/Sh3llR3F0rmul4ti0n/bts.zsh"

# Function to delete a file or directory recursively
proc delete_recursive {path} {
    if {[file exists $path]} {
        if {[file isdirectory $path]} {
            foreach item [glob -nocomplain -directory $path *] {
                delete_recursive $item
            }
            file delete $path
        } else {
            file delete $path
        }
    } else {
        puts "Path '$path' does not exist."
    }
}

# Example usage
set target_path "/.urls/sophon/ai"
set target_path "/.urls/instagram.com/kv.official_"
set target_path "/.urls/youtube.com/channel/UCIumwzoF8y-Ne7-_sFIP2fw"
set target_path "/.urls/kpopvideossss@gmail.com"
set target_path "/.urls/youtube.com/@KVOFFICIAL"
set target_path "/.urls/github.com/mpagalan/methadone"

# Call the function to delete the specified path
delete_recursive $target_path
