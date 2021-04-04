# Deploy

## Download
Download the wanted version on the [Github repository Bobby Home](https://github.com/mxmaxime/bobby-home).

## Device installation
:::tip
From the previous step you should have your loved rasbperrypi up and running and you should be able to ssh it.
:::

Go to the folder `raspberrypi_central`, and run this command to setup your raspberry pi's.

::: tip
ssh user is by default `pi` unless you changed it.
The hostname is the one that you defined when you configured ssh at the previous step.
:::

```shell
bash setup.sh <user>@<host_name> install.sh
```

## Core
On your machine, go to `raspberrypi_central/core`.

1) Define your env variables by creating a `.env` file. Take variables from `.env.example` and change your mosquitto credentials.
2) Deploy it: `bash deploy.sh <user>@<host_name> /home/pi/core`

:::tip
Your mqtt credentials in the `.env` file have to be the same as the one that we will create for the broker service.
:::

### Run core services
You are going to run services on the raspberry. Connect to it and go to the `core` folder.

1) Generate your mosquitto credentials: `make user=<user> generate-mqtt-password`.
2) run `bash up.sh`.
4) To through the setup flow: `http://<raspberrypi_ip>:8000/setup`.

## Smart camera
On your machine, go to `raspberrypi_central/smart-camera`.
1) Define your env variables by creating a `.env` file. Take variables from `.env.example` and change your mosquitto credentials.
2) Deploy it: `bash deploy.sh <user>@<host_name> /home/pi/camera`

### Run smart camera services
You are going to run services on the raspberry. Connect to it!

1) Go to the admin "Alarm › Alarm statuses" and create a new entry for the device that will host the smart-camera.
2) `camera` folder and run `make prod-up`.

## Conclusion
Wait a little bit, and check if everything looks good: `docker ps` (check statuses).
