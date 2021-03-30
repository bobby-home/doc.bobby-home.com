# Raspberrypi central
This is the raspberrypi (or other similar device), that will orchestrate a lot of things, this is the heart of the system.

::: danger
Warning: this is not a stable software and the documentation may miss some details for now. If you have any troubles, please create a github issue.
:::

First of all, [download or clone the project hosted on Github](https://github.com/mxmaxime/mx-tech-house).

## Burn the Raspbian image
I use [balena](https://www.balena.io/etcher/) to burn my images, but you can use the software that you want.

1. [Download Raspbian image](https://www.raspberrypi.org/): please go to raspberry pi **official** website.
2. Burn the image on your sd card (:warning: choose the right disk, triple check)

## Setup connexion
### Enable SSH
Create a file named `ssh` in the boot folder of the SD card. This will enable ssh.

### WiFi
To add network info you need to create a second text file called `wpa_supplicant.conf` and place that in the root of the boot SD as the `ssh` file.

```
country=FR
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
    ssid="Your SSID"
    psk="YourWPAPassword"
    key_mgmt=WPA-PSK
}
```

### Find your raspberry pi on your LAN
When your raspberry is connected to your network (LAN), you'll be able to connect to it remotly through SSH. But to do so... We need its ip address. You can use your router to find its ip or you can use `nmap` to analyze your network and find it:
```
sudo nmap -sn 192.168.1.0/24
```
Where `192.168.1.0/24` is my network ip/mask ([CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)).

### SSH Keys
I suggest you (strongly recommend), to activate SSH connexion with ssh keys.
That can be done easily by the `setup-ssh-keys.sh` script that will:

- generate a key pair (ed25519)
- send them on the rpi by ssh login@pi (you'll be asked the login & pi).
- create your ~/.ssh/config for you if you want to, so you can easily connect to your rpi by doing `ssh user@hostname`. The hostname will be asked.

Run the script and let yourself be guided.

## Raspi config
We need to configure a little bit the raspberry.

```
sudo raspi-config
```

- "Advanced Options" -> Expan filesystem ensures that all of the SD card storage is available to the OS (then reboot).

## Deploy
Go to the folder `raspberrypi_central`, and run this command to setup your raspberry pi's.

::: tip
ssh user is by default `pi` unless you changed it.

The hostname is the one that you defined when you configured ssh.
:::

```shell
bash setup.sh <user>@<host_name>
```

Then, go to your raspberry pi and create folders to upload services. I suggest `mkdir /home/pi/core` and `mkdir /home/pi/camera`.

On your machine, go to `raspberrypi_central/core`.

1) Create the mosquitto password: go to subfolder `mosquitto` and run `bash generate-password.sh`. This will create the passwd file in `core/config/mosquitto`. Go back to `core` root folder.
2) Define your env variables by creating a `.env` file. Take variables from `.env.example` and change your mosquitto credentials.
3) Deploy it: `bash deploy.sh <user>@<host_name>:/home/pi/core`

On your machine, go to `raspberrypi_central/smart-camera`.
1) Define your env variables by creating a `.env` file. Take variables from `.env.example` and change your mosquitto credentials.
2) Deploy it: `bash deploy.sh <user>@<host_name>:/home/pi/camera`


Then you are going to run services on the raspberry. Connect to it!

### Run services
#### Core
1) Go to the `core` folder, and run `bash up.sh`.
2) Create your admin account: `make manage command=createsuperuser`.
3) Connect to the admin: go to http://<raspberrypi_ip>:8000/admin.
4) The device that hosts the core application has been registered you can change it if you want. In the admin, to go "Devices › Devices" and create a new location linked to this device.
5) To through the setup flow: http://<raspberrypi_ip>:8000/setup

### Smart camera
1) Go to the admin "Alarm › Alarm statuss" and create a new entry for the device that will host the smart-camera.
2) `camera` folder and run `make prod-up`.

Wait a little bit, and check if everything looks good: `docker ps` (check statuses).