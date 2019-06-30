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

- [Installation](#installation)
- [Step-by-step installation tutorial for beginners](https://github.com/morko/haxroomie/wiki/Tutorial:-Install-and-run-haxroomie-in-new-VPS)
- [Documentation](https://morko.github.io/haxroomie) 
- [Changelog](https://github.com/morko/haxroomie/blob/master/CHANGELOG.md#changelog)

# Installation

**Prerequisites:**

- [Node.js](https://nodejs.org) version 10.15.1 or newer 
- `npm` (usually comes with [Node.js](https://nodejs.org))
- [Git](https://git-scm.com/)

To install haxroomie, clone the repository with git:
```sh
git clone https://www.github.com/morko/haxroomie
```
Then go to the directory you cloned it and install dependencies with npm:
```sh
cd haxroomie
npm install
```

If you do not have Chrome installed in your system, then install the dependencies for it listed in the [troubleshooting](#troubleshooting) section.

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

This will probably fail if you have not set your global npm directory.

In Linux it is recommended to set the directory to
somewhere where you dont need `sudo` to install npm packages.
To do so you can follow 
[this guide](https://medium.com/@sifium/using-npm-install-without-sudo-2de6f8a9e1a3).

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

Please see the [CHANGELOG](https://github.com/morko/haxroomie/wiki/Changelog)
before updating to watch out for any breaking updates!

## Updating with git

If you have download the project with `git clone` you can also use `git` to update.

To update to latest release:
```sh
cd haxroomie
git checkout master
git pull
```

To update to a specific release
(see [releases](https://github.com/morko/haxroomie/releases)):
```sh
cd haxroomie
git fetch
git checkout tags/[release_number]
```
e.g. `git checkout tags/1.0.5`

## Updating with npm

If you installed with npm use the `npm` command.

To update to latest release run the install command again:
```
npm install morko/haxroomie -g
```

To update to a specific release
(see [releases](https://github.com/morko/haxroomie/releases)):
```
npm install morko/haxroomie#[release_number] -g
```
e.g. `npm install morko/haxroomie#1.0.5 -g`

# CLI usage

By default haxroomie uses the config from `[user_home_directory]/.haxroomie/config.js`.
If it does not exist, then one will be created using [this](https://github.com/morko/haxroomie/blob/master/examples/configs/1-private-room.js)
example configuration. [Here](https://github.com/morko/haxroomie/tree/master/examples/configs) you can find more examples.

To start run:
```sh
npm start
```

If you wish to load the config from elsewhere you can give haxroomie the `-c` argument.

e.g.
```sh
npm start -- -c [path/to/config.js]
```
**Note the extra `--` when using the npm start command*


Every room requires a token from <https://www.haxball.com/headlesstoken>.
You will be prompted for the tokens when opening a room. Or you can give
it in the config ([token property](https://github.com/morko/haxroomie/wiki/Options-in-the-haxroomie-config#token)).

Once haxroomie CLI is running you can type `help` for available commands.

See [config section](#config) for more information about the config file.

## Config

Haxroomies config file is a Node.js module that exports the config object.
It is used to tell haxroomie how many rooms you are planning to run
and with what kind of options.

You can find examples of configs in
[examples directory](https://github.com/morko/haxroomie/tree/master/examples/configs).

See the 
[Options in the haxroomie config](https://github.com/morko/haxroomie/wiki/Options-in-the-haxroomie-config) 
for information about each option.

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
        }
      }
    }
  }
};
module.exports = config;
```

## Scripts and plugins

You can run your script with the configs 
[roomScript](https://github.com/morko/haxroomie/wiki/Options-in-the-haxroomie-config#roomscript) 
option.

Running a script this way will disable the default plugins that haxroomie loads
(except few essential ones).

### Running plugins instead of a room script

[Haxball Headless Manager](https://github.com/saviola777/haxball-headless-manager) (HHM)
allows you to modularize your room script. Instead of one massive
JavaScript file you can implement the functionality in smaller modules called
plugins.

See the saviolas
[guide for writing plugins](https://haxplugins.tk/docs/tutorial-writing-plugins.html).

#### Developing plugins with haxroomie

Haxroomie allows you to load the plugins from the filesystem. This makes
developing slightly more easy. You can give the file paths in the configs 
[plugins](https://github.com/morko/haxroomie/wiki/Options-in-the-haxroomie-config#plugins) 
property.

Take note that the `pluginConfig` property does not work with the `plugins`
property and it should be avoided when using the `plugins` option.

#### Publishing your plugins

To publish the plugins you can create your own
[HHM plugin repository](https://github.com/saviola777/haxball-headless-manager#creating-your-own-plugin-repository).

To enable a repository in config:

- use [repositories](https://github.com/morko/haxroomie/wiki/Options-in-the-haxroomie-config#repositories) 
option

To load plugins from the repository:
- use [pluginConfig](https://github.com/morko/haxroomie/wiki/Options-in-the-haxroomie-config#pluginconfig) 
option

## Using own HHM config

Haxroomie supports custom
[Haxball Headless Manager configuration files](https://github.com/saviola777/haxball-headless-manager#preparing-your-configuration).
However there should rarely be a reason to do this. The files have couple
requirements to work with haxroomie
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
