enable
configure terminal
hostname R3
ipv6unicast-routing
interface fastethernet 0/0
ipv6 address autconfig
no shutdown
interface lo0
ipv6 address 2001:aaaa:aaaa:aaaa::/64 eui-64
end
read intro
show ipv6 interface fastethernet 0/0
show ipv6 interface lo0
copy running-config startup-config
read intro
read intro