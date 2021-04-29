# Task definition and call
[Refer to the Celery documentation.](https://docs.celeryproject.org/en/stable/userguide/calling.html#calling-tasks)

## Task definition
In general we like to keep our task implementation separated from the task definition. Thanks to dataclasses, we reduce the need to duplicate parameter changes, in the job call, in the task definition and in the separated code. See below.

Our use cases and in general our code **does not need to know about the task definition**. We could have retry task configuration, manual retry and so on, it should be kept inside tasks definition. Separation of concerns :wink:.

```python
# tasks.py
@shared_task()
def camera_motion_detected(data: dict) -> None:
    usecases.camera_motion_detected(...)

# usecases/camera_motion.py
def camera_motion_detected(...):
    print('do something amazing!')
```

### Class methods as celery tasks
As it seems that we cannot use class methods for tasks, we simply create a function task that calls a class method if needed.
See a discussion about this topic on [stackoverflow - using class methods as celery tasks](https://stackoverflow.com/questions/9250317/using-class-methods-as-celery-tasks).

It is not an issue because it is not our recommanded way of working as said just before.


## Passing Data to jobs
Jobs are executed in another docker container, another process, so you can’t share memory.
You somehow have to get data between the `core` application and the worker processes.

### Serialized dataclasses
If you have 2-3 parameters to pass around it's ok, but if you have more parameters to pass around, I strongly suggest you to create a python `dataclass`, serialize it, send it to the task, and process it. It will makes your life easier and your code way more eleguant and less error prone.

```python
# a.py, will create a job

@dataclass
class CameraTopic:
    type: str
    service: str
    device_id: str

def processing():
    in_data = CameraTopic(...)
    tasks.camera_motion_detected.apply_async(args=[dataclasses.asdict(in_data)])

# tasks.py
@shared_task()
def camera_motion_detected(data: dict) -> None:
    in_data = CameraTopic(**data)
    camera_motion.camera_motion_detected(in_data)
```

::: tip
In general we like to keep our task implementation separated from the task definition. Thanks to this, we reduce the need to duplicate parameter changes, in the job call, in the task definition and in the separated code.
:::

If python dataclasses don't covers your needs, you can use the [attrs](https://www.attrs.org/en/stable/) library. Same principles apply.

```python
# a.py, will create a job
@attr.s
class CameraTopic(object):
    ...

def processing():
    in_data = CameraTopic(...)
    tasks.camera_motion_detected.apply_async(args=[attr.asdict(in_data)])

# tasks.py
@shared_task()
def camera_motion_detected(data: dict) -> None:
    in_data = CameraTopic(**data)
    camera_motion.camera_motion_detected(in_data)
```

### Getting a Django Model Between Processes
But, we want to pass our models around! How can we do this?

The usual approach is to define tasks to take the model ID as a parameter, and just pass that. If I need a Foo, I’ll have a parameter foo_id that I pass to the task. Then in the task, I’ll access the DB and pull that Foo instance out.

::: danger
You could end up with race condition. Don't forget to use database locks if necessary.
:::

In general, I strongly discourage to pass your model data through your jobs because you would need to serialize the data *(with all the possible issues with relationships and so on)*, and you could have a race condition: the data is modified before the task is executed.

Still, if you need this (you will have to argue in the PR why), you could use pickle or Django's built-in serialization/deserialization:


```python
from django.core.serializers import serialize, deserialize

# Note that this requires an iterable, so you have to wrap your
# instance in a list:
json_version = serialize('json', [some_class_instance])
# Now you have a JSON representation of the instance that knows its
# own type.
# Put it on the wire here, passing it to a task or whatever.
# Then in the task:
deserialized_objects = deserialize('json', json_version)
# This will produce a list of DeserializedObject instances that wrap
# the actual model, which will be available as
# deserialized_objects[i].object
```

#### Dynamic Model
By Dynamic model I mean, you don't know which model you will receive in the task definition. For example, it could be an `AlarmStatus` or `SomethingStatus`. The processing is doable on both of these models.

1) create 2 differents tasks. Duplicate code leads to bad design. Imagine if you grow with 3-4 models, more...
2) add multiple parameter to the task: `alarm_status_pk`, `something_status_pk`... That leads to some boilerplate: function signature grows, `if`/`elif`/`else` also.
3) tell the task what model you need.

```python
from django.apps import apps

@task()
def some_task(model_name, model_id):
    Model = apps.get_model('django_app_name.{}'.format(model_name))
    obj = Model.objects.get(pk=model_id)
```

:warning: you have to make sure the task is applicable to the model, otherwise you will get some weird behavior and/or crashes.
