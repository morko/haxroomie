const colors = require('colors/safe');
const CommandHandler = require('./CommandHandler');
const cprompt = require('./cprompt');
const logger = require('../logger');

class Commands extends CommandHandler {

  constructor(opt) {

    opt = opt || {};
    if (!opt.room) new TypeError('invalid arguments');
    if (!opt.haxroomie) new TypeError('invalid arguments');
    if (!opt.setRoom) new TypeError('invalid arguments');
    if (!opt.openRoom) new TypeError('invalid arguments');
    if (!opt.closeRoom) new TypeError('invalid arguments');
    if (!opt.config) new TypeError('invalid arguments');

    super(opt);

    this.room = opt.room;
    this.haxroomie = opt.haxroomie;
    this.setRoom = opt.setRoom;
    this.openRoom = opt.openRoom;
    this.closeRoom = opt.closeRoom;
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
    const isEnabled = p.isEnabled ?
      `${colors.green(`enabled`)}` :
      `${colors.yellow(`disabled`)}`;

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
      run: () => {

        let help = [];
        let indentation = 18;
        for (let prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
          if (!prop.startsWith(this.cmdPrefix)) {
            continue;
          }
          let cmdName = prop.slice(this.cmdPrefix.length);
          let description = this.getCommand(cmdName).description;
          // indentation
          let cmdNameLength = cmdName.length;
          for (let i = 0; i < indentation - cmdNameLength; i++) {
            cmdName += ' ';
          }
          cmdName = colors.cyan(cmdName);

          help.push(cmdName + description);
        }

        cprompt.print(help.join(`\n`));

      }
    }
  }

  onCommand_link() {
    return {
      description: 'Get the room link.',
      run: () => {
        if (!this.room.running) {
          cprompt.print(`Room is not running!`);
          return;
        }
        cprompt.print(this.room.roomInfo.roomLink);
      }
    }
  }

  onCommand_open() {
    return {
      description: `Opens room with given id (see ${colors.cyan('rooms')} for the ids).`,
      alias: ['start'],
      args: ['id'],
      run: (id) => {
        return this.openRoom(id);
      }
    }
  }

  onCommand_close() {
    return {
      description: `Closes room with given id (see ${colors.cyan('rooms')} for the ids).`,
      args: ['id'],
      alias: ['stop'],
      run: (id) => {
        return this.closeRoom(id);
      }
    }
  }

  onCommand_reload() {
    return {
      description: 'Reloads the config and restarts the rooms that were modified.',
      run: async () => {
        let modifiedRooms = this.config.reload();

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

        for (let [roomId, modifiedProperties] of modifiedRooms) {
          // Remove removed rooms.
          if (modifiedProperties === null) {
            this.haxroomie.removeRoom(roomId);
            continue;
          }

          // Add new rooms.
          if (!this.haxroomie.hasRoom(roomId)) {
            await this.haxroomie.addRoom(roomId);
            let roomConfig = this.config.getRoomConfig(roomId);
            if (roomConfig.autoStart) {
              await this.openRoom(roomId)
            }
            continue;
          }

          // Restart/modify running rooms.
          let room = this.haxroomie.getRoom(roomId);
          if (room.running) {
            let cannotHotLoad = modifiedProperties.find(p => {
              return p !== 'pluginConfig' && p !== 'repositories' && p !== 'plugins';
            });

            // Restart rooms that cannot be hotloaded.
            if (cannotHotLoad) {
              await this.openRoom(roomId);
              return;
            }

            // If we can hotload the properties.
            let roomConfig = this.config.getRoomConfig(roomId);

            let repositories;
            let pluginConfig;
            let plugins;

            for (let p of modifiedProperties) {
              if (p === 'repositories') repositories = roomConfig.repositories;
              if (p === 'pluginConfig') pluginConfig = roomConfig.pluginConfig;
              if (p === 'plugins') plugins = roomConfig.plugins;
            }

            if (repositories) {
              cprompt.print(`Setting repositories for ${colors.cyan(roomId)}.`, 'RELOAD CONFIG');
              await room.clearRepositories();
              try {
                for (let repo of repositories) {
                  let success = await room.addRepository(repo);
                  if (!success) cprompt.print(`Could not add repository ${repo}.`, 'ERROR');
                }
              } catch (err) {
                cprompt.print(err.message);
                logger.debug(err.stack);
              }
            }

            if (pluginConfig) {
              cprompt.print(`Setting plugin config for ${colors.cyan(roomId)}.`, 'RELOAD CONFIG');
              try {
                await room.setPluginConfig(roomConfig.pluginConfig);
              } catch (err) {
                cprompt.print(err.message);
                logger.debug(err.stack);
              }
            }

            if (plugins) {
              cprompt.print(`Setting plugins for ${colors.cyan(roomId)}.`, 'RELOAD CONFIG');
              for (let pluginDef of plugins.values()) {
                let hasPlugin = await room.hasPlugin(pluginDef.name);
                if (!hasPlugin) {
                  let id = await room.addPlugin(pluginDef);
                  if (id < 0) {
                    cprompt.print(`Could not add plugin ${pluginDef.name}.`, 'ERROR');
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  onCommand_rooms() {
    return {
      description: 'Prints available rooms and their id.',
      run: async () => {
        let rooms = this.haxroomie.getRooms();
        rooms = await Promise.all(rooms.map(async (r) => {
          let isRunning = r.running ?
            colors.green('running') :
            colors.yellow('stopped');
          let id = colors.cyan(r.id);
          if (!r.running) return `id: ${id} - ${isRunning}`;

          let roomLink = r.roomInfo.roomLink;
          let maxPlayers = r.roomInfo.maxPlayers;
          let playerList = await r.callRoom('getPlayerList');
          let amountOfPlayers = `players ${playerList.length - 1}/${maxPlayers}`;
          return `id: ${id} - ${isRunning} - ${amountOfPlayers} - ${roomLink}`;
        }));
        cprompt.print(rooms.join(`\n`));
      }
    }
  }

  onCommand_setroom() {
    return {
      description: `Selects which room to control using its id (see ${colors.cyan('rooms')}).`,
      args: ['id'],
      run: (id) => {
        let room = this.haxroomie.getRoom(id);
        if (!room) {
          cprompt.print(`Invalid room id`, `ERROR`);
          return;
        }
        this.setRoom(room);
      }
    }
  }

  onCommand_chat() {
    return {
      description: 'Sends a chat message to the room.',
      args: ['msg'],
      run: async (msg) => {
        if (!msg && msg !== 0) return;
        await this.room.callRoom('sendChat', msg);
      }
    }
  }

  onCommand_players() {
    return {
      description: 'Prints players in the room.',
      run: async () => {
        let playerList = await this.room.callRoom('getPlayerList')
        playerList = playerList.filter(p => p.id !== 0);
        let players = [`${playerList.length}/${this.room.roomInfo.maxPlayers}`];

        for (let player of playerList) {
          if (!player) continue;
          let playerString = `${player.name} | id: ${player.id}`
          if (player.admin) {
            playerString += ' | ' + colors.green('admin');
          }
          players.push(playerString);
        }
        cprompt.print(players.join(`\n`), `PLAYERS`);
      }
    }
  }

  onCommand_kick() {
    return {
      description: 'Kicks a player with given id.',
      args: ['id'],
      run: async (id) => {
        let hasPlayer = await this.checkIfRoomHasPlayer(id);
        if (!hasPlayer) {
          cprompt.print(`no player with id: ${id}`, `ERROR`);
          return;
        }
        await this.room.kick(id);
      }
    }
  }

  onCommand_ban() {
    return {
      description: 'Bans a player with given id.',
      args: ['id'],
      run: async (id) => {
        let hasPlayer = await this.checkIfRoomHasPlayer(id);
        if (!hasPlayer) {
          cprompt.print(`no player with id: ${id}`, `ERROR`);
          return;
        }
        await this.room.ban(id);
      }
    }
  }

  onCommand_unban() {
    return {
      description: 'Removes a ban of player with given id.',
      args: ['id'],
      run: async (id) => {
        await this.room.unban(id);
      }
    }
  }

  onCommand_banlist() {
    return {
      description: 'Prints banned players.',
      run: async () => {
        let bannedPlayers = await this.room.bannedPlayers();
        if (bannedPlayers.length === 0) {
          cprompt.print('No banned players.');
          return;
        }
        bannedPlayers = bannedPlayers.map((p) => `id:${p.id} - ${p.name}`);
        cprompt.print(bannedPlayers.join('\n'));
      }
    }
  }

  onCommand_admin() {
    return {
      description: 'Gives admin to a player with given id.',
      args: ['id'],
      run: async (id) => {
        let hasPlayer = await this.checkIfRoomHasPlayer(id);
        if (!hasPlayer) {
          cprompt.print(`no player with id: ${id}`, `ERROR`);
          return;
        }
        await this.room.callRoom('setPlayerAdmin', id, true);
      }
    }
  }

  onCommand_unadmin(id) {
    return {
      description: 'Removes admin from a player with given id.',
      args: ['id'],
      run: async (id) => {
        let hasPlayer = await this.checkIfRoomHasPlayer(id);
        if (!hasPlayer) {
          cprompt.print(`no player with id: ${id}`, `ERROR`);
          return;
        }
        await this.room.callRoom('setPlayerAdmin', id, false);
      }
    }
  }

  onCommand_clearbans() {
    return {
      description: 'Clears all the bans.',
      run: async () => {
        await this.room.callRoom('clearBans');
      }
    }
  }

  onCommand_plugins() {
    return {
      description: 'Prints available plugins.',
      run: async () => {
        let plugins = await this.room.getPlugins();
        let pluginList = [];
        for (let p of plugins) {
          const isEnabled = p.isEnabled ?
            `${colors.green(`enabled`)}` :
            `${colors.yellow(`disabled`)}`;
          pluginList.push(`${p.pluginSpec.name} (${isEnabled})`);
        }
        cprompt.print(pluginList.join(`\n`));
      }
    }
  }

  onCommand_plugin() {
    return {
      description: 'Prints detailed information about given plugin name.',
      args: ['name'],
      run: async (name) => {
        let plugin = await this.room.getPlugin(name);
        cprompt.print(this.pluginDataToString(plugin));
      }
    }
  }

  onCommand_enable() {
    return {
      description: 'Enables the plugin with given name.',
      args: ['name'],
      run: async (name) => {
        let pluginData = await this.room.getPlugin(name);
        if (!pluginData) {
          cprompt.print(`Invalid plugin name: ${name}`, `ERROR`);
          return;
        }
        await this.room.enablePlugin(name);
      }
    }
  }

  onCommand_disable() {
    return {
      description: 'Disables the plugin with given name.',
      args: ['name'],
      run: async (name) => {
        let pluginData = await this.room.getPlugin(name);
        if (!pluginData) {
          cprompt.print(`Invalid plugin name: ${name}`, `ERROR`);
          return;
        }
        let depPlugins = await this.room.getPluginsThatDependOn(name);
        if (depPlugins || depPlugins.length > 0) {
          await this.room.disablePlugin(depPlugins.map((p) => p.pluginSpec.name));
        }
        let success = await this.room.disablePlugin(name);
        pluginData = await this.room.getPlugin(name);

        if (!success) {
          cprompt.print(`Could not disable ${name}`, `ERROR`);
        }
      }
    }
  }

  onCommand_dependsof() {
    return {
      description: 'Prints the plugins that depend of given plugin.',
      args: ['name'],
      run: async (name) => {
        let plugins = await this.room.getPluginsThatDependOn(name);
        if (!plugins || plugins.length < 1) {
          cprompt.print(`Plugin ${name} has no plugins that depend on it.`);
          return;
        }
        let result = [`Plugins that depend on ${name}:`];
        for (let p of plugins) {
          result.push(`${p.pluginSpec.name}`);
        }
        cprompt.print(result.join(`\n`));
      }
    }
  }

  onCommand_eval() {
    return {
      description: 'Evaluates given JavaScript in browser and prints result.',
      args: ['js'],
      run: async (js) => {
        let result = await this.room.eval(js);
        cprompt.print(result);
      }
    }
  }

  onCommand_q() {
    return {
      description: 'Exits the program.',
      run: async () => {
        await this.haxroomie.closeBrowser();
        process.exit(0);
      }
    }
  }
}
module.exports = Commands;