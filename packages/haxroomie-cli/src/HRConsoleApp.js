const { createHaxroomie } = require('haxroomie-core');
const colors = require('colors/safe');

const Commands = require('./Commands');
const RoomEventHandler = require('./RoomEventHandler');
const Config = require('./Config');
const cprompt = require('./cprompt');
const { logger } = require('haxroomie-core');

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
    this.headless = Object.prototype.hasOwnProperty.call(opt, 'window')
      ? !opt.window
      : true;
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
      timeout: this.timeout,
    });

    this.haxroomie.on('room-added', room => this.onNewRoom(room));
    this.haxroomie.on('room-removed', room => this.onRoomRemoved(room));

    this.config = new Config({
      configPath: this.configPath,
      haxroomie: this.haxroomie,
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

    cprompt.print(`${colors.cyan(roomId)}`, 'ADDING ROOM');

    await this.haxroomie.addRoom(roomId, {
      hhmVersion: roomConfig.hhmVersion,
      hhm: roomConfig.hhm,
    });

    cprompt.print(`${colors.cyan(roomId)}`, 'ROOM ADDED');
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
    if (this.roomEventHandler)
      this.roomEventHandler.removeAllListeners('print');
    this.roomEventHandler = new RoomEventHandler({ room });
    this.roomEventHandler.on('print', (msg, type) => cprompt.print(msg, type));
    cprompt.setPrompt(`${colors.cyan(room.id)}> `);
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
      setRoom: room => this.setRoom(room),
      openRoom: id => this.openRoom(id),
      closeRoom: id => this.closeRoom(id),
      createRoom: id => this.createRoom(id),
    });
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
    room.on(`page-crash`, err => cprompt.error(err));
    room.on(`page-error`, err => cprompt.error(err));
    room.on(`error-logged`, errMsg => cprompt.error(errMsg));
    room.on(`warning-logged`, errMsg => cprompt.warn(errMsg));
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
  }

  onStartupLog(msg) {
    const msgPrefix = '[INFO HHM]:  ';
    const parsedMsg = msg.slice(msgPrefix.length);
    cprompt.print(parsedMsg, 'BOOTSTRAP');
  }

  onOpenRoomStart(err, room) {
    if (err) {
      cprompt.print(`Could not start room ${room.id}`, `ERROR`);
      return;
    }
    if (process.env.NODE_ENV !== 'development') {
      room.on('info-logged', this.onStartupLog);
    }

    cprompt.print(`${colors.cyan(room.id)}`, `STARTING ROOM`);
  }

  onOpenRoomStop(err, room, roomInfo) {
    room.removeListener('info-logged', this.onStartupLog);
    if (err) {
      switch (err.name) {
        case 'InvalidTokenError':
          cprompt.print(
            `${colors.cyan(room.id)}: ${err.message}`,
            `INVALID TOKEN`
          );
          break;
        default:
          cprompt.print(
            `Could not start room ${room.id}: ${err.message}`,
            `ERROR`
          );
          break;
      }
      logger.debug(`[${room.id}] ${err.stack}`);
      return;
    }

    cprompt.print(
      `${colors.cyan(room.id)} - ${roomInfo.roomLink}`,
      `ROOM STARTED`
    );
  }

  onCloseRoomStart(err, room) {
    if (err) {
      cprompt.print(
        `Room was not closed properly and is ` + `probably unusable.`,
        `ERROR`
      );
    } else {
      cprompt.print(`${colors.cyan(room.id)}`, `CLOSING ROOM`);
    }
  }

  onCloseRoomStop(err, room) {
    if (err) {
      cprompt.print(
        `Room was not closed properly and is ` + `probably unusable.`,
        `ERROR`
      );
    } else {
      cprompt.print(`${colors.cyan(room.id)}`, `ROOM CLOSED`);
    }
  }

  async onPageClosed(room) {
    await this.haxroomie.removeRoom(room.id);
    cprompt.print(
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
      cprompt.print(`No room with id: ${id}.`, `ERROR`);
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
          return;
        }
      }
    }

    return new Promise(resolve => {
      cprompt.print('Get tokens from https://www.haxball.com/headlesstoken');
      cprompt.question(
        `Enter token for ${colors.green(id)} (c to cancel): `,
        async newToken => {
          if (!newToken) {
            cprompt.print('You have to give a token!', 'ERROR');
            let roomInfo = await this.openRoom(id, false);
            if (roomInfo) resolve(roomInfo);
            return;
          } else if (newToken === 'c') {
            cprompt.print(
              `${colors.cyan(id)}: User canceled opening.`,
              `ERROR`
            );
            return;
          }

          roomConfig.token = newToken;
          let roomInfo;
          try {
            roomInfo = await room.openRoom(roomConfig);
          } catch (err) {
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
      cprompt.print(`No room with id: ${id}.`, `ERROR`);
      return;
    }
    let room = this.haxroomie.getRoom(id);
    await room.closeRoom();
  }
}

module.exports = HRConsoleApp;
