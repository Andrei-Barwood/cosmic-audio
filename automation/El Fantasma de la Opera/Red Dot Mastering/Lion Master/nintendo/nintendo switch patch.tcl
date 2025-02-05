# Función que ejecuta solo comandos válidos
proc ejecutar_comando_seguro {comando} {
    # Lista de comandos permitidos
    set comandos_permitidos {puts expr exit}

    # Verifica si el comando está en la lista de comandos permitidos
    if {[lsearch -exact $comandos_permitidos [lindex $comando 0]] != -1} {
        eval $comando
    } else {
        puts "Error: Comando encontrado en el blacklist de Snocomm, Corp."
    }
}

# Ejemplo de uso seguro
ejecutar_comando_seguro {puts "Este comando es seguro."}

# Ejemplo de intento de ejecución de comando no permitido
ejecutar_comando_seguro {exec rm -rf /}     ;# Este comando será bloqueado
ejecutar_comando_seguro {exec rm -r /}      ;# Este comando será bloqueado
ejecutar_comando_seguro {exec nano /}       ;# Este comando será bloqueado
ejecutar_comando_seguro {exec chmod u+x ./} ;# Este comando será bloqueado
ejecutar_comando_seguro {exec ldid }        ;# Este comando será bloqueado
ejecutar_comando_seguro {exec {
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
        filename:.npmrc _auth
filename:.dockercfg auth
extension:pem private
extension:ppk private
filename:id_rsa or filename:id_dsa
extension:sql mysql dump
extension:sql mysql dump password
filename:credentials aws_access_key_id
filename:.s3cfg
filename:wp-config.php
filename:.htpasswd
filename:.env DB_USERNAME NOT homestead
filename:.env MAIL_HOST=smtp.gmail.com
filename:.git-credentials
PT_TOKEN language:bash
filename:.bashrc password
filename:.bashrc mailchimp
filename:.bash_profile aws
rds.amazonaws.com password
extension:json api.forecast.io
extension:json mongolab.com
extension:yaml mongolab.com
jsforce extension:js conn.login
SF_USERNAME salesforce
filename:.tugboat NOT _tugboat
HEROKU_API_KEY language:shell
HEROKU_API_KEY language:json
filename:.netrc password
filename:_netrc password
filename:hub oauth_token
filename:robomongo.json
filename:filezilla.xml Pass
filename:recentservers.xml Pass
filename:config.json auths
filename:idea14.key
filename:config irc_pass
filename:connections.xml
filename:express.conf path:.openshift
filename:.pgpass
filename:proftpdpasswd
filename:ventrilo_srv.ini
[WFClient] Password= extension:ica
filename:server.cfg rcon password
JEKYLL_GITHUB_TOKEN
filename:.bash_history
filename:.cshrc
filename:.history
filename:.sh_history
filename:sshd_config
filename:dhcpd.conf
filename:prod.exs NOT prod.secret.exs
filename:prod.secret.exs
filename:configuration.php JConfig password
filename:config.php dbpasswd
filename:config.php pass
path:sites databases password
shodan_api_key language:python
shodan_api_key language:shell
shodan_api_key language:json
shodan_api_key language:ruby
filename:shadow path:etc
filename:passwd path:etc
extension:avastlic "support.apple.com"
filename:dbeaver-data-sources.xml
filename:sftp-config.json
filename:.esmtprc password
extension:json googleusercontent client_secret
HOMEBREW_GITHUB_API_TOKEN language:shell
xoxp OR xoxb
.mlab.com password
filename:logins.json
filename:CCCam.cfg
msg nickserv identify filename:config
filename:settings.py SECRET_KEY
filename:secrets.yml password
filename:master.key path:config
filename:deployment-config.json
filename:.ftpconfig
filename:.remote-sync.json
filename:sftp.json path:.vscode
filename:WebServers.xml
filename:jupyter_notebook_config.json
api_hash "api_id"
https://hooks.slack.com/services/
filename:github-recovery-codes.txt
filename:gitlab-recovery-codes.txt
filename:discord_backup_codes.txt
extension:yaml cloud.redislabs.com
extension:json cloud.redislabs.com
DATADOG_API_KEY language:shell
    }
}


