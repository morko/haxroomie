const logger = require('../logger');
const EventEmitter = require('events');
const RoomOpener = require('./RoomOpener');
const stringify = require('../stringify');

/**
 * Emitted when the browser tab gets closed.
 * Renders this RoomController unusable.
 * @event RoomController#page-closed
 */

/**
 * Emitted when the browser tab crashes.
 * Renders this RoomController unusable.
 * @event RoomController#page-crash
 */

/**
 * Emitted when some script throws an error in the browsers tab.
 * @event RoomController#page-error
 */

/**
 * Emitted when a browser tab logs an error to the console
 * @event RoomController#error-logged
 * @param {string} message - The logged error message.
 */

/**
 * Emitted when a browser tab logs a warning to the console
 * @event RoomController#warning-logged
 * @param {string} message - The logged warning message.
 */

/**
 * Emitted when {@link RoomController#openRoom} has been called.
 * @event RoomController#open-room-start
 * @param {object} config - Config object given as argument to
 *    {@link RoomController#openRoom}
 */

/**
 * Emitted when {@link RoomController#openRoom} has finished and the room
 * is running.
 * @event RoomController#open-room-stop
 * @param {object} roomInfo - Information about the room.
 */

/**
 * Emitted when {@link RoomController#openRoom} fails.
 * @event RoomController#open-room-error
 * @param {Error} error - Error that happened when opening the room.
 */

/**
 * Emitted when supported HaxBall roomObject event happens.
 * @event RoomController#room-event
 * @param {RoomEventArgs} roomEventArgs - Event arguments.
 */

/**
 * Emitted when a plugin is loaded.
 * @event RoomController#plugin-loaded
 * @param {PluginData} pluginData - Information about the plugin.
 */

/**
 * Emitted when a plugin is removed.
 * @event RoomController#plugin-removed
 * @param {PluginData} pluginData - Information about the plugin.
 */

/**
 * Emitted when a plugin is enabled.
 * @event RoomController#plugin-enabled
 * @param {PluginData} pluginData - Information about the plugin.
 */

/**
 * Emitted when a plugin is disabled.
 * @event RoomController#plugin-disabled
 * @param {PluginData} pluginData - Information about the plugin.
 */

/**
 * RoomController provides an interface to communicate with 
 * [HaxBall roomObject]{@link https://github.com/haxball/haxball-issues/wiki/Headless-Host#roomconfigobject}
 * and
 * [Haxball Headless Manager (HHM)]{@link https://github.com/saviola777/haxball-headless-manager}. 
 * Each RoomController controls one tab in the headless browser.
 * 
 * Create new RoomController instances with the
 * [Haxroomie#addRoom]{@link Haxroomie#addRoom}
 * method. **The constructor is not ment to be called directly!**
 * 
 */
class RoomController extends EventEmitter {

  /**
   * Event argument object that gets sent from the browser when a room event happens.
   * 
   * Supported handlers are:
   * ```
   * 'onPlayerJoin'
   * 'onPlayerLeave'
   * 'onTeamVictory'
   * 'onPlayerChat'
   * 'onTeamGoal'
   * 'onGameStart'
   * 'onGameStop'
   * 'onPlayerAdminChange'
   * 'onPlayerTeamChange'
   * 'onPlayerKicked'
   * 'onGamePause'
   * 'onGameUnpause'
   * 'onPositionsReset'
   * 'onStadiumChange'
   * ```
   * 
   * See the 
   * [roomObject documentation](https://github.com/haxball/haxball-issues/wiki/Headless-Host#roomobject)
   * to find out what kind of arguments to expect.
   *
   * @typedef {Object} RoomEventArgs
   * @property {string} handlerName - Name of the haxball room event handler
   *    function that got triggered.
   * @property {Array.<any>} args - Arguments that the event handler function
   *    received.
   */

  /**
   * Object containing files name and content.
   * 
   * @typedef {Object} FileDef
   * @property {string} name - Files name.
   * @property {string} content - UTF-8 encoded contents of the file.
   */

