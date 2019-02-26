const colors = require(`colors/safe`);
const readline = require(`readline`);

const COLORS = {
  LOAD_CONFIG: colors.yellow,
  OPEN_ROOM_START: colors.green,
  OPEN_ROOM_STOP: colors.green.bold,
  OPEN_ROOM_ERROR: colors.red.bold,
  PLAYER_CHAT: colors.white.bold,
  PLAYER_JOIN: colors.green,
  PLAYER_LEAVE: colors.blue,
  PLAYER_KICKED: colors.yellow,
  PLAYER_BANNED: colors.red,
  PLAYERS: colors.green,
  ERROR: colors.red,
  BROWSER_ERROR: colors.red,
  INVALID_COMMAND: colors.red,
  PLUGIN_ENABLED: colors.green,
  PLUGIN_NOT_ENABLED: colors.red,
  PLUGIN_DISABLED: colors.cyan,
  PLUGIN_NOT_DISABLED: colors.red
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
    if (!opt.eventHandler) {
      throw new Error(`Missing required argument: opt.eventHandler`);
    }
    this.cmd = opt.commands;
    this.eventHandler = opt.eventHandler;
    
    this.maxTypeLength = 20;

    this.promptString = `> `;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.on(`line`, (result) => this.onNewLine(result));

    this.registerEventListeners(
      this.eventHandler,
      (t, m) => this.send(t, m)
    );

    this.roomLink = null;

  }

  registerEventListeners(eventHandler, send) {
    eventHandler.on(`open-room-start`, () => send(`OPEN_ROOM_START`));
    eventHandler.on(`open-room-stop`, l => {
      this.roomLink = l;
      send(`OPEN_ROOM_STOP`, l);
    });
    eventHandler.on(`open-room-error`, e => send(`OPEN_ROOM_START`, e));
    eventHandler.on(`browser-error`, e => send(`BROWSER_ERROR`, e));
    eventHandler.on(`player-chat`, m => send(`PLAYER_CHAT`, m));
    eventHandler.on(`player-join`, m => send(`PLAYER_JOIN`, m));
    eventHandler.on(`player-leave`, m => send(`PLAYER_LEAVE`, m));
    eventHandler.on(`player-kicked`, m => send(`PLAYER_KICKED`, m));
    eventHandler.on(`player-banned`, m => send(`PLAYER_BANNED`, m));
    eventHandler.on(`admin-changed`, m => send(`ADMIN_CHANGED`, m));
  }

  send(type, msg) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    msg = this.createMessage(type, msg);
    this.write(`${msg}`);
  }

  write(msg) {
    // modify the new lines so can detect when to insert prompt
    msg = msg.replace(/\n/g, `\n\0# `);
    this.rl.write(`\0# ${msg}\0\n`)
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
    this.rl.prompt(false);
  }

  /**
   * Receives the lines from process.stdout.
   * @param {string} input 
   */
  async onNewLine(line) {

    try {
      if (line.startsWith(`help`)) {
        this.showHelp();

      } else if (line.startsWith(`link`)) {
        this.write(`${this.roomLink}`);

      } else if (line.startsWith(`chat `)) {
        await this.cmd.sendChat(line.slice(5));

      } else if (line.startsWith(`players`)) {
        await this.onPlayers();

      } else if (line.startsWith(`kick `)) {
        await this.cmd.kickPlayer(line.slice(5));

      } else if (line.startsWith(`ban `)) {
        await this.cmd.banPlayer(line.slice(4));

      } else if (line.startsWith(`clearbans`)) {
        await this.cmd.clearBans();

      } else if (line.startsWith(`admin `)) {
        await this.cmd.giveAdmin(line.slice(6));
        
      } else if (line.startsWith(`unadmin `)) {
        await this.cmd.removeAdmin(line.slice(8));

      } else if (line.startsWith(`plugins`)) {
        await this.onPlugins();

      } else if (line.startsWith(`plugin `)) {
        let plugin = await this.cmd.getPlugin(line.slice(7));
        this.write(this.pluginDataToString(plugin));

      } else if (line.startsWith(`depplugins `)) {
        await this.onGetDependentPlugins(line.slice(11));

      } else if (line.startsWith(`enable `)) {
        await this.onEnablePlugin(line.slice(7));

      } else if (line.startsWith(`disable `)) {
        await this.onDisablePlugin(line.slice(8));

      } else if (line === `q`) {
        process.exit(0);

      } else if (!line.startsWith(`\0# `)) {
        this.send(`INVALID_COMMAND`, `Type "help" for available commands`);
      }
    } catch (err) {
      this.send(`ERROR`, err.message);
    }
    if (line.endsWith(`\0`)) {
      this.createPrompt();
    }
  }

  showHelp() {

    let help = 
      `Commands: 
      link:       get the room link
      chat:       sends a chat message to the room
      players:    get a list of players in the room
      kick:       kicks a player with given id from the room
      ban:        bans a player with given id from the room
      admin:      gives admin to a player with given id
      unadmin:    removes admin from a player with given id
      clearbans:  clears all the bans
      plugins:    gets a list of plugins
      plugin:     get detailed information about given plugin name
      depplugins: gets plugins that depend on given plugin name
      enable:     enables the plugin with given name
      disable:    disables the plugin with given name
      q:          exits the program`;

    this.write(help);
  }


  async onPlayers() {
    let playerList = await this.cmd.getPlayerList();
    let players = `Amount of players: ${playerList.length - 1}\n`;
  
    for(let player of playerList) {
      if (!player) continue;
      players += `${player.name} | admin: ${player.admin}\n`;
    }
    this.send(`PLAYERS`, players);
  }

  async onPlugins() {
    let plugins = await this.cmd.getPlugins();
    this.printPlugins(plugins);
  }

  printPlugins(plugins) {

    let pluginsString = '';
    for (let p of plugins) {
      const isEnabled = p.isEnabled ? 'enabled' : 'disabled';
      pluginsString += `${p.pluginSpec.name} (${isEnabled})\n`;
    }
    this.write(pluginsString);
  }

  pluginDataToString(pluginData) {
    const p = pluginData;
    const isEnabled = p.isEnabled ? 'enabled' : 'disabled';

    let string = 
      `${p.pluginSpec.name} (${isEnabled}): 
        id: ${p.id} 
        name: ${p.pluginSpec.name}
        author: ${p.pluginSpec.author}
        version: ${p.pluginSpec.version}
        dependencies: ${p.pluginSpec.dependencies}
        order: ${JSON.stringify(p.pluginSpec.order)}
        config: ${JSON.stringify(p.pluginSpec.config)}`;

    return string;
  }

  async onEnablePlugin(name) {
    let pluginData = await this.cmd.getPlugin(name);
    if (!pluginData) this.send('ERROR', `No plugin with id ${name}!`)
    let success = await this.cmd.enablePlugin(name);
    
    pluginData = await this.cmd.getPlugin(name);
    let pluginString = this.pluginDataToString(pluginData);
    
    if (success) {
      this.send('PLUGIN_ENABLED', pluginString);
    } else {
      this.send('PLUGIN_NOT_ENABLED', pluginString);
    }
  }

  async onDisablePlugin(name) {
    let pluginData = await this.cmd.getPlugin(name);
    if (!pluginData) this.send('ERROR', `No plugin with id ${name}!`)
    let success = await this.cmd.disablePlugin(name);
    
    pluginData = await this.cmd.getPlugin(name);
    let pluginString = this.pluginDataToString(pluginData);
    
    if (success) {
      this.send('PLUGIN_DISABLED', pluginString);
    } else {
      this.send(
        'PLUGIN_NOT_DISABLED', 
        `Disable the plugins that depend on ${name} first.`
      );
    }
  }

  async onGetDependentPlugins(name) {
    let plugins = await this.cmd.getDependentPlugins(name);
    if (!plugins || plugins.length < 1) {
      this.write(`Plugin ${name} has no dependent plugins.`);
      return;
    }
    let result = `Plugins that depend on ${name}:\n`;
    for (let p of plugins) {
      result += `${p.pluginSpec.name}\n`
    }
    this.write(result);
  }
}