# Docker

## Build Docker images for multi arch

```bash
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes && \
sudo systemctl restart docker && \
docker buildx build --push --platform linux/arm/v7,linux/amd64 --tag mxmaxime/rpi4-opencv:latest .
```

#### Related issues
- 73 to build the OpenCV image for multiple architecture (amd64 / armv7)

## The choice of the base images for python
Some day I've tried naively to use the alpine based image and I got some troubles. For instance, the package `psycopg2-binary` don't work out of the box this alpine image. [Please see this issue explaining why.](https://github.com/psycopg/psycopg2/issues/684)


To read: https://pythonspeed.com/articles/base-image-python-docker-images/

## Use ENV
It can be tricky and lead to unexpected behavior. Please read https://vsupalov.com/override-docker-compose-dot-env/
