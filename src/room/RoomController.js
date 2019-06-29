const logger = require('../logger');
const { UnusableError, NotRunningError, RoomLockedError } = require('../errors');
const EventEmitter = require('events');
const RoomOpener = require('./RoomOpener');
const stringify = require('../stringify');

/**
 * Emitted when the browser tab gets closed.
 * Renders this RoomController unusable.
 * @event RoomController#page-closed
 * @param {RoomController} room - Instance of RoomController that was
 *    controlling the page.
 */

/**
 * Emitted when the browser tab crashes.
 * Renders this RoomController unusable.
 * @event RoomController#page-crash
 * @param {Error} error - The error that was throwed.
 */

/**
 * Emitted when some script throws an error in the browsers tab.
 * @event RoomController#page-error
 * @param {Error} error - The error that was throwed.
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
 * @param {Error|TypeError|ConnectionError|TimeoutError} error
 *    - Error that happened when opening the room.
 */

/**
 * Emitted when {@link RoomController#closeRoom} has been called.
 * @event RoomController#close-room
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
 * **The constructor is not ment to be called directly!**
 * 
 * Create new RoomController instances with the
 * [Haxroomie#addRoom]{@link Haxroomie#addRoom}
 * method.
 * 
 */
class RoomController extends EventEmitter {

  /**
   * Event argument object that gets sent from the browser when a room event happens.
   * 
   * The `handlerName` can be one of the following:
   * `onPlayerJoin`
   * `onPlayerLeave` 
   * `onTeamVictory` 
   * `onPlayerChat` 
   * `onTeamGoal` 
   * `onGameStart` 
   * `onGameStop` 
   * `onPlayerAdminChange` 
   * `onPlayerTeamChange` 
   * `onPlayerKicked` 
   * `onGamePause` 
   * `onGameUnpause` 
   * `onPositionsReset` 
   * or
   * `onStadiumChange` 
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
   * Object containing HHM plugin name and content.
   * 
   * @typedef {Object} PluginDef
   * @property {string} [name] - Plugins name. Can be overriden by the plugin
   *    itself if it defines the `pluginSpec.name` property.
   * @property {string} content - UTF-8 encoded content of the plugin.
   */

  /**
   * Object containing information about a plugin.
   * 
   * @typedef {Object} PluginData
   * @property {number} id - The plugin id.
   * @property {string|number} name - The plugin name.
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
   * @param {number} [opt.timeout=30] - Time to wait in seconds for the room to
   *    open.
   */
  constructor(opt) {
    super();

    this.validateArguments(opt);

    this.id = opt.id;
    this.page = opt.page;
    this.timeout = opt.timeout || 30;

    this._usable = true;
    this._roomInfo = null;
    this._openRoomLock = false;

    this.roomOpener = this.createRoomOpener();

    this.registerPageListeners(this.page);
  }

  get [Symbol.toStringTag]() {
    return 'RoomController';
  }

  /**
   * Is the room running.
   * @type boolean
   * @default true
   */
  get running() {
    return this._roomInfo ? true : false;
  }

  /**
   * Is the instance still usable.
   * @type boolean
   * @default true
   */
  get usable() {
    return this._usable;
  }

  /**
   * If room is running, contains its data (like e.g. `roomInfo.roomLink`).
   * If not running, then this is `null`. Returns a copy of the original
   * object.
   * @type object
   * @default null
   */
  get roomInfo() {
    return JSON.parse(JSON.stringify(this._roomInfo));
  }

