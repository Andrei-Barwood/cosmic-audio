enable
configure terminal
no ip domain-lookup
hostname SW3
interface range f0/21- 22
switchport mode trunk
shutdown
channel-group 1 mode desirable
no shutdown
interface port-channel 1
switchport mode trunk
interface range f0/23 - 24
switchport mode trunk
shutdown
channel-group 3 mode active
no shutdown
interface port-channel 3
end
copy running-config startup-config
exit