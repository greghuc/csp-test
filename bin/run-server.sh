#!/usr/bin/env bash

trap killgroup SIGINT

# Should kill all child processes. Using -9, just to be sure
killgroup(){
  kill -9 0
}

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"
DIST_DIR=${ROOT_DIR}/pages

coffee ${ROOT_DIR}/bin/server.coffee ${DIST_DIR} &
wait

