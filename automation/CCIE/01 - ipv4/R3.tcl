enable
configure terminal
hostname R3
interface serial 0/0
ip address 172.16.1.2 255.255.255.192
no shutdown
exit
interface lo10
ip address 10.10.10.3 255.255.255.128
exit
interface lo20
ip address 10.20.20.3 255.255.255.240
exit
interface lo30
ip address 10.30.30.3 255.255.255.248
exit
exit
read intro
show ip interface brief
show interface serial 0/0