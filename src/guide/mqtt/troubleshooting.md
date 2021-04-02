# MQTT troubleshooting

## Cannot connect to the broker
Behavior: docker containers are waiting indefinitely for the `mqtt_broker`.

1) check if your `mqtt_broker` container is up and running.
2) check if it actually listens to the tcp port: `netstat -tln | grep 8883`. Adapt if you changed the port.
3) check if your `mqtt_broker` says it listen to tcp ports, for example if you have only something like:

```
mqtt_broker_1          | 1617352477: mosquitto version 2.0.8 starting
mqtt_broker_1          | 1617352477: Config loaded from /mosquitto/config/mosquitto.conf.
```

Something is wrong, you should have something like:

```
mqtt_broker_1          | 1617352704: mosquitto version 2.0.7 starting
mqtt_broker_1          | 1617352704: Config loaded from /mosquitto/config/mosquitto.conf.
mqtt_broker_1          | 1617352704: Opening ipv4 listen socket on port 8883.
mqtt_broker_1          | 1617352704: Opening ipv6 listen socket on port 8883.
mqtt_broker_1          | 1617352704: mosquitto version 2.0.7 running
```

### Verify your passwd file
I got this issue because my `passwd` was not a file for some reason but a folder. Take a look at your mosquitto `passwd` file to verify that it's a like containing a hashed password and nothing else. If you have doubt delete it and regenerate it.

*That is incredible... mosquitto does not crash, does not send any error messages, just silently don't run if your passwd file is corrupted.*
