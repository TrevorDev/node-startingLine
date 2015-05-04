#!/bin/bash

echo "Deploying at $(date)" >> deployment_log.txt
git pull
bower install
npm install
pm2 restart all