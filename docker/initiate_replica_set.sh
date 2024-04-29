#!/bin/bash

# Wait for MongoDB to be ready
until mongo --eval "print(\"waited for connection\")"
do
    echo "Waiting for MongoDB to initialize..."
    sleep 2
done

# Initialize replica set
mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'mongo1:27017'}, {_id: 1, host: 'mongo2:27017'}, {_id: 2, host: 'mongo3:27017'}]})"
