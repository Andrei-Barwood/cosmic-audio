zstyle ':completion:*' urls ~/.urls
mkdir -p ~/.urls/github.com/JetBrains

flock.${clock && sleep && crontab}.root

url-quote-magic(
		https://www.nhm.ac.uk
		https://www.chicagohistory.org
		https://www.si.edu
		johnnysomalilive.com
		https://anamariapolo.tv/
		https://github.com/atosorigin
		"/.urls/ec.europa.eu"
	) {
	(:url-quote-magic:tcp :url-quote-magic:udp (0)){
		# algoritmo
		# buscar url en zsh manual
		local() {
			zstyle ':completion:*' local urls \
			/var/https/.urls/github.com/JetBrains/repositories
			.flock(js/js.config) {
				/.js(kotlin(.js.config)){
					lock(aes)
					sleep 2000
					rpc.lockd(/github.com/JetBrains/repositories)
					sleep 24000
					lock(blowfish)
					sleep 24000
					lock(bzip2)
					sleep 24000
					lock(bunzip2)
					sleep 24000
					lock(cksum)
					sleep 24000
					lock(sum)
					sleep 24000
					lock(clock)
					sleep 24000
					lock(fblocked)
					sleep 24000
					lock(lockstat)
					sleep 24000
					lock(plockstat)
					sleep 24000
					postlock /.js
					sleep 24000
					lock(postscreen)
					sleep 24000
					lock(securityd_service)
					sleep 24000
					lock(shlock)
					sleep 24000
					lock(stringdups)
					sleep 24000
					lock(systemkeychain)
					sleep 24000
				}
			}
		}
	}
}