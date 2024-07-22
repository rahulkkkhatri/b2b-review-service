#!/bin/bash

docker stop $(docker ps -q --filter ancestor=zalon-b2b-review-service)

docker build -t zalon-b2b-review-service . -f Dockerfile.staging

docker run -d -p 7009:7009 zalon-b2b-review-service:latest

docker system prune