const { RoomController } = require('./room');
const puppeteer = require('puppeteer');
const path = require('path');
const EventEmitter = require('events');
const logger = require('./logger');

/**
 * Emitted when new RoomController is added.
 * @event Haxroomie#room-added
 * @param {RoomController} room - The added RoomController.
 */

/**
 * Emitted when RoomController is removed.
 * @event Haxroomie#room-removed
 * @param {RoomController} room - The removed RoomController.
 */

// allow only launching one browser
let browserLock = undefined;

/**
 * Class for spawning the headless chrome browser and managing
 * [RoomControllers]{@link RoomController}.
 * 
 * Each [RoomController]{@link RoomController} controls one room
 * running in a browsers tab.
 * 
 * After creating the Haxroomie instance it is required to launch the browser
 * with the [launchBrowser method]{@link Haxroomie#launchBrowser} before 
 * anything else.
 */
class Haxroomie extends EventEmitter {

  /**
   * Constructor for Haxroomie.
   * 
   * @param {object} opt - options
   * @param {object} [opt.viewport={ width: 400, height: 500 }] - Viewport 
   *    size settings for the browser.
   * @param {number} [opt.port=3066] - Port that the headless browser will use
   *    as the remote-debugging-port to communicate with Haxroomie. Use a
   *    port that is not open outside your LAN!
   * @param {boolean} [opt.noSandbox=false] - Makes the browser run without
   *    sandbox. Useful only if it gives you error in sandboxed mode. It is
   *    not recommended to set this true for security reasons.
   * @param {boolean} [opt.headless=true] - Setting this to false will make
   *    puppeteer try to spawn a browser window. Useful for debugging.
   * @param {boolean} [opt.userDataDir] - Path to where
   *    browser should store data like localStorage. Defaults to [project
   *    root directory]/user-data-dir.
   * @param {boolean} [opt.timeout=30] - How long to wait for a room to open
   *    before failing.
   */
  constructor(opt) {
    super();
    this.browser = null;
    this.rooms = new Map();

    opt = opt || {};

    this.viewport = opt.viewport || { width: 400, height: 500 };

    this.port = opt.port || 3066;
    if (this.port === 0) {
      throw new Error('INVALID_PORT: 0');
    }

    this.noSandbox = opt.noSandbox || false;
    this.headless = opt.hasOwnProperty('headless') ? opt.headless : true;
    this.userDataDir = opt.userDataDir || path.join(__dirname, '..', 'user-data-dir');
    this.userDataDir = path.resolve(process.cwd(), this.userDataDir);
    this.timeout = opt.timeout || 30;
  }

  /**
   * Launches the puppeteer controlled browser using the remote-debugging-port
   * given in Haxroomie classes constructor. It is only possible to launch one
   * browser.
   */
  async launchBrowser() {
    // make sure there isnt a browser running already
    let browser = await this.getRunningBrowser();
    // if there is a browser running throw an error
    if (browser || browserLock) throw new Error('You can launch only 1 browser!')

    this.browser = await puppeteer.launch({
      headless: this.headless,
      devtools: !this.headless,
      userDataDir: this.userDataDir,
      args: [
        `--remote-debugging-port=${this.port}`,
        `--no-sandbox=${this.noSandbox}`
      ]
    });
    browserLock = true;
    return this.browser;
  }

  /**
   * @private
   */
  async getRunningBrowser() {
    try {
      this.browser = await puppeteer.connect({
        browserURL: `http://localhost:${this.port}`
      });
    } catch (err) {
      return null;
    }
    return this.browser;
  }


  /**
   * Closes the puppeteer controlled browser.
   */
  async closeBrowser() {
    if (this.browser) await this.browser.close();
    this.rooms = new Map();
    browserLock = false;
    this.browser = null;
  }

  /**
   * Checks that the instance has a connection to the browser.
   * @private
   */
  ensureInstanceIsUsable() {
    if (!this.browser) {
      throw new Error(`Browser is not running!`)
    }
  }

  /**
   * Validates the given id.
   * @param {string|number} id - ID to validate.
   * @private
   */
  validateRoomID(id) {
    if (!id && id !== 0 || typeof id !== 'number' && typeof id !== 'string') {
      throw new Error('invalid id');
    }
  }

  /**
   * Checks if there is a room running with the given id.
   * 
   * @param {string|number} id - An id of the room.
   * @returns {boolean} - Is there a room with given id?
   */
  hasRoom(id) {
    this.validateRoomID(id);
    this.ensureInstanceIsUsable();
    return this.rooms.has(id);
  }
  /**
   * Returns a RoomController with the given id.
   * 
   * @param {string|number} id - An id of the room.
   * @returns {RoomController} - RoomController with the given id or
   *    undefined if there is no such room.
   */
  getRoom(id) {
    this.validateRoomID(id);
    this.ensureInstanceIsUsable();
    return this.rooms.get(id);
  }

  /**
   * Returns an array of available RoomControllers.
   * @returns {Array.<RoomController>} - Available RoomControllers.
   */
  getRooms() {
    let rooms = [];
    for(let r of this.rooms.values()) {
      rooms.push(r);
    }
    return rooms;
  }

  /**
   * Returns the RoomController that was first added.
   * @returns {RoomController} - First RoomController or
   *    undefined if there is no such room.
   */
  getFirstRoom() {
    for(let r of this.rooms.values()) {
      return r;
    }
  }

  /**
   * Removes a RoomController with the given id.
   * 
   * Removing deletes the RoomController and closes the browser tab
   * it is controlling.
   * 
   * @param {string|number} id 
   */
  async removeRoom(id) {
    this.validateRoomID(id);
    this.ensureInstanceIsUsable();
    let roomController = this.rooms.get(id);
    if (roomController) {
      try {
        await roomController.page.close();
      } catch (err) {
        logger.debug(err);
      }
      this.rooms.delete(id);
      this.emit('room-removed', roomController);
    }
  }

  /**
   * Creates and adds a new RoomController with the given id.
   * 
   * @param {string|number} id 
   * @return {RoomController} - The created RoomController.
   */
  async addRoom(id) {
    this.validateRoomID(id);
    this.ensureInstanceIsUsable();
    if (this.rooms.has(id)) throw new Error('id must be unique');
    let page = await this.getNewPage();
    let roomController = await this.createRoomController(page, id);
    this.rooms.set(id, roomController);
    this.emit('room-added', roomController);
    return roomController;
  }

  /**
   * Returns a new Puppeteer.Page object.
   * @private
   */
  async getNewPage() {
    return this.browser.newPage();
  }

  /**
   * Factory method for creating RoomController instances.
   * @private
   */
  async createRoomController(page, id) {

    const device = {
      'name': 'Galaxy S5',
      'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3452.0 Mobile Safari/537.36',
      'viewport': {
        'width': this.viewport.width,
        'height': this.viewport.height,
        'deviceScaleFactor': 1,
        'isMobile': false,
        'hasTouch': false,
        'isLandscape': false
      }
    }

    await page.emulate(device);

    let room = new RoomController({
      page: page,
      id: id,
      timeout: this.timeout
    });

    return room;
  }
}

module.exports = Haxroomie;