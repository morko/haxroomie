const colors = require(`colors/safe`);
const readline = require(`readline`);
const CommandHandler = require(`./CommandHandler`);
const logger = require(`../logger`);

const COLORS = {
  'LOADED FILE': colors.yellow,
  'STARTING ROOM': colors.green,
  'ROOM STARTED': colors.green.bold,
  'CHAT': colors.white.bold,
  'PLAYER JOINED': colors.green,
  'PLAYER LEFT': colors.cyan,
  'PLAYER KICKED': colors.yellow,
  'PLAYER BANNED': colors.red,
  'ADMIN CHANGED': colors.purple,
  'PLAYERS': colors.green,
  'TAB CLOSED': colors.purple,
  'ERROR': colors.red,
  'INVALID COMMAND': colors.red,
  'PLUGIN LOADED': colors.green,
  'PLUGIN REMOVED': colors.cyan,
  'PLUGIN ENABLED': colors.green,
  'PLUGIN DISABLED': colors.cyan
}

/**
 * Command prompt for displaying messages in terminal.
 */
module.exports = class CommandPrompt {
  constructor(opt) {
    if (!opt) {
      throw new Error(`Missing required argument: opt`);
    }
    if (!opt.haxroomie) {
      throw new Error(`Missing required argument: opt.haxroomie`);
    }
    if (!opt.openRoom) {
      throw new Error(`Missing required argument: opt.openRoom`);
    }
    if (!opt.closeRoom) {
      throw new Error(`Missing required argument: opt.closeRoom`);
    }
    if (!opt.reloadConfig) {
      throw new Error(`Missing required argument: opt.reloadConfig`);
    }

    this.haxroomie = opt.haxroomie;
    this.openRoom = opt.openRoom;
    this.closeRoom = opt.closeRoom;
    this.reloadConfig = opt.reloadConfig;

    this.currentRoom = null;
    this.cmd = null;
    
    this.maxTypeLength = 20;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.onNewLine = this.onNewLine.bind(this);
    this.onPluginLoaded = this.onPluginLoaded.bind(this);
    this.onPluginRemoved = this.onPluginRemoved.bind(this);
    this.onPluginEnabled = this.onPluginEnabled.bind(this);
    this.onPluginDisabled = this.onPluginDisabled.bind(this);
    this.onRoomEvent = this.onRoomEvent.bind(this);
    this.addPersistentListeners();
  }


  setRoom(room) {
    if (this.currentRoom) this.removeListeners(this.currentRoom);
    this.addListeners(room);
    this.cmd = this.createCommandHandler(room);
    this.rl.setPrompt(`${room.id}> `)
    this.currentRoom = room;
    this.createPrompt();
  }

  /**
   * @private
   */
  createCommandHandler(room) {
    return new CommandHandler({
      haxroomie: this.haxroomie,
      room: room,
      print: (msg, type) => this.print(msg, type),
      question: (question) => this.question(question),
      setRoom: (room) => this.setRoom(room),
      openRoom: this.openRoom,
      closeRoom: this.closeRoom,
      reloadConfig: this.reloadConfig
    });
  }

  /**
   * Listeners for events that will be displayed whatever the current room is
   * set to.
   * @private
   */
  addPersistentListeners() {
    this.rl.on(`line`, this.onNewLine);
    for (let [id, room] of this.haxroomie.rooms) {
      room.on(`open-room-start`, (e) => this.onOpenRoomStart(id, room, e));
      room.on(`open-room-stop`, (e) => this.onOpenRoomStop(id, room, e));
      room.on(`open-room-error`, (e) => this.onOpenRoomError(id, room, e));
      room.on(`page-closed`, (e) => this.onPageClosed(id, room, e));
      room.on(`page-crash`, (e) => this.onPageCrashed(id, room, e));
      room.on(`page-error`, (e) => this.onPageError(id, room, e));
    }
  }

  removePersistentListeners() {
    this.rl.removeListener(`line`, this.onNewLine);
    for (let room of this.haxroomie.rooms.values()) {
      room.removeAllListeners(`open-room-start`);
      room.removeAllListeners(`open-room-stop`);
      room.removeAllListeners(`open-room-error`);
      room.removeAllListeners(`page-closed`);
      room.removeAllListeners(`page-crash`);
      room.removeAllListeners(`page-error`);
    }
  }

  addListeners(room) {
    room.on(`plugin-loaded`, this.onPluginLoaded);
    room.on(`plugin-removed`, this.onPluginRemoved);
    room.on(`plugin-enabled`, this.onPluginEnabled);
    room.on(`plugin-disabled`, this.onPluginDisabled);
    room.on('room-event', this.onRoomEvent);
  }

  removeListeners(room) {
    room.removeListener(`plugin-loaded`, this.onPluginLoaded);
    room.removeListener(`plugin-removed`, this.onPluginRemoved);
    room.removeListener(`plugin-enabled`, this.onPluginEnabled);
    room.removeListener(`plugin-disabled`, this.onPluginDisabled);
    room.removeListener('room-event', this.onRoomEvent);
  }

  onOpenRoomStart(id, room, eventArgs) {
    this.print(id, `STARTING ROOM`);
  }

  onOpenRoomStop(id, room, eventArgs) {
    this.print(`${id} - ${room.roomInfo.roomLink}`, `ROOM STARTED`);
  }

  onOpenRoomError(id, room, eventArgs) {
    this.print(`Could not start room: ${id}`, `ERROR`);
    this.print(eventArgs);
  }

  onPageClosed(id, room, eventArgs) {
    this.print(`${id}`, `TAB CLOSED`);
  }

  onPageCrashed(id, room, eventArgs) {
    this.print(`Page crashed: ${id}`, `ERROR`);
  }

  onPageError(id, room, eventArgs) {
    this.print(`Page error: ${id}`, `ERROR`);
  }

  onPluginLoaded(pluginData) {
    this.print(`${pluginData.pluginSpec.name}`, `PLUGIN LOADED`);
  }

  onPluginRemoved(pluginData) {
    this.print(`${pluginData.pluginSpec.name}`, `PLUGIN REMOVED`);
  }

  onPluginEnabled(pluginData) {
    this.print(`${pluginData.pluginSpec.name}`, `PLUGIN ENABLED`);
  }

  onPluginDisabled(pluginData) {
    this.print(`${pluginData.pluginSpec.name}`, `PLUGIN DISABLED`);
  }

  onRoomEvent(roomEventArgs) {
    let handlerName = roomEventArgs.handlerName;
    let args = roomEventArgs.args || [];
    if (typeof this[handlerName] === 'function') {
      this[handlerName](...args);
    }
  }

  onPlayerChat(player, message) {
    this.print(`${player.name}> ${message}`, `CHAT`);
  }

  onPlayerJoin(player) {
    this.print(`${player.name}`, `PLAYER JOINED`);
  }

  onPlayerLeave(player) {
    this.print(`${player.name}`, `PLAYER LEFT`);
  }

  onPlayerKicked(kickedPlayer, reason, ban, byPlayer) {
    if (ban) {
      this.print(
        `${kickedPlayer.name} banned by ${byPlayer.name} | reason: ${reason}`,
        `PLAYER BANNED`
      );    
    } else {
      this.print(
        `${kickedPlayer.name} kicked by ${byPlayer.name} | reason: ${reason}`,
        `PLAYER KICKED`
      );    
    }
  }

  onPlayerAdminChange(changedPlayer, byPlayer) {
    this.print(
      `${changedPlayer.name} by ${byPlayer.name} `
      + `| admin: ${changedPlayer.admin}`,
      `ADMIN CHANGED`
    );
  }

  question(question, cb) {
    this.rl.question(question, cb);
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
      let result = await this.cmd.onNewLine(line);
    } catch (err) {
      this.print(err.message, `ERROR`);
    }
    this.createPrompt();
  }

}