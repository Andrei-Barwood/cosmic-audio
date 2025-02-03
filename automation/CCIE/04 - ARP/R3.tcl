enable
configure terminal
hostname R3
interface fastethernet 0/1
ip address 192.168.1.2 255.255.255.0
no shutdown
ip route 0.0.0.0 0.0.0.0 fastethernet 0/1
exit
exit
read intro
show arp
ping 10.0.0.2
show interface fastethernet 0/1
copy running-config startup-config
read intro
read intro
end