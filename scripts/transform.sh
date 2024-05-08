#!/bin/bash
printenv
cd /usr/share/nginx/html/static/js
# Iterate over all .js files in the current directory
for filename in *.js; do
    # Replace %REACT_APP_BACKEND_URL% with http://poll-voting-service:5000 in each .js file
    echo "$filename";
    sed -i "s|%REACT_APP_BACKEND_URL%|$REACT_APP_BACKEND_URL|g" "$filename"
    sed -i "s|%REACT_APP_POLL_RESULT_URL%|$REACT_APP_POLL_RESULT_URL|g" "$filename"
    sed -i "s|%REACT_APP_HOSTNAME%|$HOSTNAME|g" "$filename"
done
nginx -s reload