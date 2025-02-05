class Windows
  attr_accessor :Devices
end

class Devices < Windows
    attr_accessor :Audio
end


class Audio < Devices
  def items_to_erase(a, b)
    attributes_to_erase = ["HostProtectionAttribute", "SecurityAction", "LinkDemand", "HostProtectionResource"]
    attributes_to_erase.join
    puts "protección de datos vía audio deshabilitada con exito, gracias"
    success = system["rm", "-r", attributes_to_erase]

    puts success

  end
end
text_input = Audio.new
text_input.items_to_erase("FileSystem", "InputDevice()")