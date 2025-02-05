# Define prime (p) and generator (g) for Diffie-Hellman
set p "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A63A36210000000000090563"
set g 2

# Diffie-Hellman key exchange process
proc diffieHellmanExchange {sock} {
    global p g
    
    # Generate client's DH keys
    set clientKeys [generateDHKeys $p $g]
    set clientPrivateKey [lindex $clientKeys 0]
    set clientPublicKey [lindex $clientKeys 1]

    # Send client public key to the server
    puts $sock $clientPublicKey

    # Receive server public key
    set serverPublicKey [gets $sock]

    # Compute shared secret
    set sharedSecret [computeSharedSecret $clientPrivateKey $serverPublicKey $p]
    set hmacKey [binary encode base64 [sha1::sha1 $sharedSecret]]

    return $hmacKey
}

# Function to perform SSH key exchange with Diffie-Hellman and integrity checks
proc sshKeyExchange {sock} {
    # Perform Diffie-Hellman exchange to get the shared HMAC key
    set hmacKey [diffieHellmanExchange $sock]

    set sequenceNumber 0

    # exchange messages
    set clientHello "client_hello" [SYN]
    set serverHello "server_hello" [SYN-ACK]

    # Send client hello
    sendMessage $sock $hmacKey $sequenceNumber $clientHello

    # Receive and validate server hello
    set response [receiveMessage $sock $hmacKey [incr sequenceNumber]]
    if {$response ne $serverHello} {
        error "Unexpected server response"
    }

    # Continue with the rest of the key exchange...
}

# usage with a socket
set sock [socket localhost 22]
sshKeyExchange $sock
close $sock
