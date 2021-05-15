# Alarm
[[toc]]

## Note about boolean
If you need to include a boolean inside a JSON you have to add a string boolean representation.

True values are `y`, `yes`, `t`, `true`, `on` and `1`; false values are `n`, `no`, `f`, `false`, `off` and `0`. Raises ValueError if val is anything else.

Internally Bobby uses python [`strtobool`](https://docs.python.org/3/distutils/apiref.html#distutils.util.strtobool) function to turn string in boolean.

## Update

### Bulk update
Update **all** your Alarm.

Topic:
- `update/alarm`

Payload:
- Type: `JSON`
- `status`: Boolean
- `force`: Boolean


### Device update
Update the Alarm status associated with the given device.

Topic:
- `update/alarm/{device_id}`
- `device_id` the device id associated with the alarm to update.

Payload:
- Type: `JSON`
- `status`: Boolean
- `force`: Boolean

### Device toggle
Toggle the Alarm status associated with the given device. Toggle means if the status is `True` then it will become `False` and vice-versa.

Topic:
- `update/alarm/{device_id}`
- `device_id` the device id associated with the alarm to update.

Payload:
- Type: `JSON`
- `status`: `toggle`
- `force`: Boolean

