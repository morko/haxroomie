#!/bin/bash
# Version bump script stolen from https://gist.github.com/timseverien/5c1ba6548df32ca3a16b.
# Original author: timseverien
# Modified by: Oskari Pöntinen

function bump {
    sed -i -E "s/(\"version\":\s*)..*$/\\1\"${1}\",/g" "package.json"
}

function help {
    echo "Usage: $(basename $0) <newversion>"
}

if [ -z "$1" ] || [ "$1" = "help" ]; then
    help
    exit
fi

bump $1