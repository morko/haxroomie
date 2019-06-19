const colors = require(`colors/safe`);
const readline = require(`readline`);
const Commands = require(`./Commands`);
const RoomEventHandler = require(`./RoomEventHandler`);
const logger = require('../logger');

const COLORS = {
  'STARTING ROOM': colors.green,
  'ROOM STARTED': colors.green.bold,
  'CHAT': colors.white.bold,
  'PLAYER JOINED': colors.green,
  'PLAYER LEFT': colors.cyan,
  'PLAYER KICKED': colors.yellow.bold,
  'GAME PAUSED': colors.cyan,
  'GAME UNPAUSED': colors.cyan,
  'GAME STOPPED': colors.cyan,
  'GAME STARTED': colors.cyan,
  'PLAYER BANNED': colors.red,
  'ADMIN': colors.yellow,
  'UNADMIN': colors.yellow,
  'PLAYERS': colors.green,
  'TAB CLOSED': colors.red,
  'ERROR': colors.red.bold,
  'INVALID COMMAND': colors.red,
  'PLUGINS LOADED': colors.green,
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
    if (!opt.config) {
      throw new Error(`Missing required argument: opt.config`);
    }

    this.haxroomie = opt.haxroomie;
    this.openRoom = opt.openRoom;
    this.closeRoom = opt.closeRoom;
    this.config = opt.config;

    this.currentRoom = null;
    this.roomEventHandler = null;
    this.cmd = null;
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.rl.on(`line`, this.onNewLine.bind(this));

    for (let room of this.haxroomie.rooms.values()) {
      this.addRoomListeners(room);
    }
    this.haxroomie.on('room-added', (room) => this.addRoomListeners(room));
    this.haxroomie.on('room-removed', (room) => this.removeRoomListeners(room));
  }


  setRoom(room) {
    if (this.roomEventHandler) this.roomEventHandler.removeAllListeners('print');
    this.roomEventHandler = new RoomEventHandler({room});
    this.roomEventHandler.on('print', (msg, type) => this.print(msg, type));
    this.cmd = this.createCommands(room);
    this.rl.setPrompt(`${room.id}> `)
    this.currentRoom = room;
    this.createPrompt();
  }

  /**
   * @private
   */
  createCommands(room) {
    return new Commands({
      haxroomie: this.haxroomie,
      room: room,
      config: this.config,
      print: (msg, type) => this.print(msg, type),
      setRoom: (room) => this.setRoom(room),
      openRoom: this.openRoom,
      closeRoom: this.closeRoom
    });
  }

  /**
   * Listeners for events that will be displayed whatever the current room is
   * set to.
   * @private
   */
  addRoomListeners(room) {
    room.on(`open-room-start`, (e) => this.onOpenRoomStart(room, e));
    room.on(`open-room-stop`, (e) => this.onOpenRoomStop(room, e));
    room.on(`open-room-error`, (e) => this.onOpenRoomError(room, e));
    room.on(`page-closed`, (e) => this.onPageClosed(room, e));
    room.on(`page-crash`, (e) => this.onPageCrashed(room, e));
    room.on(`page-error`, (e) => this.onPageError(room, e));
  }

  /**
   * Removes the listeners that the `addRoomListeners` function has set.
   * @private
   */
  removeRoomListeners(room) {
    room.removeAllListeners(`open-room-start`);
    room.removeAllListeners(`open-room-stop`);
    room.removeAllListeners(`open-room-error`);
    room.removeAllListeners(`page-closed`);
    room.removeAllListeners(`page-crash`);
    room.removeAllListeners(`page-error`);
  }

  onOpenRoomStart(room, eventArgs) {
    this.print(`${colors.cyan(room.id)}`, `STARTING ROOM`);
  }

  onOpenRoomStop(room, eventArgs) {
    this.print(
      `${colors.cyan(room.id)} - ${room.roomInfo.roomLink}`,
      `ROOM STARTED`
    );
    this.print(`for ${colors.cyan(room.id)}`, 'PLUGINS LOADED');
    let cmd = this.createCommands(room);
    cmd.execute('plugins');
  }

  onOpenRoomError(room, eventArgs) {
    this.print(`Could not start room: ${room.id}`, `ERROR`);
    this.print(eventArgs);
  }

  onPageClosed(room, eventArgs) {
    this.print(`${room.id}`, `TAB CLOSED`);
  }

  onPageCrashed(room, eventArgs) {
    this.print(`Page crashed: ${room.id}`, `ERROR`);
  }

  onPageError(room, eventArgs) {
    this.print(`Page error: ${room.id}`, `ERROR`);
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
    let coloredType = `[${type}]`;
    if(COLORS[type]) coloredType = COLORS[type](type);
    let fullMsg = `${coloredType}`;
    if (!msg) return fullMsg;
    if (typeof msg !== `string`) {
      throw new Error(`Msg has to be typeof string`);
    }
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
      await this.cmd.execute(line);
    } catch (err) {
      logger.error(`Could not execute: ${line}`);
      logger.error(err.stack);
    }
    this.createPrompt();
  }

}