const colors = require(`colors/safe`);
const readline = require(`readline`);
const CommandHandler = require(`./CommandHandler`);
const RoomEventHandler = require(`./RoomEventHandler`);

const COLORS = {
  'LOADED FILE': colors.yellow,
  'STARTING ROOM': colors.green,
  'ROOM STARTED': colors.green.bold,
  'CHAT': colors.white.bold,
  'PLAYER JOINED': colors.green,
  'PLAYER LEFT': colors.cyan,
  'PLAYER KICKED': colors.yellow.bold,
  'GAME PAUSED': colors.yellow,
  'GAME UNPAUSED': colors.yellow,
  'GAME STOPPED': colors.yellow,
  'GAME STARTED': colors.yellow,
  'PLAYER BANNED': colors.red,
  'ADMIN': colors.green,
  'UNADMIN': colors.cyan,
  'PLAYERS': colors.green,
  'TAB CLOSED': colors.red,
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
    this.roomEventHandler = null;
    this.cmd = null;
    
    this.maxTypeLength = 20;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.onNewLine = this.onNewLine.bind(this);
    this.print = this.print.bind(this);

    this.addListeners();
  }


  setRoom(room) {
    if (this.currentRoom) this.removeListeners(this.currentRoom);
    if (this.roomEventHandler) this.roomEventHandler.removeAllListeners('print');
    this.roomEventHandler = new RoomEventHandler({room});
    this.roomEventHandler.on('print', this.print);
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
  addListeners() {
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

  removeListeners() {
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