  /**
   * If opening of the room is in process, then this will be `true`.
   * @type boolean
   * @default false
   */
  get openRoomLock() {
    return this._openRoomLock;
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
   * @emits RoomController#page-error
   * @emits RoomController#page-crash
   * @emits RoomController#error-logged
   * @emits RoomController#warning-logged
   * @private
   */
  registerPageListeners(page) {
        
    page.on('pageerror', (error) => {
      this.emit(`pageerror`, error);
      logger.debug(`[${this.id}]: Page error: ${error}`);
    });

    page.on('error', (error) => {
      this.emit(`page-crash`, error);
      this._usable = false;
      logger.debug(`[${this.id}]: Page crashed: ${error}`);
    });

    page.on('console', (msg) => {

      if (msg.type() === 'error') {

        let logMsg = this.parseErrorLoggedInBrowser(msg);
        if (!logMsg) return;
        this.emit(`error-logged`, logMsg);
        logger.debug(`[${this.id}]: Error logged: ${logMsg}`);

      } else if (msg.type() === 'warning') {

        this.emit(`warning-logged`, msg.text());
        logger.debug(`[${this.id}]: Warning logged: ${msg.text()}`);
      
      } else {
        logger.debug(`[${this.id}]: ${msg.text()}`);
      }
    });

    page.on('close', () => {
      this.emit(`page-closed`, this);
      this._usable = false;
    });
  }

  /**
   * Puppeteer sends the logged error objects as ConsoleMessage objects.
   * To be able to show them this method parses the object to a string.
   * 
   * @param {ConsoleMessage} msg 
   * @returns {string} - Error as a string.
   * @private
   */
  parseErrorLoggedInBrowser(msg) {
    // do not display the errors that happen during loading a plugin
    if (msg.text().startsWith(
      'Failed to load resource: the server responded with a status of 404'
    )) {
      return;
    }

    let logMsg = '';
    for (let jsHandle of msg.args()) {
      if (jsHandle._remoteObject.type === 'object') {
        logMsg += jsHandle._remoteObject.description;
      }
    }
    if (!logMsg) logMsg = msg.text();
    return logMsg;
  }

  /**
   * Creates new RoomOpener.
   * @private
   */
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
   * @emits RoomController#room-event
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
   * @emits RoomController#plugin-loaded
   * @emits RoomController#plugin-removed
   * @emits RoomController#plugin-enabled
   * @emits RoomController#plugin-disabled
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
   * any properties you want to use in your own HHM config file. 
   * 
   * The config object is
   * usable globally from within the HHM config as the `hrConfig` object.
   * 
   * @param {object} config - Config object that contains the room information.
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
   * @param {Array.<object>} [config.repositories] - Array of additional
   *    HHM plugin repositories.
   * 
   *    [Here](https://github.com/saviola777/haxball-headless-manager#using-a-webserver)
   *    you can see how to add repository from an URL and
   * 
   *    [here](https://github.com/saviola777/haxball-headless-manager#using-a-github-repository)
   *    how to add one from GitHub.
   * @param {Array.<FileDef>} [config.plugins] - Useful for testing plugins
   *    before uploading them to a server or GitHub.
   * @param {FileDef} [config.hhm] - Path to built source of HHM. Useful
   *    for testing changes to the source.
   * @param {boolean} [config.disableDefaultPlugins=false] - Set to true if you
   *    want to disable the default HHM plugins that Haxroomie loads.
   *    This can be useful if for example you want to test some plugins without
   *    others interfering with it.
   * @returns {object} - Config that the room was started with. 
   *    The `roomLink` property is added to the config (contains URL to the
   *    room).
   * 
   * @emits RoomController#open-room-start
   * @emits RoomController#open-room-stop
   * @emits RoomController#open-room-error
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {ConnectionError} - Could not connect to HaxBall headless page.
   * @throws {TimeoutError} - Haxball Headless Manager took too much time to 
   *    start.
   * @throws {InvalidTokenError} - The token is invalid or expired.
   * @throws {RoomLockedError} - The room is already being opened.
   */
  async openRoom(config) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (this._openRoomLock) throw new RoomLockedError(
      'Room is already being opened!'
    );
    logger.debug(`RoomController#openRoom: ${this.id}`);
    this.emit(`open-room-start`, config);
    this._openRoomLock = true;

    try {
      this._roomInfo = await this.roomOpener.open(config);
    } catch (err) {
      this._openRoomLock = false;
      this.roomOpener.close();
      this.emit(`open-room-error`, err);
      throw err;
    }
    this._openRoomLock = false;
    this.emit(`open-room-stop`, this.roomInfo);
    return this._roomInfo;
  }

  /**
   * Closes the headless haxball room.
   * 
   * @emits RoomController#close-room
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   */
  async closeRoom() {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    logger.debug(`RoomController#closeRoom`);
    await this.roomOpener.close();
    this._roomInfo = null;
    this.emit(`close-room`);
  }

  /**
   * Calls a function of the 
   * [HaxBall roomObject](https://github.com/haxball/haxball-issues/wiki/Headless-Host#roomobject) 
   * in the browsers context.
   * 
   * @param {string} fn - Name of the haxball roomObject function.
   * @param {any} ...args - Arguments for the function.
   * @returns {any} - Return value of the called function.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async callRoom(fn, ...args) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');
    if (!fn) throw new TypeError('Missing required argument: fn');
    logger.debug(`RoomController#callRoom: ${stringify(fn)} ARGS: ${stringify(args)}`);

    let result = await this.page.evaluate((fn, args) => {
      return window.hroomie.callRoom(fn, ...args);
    }, fn, args);
    if (result.error) throw new Error(result.payload);
    return result.payload.result;
  }

  /**
   * Returns loaded plugins.
   * 
   * @returns {Promise<Array.<PluginData>>} - Array of plugins.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async getPlugins() {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    let result = await this.page.evaluate(() => {
      return window.hroomie.getPlugins();
    });
    return result;
  }

  /**
   * Returns PluginData of the given plugin name.
   * 
   * @param {string} name - Name of the plugin.
   * @returns {?Promise<PluginData>} - Data of the plugin or `null` if
   *    plugin was not found.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async getPlugin(name) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    return this.page.evaluate((name) => {
      return window.hroomie.getPlugin(name);
    }, name);
  }

  /**
   * Enables a HHM plugin with the given name.
   * 
   * @param {string} name - Name of the plugin
   * @returns {Promise.<boolean>} - `true` if plugin was enabled, `false` otherwise.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async enablePlugin(name) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    return this.page.evaluate((name) => {
      return window.hroomie.enablePlugin(name);
    }, name);
  }

  /**
   * Disables a HHM plugin with the given name. 
   * 
   * If the name is an Array then
   * it disables all the plugins in the given order.
   * 
   * @param {(string|Array.<string>)} name - Name or array of names of the plugin(s).
   * @param {boolean} [force=false] - If true all the plugins that depend on
   *    the plugin will get disabled also.
   * @returns {Promise.<boolean>} - Was the plugin disabled or not?
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async disablePlugin(name, force=false) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    if (!force) {
      return this.page.evaluate(async (name) => {
        return window.hroomie.disablePlugin(name);
      }, name);

    } else {
      let depPlugins = await this.getPluginsThatDependOn(name);
      return this.page.evaluate(async (name, depPlugins) => {
        if (depPlugins && depPlugins.length > 0) {
          await window.hroomie.disablePlugin(depPlugins.map((p) => p.name));
        }
        return window.hroomie.disablePlugin(name);
      }, name, depPlugins);
    }
  }

  /**
   * Gets a list of plugins that depend on the given plugin.
   * 
   * @param {string} name - name of the plugin
   * @returns {Promise<Array.<PluginData>>} - array of plugins
   *
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async getPluginsThatDependOn(name) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    return this.page.evaluate((name) => {
      return window.hroomie.getDependentPlugins(name);
    }, name);
  }

  /**
   * Wrapper for Puppeteers 
   * [page.evaluate](https://github.com/GoogleChrome/puppeteer/blob/v1.18.0/docs/api.md#pageevaluatepagefunction-args).
   * 
   * Evaluates the given code in the browser tab room is running.
   * You can access the HaxBall roomObject with `HHM.manager.room`.
   * 
   * e.g.
   * ```js
   * room.eval('HHM.manager.room.getPlayerList()');
   * ```
   * 
   * @param {string|function} pageFunction - JavaScript to evaluate.
   * @param {...Serializable|...JSHandle} [args] - Arguments to pass to `js`.
   * @returns {Promise.<Serializable>} -  Promise which resolves to the 
   *    return value of pageFunction.

   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async eval(pageFunction, ...args) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    return this.page.evaluate(pageFunction, ...args);
  }

  /**
   * Checks if the room has a plugin with given name loaded.
   * @param {string} name - Name of the plugin.
   * @returns {boolean} - `true` if it had the plugin, `false` if not.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async hasPlugin(name) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    return this.page.evaluate(async (name) => {
      return HHM.manager.hasPluginByName(name);
    }, name);
  }

  /**
   * Adds a new plugin.
   * 
   * If the `plugin` is `string`, then it will be loaded from the available
   * repositories.
   * 
   * If the `plugin` is [PluginDef]{@link PluginDef}, then it will be loaded
   * from contents of `PluginDef`.
   * 
   * @param {string|PluginDef} plugin - Plugins name if loading from repositories
   *    or plugin definition if loading it from a string.
   * @returns {number} - Plugin ID if the plugin and all of its dependencies
   *    have been loaded, -1 otherwise.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async addPlugin(plugin) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    if (!plugin) {
      throw new TypeError('Missing required argument: plugin');
    }

    if (typeof plugin === 'string') {
      return this.page.evaluate(async (name) => {
        return HHM.manager.addPluginByName(name);
      }, plugin);
    }

    if (!plugin.content) {
      throw new TypeError('PluginDef is missing required property: content');
    }

    return this.page.evaluate(async (plugin) => {
      return HHM.manager.addPluginByCode(plugin.content, plugin.name);
    }, plugin);
  }


  /**
   * Adds a repository.
   *
   * The repository can be specified as a string, then it is interpreted as the 
   * URL of a plain type repository, or as an Object.
   *
   * If append is set to true, the new repository will be added with the 
   * lowest priority, i.e. plugins will only be loaded from it they can't 
   * be found in any other repository. Otherwise the repository will be 
   * added with the highest priority.
   *
   * @param {object|string} repository - The repository to be added.
   * @param {boolean} [append] - Whether to append or prepend the repository 
   *    to the Array of repositories.
   * @returns {boolean} - Whether the repository was successfully added.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async addRepository(repository, append) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    if (!repository) {
      throw new TypeError('Missing required argument: repository')
    }

    return this.page.evaluate(async (repository, append) => {
      return HHM.manager.addRepository(repository, append)
    }, repository, append);
  }

  /**
   * Returns available repositories.
   * @returns {Array.<object|string>} - An array of available repositories.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async getRepositories() {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');
    
    return this.page.evaluate(() => {
      return HHM.manager.getPluginLoader().repositories;
    });
  }

  /**
   * Sets the rooms plugin config.
   * 
   * Tries to load plugins that are not loaded from the available
   * repositories.
   * 
   * **Plugins will not get unloaded using this method.**
   * 
   * If `pluginName` is given then only config for the given plugin
   * is set.
   * @param {object} pluginConfig - Room wide config or plugins config.
   * @param {string} [pluginName] - Name of the plugin if wanting to change
   *    config of only one plugin.
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   * 
   */
  async setPluginConfig(pluginConfig, pluginName) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    if (!pluginConfig) {
      throw new TypeError('Missing required argument: pluginConfig');
    }
    if (typeof pluginConfig !== 'object') {
      throw new TypeError('typeof pluginConfig should be object');
    }
    
    if (typeof pluginName === 'string') {
      await this.page.evaluate(async (pluginName, pluginConfig) => {

        let pluginId = HHM.manager.getPluginId(pluginName);
        
        if (pluginId < 0) {
          pluginId = await HHM.manager.addPluginByName(pluginName);
          if (pluginId < 0) {
            throw new Error(
              `Cannot load plugin "${pluginName}" from available repositories.`
            );
          }
        } 
        HHM.manager.setPluginConfig(pluginId, pluginConfig);

      }, pluginName, pluginConfig);
      return;
    }

    // change the whole plugin config for the room
    for (let [name, config] of Object.entries(pluginConfig)) {
      await this.page.evaluate(async (name, config) => {

        const manager = window.HHM.manager;

        let pluginId = manager.getPluginId(name);
        
        if (pluginId < 0) {
          pluginId = await manager.addPluginByName(name);
          if (pluginId < 0) {
            return;
          }
        }
        manager.setPluginConfig(pluginId, config);

      }, name, config);
    }    
  }

  /**
   * Returns the plugin config for all loaded plugins in the room or
   * if `pluginName` is given, then return the config for that plugin.
   * 
   * @param {string} [pluginName] - The name of the plugin.
   * @returns {object} - The config object of plugin(s).
   * 
   * @throws {UnusableError} - The instance is no longer usable due to some
   *    fatal error in browser or if the tab has been closed.
   * @throws {NotRunningError} - The room is not running.
   */
  async getPluginConfig(pluginName) {
    if (!this._usable) throw new UnusableError('Instance unusable!');
    if (!this.running) throw new NotRunningError('Room is not running.');

    if (typeof pluginName === 'string') {
      let config = await this.page.evaluate((pluginName) => {

        let plugin = HHM.manager.getPluginByName(pluginName);
        if (!plugin) {
          throw new TypeError(`Invalid plugin "${pluginName}".`);
        }

        return plugin.getConfig();
      }, pluginName);
      return config;
    }

    let config = await this.page.evaluate(() => {
      let plugins = HHM.manager.getLoadedPluginIds().map(id => {
        return HHM.manager.getPluginById(id);
      });
      let cfg = {};
      for (let plugin of plugins) {
        cfg[plugin] = plugin.getConfig();
      }
      return cfg;
    });
    return config;
  }
}

module.exports = RoomController;