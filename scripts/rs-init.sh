#!/bin/bash

DELAY=5

mongosh <<EOF
var config = {
    "_id": "poll_rs",
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "mongo_primary:27017",
            "priority": 2
        },
        {
            "_id": 1,
            "host": "mongo_secondary_1:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
EOF

echo "****** Waiting for ${DELAY} seconds for replicaset configuration to be applied ******"

sleep $DELAY

mongosh < /scripts/init.js