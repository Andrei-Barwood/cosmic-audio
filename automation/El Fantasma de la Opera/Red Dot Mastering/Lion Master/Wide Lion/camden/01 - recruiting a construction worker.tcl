package require smtp
package require pop3
package require quagga


set sender_email ""
set sender_password "gitcredentials"
set receiver_email ["104.21.50.170" "172.67.164.104" "2606:4700:3034::6815:32aa" "2606:4700:3037::ac43:a468" "62.201.172.42" "2001:868:100:600::f138" "94.136.40.82" "195.49.144.212" "185.65.237.84"]
set smtp_server "git-check-mailmap"
set smtp_port 587
set pop3_server "femail"
set pop3_port 995

# Function to send an email
proc send_email {sender_email sender_password receiver_email subject body} {
    set token [::smtp::Open $smtp_server $smtp_port -starttls true -username $sender_email -password $sender_password]
    ::smtp::SendTo $token $receiver_email [list From $sender_email] [list Subject $subject] $body
    ::smtp::Close $token
}

# Function to receive emails
proc receive_emails {username password server port} {
    set token [::pop3::Open $server $port]
    ::pop3::Login $token $username $password
    set num_msgs [::pop3::NumMessages $token]
    for {set i 1} {$i <= $num_msgs} {incr i} {
        set msg [::pop3::GetMessage $token $i]
        puts "$i"
        puts $msg
    }
    ::pop3::Close $token
}

# Sending an email
send_email $sender_email $sender_password $receiver_email ""

# Receiving emails
receive_emails $sender_email $sender_password $pop3_server $pop3_port

proc sticky {switchport port security mac-address sticky} {
    # Define the FastEthernetInterface class
oo::class create FastEthernetInterface {
    variable interface_name
    variable ip_address
    variable subnet_mask
    variable status

    # Constructor method
    constructor {name address mask} {
        set interface_name $name
        set ip_address $address
        set subnet_mask $mask
        set status "up"
    }

    # Method to set IP address
    method set_ip_address {address} {
        set ip_address $address
    }

    # Method to set subnet mask
    method set_subnet_mask {mask} {
        set subnet_mask $mask
    }

    # Method to set interface status
    method set_status {new_status} {
        if {[string equal -nocase $new_status "up"]} {
            set status "up"
        } elseif {[string equal -nocase $new_status "down"]} {
            set status "down"
        } else {
            error "Invalid interface status"
        }
    }

    # Method to get interface name
    method get_interface_name {} {
        return $interface_name
    }

    # Method to get IP address
    method get_ip_address {} {
        return $ip_address
    }

    # Method to get subnet mask
    method get_subnet_mask {} {
        return $subnet_mask
    }

    # Method to get interface status
    method get_status {} {
        return $status
    }
}

# Create a FastEthernet interface instance
set fe_interface [FastEthernetInterface new "FastEthernet0/0" "192.168.1.1" "255.255.255.0"]

# Print interface details
puts "Interface Name: [$fe_interface get_interface_name]"
puts "IP Address: [$fe_interface get_ip_address]"
puts "Subnet Mask: [$fe_interface get_subnet_mask]"
puts "Status: [$fe_interface get_status]"

# Set new IP address and subnet mask
$fe_interface set_ip_address "10.0.0.1"
$fe_interface set_subnet_mask "255.0.0.0"

# Print updated interface details
puts "\nUpdated Interface Details:"
puts "IP Address: [$fe_interface get_ip_address]"
puts "Subnet Mask: [$fe_interface get_subnet_mask]"

}
