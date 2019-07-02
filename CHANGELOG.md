# Changelog

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