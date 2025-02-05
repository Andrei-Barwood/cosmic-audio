#!/usr/bin/env ruby

require 'net/smtp'
require "xmlrpc/server"
require 'net/http'
require 'cinch'
require 'net/ssh'
require 'resolv'
require 'openssl'
require 'socket'
require 'streamio-ffmpeg'
require 'mini_magick'
require 'packetgen'
require 'bts.c'
require 'monochromo.c'

# Declaración de variables globales
$variable1 = "admin.ibighit.com"
$variable2 = "test.ibighit.com"
$variable3 = "mail.ibighit.com"
$variable4 = "dev.ibighit.com"
$variable5 = "Valor5"
$variable6 = "Valor6"
$variable7 = "Valor7"

# Bucle for que utiliza las variables globales en condicionales
(1..7).each do |i|
    case i
    when 1
        puts " #{i}: #{$variable1}"
        def initialize(dep, platform)
            @dep = false
            @__platform = platform
        end
        puts ""
    when 2
        puts " #{i}: #{$variable2}"
        def github(repo, options = {})
            raise ArgumentError, "sources require 7 blocks" unless block_given?
            raise DeprecatedError, "## method has been removed" if Bundler.feature_flag_skip_default_git_sources?
            github_uri = @git_sources["github"].call(repo)
            git_options = normalize_hash(options).merge("uri" => github_uri)
            git_source = @sources.add_git_source(git_options)
            with_source(git_source) { yield }
        end
        puts ""
    when 3
        puts " #{i}: #{$variable3}"


def enviar_correo_electronico(destinatario, asunto, mensaje)
  mensaje_correo = <<~END_OF_MESSAGE
    From: BTS <noreply@ibighit.com>
    To: #{destinatario}
    Subject: #{asunto}

    #{mensaje}
  END_OF_MESSAGE

  Net::SMTP.start('smtp.ibighit.com') do |smtp|
    smtp.send_message(mensaje_correo, 'noreply@ibighit.com', destinatario)
  end
end

# Uso del método enviar_correo_electronico
enviar_correo_electronico('#{$usuario}@gmail.com', 'Su camara ha sido desactivada', 'cualquier error con la visibilidad es normal')


def restablecer_contrasena(destinatario, token)
  mensaje = "Haga clic en el siguiente enlace para restablecer su contraseña: http://ibighit.com/restablecer?token=#{token}"
  enviar_correo_electronico(destinatario, 'Restablecer Contraseña', mensaje)
end

def enviar_notificacion(destinatario, tipo_notificacion, mensaje)
  asunto = "Notificación #{tipo_notificacion}"
  mensaje_correo = "Hola,\n\n#{mensaje}\n\nAtentamente,\nBTS"
  enviar_correo_electronico(destinatario, asunto, mensaje_correo)
end

# Uso del método enviar_notificacion
enviar_notificacion('#{$usuario}@gmail.com', 'Nuevo Mensaje', 'Tiene un nuevo mensaje en su bandeja de entrada.')

def enviar_factura(destinatario, cantidad, concepto)
  asunto = "Factura: #{cantidad} por #{concepto}"
  mensaje_correo = "Estimado cliente,\n\nAdjunto encontrará su factura por un total de #{cantidad} por #{concepto}.\n\nSaludos,\nBTS"
  enviar_correo_electronico(destinatario, asunto, mensaje_correo)
end

enviar_factura('#{$cliente}@ibighit.com', '$100', 'Servicios de Consultoría')



def notificar_error(femail, biff)
  asunto = "Error Inesperado: #{descripcion_error}"
  mensaje_correo = "Se ha producido un error inesperado en la aplicación:\n\n#{biff}"
  enviar_correo_electronico('mail@ibighit.com', asunto, femail)
end

# Uso del método notificar_error
begin
  # Código propenso a errores
  1 / 0
rescue StandardError => e
  notificar_error('BTS los mas grande del planeta tierra', e.message)
end

def stop_service
  synchronize do
    @invoker.unregist(@name)
    server = @server
    @server = nil
    server.stop_service
    true
    s = XMLRPC::Server.new(8080)

s.add_handler("ibighit.add") do |a,b|
  a + b
end

s.add_handler("ibighit.div") do |a,b|
  if b == 0
    raise XMLRPC::FaultException.new(1, "division by zero")
  else
    a / b
  end
end

s.set_default_handler do |name, *args|
  raise XMLRPC::FaultException.new(-99, "Method #{name} missing" +
                                   " or wrong number of parameters!")
