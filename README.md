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

1. Create the .npm directory

    ```sh
    mkdir ~/.npm
    ```
    
2. Set npm to use the .npm directory as the default global installation directory

    ```sh
    npm config set prefix ~/.npm
    ```
    
3. Edit the .bashrc file

    ```sh
    nano ~/.bashrc
    ```
    
4. Add this line to the .bashrc file so the shell can find the haxroomie "executable"

    ```sh
    export PATH="$PATH:$HOME/.npm/bin"
    ```
    
5. Reload the .bashrc file

    ```sh
    source ~/.bashrc
    ```

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

if you installed with the alternative method:
```sh
haxroomie -c [path/to/config.js]
```

Once Haxroomie CLI is running you can type `help` for available commands.

See [config section](#config) for more information about the config file.

## Config

Config file is a Node.js module that exports the config object. You dont really need to worry too much about what this means. Just edit the fields of the example config to your liking.

You can find examples of configs in
[projects example directory](https://github.com/morko/haxroomie/tree/master/examples/configs).

See the [config properties explained](#config-properties-explained) for
information about each option.

Here is an example of a config that starts one private room.

```js
let config = {
  /**
   * ID for the room. Haxroomie uses this internally to recognize the rooms.
   * Has to be unique.
   */
  'room1': {

    autoStart: true,
    roomName: 'haxroomie',
    playerName: 'host',
    maxPlayers: 12,
    public: false,
    geo: { code: 'eu', lat: '52.5192', lon: '13.4061'},
    repositories: [
      {
        type: 'github',
        repository: 'morko/hhm-plugins'
      },
    ],
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: 'adminpass',
          host: 'hostpass'
        }
      }
    }
  }
};
module.exports = config;
```
### Config properties explained

- `autoStart` Set to `true` if you want the room to start on startup. Default is `false`.
- `roomName` The name for the room. Default is `haxroomie`
- `playerName` The name for the host player. Default is `host`.
- `maxPlayers` Max number of players the room accepts. Default is `10`.
- `public` If `true` the room will appear in the room list. Default is `false`.
- `geo` Geolocation override for the room. `geo : {"code": string, "lat" : float, "lon" : float}`.
  You can use <https://www.latlong.net/> to find the coordinates easily.
  The code is a country code in two letter ISO format listed in
  <https://countrycode.org/>. Default is where your server is located.
- `repositories` Repository configuration array for the Haxball Headless Manager (HHM).
  With this you can tell which repositories to load in addition to the default one.
  By default haxroomie loads the 
  [plugin repository by saviola](https://github.com/saviola777/hhm-plugins).
  [Here](https://github.com/saviola777/haxball-headless-manager#using-a-webserver)
  you can see how to add repository from an URL and
  [here](https://github.com/saviola777/haxball-headless-manager#using-a-github-repository)
  how to add one from GitHub.
- `pluginConfig` Plugin configuration object for the Haxball Headless Manager (HHM).
  With this you can tell which plugins to load from the repositories that are
  available and give them optional configurations. 
  By default haxroomie loads the core plugin repository by saviola. You
  can find these files in
  [saviolas GitHub page](https://github.com/saviola777/hhm-plugins/tree/master/src/sav).
  The files contain information about what kind of options they support
  and what they do. 
  See [saviolas GitHub page](https://github.com/saviola777/haxball-headless-manager#configuration-file)
  for more detailed explanation about this configuration.
  See 
  [writing plugins tutorial](https://haxplugins.tk/docs/tutorial-writing-plugins.html)
  for information about saviolas default plugins and how to write your own.
- `roomScript` HaxBall room script to load when starting Haxroomie.
  **Disables all other plugins!**. See [running own room scripts section](#using-own-room-scripts).
- `hhmConfig` Path to custom Haxball Headless Manager (HHM) configuration file.
  You rarely need this. See [Using own HHM config](#using-own-hhm-config)
- `plugins` Plugins that you want to load from the filesystem. This should
  be an array of objects that contain the plugin name and file path.
  **The `pluginConfig` option does not affect these plugins!**

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
- `hhm` Path to built source of Headless Haxball Manager (HHM).
  Useful for testing changes to the source.
- `disableDefaultPlugins` Set to `true` if you want to disable the default
  HHM plugins that Haxroomie loads. This can be useful if for example you
  want to test some plugins without others interfering with it.
    
To configure more than one room just add a new property for the config object.

e.g.
```js
let config = {
  'room1': {
    autoStart: true,
    roomName: 'haxroomie1',
    playerName: 'host',
    maxPlayers: 12,
    public: false,
    geo: { code: 'eu', lat: '52.5192', lon: '13.4061'},
  },
  'room2': {
    autoStart: true,
    roomName: 'haxroomie2',
    playerName: 'host',
    maxPlayers: 12,
    public: false,
    roomScript: 'path/to/room-script.js'
  }
};
module.exports = config;
```

## Running own room scripts

You can run **one** room script by setting [the configs](#config) `roomScript` property.
Running a script this way will disable the default Headless Haxball Manager
(HHM) plugins that Haxroomie loads
(except the ones that Haxroomie requires to work internally).

The scripts have few restrictions compared to vanilla room scripts mentioned in
[HHM docs](https://haxplugins.tk/docs/tutorial-writing-plugins.html).

HHM allows you to modularize your room script. Instead of one massive
JavaScript file you can implement the functionality in smaller modules called
plugins. Read the guide for writing own HHM plugins at
[HHM docs](https://haxplugins.tk/docs/tutorial-writing-plugins.html).
You can test them by loading them with [the configs](#config) `plugins`
property.

To publish the plugins you should create your own
[HHM plugin repository](https://github.com/saviola777/haxball-headless-manager#creating-your-own-plugin-repository).

Use [the configs](#config) `repositories` property to enable the repository and
`pluginConfig` property to set which plugins to enable and pass them
options.


## Using own HHM config

Haxroomie supports providing a
[Haxball Headless Manager configuration file](https://github.com/saviola777/haxball-headless-manager#preparing-your-configuration).
However there should rarely be a reason to do this. The files have couple
requirements to work with Haxroomie
(see [HHM config requirements](https://github.com/morko/haxroomie#hhm-config-requirements)).

### HHM config requirements

`HHM.config.room` property must have a `token` property like this:

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

# API

To install haxroomie for your project its preferred to install it locally with
```sh
npm install morko/haxroomie
```

To work with the API see [the official documentation](https://morko.github.io/haxroomie/).

Easiest way to create
[Haxroomie instances](https://morko.github.io/haxroomie/module-haxroomie.Haxroomie.html)
is to use the asynchronous factory function `createHaxroomie` in the
[haxroomie module](https://morko.github.io/haxroomie/module-haxroomie.html#createHaxroomie).

Haxroomie controls one headless chrome browser with help of the Puppeteer library.
Each browser tab can run one HaxBall room. These browser tabs are controlled with
the [RoomController](https://morko.github.io/haxroomie/RoomController.html) object.

## Example API usage

Example that requires the token to be set as an environment variable named `HAXBALL_TOKEN`.

```js
const { createHaxroomie } = require(`haxroomie`);

(async function bootstrap() {
  try {
    let haxroomie = await createHaxroomie();
    let room = await haxroomie.addRoom(`example`);
		
    room.on('open-room-start' (roomInfo) => {
      console.log(`Room started. Here is the link: ${roomInfo.roomLink}`);
    });
    room.openRoom({
      roomName: `haxroomie`,
      playerName: `host`,
      maxPlayers: 10,
      public: false,
      token: process.env.HAXBALL_TOKEN
    });
  } catch (err) {
    logger.error(err.stack);
    process.exit(1);
  }
})();

```
