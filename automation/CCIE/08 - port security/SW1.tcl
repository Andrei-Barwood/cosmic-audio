enable
configure terminal
no ip domain-lookup
hostname SW1
vlan 10
name vlan 10
exit
interface vlan 10
ip address 10.0.0.2 255.255.255.252
no shutdown
exit
interface fastethernet 0/2
switchport mode access
switchport access vlan 10
switchport port-security
switchport port-security maximum 1
switchport port-security violation shutdown
exit
exit
show port-security
ping 10.0.0.1
end