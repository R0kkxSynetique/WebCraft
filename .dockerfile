FROM mongo

ARG CONNECTION_STRING
ARG COLLECTION
ARG FILE_PATH

COPY ${FILE_PATH} /init.json
CMD mongoimport --uri "${CONNECTION_STRING}" --collection ${COLLECTION} --type json --file /init.json --jsonArray -vvv