  /**
   * Object containing information about a plugin.
   * 
   * @typedef {Object} PluginData
   * @property {number} id - The plugin id
   * @property {boolean} isEnabled - Indicates whether the plugin is enabled or disabled.
   * @property {object} [pluginSpec] - HHM pluginSpec property.
   */

  /**
   * Constructs a new RoomController object.
   * 
   * **Do not use this!**
   * 
   * Create new instances with the
   * [Haxroomie#addRoom]{@link Haxroomie#addRoom}
   * method.
   * 
   * @param {object} opt - Options.
   * @param {object} opt.id - ID for the room.
   * @param {object} opt.page - Puppeteer.Page object to control.
   */
  constructor(opt) {
    super();

    this.validateArguments(opt);

    this.id = opt.id;
    this.page = opt.page;

    this.usable = true; // Is this RoomController still usable?
    this.roomInfo = null; // If room is running, contains its data.
    this.openRoomLock = false; // Lock for openRoom method.
    this.timeout = 15; // Open room timeout in seconds.
    this.roomOpener = this.createRoomOpener();

    this.registerPageListeners(this.page);
  }

  get [Symbol.toStringTag]() {
    return 'RoomController';
  }

  get running() {
    return this.roomInfo ? true : false;
  }
  /**
   * Validates the arguments for the constructor.
   * 
   * @param {object} opt - argument object for the constructor
   * @private
   */
  validateArguments(opt) {
    if (!opt) {
      throw new Error('Missing required argument: opt');
    }
    if (!opt.id && opt.id !== 0) {
      throw new Error('Missing required argument: opt.id');
    }
    if (!opt.page) throw new Error('Missing required argument: opt.page');
  }

  /**
   * Registers puppeteer page listeners for the events happening in the page
   * that is controlled by this instance.
   * @private
   */
  registerPageListeners(page) {
        
    page.on('pageerror', (error) => {
      this.emit(`page-error`, error);
      logger.error(error);
    });

    page.on('error', (error) => {
      this.emit(`page-crash`, error);
      this.usable = false;
      logger.error(error);
    });

    page.on('console', (msg) => {
      logger.debug(`[BROWSER] ${this.id}: ${msg.text()}`);

      if (msg.type() === 'error') {
        // do not display the errors that happen during loading a plugin
        if (msg.text().startsWith(
          'Failed to load resource: the server responded with a '
          + 'status of 404 (Not Found)'
        )) {
          return;
        }

        // display the jsHandle objects
        let logMsg = msg.text();
        for (let jsHandle of msg.args()) {
          if (jsHandle._remoteObject.type === 'object') {
            logMsg += '\n' + jsHandle._remoteObject.description;
          }
        }

        this.emit(`error-logged`, logMsg);
        logger.error(logMsg);

      } else if (msg.type() === 'warning') {
        this.emit(`warning-logged`, msg.text());
        logger.warn(msg.text());
      }
    });

    page.on('close', () => {
      this.emit(`page-closed`);
      this.usable = false;
    });
  }

  createRoomOpener() {
    let roomOpener = new RoomOpener({
      id: this.id,
      page: this.page,
      onRoomEvent: (eventArgs) => this.onRoomEvent(eventArgs),
      onHHMEvent: (eventArgs) => this.onHHMEvent(eventArgs),
      timeout: this.timeout,
    });
    return roomOpener;
  }

  /**
   * This function gets called from browser when a registered roomObject event
   * happens.
   *
   * @param {RoomEventArgs} eventArgs - Event arguments.
   * @private
   */
  async onRoomEvent(eventArgs) {
    this.emit('room-event', eventArgs);
  }

