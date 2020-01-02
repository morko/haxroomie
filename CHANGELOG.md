# Changelog

### 2.1.0

#### haxroomie-cli

- Saviola's plugin repository version can be set in config file with
  `defaultRepositoryVersion` property.

#### haxroomie-core

- Fixed running with no sandbox.

#### 2.0.1

##### haxroomie-cli

- Fixed close command.

## 2.0.0

### Potentially breaking changes

- The 2.0.0 version splits the `haxroomie` package into 2 packages called `haxroomie-core` (API) and `haxroomie-cli` (Command Line Interface). The `haxroomie` npm package will be deprecated.

#### haxroomie-core

- Repository related methods are now organized under `RoomController.repositories`.
- Plugin related methods are now organized under `RoomController.plugins`.
- `RoomController.openRoom(config)` can throw `RoomIsRunningError` if called on
room that is already running.
- RoomController `close-room` event got split into two events called
`close-room-start` and `close-room-stop`.
- RoomController `open-room-error` event was merged to `open-room-stop` and removed.
- RoomController `open-room-start`, `open-room-start`, `close-room-start` and `close-room-stop`
events send the error as first argument if one happens.

### New Features

- Support `noPlayer` option (run rooms without host player).
- Ability to load and remove plugins while room is running.

#### haxroomie-cli

- The commands in CLI are organized into categories.
- Commands that are not usable when selected room is not running are now hidden.
- Commands that require a plugin are hidden if plugin is not loaded and enabled.
- New `init` command that reinitializes the room if it goes to a unusable state.

#### haxroomie-core

- Ability to get repository information before opening a room with
`RoomController.repositories.getRepositoryInformation(repository)`.
- Support the new HHM `repository.json` definiton for faster loading
times.

### Fixed Bugs

#### haxroomie-cli

- Can now close haxroomie by pressing ctrl-c or ctrl-d.
- Exit the app when starting if its already running.

#### haxroomie-core

- Fixed race condition that happened when adding multiple rooms into haxroomie
"simultaniously". The rooms might have got the same page to control.
- Fixed loading of local repositories in windows.
- Starting of room should now fail immediately if hhm cannot be loaded.

#### 1.1.3

- Fixed `unban` command in CLI.

#### 1.1.2

- Fixed CLI commands that were not working.

#### 1.1.1

- Updated the lodash dependency due security vulnerability.

### 1.1.0

#### Potentially breaking changes

- Haxroomie is now released to `npm` and installing with git is no longer recommended.
- Config is now loaded from `~/.haxroomie/config.js` by default. If `~/.haxroomie/config.js` does not exist, one is created from an example config.
- The `user-data-dir` is now loaded from `~/.haxroomie/user-data-dir` by default. Copy your `user-data-dir` there or use the `-d` argument for haxroomie if you have some data you do not want to loose.
- The `banlist` command is now hidden in CLI unless you load the `hr/kickban` plugin from [my plugin repository](https://github.com/morko/hhm-sala-plugins) (also the `!kick`, `!ban` and `!banlist` commands in the room won't exist if this plugin is not loaded)
- In API the `RoomController.openRoom` method now throws an Error if it fails to open the room.
- The API of `RoomController` has changed so that now the methods can throw bunch of custom errors for better error handling. Please review the new API at [documentation website](https://morko.github.io/haxroomie/RoomController.html).

\* *`~` is a shorthand for users home directory in Linux*

#### Migration guide from 1.0.x => 1.1.0

1. Copy your config to `~/.haxroomie/config.js`.
2. Copy the `user-data-dir` in the `haxroomie` folder to `~/.haxroomie/user-data-dir`.
3. Follow installatin instructions in [README](https://github.com/morko/haxroomie#installation)

#### New features (CLI)

- Can now "hot load" the config using `reload` command if only `pluginConfig` is changed. This means that you can change the plugin configurations without restarting the room.
- The `plugins` option "overrides" the `pluginConfig` so that plugins will get loaded from the filesystem if both options contain the same plugin. The configurations in `pluginConfig` now affect the `plugins` loaded from filesystem.
- Can use `roomScript` with `plugins`.
- users can now give the token in the config file using `token` option
- when opening rooms the token will be reused until it becomes invalid
- `reload` command now gives better user feedback
- users can now also use plugins with the `roomScript` option
  - only the default plugins will be disabled
- tried to elaborate what is a room id in `help`
- support using `.env` file in projects root directory to be able to set environment variables

#### Fixed bugs (CLI)

- cleaned up logging
- removed the `eval` command because of parsing the JavaScript from CLI was buggy
- updated the example configs to not enable the roles plugin by default, because it could be potentially dangerous if user did not change the passwords
- updated and cleaned up example configs

#### New features (API)

- added `name` property to `PluginData` type
- added new type: `PluginDef`
- added new method: `RoomController.hasPlugin`
- added new method: `RoomController.addPlugin`
- added new method: `RoomController.addRepository`
- added new method: `RoomController.getRepositories`
- added new method: `RoomController.setPluginConfig`
- added new method: `RoomController.getPluginConfig`
- added more tests

#### Fixed bugs (API)

- if `RoomController.openRoom` failed the room might still be left open
- updated `RoomController` documentation and added documentation for missing properties
- do not close the page on ´open-room-error` when `NODE_ENV === development'

#### 1.0.7

- HHM now gets loaded from surge.

#### 1.0.6

##### Fixed bugs (CLI)

- Fixed hiding the unuseful error messages at startup.
 
#### 1.0.5

##### Fixed bugs (CLI)

- Reloading new rooms with `autoStart: true` threw error.
- Loading a plugin from invalid path threw a cryptic error.
- Reloading room config that added `plugins` option threw error.
- The command `rooms` did not work if ran on closed room.

#### 1.0.4

##### Fixed bugs (CLI):

- Reloading config did not restart all running rooms because of
  missing await statement.

#### 1.0.3

##### Fixed bugs (CLI)

- Included `host` role in the example configs.

#### 1.0.2

##### Fixed bugs (CLI)

- Loading config with syntax error now displays the correct error.
- Removed host player when listing players.

##### New features (CLI)

- Show error stack if command throws one.
- Indicator for admin player is more clear when listing players.
- Display a link where to get the token when opening rooms.

#### 1.0.1

##### Fixed bugs (API)

- Wrong event name when closing room.

## 1.0.0

Moved out of beta version
