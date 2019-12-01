# Tutorials

- {@tutorial cli-using-haxroomie-config}
- {@tutorial cli-install-to-vps}

# API

To install haxroomie for your project its preferred to install it locally with
```sh
npm install haxroomie
```

Easiest way to create
[Haxroomie instances](https://morko.github.io/haxroomie/Haxroomie.html)
is to use the asynchronous factory function `createHaxroomie` in the
[haxroomie module](https://morko.github.io/haxroomie/module-haxroomie.html#createHaxroomie).

Haxroomie controls one headless chrome browser with help of the Puppeteer library.
Each browser tab can run one HaxBall room. These browser tabs are controlled with
the [RoomController](https://morko.github.io/haxroomie/RoomController.html) object.

## Example API usage

Example of opening one room. Requires the token to be set as an environment
variable named `HAXBALL_TOKEN`.

```js
const { createHaxroomie } = require(`haxroomie`);

async function bootstrap() {
  try {
    let haxroomie = await createHaxroomie();
    let room = await haxroomie.addRoom(`example`);

    room.on('open-room-stop' (roomInfo) => {
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
}

bootstrap();

```

If you wish to get information about repositories before opening a room you
need to initialize the room before using
[RoomController#repositories]{@link RoomController#repositories}.
Initializing loads the Haxball Headless Manager library required to use the
object.

e.g.

```js
const { createHaxroomie } = require(`haxroomie`);

async function getRepoInfoExample() {
  try {
    let haxroomie = await createHaxroomie();
    let room = await haxroomie.addRoom(`example`);
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
