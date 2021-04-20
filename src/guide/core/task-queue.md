# Task Queue

## Celery

### Caveats - Visibility timeout
If a task isn’t acknowledged within the Visibility Timeout the task will be redelivered to another worker and executed.

This causes problems with ETA/countdown/retry tasks where the time to execute exceeds the visibility timeout; in fact if that happens it will be executed again, and again in a loop.

::: danger
So you have to increase the visibility timeout to match the time of the longest ETA you’re planning to use.
:::

Note that Celery will redeliver messages at worker shutdown, so having a long visibility timeout will only delay the redelivery of ‘lost’ tasks in the event of a power failure or forcefully terminated workers.

Periodic tasks won’t be affected by the visibility timeout, as this is a concept separate from ETA/countdown.

Source:
- [Celery - redis visibility timeout.](https://docs.celeryproject.org/en/stable/getting-started/brokers/redis.html#visibility-timeout)


## Redis
We use Redis as a Broker, it is used by Celery to send and receive messages *(and thus create/execute jobs)*.

[Both Redis 4 and Redis 5 versions supports the ARM processor in general, **and the Raspberry Pi specifically, as a main platform**, exactly like it happens for Linux/x86.](https://redis.io/topics/ARM)

### To read
I suggest you to read the following links to understand the configuration.

- [Redis Persistence](https://redis.io/topics/persistence)
- [Redis persistence demystified](http://oldblog.antirez.com/post/redis-persistence-demystified.html), as suggested by Redis if you want to have further knowdege about the topic. Not necessary.
- [Using Redis as an LRU cache](https://redis.io/topics/lru-cache)

### Configuration

- Persistence: write to disk after every write to the append only log. Slow, Safest. We don't want to loose any write for the broker. Slow is not an issue here because we do not create a lot of jobs and thus write rate is low.

- Memory: `100mb` is a lot and we should not hit the limit *(1-5 mb currencly in prod)*. It is safe to use a limit which is far from what we use to avoid hitting the limit one day, but still it is safe: even with 100mb of memory use the whole system is ok with recommended hardware. The memory policy is `noevition`: don't evict anything, just return an error on write operations: don't loose data and know if memory limit hit.
