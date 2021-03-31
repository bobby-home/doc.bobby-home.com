# Dates
We support all time zones so you can deploy the system wherever you are on this planet.

As of today a time zone is defined globaly for the home, so if you are in Paris then you will setup your time zone to be "Europe/Paris" for example.

We do not support user defined time zone because it is very likely that you are living in your... home! Which makes sense.

## Storage
Dates are stored in [**UTC**](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) to avoid Daylight Saving Time (DST). We use use local time only when interacting *(displaying)* with end users because they don't care about UTC they care about their local time.

## Concepts
### Naive and aware datetime objects
As the system uses time zones, we use the django supports for it (`USE_TZ=True`).

The main thing to remember is that we use **aware** datetime objects with UTC, so we get date time through the django utils like this:

```python
from django.utils import timezone

now = timezone.now()
```

and not with the python datetime:
```python
import datetime

now = datetime.datetime.now()
```

## Sources
If you want to learn more about date and time management:
- [Django time zones](https://docs.djangoproject.com/en/3.1/topics/i18n/timezones/)
