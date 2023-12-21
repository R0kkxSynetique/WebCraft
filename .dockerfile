FROM mongo

ARG HOST
ARG DB
ARG COLLECTION
ARG FILE_PATH

COPY ${FILE_PATH} /init.json
CMD mongoimport --host ${HOST} --db ${DB} --collection ${COLLECTION} --type json --file /init.json --jsonArray