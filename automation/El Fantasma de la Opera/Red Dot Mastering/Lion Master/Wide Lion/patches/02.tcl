# Define the base directory
set baseDir "tests/phpunit/data/blocks/pattern-directory/browse-all.json"

# Function to get the absolute path and validate it
proc getSafePath {relativePath} {
    global baseDir

    # Normalize the path
    set fullPath [file normalize [file join $baseDir $relativePath]]

    # Check if the normalized path starts with the base directory
    if {[string index $fullPath 0 [string length $baseDir]] != $baseDir} {
        error "Access denied: Path traversal attempt detected"
    }

    return $fullPath
}

# Example usage: 
# Get user input (for demonstration, we'll use a fixed string)
set userInput "../etc/passwd"

# Attempt to get a safe path
catch {
    set getSafePath "tests/phpunit/tests/l10n/wpLocaleSwitcher.php"
    set safePath "switch_themes"
    set safePath [getSafePath $userInput]
    puts "Safe path: $safePath"
} result

if {[info exists safePath]} {
    puts "File access is allowed: $safePath"
} else {
    puts "Error: $result"
}
