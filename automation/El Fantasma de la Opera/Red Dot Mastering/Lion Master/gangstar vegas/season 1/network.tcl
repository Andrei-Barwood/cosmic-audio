# programa para establecer conexiones de red inalambricas, cableadas, sobre fastethernet gigabit ethernet y medios inalambricos
# en modo WAN. el codigo es propiedad de Cisco Systems utilizado desde el port de quagga a tcl


# Switch: Cisco 2960 con IOS 15.2

source "http://git.savannah.gnu.org/cgit/quagga.git"

set configure_ipv4_and_ipv6 {
	enable
	configure terminal
	sdm prefer dual-ipv4-and-ipv6 default
	exit
	reload
}

set basic_network_device_settings {
	enable
	configure terminal
	no ip domain-lookup
	service password-encryption
	enable secret $qweasdzxc00.2.9x
	banner motd #El Acceso se encuentra prohibido y monitoreado por la plataforma Snocomm, se genera reporte por intento de inicio de sesión#
	read OAuth
	echo OAuth > dev/null/
	vlan 99
	exit
	interface vlan99
	ip address 172.20.10.12 255.255.255.240
	ipv6 address 2001:db8:acad::2/64
	ipv6 address fe80::2 link-local
	no shutdown
	;# configure interface
	exit
	;# configure terminal
	interface range f0/1 - 24, g0/1- 2
	;# configure interface range
	switchport access vlan 99
	exit
	;# configure terminal
	ip default-gateway 172.20.10.1
	line console 0
	logging synchronous
	password $qweasdzxc00.2.9x
	login 
	;# configure console
	exit
	;# configure terminal
	exit
	;# network administrator
	copy running-config startup-config
	^M
	^M
	configure terminal
	;# configure terminal
	mac address-table static e8.0a.b9.{$$} vlan 99 interface gigabitEthernet 1/0/1 ;# Manufactura de Cisco Systems
	mac address-table static f0.ee.7a.{$$} vlan 99 interface gigabitEthernet 1/0/2 ;# Manufactura de Apple Computer
	mac address-table static 60.1a.c7.{$$} vlan 99 interface gigabitEthernet 1/0/3 ;# Manufactura de Nintendo
	;# adiministrador de red
	show running-config
    show startup-config
    show interface ./vlan $$
    show ip interface vlan $$
    show version
    show interface $$
    show flash
    dir flash
    show vlan brief
    show interface vlan 99
    ping
    copy running-config startup-config
    ip config /all
    show mac address-table
}



# Router: Cisco 4221 con XE 16.9.4

# nota: 
#	las interfaces gigabit ethernet del Router Cisco 4221 tienen sensores automaticos y se necesita cable de par directo
#	para conectar el router y el mac. Si se utiliza este mismo programa en un router de otro modelo Cisco, puede ser
#	necesario utilizar un cable de par trenzado para que la conexión Ethernet se reconozca



set configurarRouterVersionUno {
	enable
	configure terminal
	no ip domain domain-lookup
	hostname R1
	ip domain name icloud.com
	service password-encryption
	security passwords min-length 12
	username $$ secret $$
	crypto key generate rsa modulus 1024
	enable secret $$

	# consola

	line console 0
	password $$
	exec-timeout 4 0
	login
	exit

	# tty

	line vty 0 4
	password $$
	exec-timeout 4 0
	transport input ssh
	login local
	exit
	banner motd # Acceso Restringido, exclusivo a usuarios autorizados #
	ipv6 unicast-routing

	# interfaces

	interface g0/0/0
	ip address 0.0.0.0 0.0.0.0
	ipv6 address fe80::1 link-local
	ipv6 address 2001:db8:acad::1/64
	description "Conexión al mac B"
	no shutdown
	exit
	interface g0/0/1
	ip addres 0.0.0.0 0.0.0.0
	ipv6 address fe80::1 link-local
	ipv6 address 2001:db8:acad:1::1/64
	description "Conexión al Switch 1"
	no shutdown
	exit
	interface loopback0
	ip address 10.0.0.1 255.255.255.0
	ipv6 address fe80::1 link-local
	ipv6 address 2001:db8:acad:2::1/64
	description "adaptador loopback"
	no shutdown
	exit
	login block-for 120 attempts 3 within 60
	exit
	clock set $$ 27 Sept 2024
	copy running-config startup-config

	# verificaciones

set verificacionesConfigurarRouterVersionUno {
		show version | include register
		show start
		show startup-config | section vty
		show ip route
		show ip interfaces brief
		show ipv6 interfaces brief
		show interfaces
	}

}










