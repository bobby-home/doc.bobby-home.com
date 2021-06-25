# Camera

## Register your device
First of all, you need to register your device to inform the core that you are a camera.


### You already know your device_id
- If you know your `device_id` because your device is a raspberry pi for example, and the OS is initialized with Bobby bash scripts that will generate the device id.

### You don't know your device_id
In this case you want to create an alarm status and to register your device.

Do to this, you only need one API call.

::: tip Design choice
We did it this way to reduce code complexity on cameras software which is very handy for esp32-cam for example.
:::

In the publish payload you have to send an `id`. This `id` will be sent you back with your `device_id`. This property allows us to know if the mqtt answer is for us or not because we could have many registrations.

::: danger Filter the id!
When you receive your device_id, check either or not the `id` is corresponding to the given `id`. Think like an event id, check if the information is for your event/request.
:::

Topic to subscribe to:
- `registered/alarm`

Received payload:
- `id`: string
- `device_id` string

Topic to publish to:
- `discover/alarm`

Payload:
- `type`: string
    - The device type, for example "esp32-cam". Bobby will create the corresponding device type as needed.
- `id`: string
- `mac_address`: string
    - the mac address of the device. This allows the core to find the device if you loose your device_id and thus it does not generate a new device_id for it.

::: danger
You have to subscribe before you publish to avoid race condition.
:::

## Listen for status

Topic to subscribe to:
- `status/camera_manager/<device_id>`

Received payload:
- Type: JSON.
- `status`: boolean
- `data`: object
    - `?to_analyze`: boolean
    - `?steam`: boolean


The core needs to know whether or not your service is running.

Send the status on this topic:
- `status/camera_manager/<device_id>`

## Camera status
When you receive the status you have to turn on/off your camera software.


The core needs to know whether or not your service is running.


Send the status on this topic:
- `connected/camera/<device_id>`

