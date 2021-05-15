# Alarm
[[toc]]

## Introduction
This page gives you the whole picture of how the Alarm is managed by Bobby.

The Alarm component is the heart of Bobby and could be seen as a monster. Don't worry, we will explain you everything so you can understand it and navigate through the code if you want to.

Just as a quick remainder, the Alarm is composed by three linked services:
- `core`: the coordinator of everything. Control either the two other services should be up or off and receive information about motion from `listen_frame`. Responsible to react to these events *(i.e retreive videos ect)*.
- `smart-camera/listen_frame`: service that listen for frames to analyze them. Then it coordinate the communication between the `core` (to say somebody is detected, left) and the `camera` to record videos.
- `smart-camera/camera`: service that takes frame from the PiCamera and send them to the `listen_frame` and/or `core` for live streaming.

To know more about the architecture, read the [Architecture guide for smart-camera.](../smart-camera/architecture)

## Communication between core and smart-camera
These services communicate through the MQTT procotol. 

## Turn off the Alarm
You can turn off the Alarm through different input:
- Telegram bot.
- Web interface.
- Alarm Schedule.
- Bobby API.

:warning: One important use-case is the following:
- The `core` has a schedule to turn off the alarm at 6pm.
- At 5:58pm a people is detected, and at 6pm he is still here.
- **The alarm should not turn off.**
- The alarm should turn off when people left or if the resident **force** it to turn off *(i.e it's him, he forgot to turn off the alarm)*.
 


More information about this implementation on [issue #130](https://github.com/bobby-home/bobby-home/issues/130)

