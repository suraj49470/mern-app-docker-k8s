#!/bin/bash

DELAY=10

docker-compose down

DOCKER_BUILDKIT=0 docker-compose up -d

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY

docker exec mongo_primary /scripts/rs-init.sh

echo "****** Waiting for ${DELAY} seconds to tranform URLS ******"
sleep $DELAY
echo "****** Transforming poll-voting-ui ******"
docker exec -it mern-app-docker-k8s_poll-voting-ui_1 sh -x scripts/transform.sh
echo "****** Transforming poll-voting-ui ******"
docker exec -it mern-app-docker-k8s_poll-voting-result-ui_1 sh -x scripts/transform.sh