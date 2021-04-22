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

1) Generate your mosquitto credentials: `make user=<user> generate-mqtt-password` *(for the first deploy)*.
2) run `make prod-up`.
4) To through the setup flow: `http://<raspberrypi_ip>:8000/setup` *(for the first deploy)*.

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

## RPI 0
```
bash setup.sh <user>@<host_name> dumb_install.sh
```
It will install dependencies, change the hostname for the device id, and reboot.
Then when you will connect to it, you will see the new hostname:
```
pi@11ffe958
```
or even on your network.

Then you can deploy the smart-camera software:

```
bash deploy.sh <user>@<host_name> /home/pi/camera y
```

::: danger
If you don't deploy the application to `/home/pi/camera` it won't work because the `dumb_camera.service` file has a reference to this folder with an absolute path. It is mandatory.
:::

You can find the device_id and the device model in the file `/home/pi/.device` of your raspberry pi, for example:

```
pi@11ffe958:~ $ cat ~/.device
DEVICE_ID=11ffe958
DEVICE_MODEL="Raspberry Pi Zero W"
```

Register your new device through the web administration and create a new Alarm status linked to it.

As this is the first time, you could have a warning notification about the service that does not turn off or on, you can simply ignore it.

Don't forget do adapt .env file with actual IPs and not service_name because docker is not used and thus service name resolution is not available.

### SSH Core - rpi 0
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

### Upgrade
pip:
```
python3 -m pip install --upgrade pip
```

WARNING: pip is being invoked by an old script wrapper. This will fail in a future version of pip.
Please see https://github.com/pypa/pip/issues/5599 for advice on fixing the underlying issue.
To avoid this problem you can invoke Python with '-m pip' instead of running pip directly.
