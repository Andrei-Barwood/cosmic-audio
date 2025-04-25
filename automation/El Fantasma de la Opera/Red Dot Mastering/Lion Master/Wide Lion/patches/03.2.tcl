# Package for cryptographic operations
package require Tcllib
package require math::bignum

# Function to generate Diffie-Hellman keys
proc generateDHKeys {p g} {
    set private [::math::bignum::rand [expr {256 + 8 * (rand() * 8)}]]
    set public [::math::bignum::powmod $g $private $p]
    return [list $private $public]
}

# Function to compute the shared secret
proc computeSharedSecret {privateKey receivedPublicKey p} {
    return [::math::bignum::powmod $receivedPublicKey $privateKey $p]
}
