# Custom config for Haxball Headless Manager

Haxroomie supports custom
Haxball Headless Manager (HHM) configs. However there should rarely be a reason to do this.

(see [HHM config requirements](#hhm-config-requirements)).

## Loading the config

### haxroomie-core

The config can be loaded when opening a room. You have to give it to
[RoomController#openRoom](https://morko.github.io/haxroomie/RoomController.html#openRoom)
method as a string.

e.g.
```js
room.openRoom({
  // other options
  hhmConfig: {
    name: 'myHhmConfig',
    content: theStringContainingTheCode
  }
})
```

### haxroomie-cli

The config can be given in the rooms config in the config file.

```js
hhmConfig: '/path/to/the/file.js'
```

## HHM config requirements

`HHM.config.room` object must have a `token` property like this:

```js
HHM.config.room = {
  token: hrConfig.token
}
```

The `postInit` plugin should set the `window.hroomie.hhmStarted` property to
`true` on the `onRoomLink` event like this:

```js
HHM.config.postInit = HBInit => {
  let room = HBInit();

  room.onRoomLink = () => {
    window.hroomie.hhmStarted = true;
  }
}
```

## Differences to vanilla HHM config

Haxroomie injects a `hrConfig` object to the HHM config.
The object contains all the properties sent to the function
that is used to start the room.
See the
[API documentation for openRoom](https://morko.github.io/haxroomie/RoomController.html#openRoom) 
for a list of these properties.

See the
[default configuration file](https://www.github.com/morko/haxroomie/tree/master/packages/haxroomie-core/src/hhm/config.js) 
for a complete example.

See
[HHM docs](https://www.github.com/saviola777/haxball-headless-manager#preparing-your-configuration)
for more information about the configuration file.