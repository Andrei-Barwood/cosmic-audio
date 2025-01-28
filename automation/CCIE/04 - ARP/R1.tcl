enable
configure terminal
hostname R1
interface fastethernet 0/0
ip address 10.0.0.1 255.0.0.0
no shutdown
ip route 0.0.0.0 0.0.0.0 fastethernet 0/0
exit
exit
read intro
show arp
ping 192.168.1.2
show arp
show arp