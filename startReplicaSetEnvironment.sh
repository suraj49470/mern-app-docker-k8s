#!/bin/bash

DELAY=10

docker-compose down

DOCKER_BUILDKIT=0 docker-compose up -d

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY

docker exec mongo_primary /scripts/rs-init.sh