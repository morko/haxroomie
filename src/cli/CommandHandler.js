const colors = require(`colors/safe`);

class CommandHandler {

  constructor(opt) {

    opt = opt || {};
    if (!opt.room) new TypeError('invalid arguments');
    if (!opt.haxroomie) new TypeError('invalid arguments');
    if (!opt.print) new TypeError('invalid arguments');
    if (!opt.question) new TypeError('invalid arguments');
    if (!opt.setRoom) new TypeError('invalid arguments');
    if (!opt.openRoom) new TypeError('invalid arguments');
    if (!opt.closeRoom) new TypeError('invalid arguments');
    if (!opt.reloadConfig) new TypeError('invalid arguments');

    this.room = opt.room;
    this.haxroomie = opt.haxroomie;
    this.print = opt.print;
    this.question = opt.question;
    this.setRoom = opt.setRoom;
    this.openRoom = opt.openRoom;
    this.closeRoom = opt.closeRoom;
    this.reloadConfig = opt.reloadConfig;
  }

  async onNewLine(line) {
    let cmd = this.parseLine(line);
    if (!cmd.command) return;
    return this.execCommand(cmd);
  }

  parseLine(line) {
    let command = line.split(/\s/)[0];
    let arg = line.split(/\s/).slice(1).join(' ');
    return {
      command,
      arg
    };
  }

  async execCommand(cmd) {
    if (typeof this[cmd.command] !== `function`) {
      this.print(`No such command. Type help for commands.`, `ERROR`);
      return;
    }
    return this[cmd.command](cmd.arg);
  }

