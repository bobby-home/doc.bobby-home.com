# Logs

How does the system handle logs?

## Docker to Loki
For services that use Docker, logs are gathered by Loki thanks to Promtail and you can visualize them thanks to Grafana.

- Installation do to on host machine: https://grafana.com/docs/grafana/latest/installation/docker/
- https://grafana.com/docs/loki/latest/clients/docker-driver/configuration/
- https://grafana.com/docs/grafana/latest/getting-started/getting-started/

::: Source
Remember: default login/password are admin/admin.
:::

Reset grafana password: 
```
docker exec -it <name of grafana container> grafana-cli admin reset-admin-password <fill in password>
```

## Python to Loki
Docker is not available for raspberry pi zero *(and that would be a performance pain)* and Promtail *(the agent which ships the contents of local logs to the Loki instance)* is not available for armv6. *See PR #141 to get more details.*

The implemented solution is to push Python logs to Loki using the rest api thanks to a custom handler. This part is known as a sensitive component due to some points:
- it uses a library (python-logging-loki) directly embeded in the project. This library does not seem very active with a very few contributors.

It works but we need to keep an eye on this, especially when we upgrade Loki.

## Issues
Currently, we see a warning "WARNING: no logs are available with the 'loki' log driver". This is a known issue from docker-compose with Loki. This is not important because our logs are well gathered by Loki, just a warning that we cannot solve.

Sources:
- https://github.com/grafana/loki/issues/1487
- https://github.com/grafana/loki/issues/1368
