# haxroomie-core

**WARNING: there is currently some problem running with 20.04 version of Ubuntu crashing randomly.**
This is being investigated but will take some time to debug.

API made with `Node.js` for running and controlling HaxBall rooms.

The most important interfaces the API offers are:

  - [createHaxroomie](https://morko.github.io/haxroomie/module-haxroomie.html#createHaxroomie)
    - creates instances of Haxroomie
  - [Haxroomie](https://morko.github.io/haxroomie/Haxroomie.html)
    - container for the room instances (controls the headless browser)
  - [RoomController](https://morko.github.io/haxroomie/RoomController.html)
    - controls the HaxBall room (owns a tab in the headless browser)

## Installation

To install haxroomie-core for your project its preferred to install it locally with
```sh
npm install haxroomie-core
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

The plugins live inside repositories like [hhm-sala-plugins](https://github.com/morko/hhm-sala-plugins). The repositories can be loaded with
[repositories](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html#repositories)
property and plugins with
[pluginConfig](https://morko.github.io/haxroomie/tutorial-haxroomie-cli-config.html#repositories).

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

By default the files will be downloaded to `~/.haxroomie/downloads` (can be changed with `downloadDirectory` argument for
[Haxroomie constructor](https://morko.github.io/haxroomie/Haxroomie.html#newhaxroomie-options)).

#### Development logging/debugging

See [this](/README.md#debugging) to enable more extensive logging.

To make haxroomie start the browser in windowed mode, use ` headless: true`
in [Haxroomie constructor](https://morko.github.io/haxroomie/Haxroomie.html#newhaxroomie-options).

## Examples

### Opening One Room

Requires the token to be set as an environment variable named `HAXBALL_TOKEN`.

```js
const { createHaxroomie } = require('haxroomie-core');

async function bootstrap() {
  try {
    let haxroomie = await createHaxroomie();
    let room = await haxroomie.addRoom('example');

    let roomInfo = await room.openRoom({
      roomName: 'haxroomie',
      playerName: 'host',
      maxPlayers: 10,
      public: false,
      token: process.env.HAXBALL_TOKEN
    });

    console.log(`Room started. Here is the link: ${roomInfo.roomLink}`);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

bootstrap();

```

### Getting Repository Info Before Opening Room

Initialize the room with
[RoomController.init](https://morko.github.io/haxroomie/RoomController.html#init)
before using
[RoomController.repositories](https://morko.github.io/haxroomie/RoomController.html#repositories).

Initializing loads the Haxball Headless Manager (HHM) library. It is required to use the
`repositories` property.

```js
const { createHaxroomie } = require('haxroomie-core');

async function getRepoInfoExample() {
  try {
    let haxroomie = await createHaxroomie();
    let room = await haxroomie.addRoom('example');
    await room.init();

    repoInfo = await room.repositories.getRepositoryInformation({
      type: 'github',
      repository: 'morko/hhm-sala-plugins'
    });

    console.log(repoInfo);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

getRepoInfoExample();
```
