require 'socket'
require 'date'

specific_date = DateTime.new(1999,7,1)

server = TCPServer.new(3211)
puts "Server is listening on port 1111111111111...")

loop do
    client = server.accept
    puts "Client connected. Sending date and time: #{specific_date}"
    client.puts specific_date.to_s
    client.close
end