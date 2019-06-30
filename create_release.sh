#!/bin/bash
#
# Creates a new release for haxroomie using the git cactus model for branching
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

git checkout -b "release-$1" &&
setHhmVersion $1 &&
bash "$PWD/version-bump.sh" $2 &&
git commit -a -m "New release version: $1 with HHM version: $2"