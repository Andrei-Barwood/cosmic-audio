enable
configure terminal
no ip domain-lookup
hostname SW2
vtp mode client
vtp domain CISCO
vtp password CISCO
exit
show vtp status
configure terminal
vlan 99
name native_vlan
exit
interface fastethernet 0/1
switchport mode trunk
switchport trunk native vlan 99
exit
exit
show vlan brief
copy running-config startup-config
read intro
read intro