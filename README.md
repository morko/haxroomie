# Installation

To be able to install and run haxroomie [Node.js](https://nodejs.org) version 10.15.1 or newer is required. When [Node.js](https://nodejs.org) is installed you can install haxroomie from command line with:
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

Haxroomie provides a simple command-line interface which is a client for the 
haxroomie API and can be used to start haxball rooms from the command line.

To be able to start a room you must obtain a token from https://www.haxball.com/headlesstoken
and give it to the cli script as an argument:

```sh
haxroomie <token>
```

Haxroomie has also simple interactive command-line interface. Once haxroomie is started you can type `help` for available commands.

For other options like changing the room name run `haxroomie --help` to see available options.

Haxroomie supports loading the options from a [haxball headless manager configuration file](https://github.com/saviola777/haxball-headless-manager#preparing-your-configuration). You can give the file with `--config <file>` or `-c <file>` argument. See https://www.github.com/saviola777/haxball-headless-manager#preparing-your-configuration for information about the configuration file.

**THE CONFIG FILES HHM.config.room MUST HAVE A `token` PROPERTY LIKE THIS:**

```
HHM.config.room = {
  token: haxroomie.token
}
```

See the default configuration file in https://www.github.com/morko/haxroomie/src/master/src/hhm/config.js for a complete example. Haxroomie injects a **haxroomie** object to the haxball headless manager configuration that can be used to e.g. get options from the command line. Multiple custom options can be injected to the HHM config with `--options` argument. Plugins can be loaded from a file with the `--plugins` argument.

# API usage

This section defines the haxroomie API. Haxroomie uses [puppeteer](https://github.com/GoogleChrome/puppeteer) to spawn a headless Chromium browser that can be controlled programmatically.

To install haxroomie for your project its preferred to install it locally with
```sh
npm install morko/haxroomie
```

## Haxroomie object

To get started it is required to create a Haxroom object.

```js
const { Haxroomie } = require('haxroomie');
let haxroomie = new Haxroomie();
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
```

When choosing a port, take care that it is not visible outside your network.

## Haxroomie session

After creating the Haxroomie object it is required for the client to request a session.

The [session object](https://www.github.com/morko/haxroomie/src/master/src/room/Session.js) allows clients to communicate with the haxball room and the headless browser by sending and receiving [actions](#haxroomie-actions).

[Session](https://www.github.com/morko/haxroomie/src/master/src/room/Session.js) can be requested from the Haxroomie with `haxroomie.getSession(sessionID)` which will return a session with the given id if it exists or initialize a new one. On the first time the `getSession` is called, it will also spawn the headless chromium browser.

Every new session gets a new tab in the headless browser.


### Using the session

After getting the session the client must subscribe to the session actions with
`session.subscribe(id, callback)`, where 

- `id` can be almost anything and
- `callback` is a function that receives the action that is sent through session to
the given `id` as an argument to the function.

Example of a client and registering it:
```js
const { Haxroomie } = require('haxroomie');

let haxroomie = new Haxroomie();
let session = await haxroomie.getSession('sessionID');

let client = {
  id: 1,
  onReceivedAction: function(action) {
    console.log(action);
  }
}
session.subscribe(client.id, client.onReceivedAction.bind(client));
```

Clients can send actions to each other and haxroomie through the session object.

Broadcasting action to all subscribed clients and haxroomie:
```js
session.broadcast(action);
```
Sending action to another client:
```js
session.send(clientID, action);
```
Sending action to haxroomie:
```js
await session.sendToRoom(action);
```
Calling a function in the [room object](https://github.com/haxball/haxball-issues/wiki/Headless-Host)
```js
let result = await session.callRoom('kickPlayer', 1, 'Bye!', true);
```

## Haxroomie actions

The action Object is almost similar to
[Flux Standard Action](https://github.com/redux-utilities/flux-standard-action).

**The difference is** that each action MUST contain the sender.

If the action came from the room, then `sender === session.id`.

### Example of an action
```js
{
  type: 'OPEN_ROOM',
  payload: {
    token: "qweqweqwe",
  },
  sender: 'clientID'
}
```

### Example of an error action
```js
{
  type: 'OPEN_ROOM_STOP',
  payload: Error,
  error: true,
  sender: 'sessionID'
}
```

Actions can be created manually or using the [action factory](https://www.github.com/morko/haxroomie-action-factory) to create actions with the given sender id.

Action factory accepts *action type* as first argument and *action payload* as second.

```js
const actionFactory = require('haxball-action-factory')('senderID');
let action = actionFactory.create(
  'OPEN_ROOM',
  { roomConfig: { token: 'qweqweqwe' } }
);
```
The above example will result action to be:
```js
{
  type: 'OPEN_ROOM',
  payload: {
    roomConfig: {
      token: "qweqweqwe"
    }
  },
  sender: 'senderID'
}
```

### Actions that client can send to haxroomie

This section lists action types that client can send to haxroomie with
`session.sendToRoom(action)`.

#### OPEN_ROOM

Starts the process of creating the [HaxBall Headless Host roomObject](https://github.com/haxball/haxball-issues/wiki/Headless-Host#roomobject), thus opening the room.

##### Action payload
```js
{
  roomConfig: {
    token: string,
    roomName: string, // optional
    playerName: string, // optional
    maxPlayers: int, // optional
    password: string, // optional
    public: boolean, // optional
    geo: {code: string, lat: float, lon: float}, // optional
    adminPassword: string // optional
  }
}
```

##### Action flow

```
Client => OPEN_ROOM
Server => OPEN_ROOM_START
Server => OPEN_ROOM_STOP
```

#### CLOSE_ROOM

Closes the room by navigating the session tab to a blank page.

##### Action payload

```js
undefined
```

##### Action flow in case of success

```
Client => CLOSE_ROOM
Server => ROOM_CLOSED
```
### Actions that haxroomie sends to clients

Actions the server emits/sends and the client can listen to with the function defined in `session.subscribe('sessionID', function)`.

#### CONNECTED (broadcast)

Sent when a new client connects to the session.

##### Action payload

```js
{
  roomInfo: {
    roomlink: string,
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

#### DISCONNECTED (broadcast)

Sent when a client disconnects.

##### Action payload
```js
{
  clientID: any
}
```
#### OPEN_ROOM_START (broadcast)

Sent when OPEN_ROOM has been requested.

##### Action payload
```js
{
  clientID: any
}
```
#### OPEN_ROOM_STOP (broadcast)

If the room was not opened, then the action payload will contain the error.

On success it will contain the room information.

##### Action payload
```js
{
  roomInfo: {
    roomlink: string,
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

##### Action payload
```js
undefined
```
#### ROOM_EVENT (broadcast)

Sent when some [HaxBall Headless Host roomObject](https://github.com/haxball/haxball-issues/wiki/Headless-Host#roomobject)
event happens.

Haxroomie does not send all the possible events that roomObject supports by default for performance reasons.

List of events that are sent can be seen in [haxroomie-plugins.js](https://www.github.com/morko/haxroomie/src/master/src/hhm/haxroomie-plugin.js).

**IMPORTANT: args are not sanitized and can contain harmful data!**

##### Action payload
```js
{
  handlerName: string,
  args: Array
}
```
