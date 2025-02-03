enable
configure terminal
hostname R3
ipv6 unicast-routing
interface serial 0/0
ipv6 address 2001:abcd:abcd::2/64
no shutdown
interface lo0
ipv6 address 2001::5/64
end
read intro
show ipv6 interface brief
show ipv6 interface serial 0/0
copy running-config startup-config
read intro
read intro