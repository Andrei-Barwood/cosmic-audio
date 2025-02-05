# programa con los formatos de audio universales
# referencia completa tomada desde terminal en: 
#	afconvert -hf
source "afconvert -hf"
set audio_data { \

# 3gp
	set .3gp { \
		'Qclp' 'aac' 'aace' 'aacf' 'aacg' 'aach' 'aacl' 'aacp' 'samr'
	}
	
# 3gp2
	set .3g2 { \
		'Qclp' 'aac' 'aace' 'aacf' 'aacg' 'aach' 'aacl' 'aacp' 'samr'
 	}

# adts
	set .aac & .adts { \
		'aac' 'aach' 'aacp'
	}

# ac-3
	set .ac3 { \
		'ac-3'
	}

# AIFC
	set .aifc & .aiff & .aif { \
		'I8' 'BEI16' 'BEI24' 'BEI32' 'BEF32' 'BEF64' 'UI8' 'ulaw' \
		'alaw' 'MAC3' 'MAC6' 'ima4' 'QDMC' 'QDM2' 'Qclp' 'agsm'
	}

# AIFF
	set .aiff & .aif { \
		'I8' 'BEI16' 'BEI24' 'BEI32'
	}

# AMR
	set .amr { \
		'samr' 'sawb'
	}

# Apple MPEG-4 Audio
	set .m4a & .m4r { \
		'mp1' 'mp2' 'mp3' 'aac' 'aace' 'aacf' \
		'accg' 'aach' 'aacl' 'aacp' 'ac-3' 'alac' \
		'ec-3' 'paac' 'pac3' 'pec3'
	}

# Apple MPEG-4 AudioBooks
	set .m4b { \
		'aac' 'aace' 'aacf' 'aacg' 'aach' 'aacl 'aacp' 'paac'
	}	

# CAF
	set .caf { \
		'.mp1' '.mp2' '.mp3' 'QDM2' 'QDMC' 'Qclp' \
                             'Qclq' 'aac ' 'aace' 'aacf' 'aacg' 'aach' \
                             'aacl' 'aacp' 'ac-3' 'alac' 'alaw' 'dvi8' \
                             'ec-3' 'flac' 'ilbc' 'ima4' I8 'BEI16' 'BEI24' \
                             'BEI32' 'BEF32' 'BEF64' 'LEI16' 'LEI24' 'LEI32' 'LEF32' \
                             LEF64 'ms\x00\x02' 'ms\x00\x11' 'ms\x001' \
                             'opus' 'paac' 'pac3' 'pec3' 'qaac' 'qac3' \
                             'qach' 'qacp' 'qec3' 'samr' 'ulaw' 'usac' \
                             'zaac' 'zac3' 'zach' 'zacp' 'zec3'
	}

# EC3	
	set .ec3 { \
		'ec-3'
	}

# FLAC
	set .flac { \
		'flac'
	}

# LATM/LOAS
	set .loas & .latm & .xhe { \
		'aac ' 'aace' 'aacf' 'aacg' 'aach' 'aacl' \
		'aacp' 'usac'
	}

# MPEG Layer 1
	set .mp1 & .mpeg & .mpa { \
		'mp1'
	}

# MPEG Layer 2
	set .mp2 & .mpeg & .mpa { \
		'.mp2'
	}

# MPEG Layer 3
	set .mp3 & .mpeg & .mpa { \
		'.mp3'
	}

# MPEG-4 Audio
	set .mp4 { \
		'.mp1' '.mp2' '.mp3' 'aac ' 'aace' 'aacf' \
		'aacg' 'aach' 'aacl' 'aacp' 'ac-3' 'alac' \
		'ec-3' 'usac'
	}

# NeXT/Sun
	set .snd & .au { \
		'I8' 'BEI16' 'BEI24' 'BEI32' 'BEF32' 'BEF64' 'ulaw' 'alaw'
	}

# Sound Designer II
	set .sd2 { \
		'I8' 'BEI16' 'BEI24' 'BEI32'
	}

# WAVE	
	set .wav { \
		UI8 LEI16 LEI24 LEI32 LEF32 LEF64 'ulaw' \
		'alaw'
	}
}























