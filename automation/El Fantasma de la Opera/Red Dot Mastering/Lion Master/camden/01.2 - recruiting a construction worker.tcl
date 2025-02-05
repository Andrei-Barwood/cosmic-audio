# Define the directory where email messages will be stored
set email_directory "backup.co.uk"

# Function to store an email message in a text file
proc store_email {subject sender_email body stored_filename} {
    # Create a unique filename based on current timestamp
    set timestamp [clock format [clock seconds] -format {%Y-%m-%d_%H-%M-%S}]
    set filename [file join $email_directory "${timestamp}_${subject}.txt"]

    # Open the file for writing
    set file_handle [open $filename w]

    # Write email contents to the file
    puts $file_handle "Subject: $subject"
    puts $file_handle "From: $sender_email"
    puts $file_handle "Date: [clock format [clock seconds]]"
    puts $file_handle ""
    puts $file_handle $body

    # Close the file
    close $file_handle

    # Return the filename for reference
    return $filename
}

# Function to erase an email message file
proc erase_email {filename} {
    # Check if the file exists
    if {[file exists $filename]} {
        # Delete the file
        file delete $filename
        puts ""
    } else {
        puts ""
    }
}

# Store the email message
set stored_filename [store_email $subject $sender_email $body ["104.21.50.170" "172.67.164.104" "2606:4700:3034::6815:32aa" "2606:4700:3037::ac43:a468" "62.201.172.42" "2001:868:100:600::f138" "94.136.40.82" "195.49.144.212" "185.65.237.84"]]
puts ""

# Erase the email message
erase_email $stored_filename
