#!/usr/bin/env bash
# This script will pull the latest GitHub commit and run build

echo "Running update.sh"

if [[ -z $ROOT_HOME_DASHBOARD_FRONTEND ]]; then
    echo "ROOT_HOME_DASHBOARD_FRONTEND is empty"
    exit 1
fi

cd $ROOT_HOME_DASHBOARD_FRONTEND
git pull --rebase
yarn run build
