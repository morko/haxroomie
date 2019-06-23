const colors = require('colors/safe');
const CommandHandler = require('./CommandHandler');

class Commands extends CommandHandler {

  constructor(opt) {

    opt = opt || {};
    if (!opt.room) new TypeError('invalid arguments');
    if (!opt.haxroomie) new TypeError('invalid arguments');
    if (!opt.print) new TypeError('invalid arguments');
    if (!opt.setRoom) new TypeError('invalid arguments');
    if (!opt.openRoom) new TypeError('invalid arguments');
    if (!opt.closeRoom) new TypeError('invalid arguments');
    if (!opt.config) new TypeError('invalid arguments');

    super(opt);

    this.room = opt.room;
    this.haxroomie = opt.haxroomie;
    this.print = opt.print;
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
    const isEnabled = p.isEnabled
      ? `${colors.green(`enabled`)}`
      : `${colors.yellow(`disabled`)}`;

    let string = 
      `${p.pluginSpec.name} (${isEnabled}):\n`
      + `  id: ${p.id}\n`
      + `  name: ${p.pluginSpec.name}\n`
      + `  author: ${p.pluginSpec.author}\n`
      + `  version: ${p.pluginSpec.version}\n`
      + `  dependencies: ${p.pluginSpec.dependencies}\n`
      + `  order: ${JSON.stringify(p.pluginSpec.order)}\n`
      + `  config: ${JSON.stringify(p.pluginSpec.config)}`;

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

        this.print(help.join(`\n`));

      }
    }
  }

  onCommand_link() {
    return {
      description: 'Get the room link.',
      run: () => {
        if (!this.room.running) {
          this.print(`Room is not running!`);
          return;
        }
        this.print(this.room.roomInfo.roomLink);
      }
    }
  }

  onCommand_open() {
    return {
      description: 'Opens room with given id.',
      alias: ['start'],
      args: ['id'],
      run: (id) => {
        return this.openRoom(id);
      }
    }
  }

  onCommand_close() {
    return {
      description: 'Closes room with given id.',
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

        for (let [roomId, modifiedProperties] of modifiedRooms) {
          // Remove removed rooms.
          if (modifiedProperties === null) {
            this.haxroomie.removeRoom(roomId);
            continue;
          }

          // Add new rooms.
          if (!this.haxroomie.hasRoom(roomId)) {
            await this.haxroomie.addRoom(roomId);
            let roomConfig = this.config.getRoom(roomId);
            if (roomConfig.autoStart) {
              await this.openRoom(roomId)
            }
            continue;
          }

          // Restart running rooms that were modified.
          let room = this.haxroomie.getRoom(roomId);
          if (room.running) {
            await this.openRoom(roomId);
          }
        }
      }
    }
  }
  
  onCommand_rooms() {
    return {
      description: 'Prints available rooms.',
      run: async () => {
        let rooms = this.haxroomie.getRooms();
        rooms = await Promise.all(rooms.map(async (r) => {
          let isRunning = r.running
            ? colors.green('running')
            : colors.yellow('stopped');
          let id = colors.cyan(r.id);
          if (!r.running) return `${id} - ${isRunning}`;

          let roomLink = r.roomInfo.roomLink;
          let maxPlayers = r.roomInfo.maxPlayers;
          let playerList = await r.callRoom('getPlayerList');
          let amountOfPlayers = `players ${playerList.length - 1}/${maxPlayers}`;
          return `${id} - ${isRunning} - ${amountOfPlayers} - ${roomLink}`;
        }));
        this.print(rooms.join(`\n`));
      }
    }
  }

  onCommand_setroom() {
    return {
      description: 'Selects which room to control.',
      args: ['id'],
      run: (id) => {
        let room = this.haxroomie.getRoom(id);
        if (!room) {
          this.print(`Invalid room id`, `ERROR`);
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
        let players = [`Amount of players: ${playerList.length}`];
      
        for(let player of playerList) {
          if (!player) continue;
          let playerString = `${player.name} | id: ${player.id}`
          if (player.admin) {
            playerString += ' | ' + colors.green('admin');
          }
          players.push(playerString);
        }
        this.print(players.join(`\n`), `PLAYERS`);
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
          this.print(`no player with id: ${id}`, `ERROR`);
          return;
        }
        await this.room.callRoom('kickPlayer', id, 'Bye!', false);
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
          this.print(`no player with id: ${id}`, `ERROR`);
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
          this.print('No banned players.');
          return;
        }
        bannedPlayers = bannedPlayers.map((p) =>`id:${p.id} - ${p.name}`);
        this.print(bannedPlayers.join('\n'));
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
          this.print(`no player with id: ${id}`, `ERROR`);
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
          this.print(`no player with id: ${id}`, `ERROR`);
          return;
        }
        await this.room.callRoom('setPlayerAdmin', id, false);
      }
    }
  }

  onCommand_clearbans() {
    return {
      description: 'Clears all the bans.',
      run: async() => {
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
          const isEnabled = p.isEnabled
            ? `${colors.green(`enabled`)}`
            : `${colors.yellow(`disabled`)}`;
          pluginList.push(`${p.pluginSpec.name} (${isEnabled})`);
        }
        this.print(pluginList.join(`\n`));
      }
    }
  }

  onCommand_plugin() {
    return {
      description: 'Prints detailed information about given plugin name.',
      args: ['name'],
      run: async (name) => {
        let plugin = await this.room.getPlugin(name);
        this.print(this.pluginDataToString(plugin));
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
          this.print(`Invalid plugin name: ${name}`, `ERROR`);
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
          this.print(`Invalid plugin name: ${name}`, `ERROR`);
          return;
        }
        let depPlugins = await this.room.getPluginsThatDependOn(name);
        if (depPlugins || depPlugins.length > 0) {
          await this.room.disablePlugin(depPlugins.map((p) => p.pluginSpec.name));
        }
        let success = await this.room.disablePlugin(name);
        pluginData = await this.room.getPlugin(name);
        
        if (!success) {
          this.print(`Could not disable ${name}`, `ERROR`);
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
          this.print(`Plugin ${name} has no plugins that depend on it.`);
          return;
        }
        let result = [`Plugins that depend on ${name}:`];
        for (let p of plugins) {
          result.push(`${p.pluginSpec.name}`);
        }
        this.print(result.join(`\n`));
      }
    }
  }

  onCommand_eval() {
    return {
      description: 'Evaluates given JavaScript in browser and prints result.',
      args: ['js'],
      run: async (js) => {
        let result = await this.room.eval(js);
        this.print(result);
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