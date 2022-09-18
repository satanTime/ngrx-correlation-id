#!/usr/bin/env bash
set -e

echo "Starting"

export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"

docker-compose up --build -- core && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js

docker-compose up --build -- a6 && \
  cd ./e2e/a6 && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js && \
  cd ../..

docker-compose up --build -- a7 && \
  cd ./e2e/a7 && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js && \
  cd ../..

docker-compose up --build -- a8 && \
  cd ./e2e/a8 && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js && \
  cd ../..

docker-compose up --build -- a9 && \
  cd ./e2e/a9 && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js && \
  cd ../..

docker-compose up --build -- a10 && \
  cd ./e2e/a10 && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js && \
  cd ../..

docker-compose up --build -- a11 && \
  cd ./e2e/a11 && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js && \
  cd ../..

docker-compose up --build -- a12 && \
  cd ./e2e/a12 && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js && \
  cd ../..

docker-compose up --build -- a13 && \
  cd ./e2e/a13 && \
  nvm install && \
  nvm use && \
  node ./node_modules/puppeteer/install.js && \
  cd ../..

docker-compose down