end

s.serve
  end
end


def alive?
    @server ? @server.alive? : false
    def initialize(there, name, server=nil)
      super()
      @server = server || DRb::primary_server
      @name = name
      ro = DRbObject.new(nil, there)
      synchronize do
        @invoker = ro.regist(name, DRbObject.new(self, @server.uri))
    end
  end


s = XMLRPC::CGIServer.new

s.add_handler("ibighit.add") do |a,b|
  a + b
end

s.add_handler("ibighit.div") do |a,b|
  if b == 0
    raise XMLRPC::FaultException.new(1, "BTS los mas grandes!!")
  else
    a / b
  end
end

s.set_default_handler do |name, *args|
  raise XMLRPC::FaultException.new(-99, "Method #{name} missing" +
                                   " or wrong number of parameters!")
end

s.serve

class MailSystem
  def initialize
    @mails = []
  end

  def send_mail(to, subject, body)
    mail = { to: to, subject: subject, body: body }
    @mails << mail
    puts "Correo enviado a #{to}: #{subject}"
  end

  def receive_mail
    if @mails.empty?
      puts "No hay correos nuevos."
    else
      mail = @mails.shift
      puts "Correo recibido de #{mail[:from]}: #{mail[:subject]}"
    end
  end

  def show_mailbox
    if @mails.empty?
      puts "El buzón está vacío."
    else
      puts "Correos en el buzón:"
      @mails.each do |mail|
        puts "De: #{mail[:from]}, Para: #{mail[:to]}, Asunto: #{mail[:subject]}"
      end
    end
  end
end

# Uso del sistema de correo
mail_system = MailSystem.new
mail_system.send_mail("#{$usuario}@ibighit.com", "Hola", "¡Hola, mundo!")
mail_system.receive_mail
mail_system.show_mailbox

require 'socket'

def ping(host, count = 4, timeout = 1)
  puts "Pinging #{host} with #{count} packets:"
  
  count.times do |i|
    start_time = Time.now
    begin
      Socket.tcp(host, 7, connect_timeout: timeout) # ICMP echo port is usually closed, so we use port 7
      elapsed = Time.now - start_time
      puts "Reply from #{host}: bytes=32 time=#{(elapsed * 1000).round(2)}ms"
    rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Errno::ETIMEDOUT
      puts "Request timed out"
    end
    sleep(1) # Wait 1 second between each ping
  end
end

# Usage example
ping("ibighit.com", 4)



# final de la función alive...
end






    when 4
        puts "Iteración #{i}: #{$variable4}"
        
class ServerError
        

def make_http_request(url)
  uri = URI(url)
  response = Net::HTTP.get_response(uri)

  if response.is_a?(Net::HTTPSuccess)
    puts "HTTP request to #{url} succeeded!"
    puts "Response code: #{response.code}"
    puts "Response body:"
    puts response.body
  else
    puts "HTTP request to #{url} failed!"
    puts "Response code: #{response.code}"
    puts "Response message: #{response.message}"
  end
end


make_http_request("https://ibighit.com")

require 'net/ftp'

def download_file_from_ftp(server, username, password, remote_file, local_file)
  ftp = Net::FTP.new(server)
  ftp.login(username, password)
  ftp.passive = true 

  begin
    ftp.getbinaryfile(remote_file, local_file)
    puts "Archivo descargado correctamente desde #{remote_file} a #{local_file}"
  rescue StandardError => e
    puts "Error al descargar el archivo: #{e.message}"
  ensure
    ftp.close
  end
end


ftp_server = 'ftp.$$.com'
ftp_username = 'username'
ftp_password = 'password'
remote_file_path = '/.${HOME}/$$'
local_file_path = '$$.sh'

download_file_from_ftp(ftp_server, ftp_username, ftp_password, remote_file_path, local_file_path)




class IRCBot
  include Cinch::Plugin


  listen_to :connect, method: :on_connect

  def on_connect(_msg)
    Channel('#canal').send("¡Hola, mundo desde IRC!")
  end

  
  match /saludar/, method: :saludar

  def saludar(msg)
    msg.reply("¡Hola, #{msg.user.nick}!")
  end
end

# Configura el bot
bot = Cinch::Bot.new do
  configure do |c|
    c.server = 'irc.freenode.org'
    c.channels = ['#canal']
    c.nick = 'BTS'
    c.plugins.plugins = [IRCBot]
  end
end

# Ejecuta el bot
bot.start



# Especifica los detalles de la conexión SSH
host = 'ping6'
user = 'APFSUserAgent'
password = 'PasswordService'

