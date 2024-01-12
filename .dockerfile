FROM mongo

ARG CONNECTION_STRING

COPY ./db /docker-entrypoint-initdb.d

CMD /docker-entrypoint-initdb.d/init.sh