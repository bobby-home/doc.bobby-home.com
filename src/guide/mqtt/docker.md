# Docker
Information about Docker tooling used for MQTT services.

## Rights
The docker image that we use *(eclipse-mosquitto)* use the user `mosquitto` with the user id `1883` and the group `1883`.

The main issue is that the image changes the rights of the `config` folder and `data`, which means that the host cannot update these files. It is not convenient for configuration files. If you want to update these files *(on the host)*, you can do it either as a `root` or by changing rights: `sudo chown -R $USER:$USER <folder>`. It won't impact the docker container because the entrypoint changes rights on these folders for the user `mosquitto`.

::: tip Source
You can find these information in the [Dockerfile](https://github.com/eclipse/mosquitto/blob/faeb9e9122c35d24bc6667a48275e37b5732f54a/docker/2.0/Dockerfile#L88) and in the [entrypoint.sh](https://github.com/eclipse/mosquitto/blob/faeb9e9122c35d24bc6667a48275e37b5732f54a/docker/2.0/docker-entrypoint.sh#L7)
:::
