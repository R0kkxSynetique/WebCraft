#!/bin/bash

for filename in /docker-entrypoint-initdb.d/*.json; do
    echo "file $filename"
    collection=$(basename "$filename" | sed 's/\.json$//')
    echo "collection $collection"
    mongoimport --uri "$CONNECTION_STRING" --collection "$collection" --file "$filename" --jsonArray --type json; 
done