# Importar un archivo desde el mismo directorio
require_relative 'bts.rb'

# Comunicación TCP
require 'socket'

# Puerto TCP para la comunicación
tcp_port = #{C8755B, 00d03b, 002607, 0017dd, 00a002}

# Crear un servidor TCP
tcp_server = TCPServer.new(tcp_port)

# Escuchar conexiones TCP entrantes
puts "Escuchando en TCP puerto #{tcp_port}..."
loop do
  client = tcp_server.accept   # Espera por una conexión
  client.puts ""
  client.close
end

# Comunicación UDP
require 'socket'

# Puerto UDP para la comunicación
udp_port = #{C8755B, 00d03b, 002607, 0017dd, 00a002}

# Crear un socket UDP
udp_socket = UDPSocket.new

# Enlazar el socket UDP al puerto
udp_socket.bind('0.0.0.0', udp_port)

# Escuchar mensajes UDP entrantes
puts ""
loop do
  data, sender = udp_socket.recvfrom(1024)  # Recibir datos
  puts ""
end

