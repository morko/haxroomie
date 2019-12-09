# haxroomie

<a href=https://discord.gg/TeJAEWu><img src="https://discordapp.com/api/guilds/580671475707674626/widget.png?style=shield" alt="Discord"/></a>

Haxroomie is set of tools run headless HaxBall rooms without GUI.

Rooms can be run
- Programmatically using
  [haxroomie-core](https://github.com/morko/haxroomie/tree/master/packages/haxroomie-core)
- From the command line using
  [haxroomie-cli](https://github.com/morko/haxroomie/tree/master/packages/haxroomie-cli)


With haxroomie you can
  - run rooms without desktop environment
  - run multiple rooms with ease
  - use a modular plugin manager made by saviola
    - see [haxball-headless-manager](https://github.com/saviola777/haxball-headless-manager)
  - monitor and control rooms from command line
  - use the API to create an interface to run rooms

This repository is a monorepo containing all the different interfaces for haxroomie.

## Links

- [haxroomie-core](packages/haxroomie-core/) (API)
- [haxroomie-cli](packages/haxroomie-cli/) (Command Line Interface)
- [API Documentation](https://morko.github.io/haxroomie) (API documentation and tutorials)

## Development

1. Clone the repository.
2. Install dependencies and create links between the subpackages (handled by lerna).
```sh
npm run bootstrap
```
3. haxroomie-cli can be run from projects root.
```sh
npm start
```

I accept well documented pull request to master branch.

### Version Control

Development is done on the `master` branch and publishing to npm is also done
from `master`. If major update happens, then the old version will be branched
and new version will continue as `master`. Feature branches are highly engouraced.

## Running tests

Tests can be ran with `npm test` in the projects root, but they require a
token for the HaxBall room. The token(s) is loaded from environmental
variables.
e.g.
```
HR_TEST_TOKEN1="thr1.AAAAAF3nhJtzT2JftBYPmA.gBZ2x1ST7HU"
HR_TEST_TOKEN2="thr1.AAAAAF3nlPdWTSwonQ8zXw.KUYmmWsmPysfdaQ"
```

Currently you only need one test token, but in the future there might be some
tests for multiple rooms.

## Publishing

Publishing to npm is handled by [lerna](https://github.com/lerna/lerna) can be done with
```sh
npm run publish
```

This will build docs, format the JavaScript using linter, bump versions and publish all packages under `./packages`.
