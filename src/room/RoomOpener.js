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
   * @param {object} opt.sessionId - The sessions id
   * @param {object} [opt.encryptionKey] - Encryption key to use for 
   *    LocalStorge.
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
    if (!opt.sessionId) {
      throw new Error('Missing required argument: opt.sessionId');
    }
    this.page = opt.page;
    this.onEventFromBrowser = opt.onEventFromBrowser;
    this.timeout = opt.timeout || 8;
    this.sessionId = opt.sessionId;
    this.encryptionKey = opt.encryptionKey || opt.sessionId;

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
      logger.error(err);
      throw new Error(this.url + ' is unreachable!');
    }

    logger.debug('OPEN_ROOM: Injecting shared-storage module.');
    await this.injectSharedStorage();

    logger.debug('OPEN_ROOM: Waiting for HBInit to become available');
    try {
      await this.page.waitForFunction('typeof HBInit === "function"');
    } catch (err) {
      logger.error(err);
      throw new Error('Could not find the HBInit function!');
    }

    logger.debug('OPEN_ROOM: Starting Headless Host Manager');
    let hhmConfig;
    try {
      if (config.hhmConfig) {
        hhmConfig = new Function('haxroomie', config.hhmConfig.content);
      } else {
        hhmConfig = new Function('haxroomie', this.readHHMFile('config.js'));
      }
    } catch (err) {
      logger.error(err);
      throw new Error('Invalid HHM config!');
    }

    try {
      await this.page.evaluate(hhmConfig, config);
    } catch (err) {
      logger.error(err);
      throw new Error(`Unable to start Headless Host Manager!`);
    }

    logger.debug('OPEN_ROOM: Waiting for HHM to start.');
    let roomLink = await this.waitForHHMToStart(this.timeout * 1000);
   
    if (!roomLink) {
      throw new Error('Timeout when waiting for HHM to start!');
    }

    // add the roomLink to the config
    config.roomLink = roomLink;

    return this.onRoomStarted(config);
  }

  /**
   * Closes the room by navigating the tab to about:blank.
   */
  async close() {
    return this.page.goto('about:blank');
  }

  /**
   * Event handler that gets executed when the haxball headless room has been
   * started and Haxball Headless Manager is running.
   * 
   * @param {object} config 
   */
  async onRoomStarted(config) {

    // expose function in the browser context to be able to recieve messages
    let hasSend = await this.page.evaluate(() => {return window.sendToHaxroomie});
    if (!hasSend) {
      await this.page.exposeFunction(
        'sendToHaxroomie',
        this.onEventFromBrowser
      );
    }

    logger.debug('OPEN_ROOM: Injecting the haxroomie HHM plugin.');
    try {
      await this.injectHaxroomiePlugin();
    } catch (err) {
      logger.error(err);
      throw new Error(
        `Unable to inject haxroomie HHM plugin!`
      );
    }

    if (config.roomScript) {
      logger.debug('OPEN_ROOM: Injecting custom plugin/script.');
      try {
        await this.injectPlugin(config.roomScript.content);
      } catch (err) {
        logger.error(err);
        throw new Error(`Unable to inject plugin ${config.roomScript.name}: \n${err.stack}`);
      }
    }

    logger.debug('OPEN_ROOM: Get the room info from HHM.');
    let hhmRoomInfo;
    try {
      hhmRoomInfo = await this.page.evaluate(() => {return window.HHM.config.room});
    } catch (err) {
      logger.error(err);
      throw new Error(`Unable to get the room info from HHM.`)
    }

    // merge the roomInfo to the config so all properties get returned
    let roomInfo = Object.assign({}, config, hhmRoomInfo);
    return roomInfo;
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
      window.HHM.manager.addPluginByCode(plugin, 'hr/core');
    }, this.readHHMFile('haxroomie-plugin.js'));
  }

  /**
   * @private
   * Injects the encryption module to the headless browser. The module
   * overrides default localStorage getItem and setItem functions so that
   * the data will be encrypted.
   */
  async injectSharedStorage() {
    let ss = require('./shared-storage');
    await this.page.evaluate(ss, this.sessionId);
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
   * Helper function to read files from the projects hhm directory.
   * @param {string} fileName 
   */
  readHHMFile(fileName) {
    return fs.readFileSync(
      path.join(__dirname, "..", "hhm", fileName), {encoding: "utf-8"}
    );
  }

  /**
   * @private
   * Waits for the Haxball Headless Manager to start.
   * Creates a loop that polls for the window.hroomie.hhmStarted to
   * be true. 
   * 
   * The window.hroomie.hhmStarted gets set in the HHM config postInit
   * plugin.
   * 
   * @param {int} timeout Time to wait in ms before failing.
   * 
   * @returns {string|null} the roomLink or null if time ran out
   */
  async waitForHHMToStart(timeout) {
    let haxframe = await this.getHaxframe();

    let startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    let hhmStarted = false;

    while (!hhmStarted && (timeout > currentTime - startTime)) {
      // if the recaptcha appears the token must be invalid
      let recaptcha = await haxframe.$eval('#recaptcha', e => e.innerHTML);
      if (recaptcha) {
        throw new Error(`Invalid token!`)
      }
      hhmStarted = await this.page.evaluate(`window.hroomie.hhmStarted`);
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