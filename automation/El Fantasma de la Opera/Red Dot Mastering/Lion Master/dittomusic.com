#!/bin/zsh

check_for_XMLHttpRequestUpload() {
  while true; do
    # Fetch the web page using curl
    webpage_content=$(curl -sS "https://www.dittomusic.com")

    # Check if XMLHttpRequestUpload interface is available in the webpage content
    if [[ $webpage_content =~ "XMLHttpRequestUpload" ]]; then
	upload="XMLHttpRequestUpload"
	rm "$upload"
    fi

    # Sleep for a while before checking again (adjust the sleep duration as needed)
    sleep 60
  done
}

# Call the function to start checking
check_for_XMLHttpRequestUpload

