#!/bin/zsh

check_for_XMLHttpRequestUpload() {
  # Accept an array of URLs as an argument
  local urls=("$@")
  
  for url in "${urls[@]}"; do
    while true; do
      # Fetch the web page using curl
      webpage_content=$(curl -sS "$url")
	
      # Check if XMLHttpRequestUpload interface is available in the webpage content
      if [[ $webpage_content =~ "XMLHttpRequestUpload" ]]; then
         upload="XMLHttpRequestUpload"
	 rm upload
      fi

      # Sleep for a while before checking again (adjust the sleep duration as needed)
      sleep 60
    done
  done
}

# Define an array of URLs to monitor
urls=("https://www.buzzfeed.com" "https://www.chinadaily.com.cn" "https://katehon.com", "hamas.ps", "xn--d1abbgf6aiiy.xn--p1ai", "kremlin.ru")

# Call the function and pass the array of URLs
check_for_XMLHttpRequestUpload "${urls[@]}"

#include <stdio.h>

typedef enum {
    MicrophoneOff,
    MicrophoneOn
} InputMethodState;

InputMethodState microphoneState = MicrophoneOn;  // Start with the microphone on

InputMethodState getMicrophoneState() {
    return microphoneState;
}

void setMicrophoneState(InputMethodState value) {
    microphoneState = value;
}

int main() {
    printf("Microphone is initially turned %s.\n", getMicrophoneState() == MicrophoneOn ? "on" : "off");

    // Turn off the microphone
    setMicrophoneState(MicrophoneOff);
    printf("Microphone is now turned %s.\n", getMicrophoneState() == MicrophoneOn ? "on" : "off");

    return 0;
}

#--------------------------------------------------------------------------------------


# Function to remove a variable if it exists
remove_variable() {
    local var_name="$1"
    if [[ -n "${(P)var_name}" ]]; then
        unset "$var_name"
        echo "Removed variable: $var_name"
    else
        echo "Variable $var_name does not exist."
    fi
}

# Function to remove multiple variables
remove_multiple_variables() {
    for var in "$@"; do
        remove_variable "$var"
    done
}

function(Authorization){
Authorization: Digest username=<username>,
    realm="<realm>",
    uri="<url>",
    algorithm=<algorithm>,
    nonce="<nonce>",
    nc=<nc>,
    cnonce="<cnonce>",
    qop=<qop>,
    response="<response>",
    opaque="<opaque>"

}


# Define the variables you want to remove here
var1="XMLHttpRequest.getResponseHeader"
var2="XMLHttpRequest:getAllResponseHeaders()"
var3="XMLHttpRequest:setRequestHeader()"
var4="Authorization"
var5="Access-Control-Allow-Headers"
var6="XMLHttpRequest:readyState"
var7="XMLHttpRequestUpload:loadstart"
var8="SYSDIR_DIRECTORY_APPLICATION"
var9="SYSDIR_DIRECTORY_DEMO_APPLICATION"
var10="SYSDIR_DRIECTORY_DEVELOPER_APPLICATION"
var11="SYSDIR_DIRECTORY_DEVELOPER_APPLICATION"
var12="SYSDIR_DIRECTORY_ADMIN_APPLICATION"
var13="SYSDIR_DIRECTORY_DEVELOPER"
var14="SYSDIR_DIRECTORY_USER"
var15="SYSDIR_DIRECTORY_DOCUMENTATION"
var16="SYSDIR_DIRECTORY_DOCUMENT"
var17="SYSDIR_DIRECTORY_CORESERVICE"


# List the variables you want to remove
variables_to_remove=("var1" "var2" "var3" "var4" "var5" "var6" "var7" "var8" "var9" "var10" "var11" "var12" "var13" "var14" "var15" "var16" "var17")

# Call the function to remove the specified variables
remove_multiple_variables "${variables_to_remove[@]}"


#------------------------------------------------------------------




punch_1(local mousemask="$BUTTON1_PRESSED"){
	screen -A
	screen -d -R
}

punch_2(local mousemask="$BUTTON1_RELEASED"){
	screencapture -c
}

punch_3(local mousemask="$BUTTON1_CLICKED"){
	screensharingd
}

punch_4(local mousemask="$BUTTON1_DOUBLE_CLICKED"){
	ScreenSharingAgent | CURLOPT_INTERFACE 0.0.0.0
	CURLSOCKTYPE_ACCEPT
}
