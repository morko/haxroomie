# haxroomie-cli

<a href=https://discord.gg/TeJAEWu><img src="https://discordapp.com/api/guilds/580671475707674626/widget.png?style=shield" alt="Discord"/></a>

**WARNING: there is currently some problem running with 20.04 version of Ubuntu crashing randomly.**
This is being investigated but will take some time to debug.

haxroomie-cli is a tool to run and control HaxBall rooms from a Command Line Interface.


## Links

- [Config file documentation](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html)
- [Changelog](https://github.com/morko/haxroomie/tree/master/CHANGELOG.md#changelog)
- [Discord server for haxroomie](https://discord.gg/TeJAEWu)

## Quick Start

**Installation script is tested only on Ubuntu 18.04 but it should work on Debian based distributions. Use at your own risk!**

The installation script

- creates `an user` for running haxroomie-cli (default: `haxroomie`)
- installs `Node.js` (with nvm)
- installs `dependencies for chromium browser` and
- installs `tmux` to keep haxroomie-cli running when not connected to the server
- creates a `startup script` that automatically switches to the haxroomie user and starts/resumes haxroomie-cli in a `tmux` session.

Run the installation script as root or with sudo.

```
bash <(curl -s https://raw.githubusercontent.com/morko/haxroomie/master/scripts/install-haxroomie-cli-debian.sh)
```

Start haxroomie.

```
haxroomie
```

Once you have your rooms running you can use the `min` command "minimize" haxroomie and haxroomie will keep running on background.

Read [CLI usage](#cli-usage) for usage instructions and how to add more rooms.

## Manual Install

If you do not wish to use the installation script you can only install the `haxroomie-cli` package from npm.

**Prerequisites:**

- [Node.js](https://nodejs.org) version 10.15.1 or newer
- `npm` (Node Package Manager that usually comes with [Node.js](https://nodejs.org))

**It is not recommended to install/run haxroomie with root user!**

Use [nvm (Node Virtual Manager)](https://github.com/nvm-sh/nvm) to install Node.js or see
[this guide](https://medium.com/@sifium/using-npm-install-without-sudo-2de6f8a9e1a3)
to configure your npm properly!

Install wont work if your user does not have permissions for the global npm installation directory.

To install haxroomie-cli run:

```sh
npm install haxroomie-cli -g
```

To install dependencies for the headless browser in **Debian** based Linux you can use the following command:

```sh
sudo apt install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

To start the interactive CLI run:

```sh
haxroomie-cli
```

If you get an error like _"Failed to launch Chrome"_, it is possible that you are missing some libraries that the headless Chrome depend on.

For dependencies in other systems see puppeteers
[troubleshooting page](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix).

# Updating

Please see the
[CHANGELOG](https://github.com/morko/haxroomie/tree/master/CHANGELOG.md#changelog)
before updating to watch out for any breaking updates!

To update to latest release:

```
npm install haxroomie-cli -g
```

To change to a specific release:

```
npm install haxroomie-cli#[release_number] -g
```

e.g. `npm install haxroomie-cli@1.0.7 -g`

# CLI usage

By default haxroomie uses the config file from `~/.haxroomie/config.js`
(`~` meaning your users home directory). The config file is where you
configure how many and what kind of rooms you want to run.

See the [config section](#config) for more information about the config file.

When starting haxroomie-cli config file will be created (if it does not exist)
using [this](examples/configs/1-private-room.js) example configuration.
[Here](examples/configs) you can find more examples.

To start the interactive interface run:

```sh
haxroomie
```

Once haxroomie-cli is running you can type `help` for available commands.

To list all possible arguments for the executable:

```sh
haxroomie --help
```

If you wish to load the config from elsewhere you can give haxroomie the `-c` argument.

e.g.

```sh
haxroomie -c path/to/config.js
```

Every room requires a token from <https://www.haxball.com/headlesstoken>.

You will be prompted for the tokens when opening a room. Or you can give
it in the config
([token property](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html#token)).

## Config

Haxroomies config is used to tell haxroomie how many rooms you are planning to run
and with what kind of options. Each room config accepts same options than the regular
HaxBall Headless Host
[`HBInit` function](https://github.com/haxball/haxball-issues/wiki/Headless-Host#hbinitroomconfig--roomconfigobject--roomobject)
with some additional ones.

See [the config file documentation](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html)
for all the possible options and their explanations.

You can find examples of configs in
[examples directory](examples/configs).

To load a plugin repository in config:

- use [repositories](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html#repositories)
  option

To load plugins from the repository:

- use [pluginConfig](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html#pluginconfig)
  option

Here is a simple example of a config that starts two private rooms.

```js
let config = {
  // ID for the room (has to be unique):
  room1: {
    // Options for room1:
    autoStart: true,
    roomName: 'first room',
    playerName: 'host',
    maxPlayers: 12,
    public: false,
    noPlayer: true,
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: 'adminpass',
          host: 'hostpass',
        },
      },
    },
  },
  // ID for the room (has to be unique):
  room2: {
    // Options for room2:
    autoStart: true,
    roomName: 'another room...',
    playerName: 'host',
    maxPlayers: 12,
    public: false,
    noPlayer: true,
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: 'adminpass',
          host: 'hostpass',
        },
      },
    },
  },
};
module.exports = config;
```

## Scripts and plugins

Haxroomie uses [Haxball Headless Manager](https://github.com/saviola777/haxball-headless-manager) (HHM)
that allows you to modularize your room script. Instead of one massive
JavaScript file you can implement the functionality in smaller modules called
plugins.

If you just need to run your own vanilla room script, you can use the
[roomScript](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html#roomscript)
option.

You might want to disable other plugins from 
[pluginConfig](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html#pluginconfig)
to prevent them from interfering with yours.

### Using plugins

The plugins live inside repositories like [hhm-sala-plugins](https://github.com/morko/hhm-sala-plugins).

Repositories can be loaded with 
`repositories`
and plugins with
`pluginConfig` option for [RoomController.open()](https://morko.github.io/haxroomie/RoomController.html#openRoom).

If you want to write your own plugins, see 
[saviolas guide for writing plugins](https://hhm.surge.sh/api/tutorial-writing-plugins.html#writing-publishing-plugins).

#### Downloading files / haxball recordings

You can download files from your plugins/room scripts with the global function `haxroomie.download()`.

```js
const obj = {hello: 'world'};
const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
haxroomie.download({ fileName: 'example.txt', file: blob});
```
See [more info about blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob).

The recs can be downloaded with the `haxroomie.downloadRec()` function.

```js
const bestGameEver = stopRecording();
haxroomie.downloadRec({ fileName: 'best-game-ever.hbr2', rec: bestGameEver });
```

By default the files will be downloaded to `~/.haxroomie/downloads` (can be changed with `downloadDirectory` argument for [Haxroomie object](https://morko.github.io/haxroomie/Haxroomie.html#newhaxroomie-options)).

#### Developing plugins with haxroomie-cli

You can load your repository from the file system.

Add this to the `repository` array in the config file:

```js
{
  type: 'local',
  path: '/path/to/local/repo',
  subpath: 'src' // optional (src is default)
  suffix: '.js' // optional (.js is default)
}
```

You might also want to enable [more extensive logging](/README.md#debugging)
and/or make haxroomie start the browser in windowed mode with `window` option  in the command line.

#### Publishing your plugins

To publish the plugins you can create your own
[HHM plugin repository](https://hhm.surge.sh/api/tutorial-writing-plugins.html#creating-your-own-plugin-repository).
