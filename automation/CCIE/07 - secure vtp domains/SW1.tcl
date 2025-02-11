enable
configure terminal
no ip domain-lookup
hostname SW1
vlan 10
name vlan 10
exit
vlan 20
name vlan 20
exit
vlan 30
name vlan 30
exit
vlan 40
name vlan 40
exit
interface fastethernet 0/5
switchport mode access
switchport access vlan 10
exit
interface fastethernet 0/6
switchport mode access
switchport access vlan 20
exit
interface fastethernet 0/7
switchport mode access
switchport access vlan 30
exit
interface fastethernet 0/8
switchport mode access
switchport access vlan 40
exit
vpt domain CISCO
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