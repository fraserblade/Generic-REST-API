
docker build -t ghcr.io/owner/generic-rest-api:latest .

docker run -p 3000:3000 ghcr.io/owner/generic-rest-api:latest
