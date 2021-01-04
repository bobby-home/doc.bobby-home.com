# Introduction of smart camera

In the system, we have two different kind of cameras:

- smart camera
- dumb camera

Let's see why and their differences.

## Why do we have two kind of cameras

This is pretty easy. We have some devices that can handle the software to detect people motion which is computationally heavy. For example, this can run on a raspberry pi 4, but on a raspberry pi zero it will be much harder and on a esp8266 this is impossible.

Smart camera software do the video processing locally.

Dumb camera software acquire the video and send pictures through MQTT to do the processing. So the footprint is really small on the device, it's basically just the streaming of a video.

## Why do we send pictures via MQTT

The choice has been made from issue #16

We already have MQTT setup to communicate between IoT devices. This protocol allows us to send a payload up to 268435454 bytes, so we can share pictures via MQTT so we do it. Otherwise we would have to bring a new piece of software in our stack and we don't want to pay for it (maintenance, security, footprint...).

MQTT meet all our requirements:

- low footprint: to be able to run on a ESP8266 for example, and for the broker it is the same.
- easy to use, specially for clients.

## Process

Why do we use a Process and not a Thread to run our smart camera software depending on the MQTT status recieved.

This is because of the python GIL, only one thread can run with Python, so if we run our smart camera software in a thread, and the mqtt code related in another thread (the main one), then the main thread won't be ran thus we won't be able to recieve mqtt updates. So basically, when we run the smart camera software in a thread, it will starve the main one preventing it to switch off the smart camera.

This comes with one trade-off: the communication between the mqtt related process and the smart-camera. So for example, if the user changes the ROI, then we have to stop and re-run the whole smart-camera process. Of course, we could add some IPC here, but we have decided not to do so to avoid maintenance issues. This is not a issue because this won't happen very often. Of course we will loose a bit of performance here but this is not a problem due to the frequency.

## Web part

As you can see, when one camera ROI changes the system send every ROIs associated with this camera. It is done because of the smart camera design: we have to send the whole data. Please see this part to understand. Basically, we cannot update the smart camera when it is running.

Of course we could implement some kind of cache in the smart camera mqtt process to append changes but... This would be a pain for very little performance gain.