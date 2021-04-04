# Upgrade

## Download
### Web browser
If you do not use git you can simply download the release archive on the [releases page](https://github.com/mxmaxime/bobby-home/releases) and download the wanted version.

### Git
If you do not already have cloned the repo, you can clone it using the specific version:
```
git clone -b v<version> --depth 1 git@github.com:mxmaxime/bobby-home.git
```

For example:
```
git clone -b v0.4.0 --depth 1 git@github.com:mxmaxime/bobby-home.git
```

If you already cloned the project, you can do the following on the main branch.
```
git pull
git checkout tags/<version>
```

If you use git and you already cloned the project,

1) [Go to the  Or use git to pull the tag corresponding to the wanted version if you cloned the project.
2) Read the corresponding notes about deployment to know which applications are impacted *(i.e smart-camera, core)*.
3) Deploy applications that are impacted. Please refer to the deploy guide.
4) Up your services according to the deploy guide or **follow special instructions given by the releases note**.

When you will run your docker containers after upgrading, you will see messages like:

```
Status: Downloaded newer image for mxmaxime/camera:0.3.0
Recreating smart-camera_sound_1 ... 
Recreating smart-camera_camera_1 ... 
Recreating smart-camera_listen_frame_1 ... 
```

Which sounds good!