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
- [Step-by-step installation tutorial](https://github.com/morko/haxroomie/wiki/Tutorial:-Install-and-run-haxroomie-in-new-VPS)
- [Using the Command Line Interface](#cli-usage)
- [API](https://morko.github.io/haxroomie) 

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

To install dependencies in **Ubuntu** based Linux you can use the following command:
```sh
sudo apt install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

For dependencies in other systems see puppeteers
[troubleshooting page](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix).

# CLI usage

To start the CLI it needs a [config](#config) file. 

For a quick start copy one of the
example configs from 
[haxroomie/examples/configs](https://github.com/morko/haxroomie/tree/master/examples/configs)
to the directory you cloned/downloaded haxroomie to as `config.js` and modify
it to your liking.

By default Haxroomie searches for `config.js` in the current working directory.

Every room requires a token from <https://www.haxball.com/headlesstoken>.
You will be prompted for the tokens when opening a room.

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

## Using own room scripts or plugins

You can run your script with the configs [roomScript](#roomscript) option.

Running a script this way will disable the default plugins that haxroomie loads
(except few essential ones).

### Running plugins instead of a room script

[HHM](https://github.com/saviola777/haxball-headless-manager)
allows you to modularize your room script. Instead of one massive
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