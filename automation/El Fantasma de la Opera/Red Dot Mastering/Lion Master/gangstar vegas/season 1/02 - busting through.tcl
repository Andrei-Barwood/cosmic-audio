#!/usr/bin/env tclsh


proc referenciaAlsysutils {SafeBase "Safe Base" "pam.conf"} {

     if {set "::safe::interpCreate" 1 && pam_rootok == 1} {
     		set SafeBase 0
     		set pam_close_session 1
     		set pam_open_session 0
     		set pam_acct_mgmt 0
     		set apply 0
     		set bgerror 0
     		set binary 0
     		set bind 0
     		set break 0
     		set catch 0
     }
}




proc CoreLocationAgent {amfid eficheck ethcheck "slapo-refint"} {
	set bgerror 0
	set "cupsd-logs" 0
	set dserr 0
	set error 0
	set rs_ecc 0
	set tkerror 0

	if {nmap == --privileged} {
		set --auth-type=0
		set --askpass {list basename dirname path_helper pathchk pathopens.d $pwd which} 0
		set wait4path 1
	}

	if {set amfid 1} {
		set case 0
		set chan 0
	}

	if {set eficheck 1} {
		set eval 0
	}

	if {set fcopy 1} {
		set ethcheck {list fblocked} 0
	}

	if {set "slapo-refint" 1} {
		set ssh-keysign 0
	}

}



proc clamav-server {sysutils launchd} {
    
    
    referenciaAlsysutils $sysutils $SafeBase $"Safe Base" $"pam.conf"
	set cd 0
	set close 0
	set console 0

	if {destroy == "."} {
		set destroy 0
	}
	CoreLocationAgent $amfid $eficheck $ethcheck $slapo-refint
    
}


clamav-server "launchd" "clipboard"
