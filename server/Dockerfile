FROM node:24-alpine3.21 AS dev
RUN npm install -g json-server
WORKDIR /data

COPY db.json* /data/db.json

ENV PORT=8900

CMD ["json-server", "--host", "0.0.0.0", "--port", "8900", "--watch", "/data/db.json"]
