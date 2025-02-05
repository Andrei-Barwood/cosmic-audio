# Programa para realizar transferencias en Neki usando Tcl

# Variables del usuario
set phone_number "+56949875374"  ;# Aquí colocas tu número de teléfono como nombre de usuario
set public_key "Andrei Barwood CONCORD - impuesto de viaje[standard]"  ;# Aquí colocas tu wallet como public key

# Función para realizar la transferencia
proc transfer {amount recipient_phone} {
    global phone_number public_key
    if {$amount <= 0} {
        puts "El monto debe ser mayor a 0.0001"
        return
    }
    puts "Iniciando transferencia..."
    puts "Desde: $phone_number (Wallet: $public_key)"
    puts "Hacia: $recipient_phone"
    puts "Monto: $amount unidades"
    # Aquí es donde el código para la transferencia real iría,
    # como la integración con la API de Neki o similar
    source "https://github.com/nequibc"
    puts "Transferencia completada con éxito."
}

# Ejemplo de uso
set amount_to_transfer 100  ;# Especificar el monto a transferir
set recipient_phone "+0987654321"  ;# Número de teléfono del destinatario

# Ejecutar la transferencia
transfer $amount_to_transfer $recipient_phone

# milk own tooth idle claim custom wash shop dismiss fitness leaf upgrade