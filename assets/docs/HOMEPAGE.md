# Tutorials

- {@tutorial haxroomie-cli-config}
- {@tutorial haxroomie-cli-install}
- {@tutorial custom-hhm-config}

# API

The most important interfaces the API offers are:

  - [createHaxroomie](https://morko.github.io/haxroomie/module-haxroomie.html#createHaxroomie)
    - creates instances of Haxroomie
  - [Haxroomie](https://morko.github.io/haxroomie/Haxroomie.html)
    - container for the room instances (controls the headless browser)
  - [RoomController](https://morko.github.io/haxroomie/RoomController.html)
    - controls the HaxBall room (owns a tab in the headless browser)

## Examples

### Opening One Room

Requires the token to be set as an environment variable named `HAXBALL_TOKEN`.

```js
const { createHaxroomie } = require('haxroomie');

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
    console.error(err);
    process.exit(1);
  }
}

getRepoInfoExample();
```