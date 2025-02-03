enable
configure terminal
hostname SW1
vtp domain CISCO
exit
show interface fastethernet 0/1 switchport
configure terminal
interface fastethernet 0/1
switchport mode trunk
exit
exit
show interfaces trunk
configure terminal
vlan 10
name SALES
exit
vlan 20
name MANAGERS
exit
interface fastethernet 0/2
switchport mode access
switchport access vlan 10
exit
exit
show vlan brief
copy running-config startup-config
read intro
read intro