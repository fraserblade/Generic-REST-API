# Generic-REST-API
Simple API based on Node/Express and packaged with Docker.

Get up and running fast! Just drop the data you want to expose into items.json and you are good. Note this is intentionally a read-only service, to keep things simple.

Use as a template to build and customise more complex services.

## Building & Running - Docker
    docker build -t ghcr.io/[owner]/generic-rest-api:latest .
    docker run -p 3000:3000 ghcr.io/[owner]/generic-rest-api:latest

## Building & Running - local ( requires node )
    npm install
    node app.js

## Example output
    curl localhost:3000/items
...returns all data in items.json

    curl localhost:3000/item/Test
    {"item":"Test","value":1}
