const { createHaxroomie } = require(`../../`);
const CommandPrompt = require(`./CommandPrompt`);
const colors = require(`colors/safe`);
const Config = require('./Config');

/**
 * Class for managing RoomController instances.
 */
class HRConsoleApp {

  constructor(opt) {

    opt = opt || {};

    if (!opt.config) throw new TypeError('invalid arguments');
    this.configPath = opt.config;
    this.noSandbox = opt.noSandbox;
    this.headless = opt.headless;
    this.port = opt.port;

    this.config = null;
    this.commandPrompt = null;
  }

  async start() {

    this.haxroomie = await createHaxroomie({
      noSandbox: this.noSandbox,
      headless: this.headless,
      port: this.port
    });

    this.config = new Config({
      configPath: this.configPath,
      haxroomie: this.haxroomie
    });

    await this.createRooms();
    this.commandPrompt = new CommandPrompt({
      haxroomie: this.haxroomie,
      config: this.config,
      openRoom: (id) => this.openRoom(id),
      closeRoom: (id) => this.closeRoom(id)
     });
    await this.openRooms();
    this.commandPrompt.setRoom(this.haxroomie.getFirstRoom());
  }

  async stop() {
    return this.haxroomie.closeBrowser();
  }

  /**
   * Creates the rooms.
   */
  async createRooms() {
    for (let roomId of this.config.getRoomIds()) {
      await this.haxroomie.addRoom(roomId);
    }
  }

  /**
   * Opens all rooms that have autoStart: true in their config.
   */
  async openRooms() {
    for (let id of this.haxroomie.rooms.keys()) {
      if (this.config.getRoom(id).autoStart) {
        await this.openRoom(id);
      }
    }
  }

  /**
   * Opens room with the given id.
   * @param {number|string} id - Room id.
   */
  async openRoom(id) {
    if (!this.haxroomie.hasRoom(id)) {
      this.commandPrompt.print(`No room with id: ${id}.`, `ERROR`)
      return;
    }
    return new Promise((resolve, reject) => {

      this.commandPrompt.question(
        `Enter token for ${colors.green(id)}: `,
        async (token) => {

          if (!token) {
            this.commandPrompt.print('You have to give a token!', 'ERROR');
            await this.openRoom(id);
            return;
          }

          let roomConfig = this.config.getRoom(id);
          roomConfig.token = token;
          let room = this.haxroomie.getRoom(id);
          room.openRoom(roomConfig);
          resolve();
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
      this.commandPrompt.print(`No room with id: ${id}.`, `ERROR`)
      return;
    }
    let room = this.haxroomie.getRoom(id);
    await room.closeRoom();
  }
}

module.exports = HRConsoleApp;