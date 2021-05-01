# Monitor mqtt services
The whole system relies on MQTT to communicate with different services, camera object_detection and so on.
As these services are sensitive, we need to make sure everything works as expected. Here is a few example that we want to catch:
- the `core` turn on the alarm but the service `object_detection` does not turn on. Basically the alarm won't work in that case.
- same for the opposite, the resident will trigger the alarm if it does not turn off properly.
- the `object_detection` disconnects but the alarm status (database) says the alarm is running.

Even if the code is well tested, even if we use QOS 1 or 2, we want to make sure everything works as exepected at run time because these services are **sensitive**, they protect your home, your places...

::: tip Information
As of today we use only mqtt to communicate with our services. In the future we might use something else, http, gprc... All of ours "checks" would still be valid, **independantly of the protocol**.
:::


## Verify connect status
When a service connects/disconnects it sends a message to inform the `core`.
If the status is registered in database, we are able to verify either or not the recieved status is corresponding to the status in database. If not, something is wrong.

You can do it by using the [`OnConnectedVerifyStatusHandler`](https://github.com/mxmaxime/bobby-home/blob/00b8adca1a5216340873218d3f9ae1a58a93b458/core/app/utils/mqtt/mqtt_status_handler.py#L47) for your on connected handler.


## Verify status afer it changed
When the `core` change the status of a service, we might want to verify either or not the service actually connected or disconnected after a bit of time.

1) Use the [`OnConnectedHandlerLog`](https://github.com/mxmaxime/bobby-home/blob/00b8adca1a5216340873218d3f9ae1a58a93b458/core/app/utils/mqtt/mqtt_status_handler.py#L82) for the service. It will logs every connect/disconnect event.
2) Call the function `verify_services_status` when you inform the new status to the service.

## Pings
::: warning Not generic
For now it is not implemented to be generic. That means it is not possible to use this feature for something else than `object_detection` service.

We will in the future.
:::

The `core` has a simple mechanism of ping.

We use pings to make sure the `object_detection` service processes frames frequently for a given camera.
So it makes sure everything is working, the camera send frames and object detection receives it to process.

The object detection service needs to send at a fixed interval of time a mqtt message which we call ping.

Side note, it does not have any relation with mqtt ping mechanism. It's totally different and does not serve the same purpose.


