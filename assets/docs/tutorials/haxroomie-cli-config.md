# Using the haxroomie config

The config is a JavaScript
[object literal](https://www.dyn-web.com/tutorials/object-literal/).
You can use [Node.js](https://nodejs.org/en/) API inside the config.

Each room in the config can be given options.

e.g.
```js
let config = {
  'room1': {
    // Options for room1 here
  },
  'room2': {
    // Options for room2 here
  }
};
module.exports = config;
```
In addition to normal values that the `HBInit` function accepts
(see [Haxball Headless Host WiKi](https://github.com/haxball/haxball-issues/wiki/Headless-Host#roomconfigobject))
, following options can be used:

## `autoStart`

Set to `true` if you want the room to start on startup. Default is `false`.

e.g.
```js
autoStart: true
```

## `repositories`

Array of plugin repositories to load.

With this you can tell which repositories to load in addition to the default one 
([plugin repository by saviola](https://github.com/saviola777/hhm-plugins)).

Adding a repository will not automagically load the plugins in them. To load
plugins from a repository you must use the [pluginConfig](#pluginconfig) option.

To load a repository from GitHub:
```js
repositories: [
  {
    type: `github`,
    repository: `morko/hhm-sala-plugins`,
    path: `src`, // optional (defaults to src)
    version: `master`, // optional (defaults to master)
    suffix: `.js`, // optional (defaults to .js)
  }
],
```

To load a repository from local file system:
```js
repositories: [
  {
    type: `local`,
    path: `/path/to/local/repo`,
    subpath: `src`, // optional (defaults to src)
    suffix: `.js`, // optional (defaults to .js)
  }
],
```

## `pluginConfig`

Object containing the plugins to load and their configurations.

With this you can tell which plugins to load from the repositories that are
available and give them optional configurations. 

By default the plugins from
[saviolas repository](https://github.com/saviola777/hhm-plugins) are available.

The `pluginConfig` object follows the format of
[HHM configuration file's](https://github.com/saviola777/haxball-headless-manager#configuration-file)
`HHM.config.plugin` object.

See 
the [guide for writing plugins](https://hhm.surge.sh/api/tutorial-writing-plugins.html#writing-publishing-plugins)
for information about saviolas default plugins and how to write your own.

e.g.
```js
pluginConfig: {
  'sav/roles': {
    roles: {
      admin: 'superSecretAdminPass',
      host: 'superSecretHostPass',
    }
  },
  'my/cool-plugin': {}
}
```

## `roomScript`

Use this if you do not wish to use the plugin system and just run a traditional
HaxBall headless script.

**Disables the default plugins!**

e.g.
```js
roomScript: '/path/to/myScript.js'
```

## `token`

You can give the token needed to open the rooms in the config.
This is useful if you are testing something and need to restart
the rooms often or if you wish to load it from an environment
variable.

e.g.
```js
token: process.env.HAXBALL_TOKEN
```

## `hhmConfig`

Path to custom Haxball Headless Manager (HHM) configuration file.
You rarely need this.

e.g.
```js
hhmConfig: '/path/to/hhmConfig.js'
```

## `hhm`

Path to built source of Headless Haxball Manager (HHM).

Useful for testing changes to the source.

e.g.
```js
hhm: '/path/to/hhm.js'
```