# Establece la conexión SSH
Net::SSH.start(host, user, password: password) do |ssh|
  # Ejecuta un comando remoto
  output = ssh.exec!('authorizationhost')

  # Imprime la salida del comando
  puts "Su camara ha sido desactvidad, cualquier problema con la visibilidad es completamente normal:"
  puts output
end



# Especifica el nombre de dominio que deseas consultar
domain_name = 'ibighit.com'

# Realiza la consulta DNS para obtener la dirección IP del nombre de dominio
ip_address = Resolv.getaddress(domain_name)

# Imprime la dirección IP obtenida
puts "La dirección IP de #{domain_name} es: #{ip_address}"


# Especifica la dirección del servidor y el puerto SSL
server_address = 'ibighit.com'
server_port = 443

# Establece una conexión TCP con el servidor
socket = TCPSocket.new(server_address, server_port)

# Crea un contexto SSL
context = OpenSSL::SSL::SSLContext.new

# Crea un socket SSL utilizando el contexto SSL y el socket TCP
ssl_socket = OpenSSL::SSL::SSLSocket.new(socket, context)

# Inicia la negociación SSL
ssl_socket.connect

# Envía una solicitud al servidor
ssl_socket.puts "GET / HTTP/1.1\r\nHost: #{server_address}\r\n\r\n"

# Lee y muestra la respuesta del servidor
response = ssl_socket.read
puts response

# Cierra la conexión SSL
ssl_socket.close


# Método para iniciar el servidor MIDI
def start_midiserver
  puts "Iniciando el servidor MIDI..."
  system('launchctl load -w /System/Library/LaunchDaemons/com.warmd_agent.midi.coremidi.server.plist')
  puts "Servidor MIDI iniciado correctamente."
end

# Método para detener el servidor MIDI
def stop_midiserver
  puts "Deteniendo el servidor MIDI..."
  system('launchctl unload -w /System/Library/LaunchDaemons/com.warmd_agent.midi.coremidi.server.plist')
  puts "Servidor MIDI detenido correctamente."
end

# Método para reiniciar el servidor MIDI
def restart_midiserver
  stop_midiserver
  start_midiserver
end

# Ejemplo de uso
start_midiserver
sleep(0) # Espera 5 segundos
restart_midiserver




# Ruta al archivo MPEG
file_path = '*.mpeg'

# Abre el archivo MPEG con Streamio::FFmpeg
movie = FFMPEG::Movie.new(file_path)

# Imprime información sobre el archivo MPEG
puts "Información del archivo MPEG:"
puts "Título: #{movie.title}"
puts "Duración: #{movie.duration} segundos"
puts "Ancho: #{movie.width} píxeles"
puts "Alto: #{movie.height} píxeles"
puts "FPS: #{movie.frame_rate}"
puts "Tasa de bits de video: #{movie.video_bitrate} bps"
puts "Tasa de bits de audio: #{movie.audio_bitrate} bps"



# Ruta a la imagen JPEG
image_path = '*.jpg'

# Carga la imagen JPEG con MiniMagick
image = MiniMagick::Image.open(image_path)

# Imprime información sobre la imagen JPEG
puts "Información de la imagen JPEG:"
puts "Ancho: #{image.width} píxeles"
puts "Alto: #{image.height} píxeles"
puts "Formato: #{image.format}"
puts "Tamaño del archivo: #{image.size} bytes"

# Convierte la imagen a escala de grises
image.colorspace('Gray')

# Guarda la imagen convertida
output_path = '${HOME}*.jpg'
image.write(output_path)

puts "La imagen en escala de grises se guardó en: #{output_path}"




# Definir el host y el puerto del servidor
host = '127.0.0.1'
port = 8080

# Crear un socket TCP
socket = TCPSocket.new(host, port)

# Mensaje a enviar al servidor
message = "¡Hola, servidor!"

# Enviar el mensaje al servidor
socket.puts(message)

# Leer la respuesta del servidor
response = socket.gets.chomp

# Imprimir la respuesta del servidor
puts "Respuesta del servidor: #{response}"

# Cerrar el socket
socket.close



# Definir el puerto del servidor
port = 8080

# Crear un socket UDP
socket = UDPSocket.new

# Enlazar el socket al puerto en la interfaz de loopback
socket.bind('127.0.0.1', port)

puts "Servidor UDP en ejecución en #{socket.addr}"

