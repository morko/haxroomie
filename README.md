# haxroomie

<a href=https://discord.gg/TeJAEWu><img src="https://discordapp.com/api/guilds/580671475707674626/widget.png?style=shield" alt="Discord"/></a>

Haxroomie is an API and CLI to run headless HaxBall rooms without GUI.

With haxroomie you can
  - run rooms without desktop environment
  - run multiple rooms with ease
  - use a modular plugin system
  - monitor and control rooms from command line
  - use the API to create an interface to run rooms

## Links

- [Installation](#installing)
- [Step-by-step installation tutorial for beginners](https://morko.github.io/haxroomie/latest/tutorial-cli-install-to-vps.html)
- [Documentation](https://morko.github.io/haxroomie) 
- [Changelog](https://github.com/morko/haxroomie/blob/master/CHANGELOG.md#changelog)

## Installing

**Prerequisites:**

- [Node.js](https://nodejs.org) version 10.15.1 or newer 
- `npm` (usually comes with [Node.js](https://nodejs.org))

Installing using the `-g` flag (or with `sudo`) wont work unless your user
has pemissions for the global npm installation directory. Do not install
as a root user!

Follow 
[this guide](https://medium.com/@sifium/using-npm-install-without-sudo-2de6f8a9e1a3)
to configure your npm properly!

To install run:
```sh
npm install haxroomie -g
```

To install the API for your own project:
```sh
npm install haxroomie
```

If you do not have Chrome installed in your system, then install the dependencies for it listed in the [troubleshooting](#troubleshooting) section.


## Troubleshooting

If you get an error like *"Failed to launch Chrome"*, it is possible that you are missing some libraries that Chrome depend on.

To install dependencies in **Debian** based Linux you can use the following command:
```sh
sudo apt install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

For dependencies in other systems see puppeteers
[troubleshooting page](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix).

For support join the [discord](https://nodejs.org/en/).

# Updating

Please see the 
[CHANGELOG](https://github.com/morko/haxroomie/blob/master/CHANGELOG.md#changelog)
before updating to watch out for any breaking updates!

To update to latest release run the install command again:
```
npm install haxroomie -g
```

To update to a specific release:
```
npm install morko/haxroomie#[release_number] -g
```
e.g. `npm install haxroomie@1.0.7 -g`

# CLI usage

By default haxroomie uses the config from `~/.haxroomie/config.js`.
If the config does not exist, then one will be created using [this](examples/configs/1-private-room.js)
example configuration.

[Here](https://github.com/morko/haxroomie/tree/master/examples/configs) you can find more examples.

To start run:
```sh
haxroomie
```

If you wish to load the config from elsewhere you can give haxroomie the `-c` argument.

e.g.
```sh
haxroomie -c [path/to/config.js]
```
Every room requires a token from <https://www.haxball.com/headlesstoken>.

You will be prompted for the tokens when opening a room. Or you can give
it in the config
([token property](https://morko.github.io/haxroomie/latest/tutorial-cli-using-haxroomie-config.html#token)).

Once haxroomie CLI is running you can type `help` for available commands.

See [config section](#config) for more information about the config file.

## Config

Haxroomies config is used to tell haxroomie how many rooms you are planning to run
and with what kind of options.

See [the documentation](https://morko.github.io/haxroomie/latest/tutorial-cli-using-haxroomie-config.html)
for all the possible options and their explanations.

You can find examples of configs in
[examples directory](https://github.com/morko/haxroomie/tree/master/examples/configs).

To enable a repository in config:

- use [repositories](https://morko.github.io/haxroomie/latest/tutorial-cli-using-haxroomie-config.html#repositories)
option

To load plugins from the repository:

- use [pluginConfig](https://morko.github.io/haxroomie/latest/tutorial-cli-using-haxroomie-config.html#pluginconfig)
option

Here is a simple example of a config that starts one private room.

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
          host: 'hostpass',
        }
      }
    }
  }
};
module.exports = config;
```

## Scripts and plugins

You can run your script with the configs 
[roomScript](https://morko.github.io/haxroomie/latest/tutorial-cli-using-haxroomie-config.html#roomscript) 
option.

Running a script this way will disable the default plugins that haxroomie loads
(except few essential ones).

### Running plugins instead of a room script

[Haxball Headless Manager](https://github.com/saviola777/haxball-headless-manager) (HHM)
allows you to modularize your room script. Instead of one massive
JavaScript file you can implement the functionality in smaller modules called
plugins.

See the saviolas
[guide for writing plugins](https://hhm.surge.sh/api/tutorial-writing-plugins.html#writing-publishing-plugins).

#### Developing plugins with haxroomie

You can load your repository from the file system.

Add this to the `repository` array in haxroomie config:
```js
{
  type: 'local',
  path: '/path/to/local/repo',
  subpath: 'src' // optional (src is default)
  suffix: '.js' // optional (.js is default)
}
```
#### Publishing your plugins

To publish the plugins you can create your own
[HHM plugin repository](https://hhm.surge.sh/api/tutorial-writing-plugins.html#creating-your-own-plugin-repository).

## Using own HHM config

Haxroomie supports custom
Haxball Headless Manager (HHM) configs. However there should rarely be a reason to do this.

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
