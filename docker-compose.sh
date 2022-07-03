#!/usr/bin/env bash

echo "Starting" && \
  docker-compose up -- core && \
  docker-compose up -- a6 && \
  docker-compose up -- a7 && \
  docker-compose up -- a8 && \
  docker-compose up -- a9 && \
  docker-compose up -- a10 && \
  docker-compose up -- a11 && \
  docker-compose up -- a12 && \
  docker-compose down
