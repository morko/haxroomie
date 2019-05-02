#!/usr/bin/env bash

# DESC: Usage help
# ARGS: None
# OUTS: None
function script_usage() {
    cat << EOF
Usage:
     -h|--help                  Displays this help
     -t|--tokens                Run the tests that require tokens
EOF
}

run_tokens=false

while [[ $# -gt 0 ]]; do
    param="$1"
    shift
    case $param in
        -h|--help)
            script_usage
            exit 0
            ;;
        -t|--tokens)
            run_tokens=true
            ;;
        *)
            echo "Invalid parameter was provided: $param"
            exit 2
            ;;
    esac
done


# DESC: Main control flow
# ARGS: $@ (optional): Arguments provided to the script
# OUTS: None
function main() {
    if $run_tokens; then
        for (( i=1; i<2; i++ )); do
            echo "Give token for room${i}: "
            read token
            export HR_TOKEN${i}="$token"
        done
    fi
    # save the current working directory
    CWD="$(pwd)"
    # get the directory the file is in
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
    cd "${DIR}/../"
    npm run test
    cd ${CWD}
}

main "$@"

# vim: syntax=sh cc=80 tw=79 ts=4 sw=4 sts=4 et sr
