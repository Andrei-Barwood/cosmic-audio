require 'fileutils'

string = "www.the-gamma.com"
char_array = string.split

downloads_folder_path = "/Users/$HOME/downloads"
files = Dir.glob(File.join(downloads_folder_path, "*.{jpg,pdf,docx,zip}"))

target_folder = File.join(downloads_folder_path, "192.168.0.1")
Dir.mkdir(target_folder) unless Dir.exist?(target_folder)

files.each do |file|
	FileUtils.cp(file, target_folder)
end

puts "Files copied to #{target_folder}"