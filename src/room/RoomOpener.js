const path = require('path');
const fs = require('fs');
const sleep = require('../utils').sleep;
const logger = require('../logger');
const EventEmitter = require('events');

/**
 * Handles the opening and closing processes of the haxball room using puppeteer.
 * 
 */
module.exports = class RoomOpener extends EventEmitter {

  /**
   * Constructs a new RoomOpener
   * 
   * @param {object} opt - options
   * @param {object} opt.page - puppeteer.Page object
   * @param {object} opt.actionFactory - haxroomie action factory object
   * @param {function} opt.onRoomEvent - function that gets called from the
   *    headless browser context when a haxball roomObject event happens
   * @param {object} [opt.timeout] - time to wait for the room link before
   *    failing
   */
  constructor(opt) {
    super();
    if (!opt) throw new Error('Missing required argument: opt');
    if (!opt.page) {
      throw new Error('Missing required argument: opt.page');
    }
    if (!opt.actionFactory) {
      throw new Error('Missing required argument: opt.actionFactory');
    }
    if (!opt.onRoomEvent) {
      throw new Error('Missing required argument: opt.onRoomEvent');
    }
    if (typeof opt.onRoomEvent !== 'function') {
      throw new Error('opt.onRoomEvent has to be typeof function');
    }
    this.page = opt.page;
    this.actionFactory = opt.actionFactory;
    this.onRoomEvent = opt.onRoomEvent;
    this.timeout = opt.timeout || 8;

    /** URL of the HaxBall headless host site. */
    this.url = 'https://haxball.com/headless';
  }

  /**
   * Opens the haxball room.
   * 
   * The config object can contain any properties you want to use in your
   * own HHM config file given in config.hhmConfigFile. The config object is
   * usable globally from within the HHM config as the **haxroomie** object.
   * 
   * @param {object} config config object that gets injected to HHM config
   *    as **haxroomie**
   * @param {string} config.token token to start the room with from 
   *    https://www.haxball.com/headlesstoken
   * @param {string} [config.roomName] room name
   * @param {string} [config.playerName] host player name
   * @param {int} [config.maxPlayers] max players
   * @param {boolean} [config.public] should the room be public
   * @param {string} [config.adminPassword] admin role password in room
   * @param {object} [config.hhmConfigFile] Configuration for the headless host
   *    manager. Object must contain name and content properties where
   *    name is the file/config name and content has the file contents. Both
   *    properties shold be strings.
   * @param {Array.<objects>} [config.pluginFiles] Optional HHM plugins to load when 
   *    starting the room. Objects must contain name and content properties where
   *    name is the file/plugin name and content has the file contents. Both
   *    properties shold be strings.
   * 
   * @returns {action} action containing roomInfo or error
   */
  async open(config) {

    if (!config) {
      return this.openRoomError('Missing config');
    }

    if (!config.token) {
      return this.openRoomError('config is missing token');
    }

    // set default admin password or use the one provided
    config.adminPassword = config.adminPassword || 'haxroomie';

    logger.debug('OPEN_ROOM: Navigating to ' + this.url);
    try {
      await this.page.goto(this.url);
    } catch (err) {
      return this.openRoomError(this.url + ' is unreachable!');
    }

    logger.debug('OPEN_ROOM: Waiting for HBInit to become available');
    try {
      await this.page.waitForFunction('typeof HBInit === "function"');
    } catch (err) {
      return this.openRoomError('Could not find the HBInit function!');
    }

    logger.debug('OPEN_ROOM: Starting Headless Host Manager');
    let hhmConfig;
    try {
      if (config.hhmConfigFile) {
        hhmConfig = new Function('haxroomie', config.hhmConfigFile.content);
      } else {
        hhmConfig = new Function(
          'haxroomie',
          fs.readFileSync(
            path.join(__dirname, '..', 'hhm', 'config.js'),
            { encoding: 'utf-8'}
          )
        );
      }
    } catch (err) {
      return this.openRoomError('Invalid HHM config!');
    }

    try {
      await this.page.evaluate(hhmConfig, config);
    } catch (err) {
      return this.openRoomError(
        `Unable to start Headless Host Manager!`
      );
    }

    logger.debug('OPEN_ROOM: Waiting for the room link.');
    let roomlink = await this.waitForRoomLink(this.timeout * 1000);
    if (!roomlink) {
      return this.openRoomError('Timeout when waiting for the room link!');
    }

    // expose function in the headless browser context to be able to recieve messages
    let hasSend = await this.page.evaluate(() => {return window.hrSend});
    if (!hasSend) {
      await this.page.exposeFunction(
        'hrSend',
        this.onRoomEvent
      );
    }

    logger.debug('OPEN_ROOM: Injecting the haxroomie HHM plugin.');
    try {
      await this.injectHaxroomiePlugin();
    } catch (err) {
      return this.openRoomError(
        `Unable to inject haxroomie HHM plugin!`
      );
    }

    if (config.pluginFiles) {
      logger.debug('OPEN_ROOM: Injecting custom plugins.');
      for (let p of config.pluginFiles) {
        try {
          await this.injectPlugin(p.content);
        } catch (err) {
          return this.openRoomError(`Unable to inject plugin ${p.name}: \n${err.stack}`)
        }
      }
    }

    logger.debug('OPEN_ROOM: Get the room info from HHM.');
    let hhmRoomInfo;
    try {
      hhmRoomInfo = await this.page.evaluate(() => {return window.HHM.config.room});
    } catch (err) {
      return this.openRoomError(`Unable to get the room info from HHM.`)
    }
    

    // merge the roomInfo to the config so all properties get returned
    let roomInfo = Object.assign({}, config, hhmRoomInfo);
    // add the roomlink to the roomInfo
    roomInfo.roomlink = roomlink;

    return this.actionFactory.create(
      'OPEN_ROOM_STOP',
      { roomInfo: roomInfo}
    );
  }

  /**
   * Closes the room by navigating the tab to about:blank.
   */
  async close() {
    return this.page.goto('about:blank');
  }

  /**
   * @private
   * Gets the frame where all the DOM elements of HaxBall headless host
   * webpage are.
   */
  async getHaxframe() {
    let elementHandle = await this.page.$("iframe");
    let haxframe = await elementHandle.contentFrame();
    return haxframe;
  }

  async openRoomError(msg) {
    await this.close();
    return this.actionFactory.createError('OPEN_ROOM_STOP', msg)
  }

  /**
   * @private
   * Injects the haxroomies headless host manager plugin to the headless
   * browser context.
   */
  async injectHaxroomiePlugin() {
    await this.page.evaluate((plugin) => {
      window.HHM.manager.addPluginByCode(plugin).then(() => {
        window.hrRegisterHandlers();
      });
    }, fs.readFileSync(path.join(
      __dirname, "..", "hhm", "haxroomie-plugin.js"), "utf8"
    ));
  }

   /**
   * @private
   * Injects the given headless host manager plugin to the headless
   * browser context.
   * @param {string} plugin - the plugin to inject
   */
  async injectPlugin(plugin) {
    await this.page.evaluate((plugin) => {
      window.HHM.manager.addPluginByCode(plugin);
    }, plugin);
  }
  /**
   * @private
   * Creates a loop that polls for the roomlink to appear on the webpage.
   * Stops if roomlink is found or the time runs out.
   * 
   * @param {int} timeout Time to wait in ms before failing.
   * 
   * @returns {string|null} the roomlink
   */
  async waitForRoomLink(timeout) {
    let haxframe = await this.getHaxframe();


    let startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    let roomlink = null;

    while (!roomlink && (timeout > currentTime - startTime)) {
      roomlink = await haxframe.$eval('#roomlink', e => e.innerHTML);
      await sleep(1000);
      currentTime = new Date().getTime();
    }
    // loop broke because time ran out
    if (timeout <= currentTime - startTime) {
      return null;
    }
    return await haxframe.$eval('#roomlink a', element => {
      return element.getAttribute('href');
    });
  }
}