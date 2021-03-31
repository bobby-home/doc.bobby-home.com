# Docker

## Networks

We are using an external network to make services from different docker-compose files possible (e.g `smart-camera` and `core`).

## Build Docker images for multi arch
We use an experimental feature of docker using buildx. Make sure you have buildx installed and functional.


You have to run que quemu-user-static to be able to build images for multi architectures.

```bash
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes && \
sudo systemctl restart docker
```

Then you can build and push the image to the docker hub:
```
make version=<0.3.5 for ex> docker-build-release
```

It is the same `make` command for `smart-camera` and `core` applications.

#### Related issues
- 73 to build the OpenCV image for multiple architecture (amd64 / armv7)

## The choice of the base images for python
Some day I've tried naively to use the alpine based image and I got some troubles. For instance, the package `psycopg2-binary` don't work out of the box this alpine image. [Please see this issue explaining why.](https://github.com/psycopg/psycopg2/issues/684)


To read: https://pythonspeed.com/articles/base-image-python-docker-images/

## Use ENV
It can be tricky and lead to unexpected behavior. Please read https://vsupalov.com/override-docker-compose-dot-env/
