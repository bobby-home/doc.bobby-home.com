# Docker

## Access the PI cam from container
I got this error when I was trying to access to the PI camera:

```
mmal: mmal_vc_shm_init: could not initialize vc shared memory service
mmal: mmal_vc_component_create: failed to initialise shm for 'vc.camera_info' (7:EIO)
mmal: mmal_component_create_core: could not create component 'vc.camera_info' (7)
mmal: Failed to create camera_info component
```

I fixed this issue by adding the flag `privileged: true` in the compose file.
See: https://www.losant.com/blog/how-to-access-the-raspberry-pi-camera-in-docker


## Python version
When I used Python 3.8.x, I got this python error:
```
TypeError: item 9 in _argtypes_ passes a union by value, which is unsupported
```

I found the solution: I had to downgrade to Python 3.7.4.

Source: https://stackoverflow.com/questions/59892863/python-error-typeerror-item-1-in-argtypes-passes-a-union-by-value-which-is


## PyGame

::: tip Source
PyGame is used to play sound.
:::

When I was installing PyGame on my RPI, I got this error:
```
Hunting dependencies...
sh: 1: sdl-config: not found
sh: 1: sdl-config: not found
sh: 1: sdl-config: not found
WARNING: "sdl-config" failed!
```

Then, I researched the package:
```
sudo apt install apt-file
apt-file search "sdl-config"
```

Which gave me:
```
emscripten: /usr/share/emscripten/system/bin/sdl-config
libsdl1.2-dev: /usr/bin/sdl-config
libsdl1.2-dev: /usr/share/man/man1/sdl-config.1.gz
lush-library: /usr/share/lush/packages/sdl/sdl-config.lsh
```

I'm searching for a binary, so I'm downloading this package:
```
sudo apt install libsdl1.2-dev
```
