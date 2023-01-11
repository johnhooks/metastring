#!/usr/bin/env sh

if ! [ -e ./temp/metadata.api.json ] ; then
  echo "api.json file missing, building package..."
  ./scripts/build-pkg.sh
fi


./node_modules/.bin/api-documenter markdown -i ./temp -o ./docs
