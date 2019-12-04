const colors = require('colors/safe');
const CommandHandler = require('./CommandHandler');
const cprompt = require('./cprompt');
const { logger } = require('haxroomie-core');

class Commands extends CommandHandler {
  constructor(opt) {
    opt = opt || {};
    if (!opt.room) new TypeError('invalid arguments');
    if (!opt.haxroomie) new TypeError('invalid arguments');
    if (!opt.setRoom) new TypeError('invalid arguments');
    if (!opt.openRoom) new TypeError('invalid arguments');
    if (!opt.closeRoom) new TypeError('invalid arguments');
    if (!opt.createRoom) new TypeError('invalid arguments');
    if (!opt.config) new TypeError('invalid arguments');

    super(opt);

    this.room = opt.room;
    this.haxroomie = opt.haxroomie;
    this.setRoom = opt.setRoom;
    this.openRoom = opt.openRoom;
    this.closeRoom = opt.closeRoom;
    this.createRoom = opt.createRoom;
    this.config = opt.config;
  }
  /**
   * @param {number} id - Player id.
   * @return {boolean} - Does the room have the given player.
   * @private
   */
  async checkIfRoomHasPlayer(id) {
    let players = await this.room.callRoom('getPlayerList');
    for (let player of players) {
      if (!player) continue;
      if (player.id == id) return true;
    }
    return false;
  }

  /**
   * @param {PluginData} pluginData - Plugin data.
   * @private
   */
  pluginDataToString(pluginData) {
    const p = pluginData;
    const isEnabled = p.isEnabled
      ? `${colors.green(`enabled`)}`
      : `${colors.yellow(`disabled`)}`;

    let string =
      `${p.pluginSpec.name} (${isEnabled}):\n` +
      `  id: ${p.id}\n` +
      `  name: ${p.pluginSpec.name}\n` +
      `  author: ${p.pluginSpec.author}\n` +
      `  version: ${p.pluginSpec.version}\n` +
      `  dependencies: ${p.pluginSpec.dependencies}\n` +
      `  order: ${JSON.stringify(p.pluginSpec.order)}\n` +
      `  config: ${JSON.stringify(p.pluginSpec.config)}`;

    return string;
  }

  onCommand_help() {
    return {
      description: 'Prints help.',
      category: 'Basic commands',
      run: async () => {
        let categories = new Map();
        let indentation = 12;

        for (let prop of Object.getOwnPropertyNames(
          Object.getPrototypeOf(this)
        )) {
          if (!prop.startsWith(this.cmdPrefix)) {
            continue;
          }
          let cmdName = prop.slice(this.cmdPrefix.length);
          let command = await this.getCommand(cmdName);
          if (command.disabled) continue;

          let category = command.category || 'Uncategorized';
          let description = command.description;
          // indentation
          let cmdNameLength = cmdName.length;
          for (let i = 0; i < indentation - cmdNameLength; i++) {
            cmdName += ' ';
          }
          cmdName = colors.cyan(cmdName);
          let help = cmdName + description;
          if (categories.has(category)) {
            categories.get(category).push(help);
          } else {
            categories.set(category, [help]);
          }
        }

        for (let category of categories.keys()) {
          cprompt.print('');
          cprompt.print(colors.green.bold(category + ':'));
          let helps = categories.get(category);
          cprompt.print(helps.join(`\n`));
        }
      },
    };
  }

  onCommand_rooms() {
    return {
      description: 'Prints available rooms and information about them.',
      category: 'Basic commands',
      run: async () => {
        let rooms = this.haxroomie.getRooms();
        rooms = await Promise.all(
          rooms.map(async r => {
            let id = 'ID: ' + colors.cyan(r.id);

            if (!r.usable) {
              return (
                `${id} Status: ${colors.red('not usable')} ` +
                `try to reinitialize with "init ${r.id}"`
              );
            }
            let isRunning = r.running
              ? 'Status: ' + colors.green('running')
              : 'Status: ' + colors.yellow('stopped');
            if (!r.running) return `${id} ${isRunning}`;

            let roomLink = 'Link: ' + colors.cyan(r.roomInfo.roomLink);
            let maxPlayers = r.roomInfo.maxPlayers;
            let playerList = await r.callRoom('getPlayerList');
            let playersLength = playerList.length - r.roomInfo.noPlayer ? 0 : 1;
            let players = colors.cyan(playersLength + '/' + maxPlayers);
            let amountOfPlayers = `Players: ${players}`;

            return `${id} ${isRunning} ${amountOfPlayers} ${roomLink}`;
          })
        );
        cprompt.print(rooms.join(`\n`));
      },
    };
  }

