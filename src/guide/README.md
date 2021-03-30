# Introduction

## Used technologies
### Back-end
- [Django](https://www.djangoproject.com/)
  - Webframework that helps to ship features quickly *(still with code quality)*.
- [Celery - Distributed Task Queue](https://docs.celeryproject.org)
  - Used to manage all our backgound jobs. Abstract the complexity and very powerful.
  - Used to schedule jobs thanks to celery beat.
- [PostgreSQL](https://www.postgresql.org/)
  - Holds all the generated data. Single source of truth.
- [Mosquitto](https://mosquitto.org/)
  - MQTT broker. Supports mqtt v5 protocol. The Eclipse foundation also provides python librairies to use the mqtt protocol.
- [Tensorflow Lite](https://www.tensorflow.org/lite)
  - Used to detect people and trigger actions *(alarm)*. More information in the related documentation page.

### Front-end
- [VueJS](https://vuejs.org/)
  - Used for complexe components to simplify things.
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
  - Sometimes you don't need VueJS for simple and small things.
- [ViteJS](https://vitejs.dev/)
  - Frontend tooling. It is **blazing fast** and quite easy to set up.
