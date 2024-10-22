#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MAKEFILE_DIR="$SCRIPT_DIR/../"

set -e

cd $MAKEFILE_DIR && make profile

cd $SCRIPT_DIR

npx serve -p 8000 ./test-app
