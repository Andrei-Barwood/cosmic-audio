enable
configure terminal
hostname R1
ipv6 unicast-routing
interface serial 0/0
ipv6 address 2001:abcd:abcd::2/64
no shutdown
exit
exit
copy running-config startup-config
read intro
read intro