  /**
   * Gets an array of available rooms.
   */
  getRooms() {
    let rooms = [];
    for (let [id, room] of this.haxroomie.rooms) {
      rooms.push(room);
    }
    return rooms;
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

  help() {
    let help = `${colors.yellow(`COMMANDS`)}\n`
      + `${colors.cyan(`link`)}:       get the room link\n`
      + `${colors.cyan(`rooms`)}:      gets a list of available rooms\n`
      + `${colors.cyan(`setroom`)}:    select which room to control\n`
      + `${colors.cyan(`open`)}:       opens room with given id\n`
      + `${colors.cyan(`close`)}:      closes room with given id\n`
      + `${colors.cyan(`reload`)}:     reloads the config\n`
      + `${colors.cyan(`chat`)}:       sends a chat message to the room\n`
      + `${colors.cyan(`players`)}:    get a list of players in the room\n`
      + `${colors.cyan(`kick`)}:       kicks a player with given id from the room\n`
      + `${colors.cyan(`ban`)}:        bans a player with given id from the room\n`
      + `${colors.cyan(`admin`)}:      gives admin to a player with given id\n`
      + `${colors.cyan(`unadmin`)}:    removes admin from a player with given id\n`
      + `${colors.cyan(`clearbans`)}:  clears all the bans\n`
      + `${colors.cyan(`plugins`)}:    gets a list of plugins\n`
      + `${colors.cyan(`plugin`)}:     get detailed information about given plugin name\n`
      + `${colors.cyan(`enable`)}:     enables the plugin with given name\n`
      + `${colors.cyan(`disable`)}:    disables the plugin with given name\n`
      + `${colors.cyan(`eval`)}:       evaluate given JavaScript in browser\n`
      + `${colors.cyan(`q`)}:          exits the program`;
    this.print(help);
  }

  link() {
    if (!this.room.running) {
      this.print(`Currently selected room is not running!`);
      return;
    }
    this.print(this.room.roomInfo.roomLink);
  }

  async open(id) {
    if (typeof id === 'undefined') {
      this.print(`Usage: open [room_id]`, `ERROR`);
      return;
    }
    return this.openRoom(id);
  }

  async start(id) {
    return this.open(id);
  }

  async close(id) {
    if (typeof id === 'undefined') {
      this.print(`Usage: close [room_id]`, `ERROR`);
      return;
    }
    return this.closeRoom(id);
  }

  async stop(id) {
    return this.close(id);
  }

  async reload() {
    return this.reloadConfig();
  }
  
  async rooms() {
    let rooms = this.getRooms();
    rooms = await Promise.all(rooms.map(async (r) => {
      let isRunning = r.running
        ? colors.green('running')
        : colors.yellow('stopped');
      let id = colors.cyan(r.id);
      if (!isRunning) return `${id} - ${isRunning}`;

      let roomLink = r.roomInfo.roomLink;
      let maxPlayers = r.roomInfo.maxPlayers;
      let playerList = await this.room.callRoom('getPlayerList');
      let amountOfPlayers = `players ${playerList.length - 1}/${maxPlayers}`;
      return `${id} - ${isRunning} - ${amountOfPlayers} - ${roomLink}`;
    }));
    this.print(rooms.join(`\n`));
  }

  async setroom(id) {
    if (typeof id === 'undefined') {
      this.print(`Usage: setroom [room_id]`, `ERROR`);
      return;
    }
    let room = this.haxroomie.getRoom(id);
    if (!room) {
      this.print(`Invalid room id`, `ERROR`);
      return;
    }
    this.setRoom(room);
  }
  
  async chat(msg) {
    if (!msg && msg !== 0) return;
    await this.room.callRoom('sendChat', msg);
  }
  
  async players() {
    let playerList = await this.room.callRoom('getPlayerList');
    let players = [`Amount of players: ${playerList.length - 1}`];
  
    for(let player of playerList) {
      if (!player) continue;
      players.push(`${player.name} | id: ${player.id} | admin: ${player.admin}`);
    }
    this.print(players.join(`\n`), `PLAYERS`);
  }
  
  async kick(id) {
    if (!id && id !== 0) {
      this.print(`Usage: kick [player_id]`, `ERROR`);
      return;
    }
    let hasPlayer = await this.checkIfRoomHasPlayer(id);
    if (!hasPlayer) {
      this.print(`no player with id: ${id}`, `ERROR`);
      return;
    }
    await this.room.callRoom('kickPlayer', id, 'Bye!', false);
  }
  
  async ban(id) {
    if (!id && id !== 0) {
      this.print(`Usage: ban [player_id]`, `ERROR`);
      return;
    }
    let hasPlayer = await this.checkIfRoomHasPlayer(id);
    if (!hasPlayer) {
      this.print(`no player with id: ${id}`, `ERROR`);
      return;
    }
    await this.room.callRoom('kickPlayer', id, 'Bye!', true);
  
  }
  
  async admin(id) {
    if (!id && id !== 0) {
      this.print(`Usage: admin [player_id]`, `ERROR`);
      return;
    }
    let hasPlayer = await this.checkIfRoomHasPlayer(id);
    if (!hasPlayer) {
      this.print(`no player with id: ${id}`, `ERROR`);
      return;
    }
    await this.room.callRoom('setPlayerAdmin', id, true);
  }
  
  async unadmin(id) {
    if (!id && id !== 0) {
      this.print(`Usage: unadmin [player_id]`, `ERROR`);
      return;
    }
    let hasPlayer = await this.checkIfRoomHasPlayer(id);
    if (!hasPlayer) {
      this.print(`no player with id: ${id}`, `ERROR`);
      return;
    }
    await this.room.callRoom('setPlayerAdmin', id, false);
  }

  async clearbans() {
    await this.room.callRoom('clearBans');
  }

  async plugins() {
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

  async plugin(name) {
    if (typeof name === 'undefined') {
      this.print(`Usage: plugin [plugin_name]`, `ERROR`);
      return;
    }
    let plugin = await this.room.getPlugin(name);
    this.print(this.pluginDataToString(plugin));
  }

  async enable(name) {
    if (typeof name === 'undefined') {
      this.print(`Usage: enable [plugin_name]`, `ERROR`);
      return;
    }
    let pluginData = await this.room.getPlugin(name);
    if (!pluginData) {
      this.print(`Invalid plugin name: ${name}`, `ERROR`);
      return;
    }
    await this.room.enablePlugin(name);
  }

  async disable(name) {
    if (typeof name === 'undefined') {
      this.print(`Usage: disable [plugin_name]`, `ERROR`);
      return;
    }
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
    
    let pluginString = this.pluginDataToString(pluginData);
    
    if (!success) {
      this.print(`Could not disable ${name}`, `ERROR`);
    }
  }
  
  async dependsof(name) {
    if (typeof name === 'undefined') {
      this.print(`Usage: dependsof [plugin_name]`, `ERROR`);
      return;
    }
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

  async eval(js) {
    if (typeof js === 'undefined') {
      this.print(`Usage: eval [JavaScript]`, `ERROR`);
      return;
    }
    let result = await this.room.eval(js);
    this.print(result);
  }

  async q() {
    await this.haxroomie.closeBrowser();
    process.exit(0);
  }
}
module.exports = CommandHandler;