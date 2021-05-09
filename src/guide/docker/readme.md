# Docker

## The choice of the base images - why not Alpine?
I tried to use Alpine based images for some services and I got troubles.

### PostgreSQL
PostgreSQL alpine based crashes with a `Segmentation fault`.

```
database_1             | PostgreSQL Database directory appears to contain a database; Skipping initialization
database_1             | 
database_1             | 2021-02-01 17:33:07.271 GMT [1] LOG:  starting PostgreSQL 13.0 on arm-unknown-linux-musleabihf, compiled by gcc (Alpine 9.3.0) 9.3.0, 32-bit
database_1             | 2021-02-01 17:33:07.272 GMT [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
database_1             | 2021-02-01 17:33:07.272 GMT [1] LOG:  listening on IPv6 address "::", port 5432
database_1             | 2021-02-01 17:33:07.281 GMT [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
database_1             | 2021-02-01 17:33:13.122 GMT [1] LOG:  startup process (PID 21) was terminated by signal 11: Segmentation fault
database_1             | 2021-02-01 17:33:13.122 GMT [1] LOG:  aborting startup due to startup process failure
database_1             | 2021-02-01 17:33:13.205 GMT [1] LOG:  database system is shut down
```

More information:
- [PostgresSql terminates with signal 11 when run with docker-compose.](https://stackoverflow.com/questions/65877033/postgressql-terminates-with-signal-11-when-run-with-docker-compose/65925761)
- [Segmentation fault on RPi.](https://github.com/docker-library/postgres/issues/812)
- [bobby pr: feat: prepare core app for prod env.](https://github.com/mxmaxime/bobby-home/pull/143)


### Redis
Redis alpine based crashes with something like a segmentation fault, accessing memory address causes it to crash.

```
│redis-broker_1         | === REDIS BUG REPORT START: Cut & paste starting from here ===
│redis-broker_1         | 1:M 09 May 2071 21:19:36.000 # Redis 6.2.1 crashed by signal: 6, si_code: -6
│redis-broker_1         | 1:M 09 May 2071 21:19:36.000 # Killed by PID: 1, UID: 999
│redis-broker_1         | 
│redis-broker_1         | ------ INFO OUTPUT ------
│redis-broker_1         | Assertion failed: rc == 0 (monotonic.c: monotonicInit_posix: 149)
│redis-broker_1         | 1:M 09 May 2071 20:35:36.000 # Redis 6.2.1 crashed by signal: 11, si_code: 1
│redis-broker_1         | 1:M 09 May 2071 20:35:36.000 # Accessing address: 0x14
│redis-broker_1         | 1:M 09 May 2071 20:35:36.000 # Killed by PID: 20, UID: 0
│redis-broker_1         | 
│redis-broker_1         | ------ INFO OUTPUT ------
│core_redis-broker_1 exited with code 139
```

More information:
- [corrupt date with redis:6-alpine on RasPi.](https://stackoverflow.com/questions/66091978/corrupt-date-with-redis6-alpine-on-raspi)

### Python
The package `psycopg2-binary` don't work out of the box with alpine based image. I do not have the time to make it works.
And also, it throws errors because Python fails to initialize its clock.

More information:
- [Installing psycopg2-binary with Python:3.6.4-alpine doesn't work.](https://github.com/psycopg/psycopg2/issues/684)
- [The best Docker base image for your Python application](https://pythonspeed.com/articles/base-image-python-docker-images/)

### Conclusion
First of all, images do not work with Alpine OS on a raspberry pi. It seems to be related to the package libseccomp of the Raspbian os.

You can find more information for each section above and [here](https://stackoverflow.com/a/66179722/6555414).

**With all these issues, I decided to give up Alpine based images** because they are causing troubles without giving me a lot of benefits. Of course images are smaller but at least debian based works well without spending hours/days trying to fix them.

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

Related issues:
- 73 to build the OpenCV image for multiple architecture (amd64 / armv7)

## Use ENV
It can be tricky and lead to unexpected behavior. Please read https://vsupalov.com/override-docker-compose-dot-env/