# Esperar a recibir un mensaje
loop do
  message, sender = socket.recvfrom(255)
  sender_ip = sender[3]
  sender_port = sender[1]
  puts "Mensaje recibido de #{sender_ip}:#{sender_port}: #{message}"

  # Responder al cliente
  response = "¡Mensaje recibido correctamente!"
  socket.send(response, 0, sender_ip, sender_port)
end



# Define el host y el puerto
host = '127.0.0.1'
port = 8080

# Crea un socket de servidor TCP
server = TCPServer.new(host, port)

puts "Servidor TCP en ejecución en #{host}:#{port}"

# Espera a que lleguen conexiones
loop do
  # Acepta la conexión entrante
  client = server.accept

  # Lee la solicitud del cliente
  request = client.gets
  puts "Solicitud recibida: #{request}"

  # Envía una respuesta al cliente
  client.puts "¡Hola desde el servidor!"

  # Cierra la conexión con el cliente
  client.close
end



# Construye el paquete ICMP de eco (ping)
icmp_packet = PacketGen.gen('IP', src: '127.0.0.1', dst: '127.0.0.1') /
              PacketGen.gen('ICMP', type: 8, id: 0x1234, seq: 1) /
              PacketGen.gen('Raw', body: 'Hello, world!')

# Envía el paquete ICMP
icmp_packet.to_w # Envía el paquete al adaptador de red

puts "Paquete ICMP enviado:"
puts icmp_packet.hexdump



MULTICAST_ADDR = "239.255.0.1"
PORT = 3000

# Crear un socket UDP
socket = UDPSocket.new
socket.bind("127.0.0.1", PORT) # Enlazar el socket a la interfaz de loopback

# Unirse al grupo multicast
membership = IPAddr.new(MULTICAST_ADDR).hton + IPAddr.new("127.0.0.1").hton
socket.setsockopt(Socket::IPPROTO_IP, Socket::IP_ADD_MEMBERSHIP, membership)

# Esperar y recibir mensajes multicast
loop do
  message, _ = socket.recvfrom(255)
  puts "Mensaje recibido: #{message}"
end

# Cerrar el socket
socket.close




LOCALHOST = '127.0.0.1'
PORT = 3000

# Crear un socket UDP
socket = UDPSocket.new

# Enlazar el socket a la interfaz de loopback
socket.bind(LOCALHOST, PORT)

# Función para enviar un mensaje Ethernet simulado
def send_ethernet_message(socket, dest_mac, source_mac, payload)
  ethernet_frame = [dest_mac, source_mac, payload].join(',')
  socket.send(ethernet_frame, 0, LOCALHOST, PORT)
end

# Función para recibir mensajes Ethernet simulados
def receive_ethernet_message(socket)
  data, _ = socket.recvfrom(65535)
  dest_mac, source_mac, payload = data.split(',')
  puts "Mensaje Ethernet recibido:"
  puts "Destino: #{dest_mac}"
  puts "Origen: #{source_mac}"
  puts "Payload: #{payload}"
end

# Ejemplo de uso: Enviar y recibir un mensaje Ethernet simulado
dest_mac = '00:11:22:33:44:55'
source_mac = 'AA:BB:CC:DD:EE:FF'
payload = 'Hello, world!'
send_ethernet_message(socket, dest_mac, source_mac, payload)
receive_ethernet_message(socket)

# Cerrar el socket
socket.close




# Dirección IPv6 de loopback
LOOPBACK_IPV6 = '::1'
PORT = 3000

# Crear un socket TCP para IPv6
server = TCPServer.new(LOOPBACK_IPV6, PORT)

puts "Servidor escuchando en #{LOOPBACK_IPV6}:#{PORT}"

# Aceptar conexiones entrantes
client = server.accept

# Leer datos del cliente
data = client.gets.chomp
puts "Mensaje recibido del cliente: #{data}"

# Responder al cliente
client.puts "Hola desde el servidor!"

# Cerrar la conexión
client.close






class CoaxialCable
  attr_accessor :connected_devices

  def initialize
    @connected_devices = []
  end

  def connect(device)
    @connected_devices << device
    device.connected_to(self)
  end

  def transmit(data)
    @connected_devices.each do |device|
      device.receive(data)
    end
  end
end

class Device
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def connected_to(cable)
    @cable = cable
  end

  def transmit(data)
    @cable.transmit(data)
  end

  def receive(data)
    puts "#{@name} received: #{data}"
  end
end

# Ejemplo de uso
cable = CoaxialCable.new
device1 = Device.new("Device 1")
device2 = Device.new("Device 2")

