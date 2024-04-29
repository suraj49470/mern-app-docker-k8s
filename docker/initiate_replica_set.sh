#!/bin/bash

# Wait for MongoDB containers to be up and running
echo "Waiting for MongoDB containers to start..."
sleep 10

# Connect to mongo1 and initiate replica set
docker exec -it mongo1 mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'mongo1:27017'}, {_id: 1, host: 'mongo2:27017'}, {_id: 2, host: 'mongo3:27017'}]})"