  onCommand_setroom() {
    return {
      description: `Selects which room to control using its id (see ${colors.cyan(
        'rooms'
      )}).`,
      args: ['id'],
      category: 'Basic commands',
      run: id => {
        let room = this.haxroomie.getRoom(id);
        if (!room) {
          cprompt.print(`Invalid room id`, `ERROR`);
          return;
        }
        this.setRoom(room);
      },
    };
  }

  onCommand_open() {
    return {
      description: `Opens room with given id (see ${colors.cyan(
        'rooms'
      )} for the ids).`,
      alias: ['start'],
      args: ['id'],
      category: 'Basic commands',
      run: id => {
        if (this.room.running) {
          cprompt.print(
            `The room is already running. Close it before opening!`
          );
          return;
        }
        return this.openRoom(id);
      },
    };
  }

  onCommand_close() {
    return {
      description: `Closes room with given id (see ${colors.cyan(
        'rooms'
      )} for the ids).`,
      args: ['id'],
      alias: ['stop'],
      category: 'Basic commands',
      run: async id => {
        return this.closeRoom(id);
      },
    };
  }

  onCommand_reload() {
    return {
      description:
        'Reloads the config and restarts the rooms that were modified (if needed).',
      category: 'Basic commands',
      run: async () => {
        const reloadInfo = this.config.reload();
        const { oldConfig, newConfig, modifiedRooms } = reloadInfo;

        if (modifiedRooms.size > 0) {
          let rooms = [];
          for (let roomId of modifiedRooms.keys()) {
            rooms.push(colors.cyan(roomId));
          }
          let roomsString = rooms.join(', ');
          cprompt.print(
            `Rooms (${roomsString}) were modified.`,
            'RELOAD CONFIG'
          );
        } else {
          cprompt.print(`No rooms were modified.`, 'RELOAD CONFIG');
          return;
        }

        await this.reloadRooms(oldConfig, newConfig, modifiedRooms);
      },
    };
  }

  async reloadRooms(oldConfig, newConfig, modifiedRooms) {
    for (let [roomId, modifiedProperties] of modifiedRooms) {
      // Remove removed rooms.
      if (modifiedProperties === null) {
        this.haxroomie.removeRoom(roomId);
        continue;
      }

      // Add new rooms.
      if (!this.haxroomie.hasRoom(roomId)) {
        await this.createRoom(roomId);
        let roomConfig = this.config.getRoomConfig(roomId);
        if (roomConfig.autoStart) {
          await this.openRoom(roomId);
        }
        continue;
      }

      // Restart/modify running rooms.
      let room = this.haxroomie.getRoom(roomId);
      if (room.running) {
        let cannotHotLoad = modifiedProperties.find(p => {
          return p !== 'pluginConfig';
        });

        // Restart rooms that cannot be hotloaded.
        if (cannotHotLoad) {
          await this.closeRoom(roomId);
          await this.openRoom(roomId);
          continue;
        }

        // If we can hotload the properties.
        for (let prop of modifiedProperties) {
          if (prop === 'pluginConfig') {
            cprompt.print(
              `Setting plugin config for ${colors.cyan(roomId)}.`,
              'RELOAD CONFIG'
            );
            try {
              await room.plugins.setPluginConfig(
                newConfig[roomId].pluginConfig
              );
            } catch (err) {
              cprompt.print(err.message);
              logger.debug(err.stack);
            }
          }
        }
      }
    }
  }

  onCommand_init() {
    return {
      description:
        `Tries to reinitialize if room ` + `goes to an unusable state.`,
      args: ['id'],
      category: 'Basic commands',
      run: async id => {
        await this.haxroomie.removeRoom(id);
        await this.createRoom(id);
      },
    };
  }

  onCommand_link() {
    return {
      description: 'Get the room link.',
      disabled: !this.room.running,
      category: 'Room control',
      run: () => {
        if (!this.room.running) {
          cprompt.print(`Room is not running!`);
          return;
        }
        cprompt.print(this.room.roomInfo.roomLink);
      },
    };
  }

  onCommand_chat() {
    return {
      description: 'Sends a chat message to the room.',
      disabled: !this.room.running,
      args: ['msg'],
      category: 'Room control',
      run: async msg => {
        if (!msg && msg !== 0) return;
        await this.room.callRoom('sendChat', msg);
      },
    };
  }

