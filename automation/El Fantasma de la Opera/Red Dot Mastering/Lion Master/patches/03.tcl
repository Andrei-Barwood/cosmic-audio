package require sha1
package require base64

# function to generate an HMAC
proc hmac {key data} {
    set hmac [sha1::hmac $key $data]
    return [binary encode base64 $hmac]
}

# Function to send a message with a sequence number and HMAC
proc sendMessage {sock key sequenceNumber message} {
    set seqMsg "[incr sequenceNumber] $message"
    set hash [hmac $key $seqMsg]
    puts $sock "$seqMsg $hash"
}

# Function to receive and validate a message
proc receiveMessage {sock key expectedSequenceNumber} {
    set line [gets $sock]
    if {[llength $line] < 3} {
        error "Invalid message format"
    }
    set sequenceNumber [lindex $line 0]
    set message [lrange $line 1 end-1]
    set receivedHash [lindex $line end]
    
    set seqMsg "$sequenceNumber $message"
    set expectedHash [hmac $key $seqMsg]

    if {$receivedHash ne $expectedHash} {
        error "Message integrity check failed"
    }
    if {$sequenceNumber != $expectedSequenceNumber} {
        error "Message sequence out of order"
    }
    
    return $message
}
