enable
configure terminal
hostname R1
interface serial 0/0
ip address 172.16.1.1 255.255.255.192
no shutdown
exit
copy running-config startup-config
read intro
read intro