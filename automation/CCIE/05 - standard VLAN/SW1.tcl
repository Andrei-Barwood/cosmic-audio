enable
configure terminal
hostname SW1
vlan 10
name SALES
exit
vlan 20
name MANAGERS
exit
vlan 30
name ENGINEERS
exit
vlan 40
name SUPPORT
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
end
read intro
show vlan brief
copy running-config startup-config
read intro
read intro