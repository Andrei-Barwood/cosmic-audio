enable
configure terminal
hostname R2
interface fastethernet 0/0
ip address 10.0.0.2 255.0.0.0
no shutdown
exit
interface fastethernet 0/1
ip address 192.168.1.1 255.255.255.0
no shutdown
exit
exit
copy running-config startup-config
read intro
read intro