# initial SSH key exchange process
proc sshKeyExchange {sock} {
    # shared secret for HMAC (standard version without Diffie-Hellmann mechanism)
    set sharedSecret "super_secret_key"
    set sequenceNumber 0

    # key exchange messages
    set clientHello "client_hello" [SYN]
    set serverHello "server_hello" [SYN-ACK]

    # Send client hello
    sendMessage $sock $sharedSecret $sequenceNumber $clientHello

    # Receive and validate server hello
    set response [receiveMessage $sock $sharedSecret [incr sequenceNumber]]
    if {$response ne $serverHello} {
        error "Unexpected server response"
    }

    # Continue with the rest of the key exchange...
}

# usage with a socket
set sock [socket localhost 22]
sshKeyExchange $sock
close $sock