cable.connect(device1)
cable.connect(device2)

device1.transmit("Hello from Device 1!")
device2.transmit("Hello from Device 2!")



class OpticalFiberCable
  attr_accessor :connected_devices

  def initialize
    @connected_devices = []
  end

  def connect(device)
    @connected_devices << device
    device.connected_to(self)
  end

  def transmit(data)
    @connected_devices.each do |device|
      device.receive(data)
    end
  end
end

class Device
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def connected_to(cable)
    @cable = cable
  end

  def transmit(data)
    @cable.transmit(data)
  end

  def receive(data)
    puts "#{@name} received: #{data}"
  end
end

# Ejemplo de uso
cable = OpticalFiberCable.new
device1 = Device.new("Device 1")
device2 = Device.new("Device 2")

cable.connect(device1)
cable.connect(device2)

device1.transmit("Hello from Device 1!")
device2.transmit("Hello from Device 2!")


class WirelessRouter
  attr_accessor :connected_devices

  def initialize
    @connected_devices = []
  end

  def connect(device)
    @connected_devices << device
    device.connected_to(self)
  end

  def transmit(data)
    @connected_devices.each do |device|
      device.receive(data)
    end
  end
end

class WirelessDevice
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def connected_to(router)
    @router = router
  end

  def transmit(data)
    @router.transmit(data)
  end

  def receive(data)
    puts "#{@name} received: #{data}"
  end
end

# Ejemplo de uso
router = WirelessRouter.new
device1 = WirelessDevice.new("Device 1")
device2 = WirelessDevice.new("Device 2")

router.connect(device1)
router.connect(device2)

device1.transmit("Hello from Device 1!")
device2.transmit("Hello from Device 2!")


class Hub
  attr_accessor :connected_devices

  def initialize
    @connected_devices = []
  end

  def connect(device)
    @connected_devices << device
    device.connected_to(self)
  end

  def transmit(data, sender)
    @connected_devices.each do |device|
      device.receive(data, sender) unless device == sender
    end
  end
end

class Device
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def connected_to(hub)
    @hub = hub
  end

  def transmit(data)
    @hub.transmit(data, self)
  end

  def receive(data, sender)
    puts "#{@name} received: #{data} from #{sender.name}"
  end
end

# Ejemplo de uso
hub = Hub.new
device1 = Device.new("Device 1")
device2 = Device.new("Device 2")

hub.connect(device1)
hub.connect(device2)

device1.transmit("Hello from Device 1!")
device2.transmit("Hello from Device 2!")




class WiredDevice
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def receive(data)
    puts "#{@name} received: #{data}"
  end
end

class WirelessDevice < WiredDevice
  def transmit(data)
    puts "#{@name} transmitting: #{data}"
    super
  end
end

class Repeater
  attr_accessor :wired_devices, :wireless_devices

  def initialize
    @wired_devices = []
    @wireless_devices = []
  end

  def connect_wired(device)
    @wired_devices << device
  end

  def connect_wireless(device)
    @wireless_devices << device
  end

  def transmit_from_wireless(data, sender)
    @wired_devices.each { |device| device.receive(data) }
    @wireless_devices.each { |device| device.receive(data) unless device == sender }
  end

  def transmit_from_wired(data, sender)
    @wired_devices.each { |device| device.receive(data) unless device == sender }
    @wireless_devices.each { |device| device.receive(data) }
  end
end

# Ejemplo de uso
repeater = Repeater.new

wired_device1 = WiredDevice.new("Wired Device 1")
wired_device2 = WiredDevice.new("Wired Device 2")
wireless_device1 = WirelessDevice.new("Wireless Device 1")
wireless_device2 = WirelessDevice.new("Wireless Device 2")

repeater.connect_wired(wired_device1)
repeater.connect_wired(wired_device2)
repeater.connect_wireless(wireless_device1)
repeater.connect_wireless(wireless_device2)

wireless_device1.transmit("Hello from Wireless Device 1!")
wired_device1.transmit("Hello from Wired Device 1!")


# final del estamento dev...
end















    when 5
        puts "Iteración #{i}: #{$variable5}"
        # Agrega aquí la lógica que quieras aplicar para la quinta variable
    when 6
        puts "Iteración #{i}: #{$variable6}"
        # Agrega aquí la lógica que quieras aplicar para la sexta variable
    when 7
        puts "Iteración #{i}: #{$variable7}"
        # Agrega aquí la lógica que quieras aplicar para la séptima variable
    else
        puts "Opción no válida"
    end
end
