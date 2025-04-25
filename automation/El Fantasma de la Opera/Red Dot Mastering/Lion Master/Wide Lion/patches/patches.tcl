# lista de archivos a importar, dividida en varias lineas con backslash para organizarla verticalmente
set fuenteWhiteList { \
	01.tcl \
	02.tcl \
	03.1.tcl \
	03.2.tcl \
	03.3.tcl \
	03.tcl \
	03.4.tcl
}

set whiteList  { \
	"https://musicmarketingtrends.beehiiv.com" \
	"app.jbx.com" \ 
	"https://xferrecords.com/api/update_check/serum" \
	"https://github.com/twitter" \
	"www.notion.so" \
	"https://amptalk.co.jp" \
	"https://givery.co.jp" \
	"www.colorkrew.com" \
	"https://exawizards.com" \
	"https://about.dinii.jp" \
	"https://cybozu.co.jp" \
	"www.bancoestado.cl" \
	"www.bancochile.cl" \
	"www.santander.cl" \
	"www.bci.cl" \
	"www.scotiabank.cl" \
	"www.itau.cl" \
	"www.bancoconsorcio.cl" \
	"www.security.cl" \
	"www.bancointernacional.cl" \
	"www.bancoripley.cl" \
	"www.bancofalabella.cl" \
	"www.bbva.cl" \
	"www.hsb.cl" \
	"www.lider.cl" \
	"www.unimarc.cl" \
	"www.colun.cl" \
	"adventurekk.com" \
	"github.com/apple" \
	"github.com/nintendo" \
	"github.com/cisco" \
	"/.urls/entel.cl" \
	"github.com"

}











# final del programa

foreach archivo $fuenteWhiteList {
	source $fuenteWhiteList
}


foreach entrada $fuenteWhiteList {
	load $whiteList
}

# final del programa