  onCommand_players() {
    return {
      description: 'Prints players in the room.',
      disabled: !this.room.running,
      category: 'Room control',
      run: async () => {
        let playerList = await this.room.callRoom('getPlayerList');
        playerList = playerList.filter(p => p.id !== 0);
        let playersLength =
          playerList.length - this.room.roomInfo.noPlayer ? 0 : 1;
        let players = [`${playersLength}/${this.room.roomInfo.maxPlayers}`];

        for (let player of playerList) {
          if (!player) continue;
          let playerString = `nickname: ${colors.cyan(player.name)}`;
          if (player.admin) {
            playerString += ' ' + colors.green('admin');
          }
          playerString += `\n  id: ${player.id}`;
          playerString += `\n  auth: ${player.auth}`;

          let roles = await this.room.roles.getPlayerRoles(player.id);
          if (roles && roles.length > 0) {
            playerString += `\n  roles: ${roles.join(',')}`;
          }

          players.push(playerString);
        }
        cprompt.print(players.join(`\n`), `PLAYERS`);
      },
    };
  }

  async onCommand_role() {
    let isDisabled;
    if (!this.room.running) {
      isDisabled = true;
    } else {
      isDisabled = await this.room.plugins.hasPlugin('sav/roles');
      isDisabled = !isDisabled;
    }
    return {
      description: 'Prints information and players in given role.',
      disabled: isDisabled,
      args: ['role'],
      category: 'Room control',
      run: async role => {
        const roleInfo = await this.room.roles.getRole(role, {
          offlinePlayers: true,
        });

        if (roleInfo.players.length > 0) {
          cprompt.print(
            `Players in the role ${colors.green(roleInfo.roleName)}:`
          );
          let players = [];
          for (let p of roleInfo.players) {
            let playerString = `nickname: ${colors.cyan(p.name)}`;
            playerString += `\n  id: ${p.id}`;
            playerString += `\n  auth: ${p.auth}`;
            players.push(playerString);
          }
          cprompt.print(players.join(`\n`));
        }

        cprompt.print(
          `Role: ${colors.cyan(roleInfo.roleName)} ` +
            `Password: ${colors.cyan(roleInfo.password)} ` +
            `Players: ${colors.cyan(roleInfo.players.length)}`,
          `ROLE INFO`
        );
      },
    };
  }

  async onCommand_addrole() {
    let isDisabled;
    if (!this.room.running) {
      isDisabled = true;
    } else {
      isDisabled = await this.room.plugins.hasPlugin('sav/roles');
      isDisabled = !isDisabled;
    }
    return {
      description: 'Adds given role to a player with given id.',
      disabled: isDisabled,
      args: ['id', 'role'],
      category: 'Room control',
      run: async (id, role) => {
        await this.room.roles.setPlayerRole(id, role, true, true);
      },
    };
  }

  async onCommand_delrole() {
    let isDisabled;
    if (!this.room.running) {
      isDisabled = true;
    } else {
      isDisabled = await this.room.plugins.hasPlugin('sav/roles');
      isDisabled = !isDisabled;
    }

    return {
      description: 'Removes given role from a player with given id.',
      disabled: isDisabled,
      args: ['id|auth', 'role'],
      category: 'Room control',
      run: async (id, role) => {
        await this.room.roles.setPlayerRole(id, role, false, true);
      },
    };
  }

