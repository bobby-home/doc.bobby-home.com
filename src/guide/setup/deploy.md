# Deploy

[[toc]]

## Introduction
This page gives you the steps to follow to install and deploy bobby home to your raspberry pi 4/3 and your raspberry pi zero.


We will deploy different applications:
- `core`: as the name suggests it is the core of bobby. It will run on your main raspberry pi 4/3.
- `smart-camera`: the application which deals with the raspberry pi camera and the object detection model to detect potential humans. It will run on your main raspberry pi 4/3 if you want or another raspberry pi 4/3 or even on raspberry pi zero.


:::tip Prerequisite
From the previous step you should have your loved rasbperrypi up and running and you should be able to ssh it. If so, you are ready to go! :tada:
:::


## Download
Download the wanted version on the [Github repository Bobby Home](https://github.com/bobby-home/bobby-home). Extract the archive and open a terminal in it.

## Device installation

Go to the folder where bobby is on your computer, and run this command to setup your raspberry pi.

If it's a raspberry pi 4/3:
```shell
bash setup.sh <user>@<host_name> install.sh
```

If it's a raspberry pi zero:
```shell
bash setup.sh <user>@<host_name> dumb_install.sh
```

During the installation your raspberry pi will reboot *(at the end)*. Then when you will connect to it *(wait 1-2 minutes)*, your raspberry pi hostname should have been updated for the `device_id` attributed by bobby. Example:

```shell
pi@11ffe958
```

You can find the `device_id` and the `device_model` in the file `/home/pi/.device` of your raspberry pi, for example:

```
pi@11ffe958:~ $ cat ~/.device
DEVICE_ID=11ffe958
DEVICE_MODEL="Raspberry Pi Zero W"
```

::: tip Why two different installation?
The installation differs if it's a raspberry pi 4/3 or a raspberry pi zero because on a raspberry pi zero we do not deploy the `core` application, and we do not need Docker on these little devices. The `smart-camera` application is executed by the default python and monitored through `systemctl` instead of docker containers.
:::

## Core
On your machine, go to `core`.

1) Define your env variables by creating a `.env` file. Take variables from `.env.example` and change your mosquitto credentials.
2) Deploy it: `bash deploy.sh <user>@<host_name> /home/pi/core y`. If you do not want to deploy `.env` file, remove the `y` parameter: `bash deploy.sh <user>@<host_name> /home/pi/core`.

:::warning Update DJANGO_ALLOWED_HOST
:warning: Don't forget to update the env variable `DJANGO_ALLOWED_HOSTS` to add the raspberry pi IP as described in the `.env.example`.
Otherwise you will get `DisallowedHost` error when you will access to the web application.
:::

:::tip
Your mqtt credentials in the `.env` file have to be the same as the one that we will create for the broker service in the next step.
:::

:::tip
If you want to define the `.env` file directly on the raspberry pi it is ok, remove the last parameter "y" when you deploy.
:::


### Run core services
You are going to run services on the raspberry. Connect to it and go to the `core` folder.

1) Generate your mosquitto credentials: `make user=<user> generate-mqtt-password` *(for the first deploy)*.
2) run `make prod-up`.
4) To through the setup flow: `http://<raspberrypi_ip>:8000/setup` *(for the first deploy)*.

## Smart camera
On your machine, go to `smart-camera`.
1) Define your env variables by creating a `.env` file. Take variables from `.env.example` and change your mosquitto credentials.
2) Deploy it:
   - Raspberry pi 4/3: `bash deploy.sh <user>@<host_name> /home/pi/camera`
   - Raspberry pi zero: `bash deploy.sh <user>@<host_name> /home/pi/camera y`

::: danger Raspberry pi zero deploy
1) If you don't deploy the application to `/home/pi/camera` it won't work because the `dumb_camera.service` file has a reference to this folder with an absolute path. It is mandatory.
2) :warning: In your `.env` file you cannot use docker name services because it does not run in docker containers. Use **real ip address** of the target device. For instance, if your `core` is running on your raspberry pi with the ip address `192.168.1.10` you should use this ip.
:::

### Run smart camera services
You are going to run services on the raspberry. Connect to it!

1) Go to the admin "Alarm › Alarm statuses" and create a new entry for the device that will host the smart-camera.
2) `camera` folder and run `make prod-up`.

## Check if it is ok
Wait a little bit, and check if everything looks good: `docker ps` (check statuses).

## RPI 0 - draft
Register your new device through the web administration and create a new Alarm status linked to it.

As this is the first time, you could have a warning notification about the service that does not turn off or on, you can simply ignore it.

### Core setup for raspberry pi zero
The core application needs to retreive some files *(videos)* through rsync.
To do so, it does `rsync pi@<device_id>`. We need to setup ssh between the raspberrypi that hosts the `core` and our raspberry pi zero that hosts our `smart-camera` software.


I suggest you to use the `setup-ssh-keys.sh` script deployed to your core raspberrypi.

```
bash setup-ssh-keys.sh
```

You have to be able to connect to your raspberry pi zero thanks to its id, for example:
```
ssh pi@11ffe958
```
