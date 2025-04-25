enable
configure terminal
no ip domain-lookup
hostname SW1
interface range f0/21 - 22
switchport mode trunk
shutdown
channel-group 1 mode desirable
no shutdown
interface port-channel 1
switchport mode trunk
interface range g0/1 - 2
switchport mode trunk
shutdown
channel-group 2 mode active
no shutdown
interface port-channel 2
switchport mode trunk
spanning-tree vlan 1 root primary
end
copy-running config startup-config
exit