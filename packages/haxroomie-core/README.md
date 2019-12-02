# haxroomie-core

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

## Examples

### Opening One Room

Requires the token to be set as an environment variable named `HAXBALL_TOKEN`.

```js
const { createHaxroomie } = require('haxroomie');

async function bootstrap() {
  try {
    let haxroomie = await createHaxroomie();
    let room = await haxroomie.addRoom('example');

    room.on('open-room-stop' (roomInfo) => {
      console.log(`Room started. Here is the link: ${roomInfo.roomLink}`);
    });

    room.openRoom({
      roomName: 'haxroomie',
      playerName: 'host',
      maxPlayers: 10,
      public: false,
      token: process.env.HAXBALL_TOKEN
    });

  } catch (err) {
    logger.error(err.stack);
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
const { createHaxroomie } = require('haxroomie');

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
    logger.error(err.stack);
    process.exit(1);
  }
}

getRepoInfoExample();
```