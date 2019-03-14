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
   * @param {function} opt.onEventFromBrowser - function that gets called from the
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
    if (!opt.onEventFromBrowser) {
      throw new Error('Missing required argument: opt.onEventFromBrowser');
    }
    if (typeof opt.onEventFromBrowser !== 'function') {
      throw new Error('opt.onEventFromBrowser has to be typeof function');
    }
    this.page = opt.page;
    this.onEventFromBrowser = opt.onEventFromBrowser;
    this.timeout = opt.timeout || 8;

    /** URL of the HaxBall headless host site. */
    this.url = 'https://haxball.com/headless';
  }

  /** 
   * Opens the room.
   * See Session for documentation.
   *
   * @returns {object} - config object merged with HHM config and 
   *    roomLink property attached to it
   */
  async open(config) {

    if (!config) {
      throw new Error('Missing config');
    }

    if (!config.token) {
      throw new Error('config is missing token');
    }

    logger.debug('OPEN_ROOM: Navigating to ' + this.url);
    try {
      await this.page.goto(this.url);
    } catch (err) {
      throw new Error(this.url + ' is unreachable!');
    }

    logger.debug('OPEN_ROOM: Waiting for HBInit to become available');
    try {
      await this.page.waitForFunction('typeof HBInit === "function"');
    } catch (err) {
      throw new Error('Could not find the HBInit function!');
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
      throw new Error('Invalid HHM config!');
    }

    try {
      await this.page.evaluate(hhmConfig, config);
    } catch (err) {
      throw new Error(
        `Unable to start Headless Host Manager!`
      );
    }

    logger.debug('OPEN_ROOM: Waiting for the room link.');
    let roomLink = await this.waitForRoomLink(this.timeout * 1000);
    if (!roomLink) {
      throw new Error('Timeout when waiting for the room link!');
    }

    logger.debug('OPEN_ROOM: Injecting the haxroomie HHM plugin.');
    try {
      await this.injectHaxroomiePlugin();
    } catch (err) {
      throw new Error(
        `Unable to inject haxroomie HHM plugin!`
      );
    }

    // expose function in the browser context to be able to recieve messages
    let hasSend = await this.page.evaluate(() => {return window.sendToHaxroomie});
    if (!hasSend) {
      await this.page.exposeFunction(
        'sendToHaxroomie',
        this.onEventFromBrowser
      );
    }

    if (config.pluginFiles) {
      logger.debug('OPEN_ROOM: Injecting custom plugins.');
      for (let p of config.pluginFiles) {
        try {
          await this.injectPlugin(p.content);
        } catch (err) {
          throw new Error(`Unable to inject plugin ${p.name}: \n${err.stack}`)
        }
      }
    }

    logger.debug('OPEN_ROOM: Get the room info from HHM.');
    let hhmRoomInfo;
    try {
      hhmRoomInfo = await this.page.evaluate(() => {return window.HHM.config.room});
    } catch (err) {
      throw new Error(`Unable to get the room info from HHM.`)
    }
    

    // merge the roomInfo to the config so all properties get returned
    let roomInfo = Object.assign({}, config, hhmRoomInfo);
    // add the roomLink to the roomInfo
    roomInfo.roomLink = roomLink;

    return roomInfo;
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

  /**
   * @private
   * Injects the haxroomies headless host manager plugin to the headless
   * browser context.
   */
  async injectHaxroomiePlugin() {
    await this.page.evaluate((plugin) => {
      window.HHM.manager.addPluginByCode(plugin, 'hr/core')
        .then(() => {
          window.hroomie.registerEventHandlers();
        });
    }, this.readHRPlugin());
  }

  /**
   * @private
   * Reads the haxroomie plugin for haxball headless manager from the file
   * system to a string.
   */
  readHRPlugin() {
    return fs.readFileSync(
      path.join(__dirname, "..", "hhm", "haxroomie-plugin.js"), "utf8"
    );
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
   * Creates a loop that polls for the roomLink to appear on the webpage.
   * Stops if roomLink is found or the time runs out.
   * 
   * @param {int} timeout Time to wait in ms before failing.
   * 
   * @returns {string|null} the roomLink
   */
  async waitForRoomLink(timeout) {
    let haxframe = await this.getHaxframe();


    let startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    let roomLink = null;

    while (!roomLink && (timeout > currentTime - startTime)) {
      roomLink = await haxframe.$eval('#roomlink', e => e.innerHTML);
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