const { createHaxroomie } = require('haxroomie-core');
const colors = require('colors/safe');

const { CommandManager, RoomContext } = require('./command');
const RoomEventHandler = require('./RoomEventHandler');
const Config = require('./Config');
const commandPrompt = require('./command-prompt');
const { logger } = require('haxroomie-core');

const loglevels = {
  error: 0,
  warn: 1,
  info: 2,
};

/**
 * Class for managing RoomController instances.
 */
class HRConsoleApp {
  constructor(opt) {
    opt = opt || {};

    if (!opt.config) throw new TypeError('invalid arguments');

    this.configPath = opt.config;
    this.userDataDir = opt.userDataDir;
    this.executablePath = opt.executablePath;
    this.noSandbox = opt.noSandbox;
    this.headless = Object.prototype.hasOwnProperty.call(opt, 'window')
      ? !opt.window
      : true;
    this.port = opt.port;
    this.timeout = opt.timeout || 30;
    this.loglevel =
      loglevels[opt.loglevel] !== undefined
        ? loglevels[opt.loglevel]
        : loglevels.warn;

    this.config = null;
    this.currentRoom = null;
    this.roomEventHandler = null;

    this.onStartupLog = this.onStartupLog.bind(this);
  }

  async start() {
    this.haxroomie = await createHaxroomie({
      userDataDir: this.userDataDir,
      executablePath: this.executablePath,
      noSandbox: this.noSandbox,
      headless: this.headless,
      port: this.port,
      timeout: this.timeout,
    });

    this.haxroomie.on('room-added', room => this.onNewRoom(room));
    this.haxroomie.on('room-removed', room => this.onRoomRemoved(room));

    this.config = new Config({
      configPath: this.configPath,
      haxroomie: this.haxroomie,
    });

    await this.createRooms();
    await this.setRoom(this.haxroomie.getFirstRoom());
    await this.autoStartRooms();
  }

  async stop() {
    return this.haxroomie.closeBrowser();
  }

  /**
   * Creates the rooms.
   */
  async createRooms() {
    const roomIds = this.config.getRoomIds();
    await Promise.all(
      roomIds.map(async roomId => {
        return this.createRoom(roomId);
      })
    );
  }

  /**
   * Factory method for creating a RoomController.
   */
  async createRoom(roomId) {
    const roomConfig = this.config.getRoomConfig(roomId);

    commandPrompt.print(`${colors.cyan(roomId)}`, 'ADDING ROOM');

    await this.haxroomie.addRoom(roomId, {
      hhmVersion: roomConfig.hhmVersion,
      hhm: roomConfig.hhm,
    });

    commandPrompt.print(`${colors.cyan(roomId)}`, 'ROOM ADDED');
  }

  /**
   * Opens all rooms that have autoStart: true in their config.
   */
  async autoStartRooms() {
    for (let id of this.haxroomie.rooms.keys()) {
      if (this.config.getRoomConfig(id).autoStart) {
        let roomInfo;
        try {
          roomInfo = await this.openRoom(id);
          if (!roomInfo) {
            commandPrompt.print(`Could not open room: ${colors.cyan(id)}`);
          }
        } catch (err) {
          commandPrompt.error(err);
        }
      }
    }
  }

  /**
   * Sets the room that user is controlling.
   * @param {RoomController} room - The room to control.
   */
  async setRoom(room) {
    if (this.roomEventHandler)
      this.roomEventHandler.removeAllListeners('print');
    this.roomEventHandler = new RoomEventHandler({ room });
    this.roomEventHandler.on('print', (msg, type) =>
      commandPrompt.print(msg, type)
    );
    commandPrompt.setPrompt(`${colors.cyan(room.id)}> `);
    commandPrompt.setCommandManager(await this.createCommandManager(room));
    this.currentRoom = room;
  }

  /**
   * @private
   */
  async createCommandManager(room) {
    const roomContext = new RoomContext({
      room: room,
      haxroomie: this.haxroomie,
      config: this.config,
      setRoom: room => this.setRoom(room),
      openRoom: id => this.openRoom(id),
      closeRoom: id => this.closeRoom(id),
      createRoom: id => this.createRoom(id),
    });

    const commandManager = new CommandManager({ roomContext });
    await commandManager.init();
    return commandManager;
  }
  logPrefix(room) {
    return `[${colors.cyan(room.id)}] [${new Date().toLocaleString()}]`;
  }

  /**
   * Called when a new room is added to haxroomie.
   * @private
   */
  onNewRoom(room) {
    room.on(`open-room-start`, (err, config) =>
      this.onOpenRoomStart(err, room, config)
    );
    room.on(`open-room-stop`, (err, roomInfo) =>
      this.onOpenRoomStop(err, room, roomInfo)
    );
    room.on(`close-room-start`, err => this.onCloseRoomStart(err, room));
    room.on(`close-room-stop`, err => this.onCloseRoomStop(err, room));
    room.on(`page-closed`, room => this.onPageClosed(room));
    room.on(`page-crash`, err => commandPrompt.error(err));
    room.on(`page-error`, err => commandPrompt.error(err));

    // Set listening for the log events only if we are not in development
    // mode, because it will log anything to stdout anyways.
    if (process.env.NODE_ENV !== 'development') {
      room.on(`error-logged`, msg => {
        commandPrompt.print(
          `${this.logPrefix(room)} ${msg}`,
          'BROWSER LOG ERROR'
        );
      });
      if (this.loglevel >= loglevels.warn) {
        room.on(`warning-logged`, msg => {
          commandPrompt.print(
            `${this.logPrefix(room)} ${msg}`,
            'BROWSER LOG WARN'
          );
        });
      }
      if (this.loglevel >= loglevels.info) {
        room.on(`info-logged`, msg => {
          commandPrompt.print(
            `${this.logPrefix(room)} ${msg}`,
            'BROWSER LOG INFO'
          );
        });
      }
    }
  }