  /**
   * This function gets called from browser when a registered HHM event
   * happens.
   *
   * @param {HHMEventArgs} eventArgs - Event arguments.
   * @private
   */
  async onHHMEvent(eventArgs) {
    switch (eventArgs.eventType) {
      case `pluginLoaded`:
        this.emit('plugin-loaded', eventArgs.pluginData);
        break;
      case `pluginRemoved`:
        this.emit('plugin-removed', eventArgs.pluginData);
        break;
      case `pluginEnabled`:
        this.emit('plugin-enabled', eventArgs.pluginData);
        break;
      case `pluginDisabled`:
        this.emit('plugin-disabled', eventArgs.pluginData);
        break;
    }
  }

  /**
   * Opens a HaxBall room in a browser tab.
   * 
   * On top of the documentated properties here, the config object can contain
   * any properties you want to use in your own HHM config file. The config object is
   * usable globally from within the HHM config as the **haxroomie** object.
   * 
   * @param {object} config - config object that gets injected to HHM config
   *    as **haxroomie**
   * @param {string} config.token - Token to start the room with.
   *    Obtain one from <https://www.haxball.com/headlesstoken>.
   * @param {string} [config.roomName] - Room name.
   * @param {string} [config.playerName] - Host player name.
   * @param {int} [config.maxPlayers] - Max players.
   * @param {boolean} [config.public] - Should the room be public?
   * @param {object} [config.geo] - Geolocation override for the room.
   * @param {string} [config.hostPassword] - Password for getting host 
   *  priviledges with `!auth host <password>` if the roles plugin is enabled.
   * @param {string} [config.adminPassword] - Password for getting admin 
   *  priviledges with `!auth host <password>` if the roles plugin is enabled.
   * @param {FileDef} [config.hhmConfig] - Configuration for the haxball 
   *    headless manager (HHM).
   * @param {FileDef} [config.roomScript] - Regular haxball
   *    headless script to load when starting the room.
   * 
   *    **Note that** this will disable the default HHM plugins
   *    so that `config.hostPassword`, `config.adminPassword` and 
   *    `config.pluginConfig` are ignored.
   * @param {object} [config.pluginConfig] - Haxball Headless Manager
   *    plugin config object.
   * @param {Array.<string>} [config.repositories] - Array of additional
   *    HHM plugin repositories.
   * @param {Object.<string, FileDef>} [config.plugins] - The object should 
   *    plugins name as a property and {@link FileDef} as its value.
   *    Useful for testing plugins before uploading them to a server or
   *    GitHub.
   * @param {FileDef} [config.hhm] - Path to built source of HHM. Useful
   *    for testing changes to the source.
   * @param {boolean} [disableDefaultPlugins=false] - Set to true if you
   *    want to disable the default HHM plugins that Haxroomie loads.
   *    This can be useful e.f. if you want to test some plugins without others
   *    interfering with it.
   * @returns {object} - Config that the room was started with including
   *    a `roomLink` property added to it containing the haxball rooms
   *    link.
   */
  async openRoom(config) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (this.openRoomLock) throw new Error('Room is already being opened!');
    logger.debug(`RoomController#openRoom: ${stringify(config)}`);
    this.emit(`open-room-start`, config);
    this.openRoomLock = true;

