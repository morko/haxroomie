#!/bin/bash

# This script will install haxroomie-cli (https://github.com/morko/haxroomie/
# and its dependencies for debian based systems. It is an easy way to install
# haxroomie into a server.
#
# The script must be ran as root or with sudo!
#
# Creates an user for running haxroomie-cli, installs Node.js (with nvm), 
# dependencies for chromium browser and tmux to keep haxroomie-cli running
# when not connected to the server.
#
# The original script was drafted by saviola777 and is available at
# https://gist.github.com/saviola777/72ae8c001d0c6de75f19198652594151
#

NODE_VERSION=12.16

if [ $(id -u) != 0 ]; then
  echo "This script must be run with root priviledges!"
  exit 1
fi

function print_usage() {
cat <<EOF

Usage: $0 [options]

Options:
  -h|--help      Shows this help.
  -y|--yes       Answer yes to all questions (without interaction).

EOF
}

function confirm_continue() {
  while true; do
    read -p "Are you sure you want to continue? [Y/n] " yn
    case $yn in
      [Yy]* ) break;;
      [Nn]* ) exit;;
      * ) break;;
    esac
  done
}

# Default values.
NO_CONFIRM=false
USERNAME="haxroomie"

# Parse arguments.
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -h|--help)
    print_usage
    exit 0
    shift # past argument
    ;;
    -y|--yes)
    NO_CONFIRM=true
    shift # past argument
    ;;
    *)    # unknown option
    shift # past argument
    ;;
  esac
done

if [ "$NO_CONFIRM" = false ]; then
  echo -e "\n\e[32mThis script will install haxroomie-cli and its dependencies.\e[0m"
  confirm_continue
fi

if [ "$NO_CONFIRM" = false ]; then
  echo -e "\n\e[32mEnter user to run haxroomie as (user will be created if it does not exist).\e[0m"
  read -p "User [default: $USERNAME]: " CUSTOM_USERNAME
  if ! [ -z "$CUSTOM_USERNAME" ]; then
    USERNAME=$CUSTOM_USERNAME
  fi
fi

egrep "^$USERNAME" /etc/passwd >/dev/null

if [ $? -eq 0 ]; then
  echo -e "\n\e[32mUser $USERNAME already exists!\e[0m"
  if [ "$NO_CONFIRM" = false ]; then
    confirm_continue
  fi
else
  adduser $USERNAME --gecos "First Last,RoomNumber,WorkPhone,HomePhone"
  if [ $? -eq 0 ]; then
    echo -e "\e[32mUser $USERNAME has been added to system!\e[0m"
  else
    echo -e "\e[31mERROR: Failed to add user!\e[0m"
    exit 1
  fi
fi

echo -e "\n\e[32mUpdating package cache...\e[0m"
apt-get update

if ! which curl > /dev/null; then
  echo -e "\n\e[32mInstalling build dependencies...\e[0m"
  apt-get install -y curl
fi

echo -e "\n\e[32mInstalling dependencies for chromium browser...\e[0m"
apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget tmux

if ! command -v nvm > /dev/null; then
  echo -e "\n\e[32mInstalling nvm (Node Version Manager)...\e[0m"
  su - -c "cd \$HOME && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash" $USERNAME
  if ! [ $? -eq 0 ]; then
    echo -e "\e[31mERROR: Could not install nvm!\e[0m"
    exit 1
  fi
fi

if ! nvm ls $NODE_VERSION > /dev/null; then
  echo -e "\n\e[32mInstalling Node.js and setting version to ${NODE_VERSION}...\e[0m"
  su - -c "cd \$HOME && source .nvm/nvm.sh && nvm install $NODE_VERSION" $USERNAME
  if ! [ $? -eq 0 ]; then
    echo -e "\e[31mERROR: Could not install Node.js!\e[0m"
    exit 1
  fi
  su - -c "cd \$HOME && source .nvm/nvm.sh && nvm use $NODE_VERSION" $USERNAME
  if ! [ $? -eq 0 ]; then
    echo -e "\e[31mERROR: Could not set Node.js version!\e[0m"
    exit 1
  fi
fi

echo -e "\n\e[32mInstalling haxroomie-cli...\e[0m"
su - -c "cd \$HOME && source .nvm/nvm.sh && npm install -g haxroomie-cli" $USERNAME
if ! [ $? -eq 0 ]; then
  echo -e "\e[31mERROR: Could not install haxroomie-cli!\e[0m"
  exit 1
fi

echo -e "\n\e[32mCreating startup script...\e[0m"
cat <<EOF > /usr/local/bin/haxroomie
export ARGS="\$@"

if [ "\$(whoami)" = "$USERNAME" ]; then
  tmux new-session -A -s haxroomie bash -c \\
  "haxroomie-cli \$ARGS; echo; read -s -p \"Press enter to exit.\""
else
  su $USERNAME -c \\
  'source ~$USERNAME/.nvm/nvm.sh && \\
  tmux new-session -A -s haxroomie bash -c \\
  "haxroomie-cli \$ARGS; echo; read -s -p \"Press enter to exit.\""'
fi
EOF
chmod 755 /usr/local/bin/haxroomie

echo -e "\n\e[32mHaxroomie-cli installed!\e[0m"

echo -e "\n\e[32mFor usage instructions go to\e[0m"
echo -e "https://github.com/morko/haxroomie/tree/master/packages/haxroomie-cli#cli-usage"
echo ""