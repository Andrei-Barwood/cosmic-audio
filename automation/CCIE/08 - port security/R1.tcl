enable
configure terminal
no ip domain-lookup
hostname R1
interface fastethernet 0/0
ip address 10.0.0.1 255.255.252
no shutdown
exit