    try {
      this.roomInfo = await this.roomOpener.open(config);
    } catch (err) {
      this.openRoomLock = false;
      this.emit(`open-room-error`, err);
      return;
    }
    this.openRoomLock = false;
    this.emit(`open-room-stop`, this.roomInfo);
    return this.roomInfo;
  }

  /**
   * Closes the headless haxball room.
   */
  async closeRoom() {
    if (!this.usable) throw new Error('Room is no longer usable.');
    logger.debug(`RoomController#closeRoom`);
    await this.roomOpener.close();
    this.roomInfo = null;
    this.emit(`room-closed`);
  }

  /**
   * Calls a function of the HaxBall roomObject in the browsers context.
   * 
   * @param {string} fn - name of the haxball roomObject function
   * @param {any} ...args - arguments for the function
   */
  async callRoom(fn, ...args) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    if (!fn) throw new Error('Missing required argument: fn');
    logger.debug(`RoomController#callRoom: ${stringify(fn)} ARGS: ${stringify(args)}`);
    let result = await this.page.evaluate((fn, args) => {
      return window.hroomie.callRoom(fn, ...args);
    }, fn, args);
    if (result.error) throw new Error(result.payload);
    return result.payload.result;
  }

  /**
   * Kicks a player from the room.
   * @param {number} id - Id of player to ban.
   */
  async kick(id) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    if (!id && id !== 0) throw new Error('Missing required argument: id');
    logger.debug(`RoomController#kick(${id})`);
    await this.page.evaluate((id) => {
      return HHM.manager.getPluginByName('hr/kickban').kick(id);
    }, id);
  }

  /**
   * Bans a player from the room.
   * @param {number} id - Id of player to ban.
   */
  async ban(id) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    if (!id && id !== 0) throw new Error('Missing required argument: id');
    logger.debug(`RoomController#ban(${id})`);
    await this.page.evaluate((id) => {
      return HHM.manager.getPluginByName('hr/kickban').ban(id);
    }, id);
  }

  /**
   * Removes a the ban of a given player id.
   * @param {number} id - Id of player to ban.
   */
  async unban(id) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    if (!id && id !== 0) throw new Error('Missing required argument: id');
    logger.debug(`RoomController#unban(${id})`);
    await this.page.evaluate((id) => {
      return HHM.manager.getPluginByName('hr/kickban').unban(id);
    }, id);
  }
 
  /**
   * Returns an Iterator of banned players.
   * @returns {Iterable.<object>} - Iterator of Player objects.
   */
  async bannedPlayers() {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    logger.debug(`RoomController#bannedPlayers`);
    let result = await this.page.evaluate(() => {
      return HHM.manager.getPluginByName('hr/kickban').bannedPlayers();
    });
    return result;
  }

  /**
   * Returns a list of PluginData objects.
   * @returns {Promise<Array.<PluginData>>} - array of plugins
   */
  async getPlugins() {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    let result = await this.page.evaluate(() => {
      return window.hroomie.getPlugins();
    });
    return result;
  }

  /**
   * Returns PluginData of the given plugin id.
   * 
   * @param {string} name - name of the plugin
   * @returns {?Promise<PluginData>} - data of the plugin or null if
   *    plugin was not found
   */
  async getPlugin(name) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    let result = await this.page.evaluate((name) => {
      return window.hroomie.getPlugin(name);
    }, name);
    return result;
  }

  /**
   * Enables a HHM plugin with the given id.
   * 
   * @param {string} name - name of the plugin
   */
  async enablePlugin(name) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    let result = await this.page.evaluate((name) => {
      return window.hroomie.enablePlugin(name);
    }, name);
  }

  /**
   * Disables a HHM plugin with the given id. If the name is an Array then
   * it disables all the plugins in the given order.
   * 
   * @param {(string|Array.<string>)} name - name or array of names of the plugin(s)
   * @returns {Promise<boolean>} - was the plugin disabled or not?
   */
  async disablePlugin(name) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    let result = await this.page.evaluate((name) => {
      return window.hroomie.disablePlugin(name);
    }, name);
    return result;
  }

  /**
   * Gets a list of plugins that depend on the given plugin.
   * 
   * @param {string} name - name of the plugin
   * @returns {Promise<Array.<PluginData>>} - array of plugins
   */
  async getPluginsThatDependOn(name) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    let result = await this.page.evaluate((name) => {
      return window.hroomie.getDependentPlugins(name);
    }, name);
    return result;
  }

  /**
   * Evaluates the given code in the browser tab room is running.
   * You can access the HaxBall roomObject with `HHM.manager.room`.
   * E.g.
   * ```js
   * room.eval('HHM.manager.room.getPlayerList()');
   * ```
   * 
   * @param {string} js - JavaScript to evaluate.
   */
  async eval(js) {
    if (!this.usable) throw new Error('Room is no longer usable.');
    if (!this.running) throw new Error('Room is not running.');
    let result = await this.page.evaluate(js);
    return result;
  }
}

module.exports = RoomController;