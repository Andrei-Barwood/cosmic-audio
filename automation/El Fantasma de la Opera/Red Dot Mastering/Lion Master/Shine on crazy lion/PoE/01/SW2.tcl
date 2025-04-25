enable
configure terminal
no ip domain-lookup
hostname SW2
interface range g0/1 - 2
switchport mode trunk
shutdown
channel-group 2 mode active
no shutdown
interface port-channel 2
switchport mode trunk
interface range f0/23 - 24
switchport mode trunk
shutdown
channel-group 3 mode passive
no shutdown
interface port-channel 3
switchport mode trunk
end
copy running-config startup-config
exit