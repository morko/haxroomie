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

# API usage

This section defines the haxroomie API. Haxroomie uses [puppeteer](https://github.com/GoogleChrome/puppeteer) to spawn a headless Chromium browser that can be controlled programmatically.

To install haxroomie for your project its preferred to install it locally with
```sh
npm install morko/haxroomie
```

## Haxroomie object

To get started it is required to create an instance of Haxroomie and then call createBrowser() to spawn a chrome browser.

```js
const { Haxroomie } = require('haxroomie');
let haxroomie = new Haxroomie();
await createBrowser();
```

You can also give Haxroomie some options:

```js
const { Haxroomie } = require('haxroomie');
let config = {
  viewport: { width: 400, height: 500 }, // size of the browser viewport (default is 400x500)
  headless: true, // if this is false, then haxroomie will spawn a browser window (default is true)
  port: 3066 // port that the browser will use (default is 3066)
}
let haxroomie = new Haxroomie(config);
await haxroomie.createBrowser();
```

When choosing a port, take care that it is not visible outside your network.

## Haxroomie session

After creating the Haxroomie object it is required for the client to request a session.

The [session object](https://www.github.com/morko/haxroomie/src/master/src/room/Session.js) acts as an interface between the user and Haxroomie. Each new session gets a new tab in the browser running in the background.

[Session](https://www.github.com/morko/haxroomie/src/master/src/room/Session.js) can be requested from the Haxroomie with 
```js
haxroomie.getSession(sessionID)
```
which will return a session with the given id if it exists or initialize a new one.

Every new session gets a new tab in the headless browser.


### Using the session

After getting the session the client must subscribe to the session messages/events with
`session.subscribe(id, callback)`, where 

- `id` can be number, string or object
- `callback` is a function that receives the messages

Example of a client and registering it:
```js
const { Haxroomie } = require('haxroomie');

let haxroomie = new Haxroomie();
await haxroomie.createBrowser();
let session = await haxroomie.getSession('sessionID');

let client = {
  id: 1,
  onReceivedMessage: function(message) {
    console.log(message);
  }
}
session.subscribe(client.id, client.onReceivedMessage.bind(client));
```

Clients can send message to each other with the send or broadcast functions of the session, but they must be in correct format as described in [Session message](#session-message).

Broadcasting message to all subscribed clients and haxroomie:
```js
session.broadcast(message);
```
Sending message to another client:
```js
session.send(clientID, message);
```

To control the haxball room, clients can use the Session objects methods:

```js
await session.openRoom(config);
```
```js
await session.closeRoom();
```
Calling a function in the [room object](https://github.com/haxball/haxball-issues/wiki/Headless-Host)
```js
await session.callRoom('kickPlayer', 1, 'Bye!', true);
```

To communicate with haxball headless manager, clients can use these Session object methods:
```js
await session.getPlugins();
```
```js
await session.getPlugin(name);
```
```js
await session.enablePlugin(name);
```
```js
await session.disablePlugin(name);
```
```js
await session.getDependentPlugins(name)
```

## Session message

The messages that get sent to the subscribed function is almost similar to
[Flux Standard Action](https://github.com/redux-utilities/flux-standard-action).

**The difference is** that each message MUST contain the sender.

If the message came from the room, then `sender === session.id`.

### Example of a message

```js
{
  type: 'OPEN_ROOM',
  sender: 'sessionID',
  payload: {
    clientID: any
  }
}
```

### Example of an error message
```js
{
  type: 'OPEN_ROOM_STOP',
  payload: Error,
  error: true,
  sender: 'sessionID'
}
```

### Session messages

Messages Haxroomie sends and the client can listen to with the function defined in `session.subscribe('sessionID', function)`.

#### CLIENT_CONNECTED (broadcast)

Sent when a new client connects to the session.

##### Message payload

```js
{
  roomInfo: {
    roomLink: string,
    token: string,
    roomName: string,
    playerName: string,
    maxPlayers: int,
    public: boolean, // optional
    password: string, // optional
    geo: {code: string, lat: float, lon: float} // optional

  },
  clientID: any,
  sessionID: any
}
```

or if room is not running

```js
{
  roomInfo: null,
  clientID: any,
  sessionID: any
}
```

#### CLIENT_DISCONNECTED (broadcast)

Sent when a client disconnects.

##### Message payload
```js
{
  clientID: any
}
```
#### OPEN_ROOM_START (broadcast)

Sent when OPEN_ROOM has been requested.

#### OPEN_ROOM_STOP (broadcast)

If the room was not opened, then the message payload will be instanceof Error.

On success it will contain the room information.

##### Message payload
```js
{
  roomInfo: {
    roomLink: string,
    token: string,
    roomName: string,
    playerName: string,
    maxPlayers: int,
    public: boolean, // optional
    password: string, // optional
    geo: {code: string, lat: float, lon: float} // optional
  }
}
```
#### ROOM_CLOSED (broadcast)

Sent when the room was closed.

#### ROOM_EVENT (broadcast)

Sent when some [HaxBall Headless Host roomObject](https://github.com/haxball/haxball-issues/wiki/Headless-Host#roomobject)
event happens.

Haxroomie does not send all the possible events that roomObject supports by default for performance reasons.

List of events that are sent can be seen in [haxroomie-plugins.js](https://www.github.com/morko/haxroomie/src/master/src/hhm/haxroomie-plugin.js).

**IMPORTANT: args are not sanitized and can contain harmful data!**

##### Message payload
```js
{
  handlerName: string,
  args: Array
}
```
