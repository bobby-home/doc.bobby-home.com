# Deploy
Go to the folder `raspberrypi_central`, and run this command to setup your raspberry pi's.

::: tip
ssh user is by default `pi` unless you changed it.

The hostname is the one that you defined when you configured ssh.
:::

```shell
bash setup.sh <user>@<host_name> install.sh
```

Then, go to your raspberry pi and create folders to upload services. I suggest `mkdir /home/pi/core` and `mkdir /home/pi/camera`.

## Core
On your machine, go to `raspberrypi_central/core`.

1) Create the mosquitto password: go to subfolder `mosquitto` and run `bash generate-password.sh`. This will create the passwd file in `core/config/mosquitto`. Go back to `core` root folder.
2) Define your env variables by creating a `.env` file. Take variables from `.env.example` and change your mosquitto credentials.
3) Deploy it: `bash deploy.sh <user>@<host_name>:/home/pi/core`

### Run core services
You are going to run services on the raspberry. Connect to it!

1) Go to the `core` folder, and run `bash up.sh`.
2) Create your admin account: `make manage command=createsuperuser`.
3) Connect to the admin: go to http://<raspberrypi_ip>:8000/admin.
4) The device that hosts the core application has been registered you can change it if you want. In the admin, to go "Devices › Devices" and create a new location linked to this device.
5) To through the setup flow: http://<raspberrypi_ip>:8000/setup

## Smart camera
On your machine, go to `raspberrypi_central/smart-camera`.
1) Define your env variables by creating a `.env` file. Take variables from `.env.example` and change your mosquitto credentials.
2) Deploy it: `bash deploy.sh <user>@<host_name>:/home/pi/camera`

### Run smart camera services
You are going to run services on the raspberry. Connect to it!

1) Go to the admin "Alarm › Alarm statuses" and create a new entry for the device that will host the smart-camera.
2) `camera` folder and run `make prod-up`.

## Conclusion
Wait a little bit, and check if everything looks good: `docker ps` (check statuses).
