const path = require('path');
const fs = require('fs');
const sleep = require('../utils').sleep;
const logger = require('../logger');
const EventEmitter = require('events');

/**
 * Handles the opening and closing processes of the haxball room using puppeteer.
 */
module.exports = class RoomOpener extends EventEmitter {

  /**
   * Constructs a new RoomOpener
   * 
   * @param {object} opt - options
   * @param {object} opt.id - The RoomController id that this object belongs
   *    to.
   * @param {object} opt.page - Puppeteer.Page object.
   * @param {function} opt.onRoomEvent - Function that gets called from the
   *    browser context when a haxball roomObject event happens.
   * @param {function} opt.onHHMEvent - Function that gets called from the
   *    browser context when a Haxball Headless Manager (HHM) event happens.
   * @param {object} [opt.timeout] - Time to wait for the room link before
   *    giving up.
   */
  constructor(opt) {
    super();
    if (!opt) throw new Error('Missing required argument: opt');
    if (!opt.id && opt.id !== 0) {
      throw new Error('Missing required argument: opt.id');
    }
    if (!opt.page) {
      throw new Error('Missing required argument: opt.page');
    }
    if (!opt.onRoomEvent) {
      throw new Error('Missing required argument: opt.onRoomEvent');
    }
    if (!opt.onHHMEvent) {
      throw new Error('Missing required argument: opt.onHHMEvent');
    }
    this.page = opt.page;
    this.onRoomEvent = opt.onRoomEvent;
    this.onHHMEvent = opt.onHHMEvent;
    this.timeout = opt.timeout || 12;
    this.id = opt.id;

    /** URL of the HaxBall headless host site. */
    this.url = 'https://haxball.com/headless';
  }

  /**
   * Removes the quotes surrounding the token string if user includes them in
   * the token.
   * @param {string} token - Token for HaxBall headless room.
   * @returns {string} - Trimmed token.
   * @private
   */
  trimToken(token) {
    return token.trim().replace(/^"(.+(?="$))"$/, '$1');
  }

  /** 
   * Opens the HaxBall room.
   * See RoomController#openRoom for documentation.
   *
   * @returns {RoomInfo} - Information about the opened room.
   */
  async open(config) {

    if (!config) {
      throw new Error('Missing config');
    }

    if (!config.token) {
      throw new Error('config is missing token');
    }

    config.token = this.trimToken(config.token)

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

    await this.exposeListenersToBrowser();

    if (config.plugins) {
      logger.debug('OPEN_ROOM: Injecting custom HHM plugins.');
      try {
        await this.injectCustomPlugins(config.plugins);
      } catch (err) {
        logger.error(err);
        throw new Error(`Failed to inject custom plugins!`);
      }
    }

    logger.debug('OPEN_ROOM: Injecting the haxroomie HHM plugins.');
    try {
      await this.injectHaxroomiePlugins();
    } catch (err) {
      logger.error(err);
      throw new Error(`Failed to inject haxroomie HHM plugins!`);
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
   * Creates window.haxroomieOnRoomEvent and window.haxroomieOnHHMEvent
   * functions in the browser. These will get called from the browsers
   * context whenever a HaxBall roomObject event or HHM event happens.
   * 
   * Whenever the functions in the browser context are called puppeteer calls
   * their counterparts (this.onRoomEvent and this.onHHMEvent) with the same
   * arguments.
   */
  async exposeListenersToBrowser() {
    let hasOnRoomEvent = await this.page.evaluate(() => {
      return window.haxroomieOnRoomEvent
    });
    if (!hasOnRoomEvent) {
      await this.page.exposeFunction('haxroomieOnRoomEvent', this.onRoomEvent);
    }
    let hasOnHHMEvent = await this.page.evaluate(() => {
      return window.haxroomieOnHHMEvent
    });
    if (!hasOnHHMEvent) {
      await this.page.exposeFunction('haxroomieOnHHMEvent', this.onHHMEvent);
    }
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
  async injectHaxroomiePlugins() {
    let corePlugin = this.readHHMFile('haxroomie-plugin.js');
    let kickbanPlugin = this.readHHMFile('kickban-plugin.js');
    await this.page.evaluate((corePlugin, kickbanPlugin) => {
      window.HHM.manager.addPluginByCode(corePlugin, 'hr/core');
      window.HHM.manager.addPluginByCode(kickbanPlugin, 'hr/kickban');
    }, corePlugin, kickbanPlugin);
  }

  /**
   * Injects the given Haxroomie Headless Host manager plugins from an object.
   * The object should contain the plugins name as a property and the file path
   * string as its value.
   * @param {object} plugins - 
   */
  async injectCustomPlugins(plugins) {
    for (let key of Object.keys(plugins)) {
      await this.page.evaluate((plugin, pluginName) => {
        window.HHM.manager.addPluginByCode(plugin.content, pluginName);
      }, plugins[key], key);
    }

  }

  /**
   * @private
   * Injects the encryption module to the headless browser. The module
   * overrides default localStorage getItem and setItem functions so that
   * the data will be encrypted.
   */
  async injectSharedStorage() {
    let ss = require('./shared-storage');
    await this.page.evaluate(ss, this.id);
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