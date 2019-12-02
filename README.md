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
2. Install dependencies and create links between the subpackages.
```sh
npm run bootstrap
```
3. Start developing
