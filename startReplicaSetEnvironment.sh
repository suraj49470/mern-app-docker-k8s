#!/bin/bash

DELAY=10
echo "*****************************************"
echo "****** Destroying containers ************"
echo "*****************************************"
docker-compose down
echo "*****************************************"
echo "****** provisioning containers **********"
echo "*****************************************"
docker-compose up -d

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY

docker exec mongo_primary /scripts/rs-init.sh

echo "****** Waiting for ${DELAY} seconds to tranform URLS ******"
sleep $DELAY
echo "*****************************************"
echo "****** Transforming poll-voting-ui ******"
echo "*****************************************"
docker exec mern-app-docker-k8s_poll-voting-ui_1 sh -x scripts/transform.sh
echo "*****************************************"
echo "** Transforming poll-voting-result-ui ***"
echo "*****************************************"
docker exec mern-app-docker-k8s_poll-voting-result-ui_1 sh -x scripts/transform.sh