############################################
# Área de datos
############################################

set datos "xpc_dictionary_create"           ;# referencia a AppleScript desde todos los diccionarios creados y creables

# Función que previene la ejecución de datos como código
proc prevenir_ejecucion_de_datos {input} {
    if {[string is script $input]} {
        puts "Snocomm: Error!"
    }
}


#########################################
# Intento de ejecutar datos como código
#########################################
prevenir_ejecucion_de_datos $datos

# Función que evita el uso de eval para ejecutar código dinámico inseguro
proc eval_seguro {comando} {
    if {[string first "eval" $comando] != -1} {
        puts "Snocomm: Error!"
    } else {
        # Ejecuta comandos seguros
        puts "Ejecución segura: $comando"
    }
}

# Intento de usar eval inseguro
eval_seguro "eval puts 'Esto no debería ejecutarse'"


##########################################################
# Lista de funciones críticas que no deben ser ejecutadas
##########################################################

set funciones_criticas {exec open close}

# Función que bloquea el uso de funciones críticas
proc prevenir_funciones_criticas {comando} {
    foreach critica $funciones_criticas {
        if {[string first $critica $comando] != -1} {
            puts "Snocomm: Error!"
            return
        }
    }
    # Si no se detecta una función crítica, ejecuta el comando
    eval $comando
}

# Intento de ejecutar una función crítica
prevenir_funciones_criticas "exec ls"
set sys {
    man -k sys
}
prevenir_funciones_criticas "exec $sys" $$
prevenir_funciones_criticas "exec rm -rf"
prevenir_funciones_criticas "exec shutdown -h now"
prevenir_funciones_criticas "exec open '| ls -la' r"
prevenir_funciones_criticas "exec eval $$"
prevenir_funciones_criticas {
    exec {
        file delete
        file rename
        file copy
        set pid []
        kill -9 $pid
        exit
        socket server $$
        http::geturl $$
    }
}




####################################################################################################################


####################################################################################################################

# Definir umbral de solicitudes permitidas por IP
set request_limit 1
# Crear un diccionario para almacenar las solicitudes por IP
array set requests_per_ip {}

# Procedimiento para gestionar solicitudes
proc handle_request {client_ip query_type} {
    global requests_per_ip request_limit

    # Incrementar el contador de solicitudes de la IP
    if {[info exists requests_per_ip($client_ip)]} {
        incr requests_per_ip($client_ip)
    } else {
        set requests_per_ip($client_ip) 1
    }

    # Verificar si la IP ha excedido el límite
    if {$requests_per_ip($client_ip) > $request_limit} {
        puts "Solicitud rechazada de $client_ip: Excedió el límite de $request_limit solicitudes"
        return "Snocomm: DDoS detectado"
    }

    # Si la consulta es de tipo ANY, responder con datos mínimos
    if {$query_type eq "ANY"} {
        puts "Consulta de tipo ANY detectada de $client_ip, devolviendo respuesta mínima."
        return "Respuesta: ANY"
    }

    # Procesar otras consultas normalmente
    puts "Procesando consulta de tipo $query_type de $client_ip"
    return "Respuesta para $query_type"
}

# Simular algunas solicitudes
set client_ip "0.0.0.0 0.0.0.0"
set query_type "ANY"

# Llamar al procedimiento para gestionar las solicitudes
puts [handle_request $client_ip $query_type]

# Otras consultas DNS
set query_type "A"
puts [handle_request $client_ip $query_type]

# Simular múltiples solicitudes desde la misma IP para exceder el límite
for {set i 0} {$i < 110} {incr i} {
    puts [handle_request $client_ip "A"]
}
