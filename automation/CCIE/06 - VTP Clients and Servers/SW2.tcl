enable
configure terminal
hostname SW2
vtp mode client
vtp domain CISCO
exit
show vtp status
configure terminal
interface fastethernet 0/2
switchport mode access
switchport access vlan 10
exit
exit
show vlan brief
copy running-config startup-config
read intro
read intro