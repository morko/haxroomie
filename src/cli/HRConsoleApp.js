const { createHaxroomie } = require('../../');
const Commands = require('./Commands');
const RoomEventHandler = require('./RoomEventHandler');
const colors = require('colors/safe');
const Config = require('./Config');
const logger = require('../logger');
const cprompt = require('./cprompt');

/**
 * Class for managing RoomController instances.
 */
class HRConsoleApp {

  constructor(opt) {

    opt = opt || {};

    if (!opt.config) throw new TypeError('invalid arguments');

    this.configPath = opt.config;
    this.userDataDir = opt.userDataDir;
    this.noSandbox = opt.noSandbox;
    this.headless = opt.headless;
    this.port = opt.port;
    this.timeout = opt.timeout || 30;

    this.config = null;
    this.currentRoom = null;
    this.roomEventHandler = null;
  }

  async start() {

    this.haxroomie = await createHaxroomie({
      userDataDir: this.userDataDir,
      noSandbox: this.noSandbox,
      headless: this.headless,
      port: this.port,
      timeout: this.timeout
    });

    this.haxroomie.on('room-added', (room) => this.onNewRoom(room));
    this.haxroomie.on('room-removed', (room) => this.onRoomRemoved(room));

    this.config = new Config({
      configPath: this.configPath,
      haxroomie: this.haxroomie
    });

    await this.createRooms();
    this.setRoom(this.haxroomie.getFirstRoom());
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
    await Promise.all(roomIds.map(async (roomId) => {
      cprompt.print(`${colors.cyan(roomId)}`, 'INITIALIZING ROOM');
      await this.haxroomie.addRoom(roomId);
      cprompt.print(`${colors.cyan(roomId)}`, 'ROOM INITIALIZED');
    }));
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
            cprompt.print(`Could not open room: ${colors.cyan(id)}`);
          }
        } catch (err) {
          cprompt.error(err);
        }
      }
    }
  }

  /**
   * Sets the room that user is controlling.
   * @param {RoomController} room - The room to control.
   */
  setRoom(room) {
    if (this.roomEventHandler) this.roomEventHandler.removeAllListeners('print');
    this.roomEventHandler = new RoomEventHandler({room});
    this.roomEventHandler.on('print', (msg, type) => cprompt.print(msg, type));
    cprompt.setPrompt(`${colors.cyan(room.id)}> `)
    cprompt.setCommands(this.createCommands(room));
    this.currentRoom = room;
  }

  /**
   * @private
   */
  createCommands(room) {
    return new Commands({
      room: room,
      haxroomie: this.haxroomie,
      config: this.config,
      setRoom: (room) => this.setRoom(room),
      openRoom: (id) => this.openRoom(id),
      closeRoom: (id) => this.closeRoom(id)
    });
  }

  /**
   * Called when a new room is added to haxroomie.
   * @private
   */
  onNewRoom(room) {
    room.on(`open-room-start`, (e) => this.onOpenRoomStart(room, e));
    room.on(`open-room-stop`, (e) => this.onOpenRoomStop(room, e));
    room.on(`open-room-error`, (e) => this.onOpenRoomError(room, e));
    room.on(`close-room-start`, () => this.onCloseRoomStart(room));
    room.on(`close-room-stop`, (error) => this.onCloseRoomStop(error, room));
    room.on(`page-closed`, (e) => this.onPageClosed(e));
    room.on(`page-crash`, (e) => cprompt.error(e));
    room.on(`page-error`, (e) => cprompt.error(e));
    room.on(`error-logged`, (e) => cprompt.error(e));
    room.on(`warning-logged`, (e) => cprompt.warn(e));
  }

  /**
   * Called when a room is removed from haxroomie
   * @private
   */
  onRoomRemoved(room) {
    room.removeAllListeners(`open-room-start`);
    room.removeAllListeners(`open-room-stop`);
    room.removeAllListeners(`open-room-error`);
    room.removeAllListeners(`close-room-start`);
    room.removeAllListeners(`close-room-stop`);
    room.removeAllListeners(`page-closed`);
    room.removeAllListeners(`page-crash`);
    room.removeAllListeners(`page-error`);
    room.removeAllListeners(`error-logged`);
    room.removeAllListeners(`warning-logged`);
  }

  onOpenRoomStart(room, config) {
    cprompt.print(`${colors.cyan(room.id)}`, `STARTING ROOM`);
  }

  onOpenRoomStop(room, roomInfo) {
    cprompt.print(
      `${colors.cyan(room.id)} - ${roomInfo.roomLink}`,
      `ROOM STARTED`
    );
    cprompt.print(`for ${colors.cyan(room.id)}`, 'PLUGINS LOADED');
    let cmd = this.createCommands(room);
    cmd.execute('plugins');
  }

  onCloseRoomStart(room) {
    cprompt.print(`${colors.cyan(room.id)}`, `CLOSING ROOM`);
  }

  onCloseRoomStop(error, room) {
    if (error) {
      cprompt.print(`Room was not closed properly and is ` +
        `probably unusable.`, `ERROR`);
    } else {
      cprompt.print(`${colors.cyan(room.id)}`, `ROOM CLOSED`);
    }
  }

  onOpenRoomError(room, error) {
    logger.debug(`[${room.id}] ${error.stack}`);
  }

  async onPageClosed(room) {
    await this.haxroomie.removeRoom(room.id);
    cprompt.print(
      `The page controlling ${colors.cyan(room.id)} was closed.`, `PAGE CLOSED`
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
      cprompt.print(`No room with id: ${id}.`, `ERROR`)
      return;
    }

    let roomConfig = this.config.getRoomConfig(id);
    let token = this.config.getToken(id);

    if (token && tryWithConfigToken) {
      let room = this.haxroomie.getRoom(id);
      roomConfig.token = token;
      try {
        let roomInfo = await room.openRoom(roomConfig);
        if (roomInfo) {
          return roomInfo;
        }
      } catch (err) {
        if (err.name === 'InvalidTokenError'){
          cprompt.print(`${colors.cyan(room.id)}: ${err.message}`, `ROOM NOT STARTED`);
        } else {
          cprompt.print(`${err.name}: ${err.message}`, 'ERROR');
          return;
        }
      }

    }

    return new Promise((resolve, reject) => {
      cprompt.print('Get tokens from https://www.haxball.com/headlesstoken');
      cprompt.question(`Enter token for ${colors.green(id)} (c to cancel): `,
        async (newToken) => {

          if (!newToken) {
            cprompt.print('You have to give a token!', 'ERROR');
            let roomInfo = await this.openRoom(id, false);
            if (roomInfo) resolve(roomInfo);
            return;
          } else if (newToken === 'c') {
            cprompt.print(`${colors.cyan(id)}: User canceled opening.`, `ROOM NOT STARTED`);
            return;
          };

          roomConfig.token = newToken;
          let room = this.haxroomie.getRoom(id);
          let roomInfo;
          try {
            roomInfo = await room.openRoom(roomConfig);
          } catch (err){
            cprompt.print(`${err.name}: ${err.message}`, 'ERROR');
            if (err.name !== 'InvalidTokenError') {
              return;
            }
          }
          if (!roomInfo) {
            roomInfo = await this.openRoom(id, false);
            if (roomInfo) resolve(roomInfo);
            return;
          }
          this.config.setToken(id, newToken);
          resolve(roomInfo);
        }
      );
    });
  }

  /**
   * Closes the room with the given id.
   * @param {number|string} id - Room id.
   */
  async closeRoom(id) {
    if (!this.haxroomie.hasRoom(id)) {
      cprompt.print(`No room with id: ${id}.`, `ERROR`)
      return;
    }
    let room = this.haxroomie.getRoom(id);
    await room.closeRoom();
  }
}

module.exports = HRConsoleApp;