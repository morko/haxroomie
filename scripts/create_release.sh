#!/usr/bin/env bash
#
# Creates a new release for haxroomie using the git cactus model for branching.
#
# Run the script from projects root directory!
# 
# Author: Oskari Pöntinen

function setHhmVersion {
    sed -i -E "s/(HHM\.config\.version.+hrConfig\.hhmVersion.*\|\|\s*).*$/\\1\'${1}\';/g" "src/hhm/config.js"
}

function help {
    echo "Usage: $(basename $0) <hrVersion> <hhmVersion>"
}

if [ "$1" = "help" ] || [ "$#" -ne 2 ] ; then
    help
    exit
fi

npm --no-git-tag-version version $1 &&
# create the docs while still in master
npm run docs -- -V $1 &&
# switch to the release branch
git checkout -b "release-$1" &&
# change the documentation version in the config
vjsdoc version $1 ./docs/config.js &&
setHhmVersion $2 &&
git commit -a -m "New release version: $1 with HHM version: $2" &&
git tag -a $1