  onCommand_kick() {
    return {
      description: 'Kicks a player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async id => {
        let intId = parseInt(id);
        if (isNaN(intId)) {
          cprompt.print('Player ID has to be a number!', 'ERROR');
          return;
        }
        let hasPlayer = await this.checkIfRoomHasPlayer(intId);
        if (!hasPlayer) {
          cprompt.print(`no player with id: ${intId}`, `ERROR`);
          return;
        }
        await this.room.callRoom('kickPlayer', intId, 'Bye!', false);
      },
    };
  }

  onCommand_ban() {
    return {
      description: 'Bans a player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async id => {
        let intId = parseInt(id);
        if (isNaN(intId)) {
          cprompt.print('Player ID has to be a number!', 'ERROR');
          return;
        }
        let hasPlayer = await this.checkIfRoomHasPlayer(intId);
        if (!hasPlayer) {
          cprompt.print(`no player with id: ${intId}`, `ERROR`);
          return;
        }
        await this.room.callRoom('kickPlayer', intId, 'Bye!', true);
      },
    };
  }

  onCommand_unban() {
    return {
      description: 'Removes a ban of player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async id => {
        let intId = parseInt(id);
        if (isNaN(intId)) {
          cprompt.print('Player ID has to be a number!', 'ERROR');
          return;
        }
        await this.room.callRoom('clearBan', intId);
      },
    };
  }

  async onCommand_banlist() {
    let isDisabled;
    if (!this.room.running) {
      isDisabled = true;
    } else {
      isDisabled = await this.room.plugins.hasPlugin('hr/kickban');
      isDisabled = !isDisabled;
    }

    return {
      description: 'Prints banned players.',
      disabled: isDisabled,
      category: 'Room control',
      run: async () => {
        let bannedPlayers = await this.room.eval(() => {
          return HHM.manager.getPlugin('hr/kickban').bannedPlayers();
        });
        if (bannedPlayers.length === 0) {
          cprompt.print('No banned players.');
          return;
        }
        bannedPlayers = bannedPlayers.map(p => `id:${p.id} - ${p.name}`);
        cprompt.print(bannedPlayers.join('\n'));
      },
    };
  }

  onCommand_admin() {
    return {
      description: 'Gives admin to a player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async id => {
        let intId = parseInt(id);
        if (isNaN(intId)) {
          cprompt.print('Player ID has to be a number!', 'ERROR');
          return;
        }
        let hasPlayer = await this.checkIfRoomHasPlayer(intId);
        if (!hasPlayer) {
          cprompt.print(`no player with id: ${intId}`, `ERROR`);
          return;
        }
        await this.room.callRoom('setPlayerAdmin', intId, true);
      },
    };
  }

  onCommand_unadmin() {
    return {
      description: 'Removes admin from a player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async id => {
        let intId = parseInt(id);
        if (isNaN(intId)) {
          cprompt.print('Player ID has to be a number!', 'ERROR');
          return;
        }
        let hasPlayer = await this.checkIfRoomHasPlayer(intId);
        if (!hasPlayer) {
          cprompt.print(`no player with id: ${intId}`, `ERROR`);
          return;
        }
        await this.room.callRoom('setPlayerAdmin', intId, false);
      },
    };
  }

  onCommand_clearbans() {
    return {
      description: 'Clears all the bans.',
      disabled: !this.room.running,
      category: 'Room control',
      run: async () => {
        await this.room.callRoom('clearBans');
      },
    };
  }

  onCommand_plugins() {
    return {
      description: 'Prints available plugins.',
      disabled: !this.room.running,
      category: 'Plugin control',
      run: async () => {
        let plugins = await this.room.plugins.getPlugins();
        let pluginList = [];
        for (let p of plugins) {
          const isEnabled = p.isEnabled
            ? `${colors.green(`enabled`)}`
            : `${colors.yellow(`disabled`)}`;
          pluginList.push(`${p.pluginSpec.name} (${isEnabled})`);
        }
        cprompt.print(pluginList.join(`\n`));
      },
    };
  }

  onCommand_plugin() {
    return {
      description: 'Prints detailed information about given plugin name.',
      disabled: !this.room.running,
      args: ['name'],
      category: 'Plugin control',
      run: async name => {
        let plugin = await this.room.plugins.getPlugin(name);
        cprompt.print(this.pluginDataToString(plugin));
      },
    };
  }

  onCommand_enable() {
    return {
      description: 'Enables the plugin with given name.',
      disabled: !this.room.running,
      args: ['name'],
      category: 'Plugin control',
      run: async name => {
        let pluginData = await this.room.plugins.getPlugin(name);
        if (!pluginData) {
          cprompt.print(`Invalid plugin name: ${name}`, `ERROR`);
          return;
        }
        await this.room.plugins.enablePlugin(name);
      },
    };
  }

  onCommand_disable() {
    return {
      description: 'Disables the plugin with given name.',
      disabled: !this.room.running,
      args: ['name'],
      category: 'Plugin control',
      run: async name => {
        let pluginData = await this.room.plugins.getPlugin(name);
        if (!pluginData) {
          cprompt.print(`Invalid plugin name: ${name}`, `ERROR`);
          return;
        }
        let disabledPlugins = await this.room.plugins.disablePlugin(name, true);
        pluginData = await this.room.plugins.getPlugin(name);

        if (disabledPlugins.length < 1) {
          cprompt.print(`Could not disable ${name}`, `ERROR`);
        }
      },
    };
  }

  onCommand_dependsof() {
    return {
      description: 'Prints the plugins that depend of given plugin.',
      disabled: !this.room.running,
      args: ['name'],
      category: 'Plugin control',
      run: async name => {
        let plugins = await this.room.plugins.getPluginsThatDependOn(name);
        if (!plugins || plugins.length < 1) {
          cprompt.print(`Plugin ${name} has no plugins that depend on it.`);
          return;
        }
        let result = [`Plugins that depend on ${name}:`];
        for (let p of plugins) {
          result.push(`${p.pluginSpec.name}`);
        }
        cprompt.print(result.join(`\n`));
      },
    };
  }

  onCommand_q() {
    return {
      description: 'Exits the program.',
      category: 'Basic commands',
      run: async () => {
        await this.haxroomie.closeBrowser();
        process.exit(0);
      },
    };
  }
}
module.exports = Commands;
