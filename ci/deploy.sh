#!/bin/sh
set -e # Stop script from running if there are any errors

IMAGE="hullcritical/dashboard-frontend"
GIT_VERSION=$(git describe --always)

# Build and tag image
docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest

# Log in to Docker Hub and push
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE}

echo "Docker image pushed to Hub"

# todo: Notifica server to pull the latest Docker image
