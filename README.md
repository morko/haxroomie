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

You can run the CLI from `haxroomie` directory using node.
```sh
node src/cli --help
```
**or**
```sh
npm start -- --help
```
Note the extra "--" that is required to pass npm scripts arguments.

## Alternative installation

You can also install haxroomie to a global npm installatio directory. This will give you a `haxroomie` command that you can run from anywhere if your npm configuration is correct.

To install with npm run:
```sh
npm install morko/haxroomie -g
```

This will probably fail if you havent set your global npm directory. In linux machines it is recommended to set the directory to somewhere where you dont need `sudo` to install npm packages. To do so you can follow the guide in [https://medium.com/@sifium/using-npm-install-without-sudo-2de6f8a9e1a3](https://medium.com/@sifium/using-npm-install-without-sudo-2de6f8a9e1a3):

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

Make sure all the necessary dependencies are installed. You can run `ldd chrome | grep not` on a Linux machine to check which dependencies are missing. The common ones are provided below.
```sh
sudo apt install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

# CLI usage

Haxroomie provides a command-line interface which is a client for the 
Haxroomie API and can be used to start and control haxball rooms.

To be able to start a room you must obtain a token from https://www.haxball.com/headlesstoken
and give it to the CLI script as an argument:

```sh
haxroomie <token>
```

Haxroomie has also simple interactive command-line interface. Once Haxroomie CLI is running and the haxball room has opened you can type `help` for available commands.

## Custom room scripts/plugins

The awesome project by [saviola777](https://github.com/saviola777) allows users to run multiple scripts/plugins on the same haxball room instance. The plugins/scripts can be either in a HHM plugin format or regular vanilla scripts with few restrictions mentioned in HHM wiki.

Plugins/scripts can be loaded when starting the haxroomie CLI using:
```sh
haxroomie <token> --plugins pluginPath1.js,pluginPath2.js
```

## Custom HHM config

Haxroomie supports loading the options from a [haxball headless manager configuration file](https://github.com/saviola777/haxball-headless-manager#preparing-your-configuration). 

You can give the file with `--config <file>` or `-c <file>` argument. 

See https://www.github.com/saviola777/haxball-headless-manager#preparing-your-configuration for information about the configuration file.

**THE CUSTOM CONFIG FILES HHM.config.room PROPERTY MUST HAVE A `token` PROPERTY LIKE THIS:**

```
HHM.config.room = {
  token: haxroomie.token
}
```

See the default configuration file in https://www.github.com/morko/haxroomie/src/master/src/hhm/config.js for a complete example.

Haxroomie injects a **haxroomie** object to the haxball headless manager configuration that can be used to e.g. get options from the command line. Multiple custom options can be injected to the HHM config with `--options` argument.

# API

To install haxroomie for your project its preferred to install it locally with
```sh
npm install morko/haxroomie
```

See https://morko.github.io/haxroomie/ for complete API documentation.

Easiest way to create [Haxroomie instances](https://morko.github.io/haxroomie/module-haxroomie.Haxroomie.html) is to use the asynchronous factory function `createHaxroomie` in the [haxroomie module](https://morko.github.io/haxroomie/module-haxroomie.html).

Each instance of Haxroomie controls one headless chrome browser with help of the puppeteer library. Each browser can run multiple haxball rooms in tabs. These browser tabs are controlled through the [Session](https://morko.github.io/haxroomie/Session.html) object requested with `getSession`. Each [Session](https://morko.github.io/haxroomie/Session.html) controls one room / browser tab.

## Example API usage

Example that requires the token to be set as an environment variable named `HAXBALL_TOKEN`.

```js
const { createHaxroomie } = require('haxroomie');
let haxroomie = createHaxroomie();
let session = await haxroomie.getSession('example');

function createHRClient(id) {
  let id = id;
  function onReceivedMessage(message) {
    console.log(message);
  }
  return {
    id,
    onReceivedMessage
  };
};
let client = createHRClient(1);

session.subscribe(client.id, client.onReceivedMessage.bind(client));

session.openRoom({
  roomName: 'haxroomie',
  playerName: 'host',
  maxPlayers: 10,
  public: false,
  token: process.env.HAXBALL_TOKEN
});
```