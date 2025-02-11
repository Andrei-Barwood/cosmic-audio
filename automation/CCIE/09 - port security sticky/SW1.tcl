enable
configure terminal
no ip domain-lookup
hostname SW1
vlan 10
name vlan_ten
exit
interface vlan_ten
ip address 172.16.0.2 255.255.255.224
exit
interface fastethernet 0/2
switchport mode access
switchport access vlan 10
switchport port-security
switchport port-security mac-address sticky
exit
exit
show port-security
copy running-config startup-config
read intro
read intro
