## Docker to Loki
- Installation do to on host machine: https://grafana.com/docs/grafana/latest/installation/docker/
- https://grafana.com/docs/loki/latest/clients/docker-driver/configuration/
- https://grafana.com/docs/grafana/latest/getting-started/getting-started/

Remember: default login/password are admin/admin.

Reset grafana password: 
```
docker exec -it <name of grafana container> grafana-cli admin reset-admin-password <fill in password>
```

## Issues
Currently, we see a warning "WARNING: no logs are available with the 'loki' log driver". This is a known issue from docker-compose with Loki. This is not important because our logs are well gathered by Loki, just a warning that we cannot solve.

Sources:
- https://github.com/grafana/loki/issues/1487
- https://github.com/grafana/loki/issues/1368
