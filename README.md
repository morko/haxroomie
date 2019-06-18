# haxroomie

<a href=https://discord.gg/TeJAEWu><img src="https://discordapp.com/api/guilds/580671475707674626/widget.png?style=shield" alt="Discord"/></a>

Haxroomie is an API and CLI to run headless HaxBall rooms without GUI.

With haxroomie you can
  - run multiple rooms with ease
  - use a modular plugin system
  - monitor and control rooms from command line
  - use the API to create an interface to run rooms

## Links

- [Installation](#installation)
- [Using the Command Line Interface](#cli-usage)
- [API](https://morko.github.io/haxroomie) 

# Installation

To be able to install and run haxroomie 

- [Node.js](https://nodejs.org) version 10.15.1 or newer and
- [Git](https://git-scm.com/)

are required. 

To install haxroomie, clone the repository with git:
```sh
git clone https://www.github.com/morko/haxroomie
```
Then go to the directory you cloned it and install dependencies with npm:
```sh
cd haxroomie
npm install
```

Now you are ready to start using Haxroomie. See [CLI usage section](#cli-usage)
for help on how to use the command line interface.

## Alternative installation

You can also install haxroomie to a global npm installation directory.
This will give you a `haxroomie` command that you can run from
anywhere if your npm configuration is correct.

To install with npm run:
```sh
npm install morko/haxroomie -g
```

This will probably fail if you havent set your global npm directory.
In linux machines it is recommended to set the directory to
somewhere where you dont need `sudo` to install npm packages.
To do so you can follow the guide in
[https://medium.com/@sifium/using-npm-install-without-sudo-2de6f8a9e1a3](https://medium.com/@sifium/using-npm-install-without-sudo-2de6f8a9e1a3):

## Troubleshooting

From [puppeteer troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md):

Make sure all the necessary dependencies are installed.
You can run `ldd chrome | grep not` on a Linux machine
to check which dependencies are missing.

To install dependencies in Ubuntu based linux you can use the following command:
```sh
sudo apt install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

# CLI usage

To start the CLI it needs a config file. To get an easy start copy one of the
example configs from 
[haxroomie/examples/configs](https://github.com/morko/haxroomie/tree/master/examples/configs)
to the projects directory as `config.js` and modify it to your liking.
By default Haxroomie searches for `config.js` in the current working directory.

To start run:
```sh
npm start
```

If you wish to load the config from elsewhere than `config.js` in the current
working directory you can give it the `-c` argument.

e.g.
```sh
npm start -- -c [path/to/config.js]
```
**Note the extra `--` when using the npm start command*

Once Haxroomie CLI is running you can type `help` for available commands.

See [config section](#config) for more information about the config file.

## Config

Haxroomies config file is a Node.js module that exports the config object.
It is used to tell Haxroomie how many rooms you are planning to run
and with what kind of options.

You can find examples of configs in
[examples directory](https://github.com/morko/haxroomie/tree/master/examples/configs).

See the [room options explained](#room-options-explained) for
information about each option.

Here is an example of a config that starts one private room.

```js
let config = {
  // ID for the room (has to be unique):
  'room1': {

    // Options for room1:
    autoStart: true,
    roomName: 'haxroomie',
    playerName: 'host',
    maxPlayers: 12,
    public: false,
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: 'adminpass',
        }
      }
    }
  }
};
module.exports = config;
```

To run more than one room just add a new property for the config object.

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

### Room options explained

Each room in the config can be given options.

This section explains each option.

#### `autoStart`

Set to `true` if you want the room to start on startup. Default is `false`.

e.g.
```js
autoStart: true
```

#### `roomName`

The name for the room. Default is `haxroomie`

e.g.
```js
roomName: 'my room'
```

#### `playerName`

The name for the host player. Default is `host`.

e.g.
```js
playerName: 'my host player name'
```

#### `maxPlayers`

Max number of players the room accepts. Default is `10`.

e.g.
```js
maxPlayers: 12
```

#### `public`

If `true` the room will appear in the room list. Default is `false`.

e.g.
```js
public: true
```

#### `geo`

Geolocation override for the room.

You can use <https://www.latlong.net/> to find the coordinates easily.
The code is a country code in two letter ISO format listed in
<https://countrycode.org/>. Default is where your server is located.

e.g.
```js
geo: { code: 'eu', lat: '52.5192', lon: '13.4061' }
```
#### `repositories`

Array of plugin repositories to load.

With this you can tell which repositories to load in addition to the default one 
([plugin repository by saviola](https://github.com/saviola777/hhm-plugins)).

[Here](https://github.com/saviola777/haxball-headless-manager#using-a-webserver)
you can see how to add repository from an URL and
[here](https://github.com/saviola777/haxball-headless-manager#using-a-github-repository)
how to add one from GitHub.

e.g.
```js
repositories: [
  {
    type: `github`,
    repository: `morko/hhm-sala-plugins`
  }
],
```

#### `pluginConfig`

Object containing the plugins to load and their configurations.

With this you can tell which plugins to load from the repositories that are
available and give them optional configurations. 

By default the plugins from
[saviolas repository](https://github.com/saviola777/hhm-plugins) are available.

Haxroomie loads `sav/roles`, `sav/commands`, `sav/help`, `sav/players` and
`sav/chat` plugins even if you dont define them here. To disable these
plugins you can use the [disableDefaultPlugins](#disabledefaultplugins) option.

The `pluginConfig` object follows the format of
[HHM configuration file's](https://github.com/saviola777/haxball-headless-manager#configuration-file)
`HHM.config.plugin` object.

See 
[writing plugins tutorial](https://haxplugins.tk/docs/tutorial-writing-plugins.html)
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

#### `roomScript`

Use this if you do not wish to use the plugin system and just run a traditional
HaxBall headless script.

**Disables all other non essential plugins!**

See [using own room scripts or plugins](#using-own-room-scripts-or-plugins).

e.g.
```js
roomScript: '/path/to/myScript.js'
```

#### `disableDefaultPlugins`

Set to `true` if you want to disable the default
HHM plugins that Haxroomie loads.

This can be useful if for example you
want to test some plugins without others interfering with it.

e.g.
```js
disableDefaultPlugins: true
```

#### `hhmConfig`

Path to custom Haxball Headless Manager (HHM) configuration file.
You rarely need this.

See [Using own HHM config](#using-own-hhm-config)

e.g.
```js
hhmConfig: '/path/to/hhmConfig.js'
```

#### `plugins`

Plugins that you want to load from the filesystem. This should
be an array of objects that contain the plugin name and file path.

**The [pluginConfig](#pluginconfig) option does not affect these plugins!**

e.g.
```js
plugins: [
  {
    name: 'myplugin',
    path: '/path/to/myplugin.js'
  }
]
```
Useful for testing plugins before uploading them to a server or GitHub.

#### `hhm`

Path to built source of Headless Haxball Manager (HHM).

Useful for testing changes to the source.

e.g.
```js
hhm: '/path/to/hhm.js'
```

## Using own room scripts or plugins

You can run **one** room script with the configs [roomScript](#roomscript) option.

Running a script this way will disable the default plugins that Haxroomie loads
(except the ones that Haxroomie requires to work internally).

The scripts have few restrictions compared to vanilla room scripts mentioned in
[HHM docs](https://haxplugins.tk/docs/tutorial-writing-plugins.html).

HHM allows you to modularize your room script. Instead of one massive
JavaScript file you can implement the functionality in smaller modules called
plugins.

Read the guide for writing own HHM plugins at
[HHM docs](https://haxplugins.tk/docs/tutorial-writing-plugins.html).
You can test them by loading them with the configs [plugins](#plugins) 
option.

To publish the plugins you can create your own
[HHM plugin repository](https://github.com/saviola777/haxball-headless-manager#creating-your-own-plugin-repository).

Use the configs [repositories](#repositories) option to enable the repository and
[pluginConfig](#pluginConfig) option to load plugins from the repository.

## Using own HHM config

Haxroomie supports custom
[Haxball Headless Manager configuration files](https://github.com/saviola777/haxball-headless-manager#preparing-your-configuration).
However there should rarely be a reason to do this. The files have couple
requirements to work with Haxroomie
(see [HHM config requirements](https://github.com/morko/haxroomie#hhm-config-requirements)).

### HHM config requirements

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

### Differences to vanilla HHM config

Haxroomie injects a `hrConfig` object to the HHM config.
The object contains all the properties sent to the function
that is used to start the room.
See the
[API documentation for openRoom](https://morko.github.io/haxroomie/RoomController.html#openRoom) 
for a list of these properties.

See the
[default configuration file](https://www.github.com/morko/haxroomie/tree/master/src/hhm/config.js) 
for a complete example.

See
[HHM docs](https://www.github.com/saviola777/haxball-headless-manager#preparing-your-configuration)
for more information about the configuration file.