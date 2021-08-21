const { createHaxroomie } = require('haxroomie-core');
const colors = require('colors/safe');

const { CommandManager, RoomContext } = require('./command');
const RoomEventHandler = require('./RoomEventHandler');
const NativeRoomEventHandler = require('./NativeRoomEventHandler');
const Config = require('./Config');
const commandPrompt = require('./command-prompt');

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
    this.downloadDirectory = opt.downloadDirectory;
    this.executablePath = opt.executablePath;
    this.chromiumArgs = opt.chromiumArgs;
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
      downloadDirectory: this.downloadDirectory,
      executablePath: this.executablePath,
      noSandbox: this.noSandbox,
      headless: this.headless,
      port: this.port,
      timeout: this.timeout,
      chromiumArgs: this.chromiumArgs,
    });

    this.haxroomie.on('room-added', room => this.onNewRoom(room));
    this.haxroomie.on('room-removed', room => this.onRoomRemoved(room));

    this.config = new Config({
      configPath: this.configPath,
      haxroomie: this.haxroomie,
    });

    this.roomEventHandler = new RoomEventHandler({ haxroomie: this.haxroomie });
    this.nativeRoomEventHandler = new NativeRoomEventHandler({
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

    commandPrompt.print(roomId, {
      type: 'adding room',
      colorFn: colors.cyan,
    });

    await this.haxroomie.addRoom(roomId, {
      hhmVersion: roomConfig.hhmVersion,
      hhm: roomConfig.hhm,
    });

    commandPrompt.print(roomId, {
      type: 'room added',
      colorFn: colors.cyan,
    });
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
            commandPrompt.warn(`Could not open room: ${id}`);
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
    return `[${new Date().toISOString()}] [${colors.cyan(room.id)}]`;
  }

  /**
   * Opens room with the given id.
   * @param {number|string} id - Room id.
   * @param {boolean} tryWithConfigToken - Try with the token given in config
   *    or not.
   */
  async openRoom(id, tryWithConfigToken = true) {
    if (!this.haxroomie.hasRoom(id)) {
      commandPrompt.error(`No room with id: ${id}.`);
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
      commandPrompt.error('You have to give a token!');
      await this.openRoom(id, false);
    } else if (newToken === 'c') {
      commandPrompt.print(`id: ${id}.`, {
        type: 'room open canceled',
        colorFn: colors.cyan,
      });
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
      commandPrompt.error(`No room with id: ${id}.`);
      return;
    }
    let room = this.haxroomie.getRoom(id);
    await room.closeRoom();
  }
}

module.exports = HRConsoleApp;
