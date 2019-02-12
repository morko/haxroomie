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
  INVALID_COMMAND: colors.red
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
    if (!opt.actionHandler) {
      throw new Error(`Missing required argument: opt.actionHandler`);
    }
    this.cmd = opt.commands;
    this.actionHandler = opt.actionHandler;
    
    this.maxTypeLength = 16;

    this.promptString = `> `;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.on(`line`, (result) => this.onNewLine(result));

    this.registerActionListeners(
      this.actionHandler,
      (t, m) => this.send(t, m)
    );

    this.roomLink = null;

  }

  registerActionListeners(actionHandler, send) {
    actionHandler.on(`open-room-start`, () => send(`OPEN_ROOM_START`));
    actionHandler.on(`open-room-stop`, l => {
      this.roomLink = l;
      send(`OPEN_ROOM_STOP`, l);
    });
    actionHandler.on(`open-room-error`, e => send(`OPEN_ROOM_START`, e));
    actionHandler.on(`browser-error`, e => send(`BROWSER_ERROR`, e));
    actionHandler.on(`player-chat`, m => send(`PLAYER_CHAT`, m));
    actionHandler.on(`player-join`, m => send(`PLAYER_JOIN`, m));
    actionHandler.on(`player-leave`, m => send(`PLAYER_LEAVE`, m));
    actionHandler.on(`player-kicked`, m => send(`PLAYER_KICKED`, m));
    actionHandler.on(`player-banned`, m => send(`PLAYER_BANNED`, m));
    actionHandler.on(`admin-changed`, m => send(`ADMIN_CHANGED`, m));
  }

  send(type, msg) {

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    msg = this.createMessage(type, msg);
    this.rl.write(`# ${msg}\0\n`);
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
    msg = msg.replace(/\n/g, `\n# `);
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
        this.rl.write(`# ${this.roomLink}\0\n`);

      } else if (line.startsWith(`chat `)) {
        this.cmd.sendChat(line.slice(5));

      } else if (line.startsWith(`players`)) {
        let playerList = await this.cmd.getPlayerList();
        let players = `${playerList.length - 1}`;
        if (playerList.length > 1) players += `\n`;
				for(let i = 0; i < playerList.length; i++) {
          if (!playerList[i]) continue;
          players += `${playerList[i].name} | admin: ${playerList[i].admin}`;
          if (i !== playerList.length - 1) players += `\n`;
				}
				this.send(`PLAYERS`, players);

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

      } else if (line === `q`) {
        process.exit(0);

      } else if (!line.startsWith(`# `)) {
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
    this.rl.write(`# Commands: \n`);
    this.rl.write(`# link:      get the room link\n`);
    this.rl.write(`# chat:      sends a chat message to the room\n`);
    this.rl.write(`# players:   get a list of players in the room\n`);
    this.rl.write(`# kick:      kicks a player with given id from the room\n`);
    this.rl.write(`# ban:       bans a player with given id from the room\n`);
    this.rl.write(`# admin:     gives admin to a player with given id\n`);
    this.rl.write(`# unadmin:   removes admin from a player with given id\n`);
    this.rl.write(`# clearbans: clears all the bans id\n`);
    this.rl.write(`# q:         exits the program\0\n`);

  }
}