#!/bin/bash

# This script will install haxroomie-cli (https://github.com/morko/haxroomie/
# and its dependencies for debian based systems.
#
# The script must not be ran as root but as user with sudo privileges.
#
# The script installs nvm (Node Version Manager), Node.js and dependencies for
# chromium browser. If you do not wish to install nvm a manual
# installation is recommended.
#
# The original script was drafted by saviola777 and is available at
# https://gist.github.com/saviola777/72ae8c001d0c6de75f19198652594151
#

NODE_VERSION=12.16

echo $(command -v ${HOME}/.nvm/nvm)
if [ $(id -u) = 0 ]; then
  echo "This script must not be run as root!"
  exit 1
fi

if ! sudo -v > /dev/null; then
  echo "This scripts needs the user to have sudo privileges!"
  exit 1
fi

if ! which curl > /dev/null; then
    echo -e "\n\e[32mInstalling build dependencies...\e[0m"
    sudo apt install -y curl
fi

if ! command -v nvm > /dev/null; then
    echo -e "\n\e[32mInstalling nvm (Node Version Manager)...\e[0m"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
fi

if ! nvm ls $NODE_VERSION > /dev/null; then
    echo -e "\n\e[32mInstalling Node.js and setting version to ${NODE_VERSION}...\e[0m"
    nvm install $NODE_VERSION
    nvm use $NODE_VERSION
fi

echo -e "\n\e[32mInstalling dependencies for chromium browser...\e[0m"
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget


echo -e "\n\e[32mInstalling haxroomie-cli...\e[0m"
npm install -g haxroomie-cli

echo -e "\n\e[32mHaxroomie-cli installed!\e[0m"