  /**
   * Called when a room is removed from haxroomie
   * @private
   */
  onRoomRemoved(room) {
    room.removeAllListeners(`open-room-start`);
    room.removeAllListeners(`open-room-stop`);
    room.removeAllListeners(`close-room-start`);
    room.removeAllListeners(`close-room-stop`);
    room.removeAllListeners(`page-closed`);
    room.removeAllListeners(`page-crash`);
    room.removeAllListeners(`page-error`);
    room.removeAllListeners(`error-logged`);
    room.removeAllListeners(`warning-logged`);
    room.removeAllListeners(`info-logged`);
  }

  onStartupLog(msg) {
    commandPrompt.print(
      `${this.logPrefix(this.currentRoom)} ${msg}`,
      'BOOTSTRAP'
    );
  }

  onOpenRoomStart(err, room) {
    if (err) {
      commandPrompt.print(`Could not start room ${room.id}`, `ERROR`);
      return;
    }
    if (
      process.env.NODE_ENV !== 'development' &&
      this.loglevel < loglevels.info
    ) {
      room.on('info-logged', this.onStartupLog);
    }

    commandPrompt.print(`${colors.cyan(room.id)}`, `STARTING ROOM`);
  }

  onOpenRoomStop(err, room, roomInfo) {
    room.removeListener('info-logged', this.onStartupLog);
    if (err) {
      switch (err.name) {
        case 'InvalidTokenError':
          commandPrompt.print(
            `${colors.cyan(room.id)}: ${err.message}`,
            `INVALID TOKEN`
          );
          break;
        default:
          commandPrompt.print(
            `Could not start room ${room.id}: ${err.message}`,
            `ERROR`
          );
          break;
      }
      logger.debug(`[${room.id}] ${err.stack}`);
      return;
    }

    commandPrompt.print(
      `${colors.cyan(room.id)} - ${roomInfo.roomLink}`,
      `ROOM STARTED`
    );
  }

  onCloseRoomStart(err, room) {
    if (err) {
      commandPrompt.print(
        `Room was not closed properly and is ` + `probably unusable.`,
        `ERROR`
      );
    } else {
      commandPrompt.print(`${colors.cyan(room.id)}`, `CLOSING ROOM`);
    }
  }

  onCloseRoomStop(err, room) {
    if (err) {
      commandPrompt.print(
        `Room was not closed properly and is ` + `probably unusable.`,
        `ERROR`
      );
    } else {
      commandPrompt.print(`${colors.cyan(room.id)}`, `ROOM CLOSED`);
    }
  }

  async onPageClosed(room) {
    await this.haxroomie.removeRoom(room.id);
    commandPrompt.print(
      `The page controlling ${colors.cyan(room.id)} was closed.`,
      `PAGE CLOSED`
    );
  }

  /**
   * Opens room with the given id.
   * @param {number|string} id - Room id.
   * @param {boolean} tryWithConfigToken - Try with the token given in config
   *    or not.
   */
  async openRoom(id, tryWithConfigToken = true) {
    if (!this.haxroomie.hasRoom(id)) {
      commandPrompt.print(`No room with id: ${id}.`, `ERROR`);
      return;
    }

    let roomConfig = this.config.getRoomConfig(id);
    let token = this.config.getToken(id);
    let room = this.haxroomie.getRoom(id);

    if (token && tryWithConfigToken) {
      roomConfig.token = token;
      try {
        let roomInfo = await room.openRoom(roomConfig);
        if (roomInfo) {
          return roomInfo;
        }
      } catch (err) {
        if (err.name !== 'InvalidTokenError') {
          let roomInfo = await this.openRoom(id, false);
          return roomInfo;
        }
      }
    }

    let newToken = await commandPrompt.question(
      `Enter token for ${colors.green(id)} (c to cancel): `
    );

    if (!newToken) {
      commandPrompt.print('You have to give a token!', 'ERROR');
      await this.openRoom(id, false);
    } else if (newToken === 'c') {
      commandPrompt.print(
        `${colors.cyan(id)}: User canceled opening.`,
        `ERROR`
      );
      return;
    }

    this.config.setToken(id, newToken);
    let newConfig = { ...roomConfig, token: newToken };

    let roomInfo;
    try {
      roomInfo = await room.openRoom(newConfig);
    } catch (err) {
      if (err.name === 'InvalidTokenError') {
        roomInfo = await this.openRoom(id, false);
      }
    }
    if (!roomInfo) {
      return;
    }
    return roomInfo;
  }

  /**
   * Closes the room with the given id.
   * @param {number|string} id - Room id.
   */
  async closeRoom(id) {
    if (!this.haxroomie.hasRoom(id)) {
      commandPrompt.print(`No room with id: ${id}.`, `ERROR`);
      return;
    }
    let room = this.haxroomie.getRoom(id);
    await room.closeRoom();
  }
}

module.exports = HRConsoleApp;
