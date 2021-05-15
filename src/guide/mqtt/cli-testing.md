# MQTT CLI Testing
[[toc]]

## Introduction
The `mosquitto` broker offers us commandline tools to send and receive MQTT messages.

:::warning Usage
You should not use these command lines often. Only for debugging/testing purposes.
:::

To get more information about command lines, please refer to the [mosquitto documentation.](https://mosquitto.org/documentation/).
For example, go to [mosquitto_pub command line documentation](https://mosquitto.org/man/mosquitto_pub-1.html).

## Connect to mosquitto container
You don't need to install mosquitto to your computer because Bobby has a docker container for it.

Run a `sh` shell inside it:

```
docker-compose run mqtt_broker sh
```

Then you will have access to the following command lines.

## Publishing messages
For example, this will turn off an alarm:
```shell
mosquitto_pub -h mqtt_broker -p 1883 -t update/alarm/some_device_id -m '{"status": "on"}' -u mx -P coucou
```

## Listening messages
This will listen and print messages.

```
mosquitto_sub -h 127.0.0.1 -u mx -P coucou -v -t "home-assistant/#"
```
