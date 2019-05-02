const { createHaxroomie } = require(`../../`);
const CommandPrompt = require(`./CommandPrompt`);
const colors = require(`colors/safe`);
const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const deepEqual = require('deep-equal');

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

    this.config = this.loadConfig();
    this.commandPrompt = null;
  }

  async start() {
    this.haxroomie = await createHaxroomie({
      noSandbox: this.noSandbox,
      headless: this.headless,
      port: this.port
    });
    await this.createRooms();
    this.commandPrompt = new CommandPrompt({
      haxroomie: this.haxroomie,
      openRoom: (id) => this.openRoom(id),
      closeRoom: (id) => this.closeRoom(id),
      reloadConfig: () => this.reloadConfig()
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
    for (let key of Object.keys(this.config)) {
      await this.haxroomie.addRoom(key);
    }
  }

  /**
   * Opens all rooms that have autoStart: true in their config.
   */
  async openRooms() {
    for (let id of this.haxroomie.rooms.keys()) {
      if (this.config[id].autoStart) {
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

          this.config[id].token = token;
          let room = this.haxroomie.getRoom(id);
          room.openRoom(this.config[id]);
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

  /**
   * Parses the Haxroomie config.
   */
  loadConfig() {
    this.configPath = path.resolve(process.cwd(), this.configPath);
    let config;
    try {
      config = require(this.configPath);
    } catch (err) {
      throw new Error(`Could not load the config: ${this.configPath}`);
    }
    
    for (let key of Object.keys(config)) {
      config[key] = this.loadFilesInRoomConfig(config[key]);
    }

    return config;
  }

  loadFilesInRoomConfig(cfg) {
    let result = Object.assign({}, cfg);
    if (cfg.roomScript) {
      result.roomScript = this.loadRoomScript(cfg.roomScript);
    }
    if (cfg.hhmConfig) {
      result.hhmConfig = this.loadRoomScript(cfg.hhmConfig);
    }
    return result;
  }

  async reloadConfig() {
    delete require.cache[require.resolve(this.configPath)];  
    let newConfig = this.loadConfig();
    let oldConfig = this.config;
    this.config = newConfig;

    for (let key of Object.keys(newConfig)) {
      let configModified = true;
      if (oldConfig[key]) {
        configModified = this.hasRoomConfigBeenModified(newConfig[key], oldConfig[key]);
      }
      if (configModified) {
        // restart rooms that are running
        if (this.haxroomie.hasRoom(key)) {
          let room = this.haxroomie.getRoom(key);
          if (room.running) {
            await this.closeRoom(key);
            await this.openRoom(key);
          }
        // add rooms with new ids
        } else {
          await this.haxroomie.addRoom(key);
        }
      }
    }

    // check for removed rooms
    for (let key of Object.keys(oldConfig)) {
      if (!newConfig[key]) {
        if (this.haxroomie.hasRoom(key)) {
          await this.haxroomie.removeRoom(key);
        }
      }
    }

    this.commandPrompt.removePersistentListeners();
    this.commandPrompt.addPersistentListeners();
    this.commandPrompt.setRoom(this.haxroomie.getFirstRoom());
    this.config = newConfig;
  }

  hasRoomConfigBeenModified(newConfig, oldConfig) {
      
    for (let key of Object.keys(newConfig)) {
      if (key === 'token') break;
      if (key === 'roomScript' || key === 'hhmConfig') {
        if (!oldConfig[key]) {
          return true;
        } else if (newConfig[key].modifiedTime !== oldConfig[key].modifiedTime) {
          return true;
        }
      } else {
        if (!deepEqual(newConfig[key], oldConfig[key])) {
          return true;
        }
      }
    }
    for (let key of Object.keys(oldConfig)) {
      if (key === 'token') break;
      if (!deepEqual(newConfig[key], oldConfig[key])) {
        return true;
      }
    }
    return false;
  }

  loadFile(file) {
    if (!fs.existsSync(file)) {
      logger.error(`No such file: ${file}`);
      return;
    }
    let modifiedTime = fs.statSync(file).mtimeMs;
    let content = fs.readFileSync(file, {encoding: `utf-8`});

    return {name: file, content: content, modifiedTime: modifiedTime};
  }

  loadHHMConfig(file, client) {
    let hhmConfig = this.loadFile(file, client);
    if (!hhmConfig) return null;
    return hhmConfig;
  }

  loadRoomScript(file, client) {
    let script = this.loadFile(file, client);
    if (!script) return;
    return script;
  }

}

module.exports = HRConsoleApp;