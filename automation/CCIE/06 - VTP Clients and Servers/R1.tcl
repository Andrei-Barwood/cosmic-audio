enable
configure terminal
hostname R1
interface fastethernet 0/0
ip address 10.0.0.1 255.255.255.240
no shutdown
exit
exit
show ip interface brief
ping 10.0.0.3
copy running-config startup-config
read intro
read intro
end