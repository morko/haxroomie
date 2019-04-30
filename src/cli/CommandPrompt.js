const colors = require(`colors/safe`);
const readline = require(`readline`);

const COLORS = {
  LOAD_ROOM_SCRIPT: colors.yellow,
  LOAD_PLUGIN_CONFIG: colors.yellow,
  OPEN_ROOM_START: colors.green,
  OPEN_ROOM_STOP: colors.green.bold,
  OPEN_ROOM_ERROR: colors.red.bold,
  PLAYER_CHAT: colors.white.bold,
  PLAYER_JOIN: colors.green,
  PLAYER_LEAVE: colors.cyan,
  PLAYER_KICKED: colors.yellow,
  PLAYER_BANNED: colors.red,
  PLAYERS: colors.green,
  ERROR: colors.red,
  PAGE_ERROR: colors.red,
  INVALID_COMMAND: colors.red,
  PLUGIN_ENABLED: colors.green,
  PLUGIN_NOT_ENABLED: colors.red,
  PLUGIN_DISABLED: colors.cyan,
  PLUGIN_NOT_DISABLED: colors.red,
  SESSION_CLOSED: colors.green,
  SESSION_ERROR: colors.red
}

/**
 * Command prompt for displaying messages in terminal.
 */
module.exports = class CommandPrompt {
  constructor(opt) {
    if (!opt) {
      throw new Error(`Missing required argument: opt`);
    }
    if (!opt.commands) {
      throw new Error(`Missing required argument: opt.commands`);
    }
    if (!opt.messageHandler) {
      throw new Error(`Missing required argument: opt.messageHandler`);
    }
    this.cmd = opt.commands;
    this.messageHandler = opt.messageHandler;
    
    this.maxTypeLength = 20;

    this.promptString = `> `;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.on(`line`, (result) => this.onNewLine(result));

    this.registerEventListeners(
      this.messageHandler,
      (msg, type) => this.print(msg, type)
    );

    this.roomLink = null;

  }

  registerEventListeners(messageHandler, print) {
    messageHandler.on(`open-room-start`, () => print(`Starting the room`, `OPEN_ROOM_START`));
    messageHandler.on(`open-room-stop`, roomLink => {
      this.roomLink = roomLink;
      print(roomLink, `OPEN_ROOM_STOP`);
    });
    messageHandler.on(`open-room-error`, e => print(e.stack, `OPEN_ROOM_ERROR`));
    messageHandler.on(`page-error`, e => print(e.stack, `PAGE_ERROR`));
    messageHandler.on(`player-chat`, m => print(m, `PLAYER_CHAT`));
    messageHandler.on(`player-join`, m => print(m, `PLAYER_JOIN`));
    messageHandler.on(`player-leave`, m => print(m, `PLAYER_LEAVE`));
    messageHandler.on(`player-kicked`, m => print(m, `PLAYER_KICKED`));
    messageHandler.on(`player-banned`, m => print(m, `PLAYER_BANNED`));
    messageHandler.on(`admin-changed`, m => print(m, `ADMIN_CHANGED`));
    messageHandler.on(`session-closed`, () => print(``, `SESSION_CLOSED`));
    messageHandler.on(`session-error`, e => print(e.stack, `SESSION_ERROR`));  
  }

  print(msg, type) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    if (type) msg = this.createMessage(type, msg);
    console.log(msg);
    this.createPrompt();
  }

  createMessage(type, msg) {
    if (type.length > this.maxTypeLength) {
      throw new Error(`Type length too long.`);
    }
    let coloredType = type;
    if(COLORS[type]) coloredType = COLORS[type](type);
    let fullMsg = `${coloredType}`;
    if (!msg) return fullMsg;
    if (typeof msg !== `string`) {
      throw new Error(`Msg has to be typeof string`);
    }
    // indentation
    for (let i = 0; i < this.maxTypeLength - type.length; i++) fullMsg += ` `;
    fullMsg += ` ${msg}`;
    return fullMsg;
  }

  createPrompt() {
    this.rl.prompt(true);
  }

  /**
   * Receives the lines from process.stdout.
   * @param {string} input 
   */
  async onNewLine(line) {

    try {
      await this.handleCommand(line);
    } catch (err) {
      this.print(err.message, `ERROR`);
    }
  }

  async handleCommand(cmd) {
    if (cmd.startsWith(`help`)) {
      this.showHelp();

    } else if (cmd.startsWith(`link`)) {
      this.print(`${this.roomLink}`);

    } else if (cmd.startsWith(`chat `)) {
      await this.cmd.sendChat(cmd.slice(5));
      this.createPrompt();

    } else if (cmd.startsWith(`players`)) {
      await this.onPlayers();

    } else if (cmd.startsWith(`kick `)) {
      await this.cmd.kickPlayer(cmd.slice(5));

    } else if (cmd.startsWith(`ban `)) {
      await this.cmd.banPlayer(cmd.slice(4));

    } else if (cmd.startsWith(`clearbans`)) {
      await this.cmd.clearBans();

    } else if (cmd.startsWith(`admin `)) {
      await this.cmd.giveAdmin(cmd.slice(6));
      
    } else if (cmd.startsWith(`unadmin `)) {
      await this.cmd.removeAdmin(cmd.slice(8));

    } else if (cmd.startsWith(`plugins`)) {
      await this.onPlugins();

    } else if (cmd.startsWith(`plugin `)) {
      let plugin = await this.cmd.getPlugin(cmd.slice(7));
      this.print(this.pluginDataToString(plugin));

    } else if (cmd.startsWith(`dependsof `)) {
      await this.onGetDependentPlugins(cmd.slice(10));

    } else if (cmd.startsWith(`enable `)) {
      await this.onEnablePlugin(cmd.slice(7));

    } else if (cmd.startsWith(`disable `)) {
      await this.onDisablePlugin(cmd.slice(8));

    } else if (cmd.startsWith(`eval `)) {
      await this.onEval(cmd.slice(5));

    } else if (cmd === `q`) {
      process.exit(0);

    } else {
      this.print(`Type "help" for available commands`, `INVALID_COMMAND`);
    }
  }

  showHelp() {

    let help = `Commands:\n`
      + `link:       get the room link\n`
      + `chat:       sends a chat message to the room\n`
      + `players:    get a list of players in the room\n`
      + `kick:       kicks a player with given id from the room\n`
      + `ban:        bans a player with given id from the room\n`
      + `admin:      gives admin to a player with given id\n`
      + `unadmin:    removes admin from a player with given id\n`
      + `clearbans:  clears all the bans\n`
      + `plugins:    gets a list of plugins\n`
      + `plugin:     get detailed information about given plugin name\n`
      + `dependsof:  gets plugins that depend on given plugin name\n`
      + `enable:     enables the plugin with given name\n`
      + `disable:    disables the plugin with given name\n`
      + `eval:       evaluate given JavaScript in browser\n`
      + `q:          exits the program`;

    this.print(help);
  }


  async onPlayers() {
    let playerList = await this.cmd.getPlayerList();
    let players = [`Amount of players: ${playerList.length - 1}`];
  
    for(let player of playerList) {
      if (!player) continue;
      players.push(`${player.name} | id: ${player.id} | admin: ${player.admin}`);
    }
    this.print(players.join(`\n`), `PLAYERS`);
  }

  async onPlugins() {
    let plugins = await this.cmd.getPlugins();
    this.printPlugins(plugins);
  }

  printPlugins(plugins) {

    let ps = [];
    for (let p of plugins) {
      const isEnabled = p.isEnabled ? `enabled` : `disabled`;
      ps.push(`${p.pluginSpec.name} (${isEnabled})`);
    }
    this.print(ps.join(`\n`));
  }

  pluginDataToString(pluginData) {
    const p = pluginData;
    const isEnabled = p.isEnabled ? `enabled` : `disabled`;

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

  async onEnablePlugin(name) {
    let pluginData = await this.cmd.getPlugin(name);
    if (!pluginData) this.print( `No plugin with id ${name}!`, `ERROR`);
    let success = await this.cmd.enablePlugin(name);
    
    pluginData = await this.cmd.getPlugin(name);
    let pluginString = this.pluginDataToString(pluginData);
    
    if (success) {
      this.print(pluginString, `PLUGIN_ENABLED`);
    } else {
      this.print(pluginString, `PLUGIN_NOT_ENABLED`);
    }
  }

  async onDisablePlugin(name) {
    let pluginData = await this.cmd.getPlugin(name);
    if (!pluginData) this.print(`No plugin with id ${name}!`, `ERROR`);
    let success = await this.cmd.disablePlugin(name);
    
    pluginData = await this.cmd.getPlugin(name);
    let pluginString = this.pluginDataToString(pluginData);
    
    if (success) {
      this.print(pluginString, `PLUGIN_DISABLED`);
    } else {
      this.print(
        `Disable the plugins that depend on ${name} first.`,
        `PLUGIN_NOT_DISABLED`
      );
    }
  }

  async onGetDependentPlugins(name) {
    let plugins = await this.cmd.getDependentPlugins(name);
    if (!plugins || plugins.length < 1) {
      this.print(`Plugin ${name} has no dependent plugins.`);
      return;
    }
    let result = [`Plugins that depend on ${name}:`];
    for (let p of plugins) {
      result.push(`${p.pluginSpec.name}`);
    }
    this.print(result.join(`\n`));
  }

  async onEval(js) {
    let result = await this.cmd.eval(js);
    this.print(result);
  }
}