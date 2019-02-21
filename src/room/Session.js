const logger = require('../logger');
const EventEmitter = require('events');

/**
 * Mediator that handles the communication between RoomController and its clients.
 * Clients can subscribe to the events with the subscribe function.
 * 
 * @fires Session#client_connected
 * @fires Session#client_disconnected
 */
module.exports = class Session extends EventEmitter {
  
  /**
   * Constructs a new Session object.
   * 
   * @param {object} opt - options
   * @param {object} opt.id - id of the session
   * @param {function} opt.onCallRoom - handler for requests to call a function
   *    in the haxball room object
   */
  constructor(opt) {
    super();

    this.validateArguments(opt);

    this.id = opt.id;
    this.onOpenRoom = opt.onOpenRoom;
    this.onCloseRoom = opt.onCloseRoom;
    this.onCallRoom = opt.onCallRoom;
    this.onGetPlugins = opt.onGetPlugins;
    this.onGetPlugin = opt.onGetPlugin;
    this.onEnablePlugin = opt.onEnablePlugin;
    this.onDisablePlugin = opt.onDisablePlugin;
    this.onGetDependentPlugins = opt.onGetDependentPlugins;

    this.subscriptions = {};
  }

  get [Symbol.toStringTag]() {
    return 'Session';
  }

  /**
   * @private
   * Validates the arguments for this sessions constructor.
   * 
   * @param {object} opt - argument object for the constructor
   */
  validateArguments(opt) {
    if (!opt) {
      throw new Error('Missing required argument: opt');
    }
    if (!opt.id && opt.id !== 0) {
      throw new Error('Missing required argument: opt.id');
    }

    let requiredHandlers = [
      'onOpenRoom',
      'onCloseRoom',
      'onCallRoom',
      'onGetPlugins',
      'onGetPlugin',
      'onEnablePlugin',
      'onDisablePlugin',
      'onGetDependentPlugins'
    ];

    for (let handler of requiredHandlers) {

      if (!opt[handler]) {
        throw new Error(`Missing required handler: ${handler}`);
      }
      if (typeof opt[handler] !== 'function') {
        throw new Error(`${handler} needs to be typeof function`);
      }
    }
  }

  /**
   * Subscribes to the events send by this session.
   * 
   * @param {string|number|object} id identifier of the subscriber
   * @param {function} handler function that handles the incoming messages
   */
  subscribe(id, handler) {
    if (!id && id !== 0) throw new Error('Missing required argument: id');
    if (!handler || typeof handler !== 'function') {
      throw new Error('Missing required argument: handler (has to be function)');
    }
    if (this.subscriptions.hasOwnProperty(id)) {
      throw new Error('Session already has subscriber with id ' + id);
    }
    if (id === this.id) {
      throw new Error('Client can not have the same id as the Session.');
    }
    logger.debug(`SUBSCRIBED "${id}" FOR SESSION "${this.id}"`);
    this.subscriptions[id] = handler;

    this.emit('client_connected', id);
  }

  /**
   * Unsubscribes the subscriber with given id from this session.
   * 
   * @param {string|number|object} id identifier of the subscriber
   */
  unsubscribe(id) {
    if (!id && id !== 0) throw new Error('Missing required argument: id');
    if (!this.subscriptions.hasOwnProperty(id)) {
      throw new Error ('No subscriptions found for id ' + id);
    }
    logger.debug(`UNSUBSCRIBE "${id}" FROM SESSION "${this.id}"`);

    delete this.subscriptions[id];
    this.emit('client_disconnected', id);
  }

   
  /**
   * Message object that can be sent with the sessions send method.
   * 
   * @typedef {Object} Message
   * @property {string} type - type of message
   * @property {string|number|object} sender - sender of the message
   * @property {object|Error} [payload] - Data of the message. Should be
   *    instanceof Error if error === true.
   * @property {boolean} [error] - Should be true if 
   *    (payload instanceof Error) === true. In other words when the sender
   *    wants to send an error to the receiver.
   */

  /**
   * Validates the give object to be valid Message object.
   * 
   * @param {Message} message - Message object to be validated
   */
  validateMessage(message) {
    if (!message) throw new Error('Missing required argument: message');
    if (!message.hasOwnProperty('type')) {
      throw new Error('Invalid message: missing message.type property');
    }
    if (!message.hasOwnProperty('sender')) {
      throw new Error('Invalid message: missing message.sender property');
    }
    if (message.error && (message.payload instanceof Error !== true)) {
      throw new Error(
        'payload should be instance of Error if error === true'
      );
    }
  }

  /**
   * Sends a message to the subscriber with given id.
   * 
   * @param {string|number|object} id - the id of subscriber that will receive
   *    the message
   * @param {Message} message - message to the receiver
   */
  send(id, message) {
    if (!id && id !== 0) throw new Error('Missing required argument: id');
    if (!this.subscriptions[id]) {
      throw new Error(`No session subscription for ${id}.`)
    }
    this.validateMessage(message);

    logger.debug(`SEND_TO ${id}: ${JSON.stringify(message)}`);
    this.subscriptions[id](message);
  }

  /**
   * Sends a message to all subscribers.
   * 
   * @param {Message} message - message to the subscribers
   */
  broadcast(message) {
    this.validateMessage(message);

    logger.debug(`BROADCAST ${JSON.stringify(message)}`);
    for (let subID in this.subscriptions) {
      this.subscriptions[subID](message);
    }
  }

  /**
   * Opens a headless haxball room in this sessions browser tab.
   * 
   * The config object can contain any properties you want to use in your
   * own HHM config file given in config.hhmConfigFile. The config object is
   * usable globally from within the HHM config as the **haxroomie** object.
   * 
   * The parameters that are used by the default HHM config are listed here
   * as optional parameters (except `hhmConfigFile` and `pluginFiles` that
   * are used anyways)
   * 
   * @param {object} config - config object that gets injected to HHM config
   *    as **haxroomie**
   * @param {string} config.token - token to start the room with from 
   *    https://www.haxball.com/headlesstoken
   * @param {string} [config.roomName] - room name
   * @param {string} [config.playerName] - host player name
   * @param {int} [config.maxPlayers] - max players
   * @param {boolean} [config.public] - should the room be public
   * @param {string} [config.adminPassword] - admin role password in room
   * @param {object} [config.hhmConfigFile] - Configuration for the haxball 
   *    headless manager (HHM). Object must contain name and content properties
   *    where name is the file/config name and content has the file contents.
   *    Both properties shold be strings.
   * @param {Array.<objects>} [config.pluginFiles] - Optional HHM plugins to load when 
   *    starting the room. Objects must contain name and content properties where
   *    name is the file/plugin name and content has the file contents. Both
   *    properties shold be strings.
   * 
   * @returns {object} - config object with a roomLink property
   */
  async openRoom(config) {
    logger.debug(`OPEN_ROOM: ${JSON.stringify(config)}`);
    return this.onOpenRoom(config);
  }

  /**
   * Closes the headless haxball room in this sessions browser tab.
   */
  async closeRoom() {
    logger.debug(`CLOSE_ROOM`);
    return this.onCloseRoom();
  }

  /**
   * Calls a function of the haxball roomObject in the browsers context.
   * 
   * @param {string} fn - name of the haxball roomObject function
   * @param {any} ...args - arguments for the function
   */
  async callRoom(fn, ...args) {
    if (!fn) {
      throw new Error('Missing required argument: fn');
    }
    logger.debug(`CALL_ROOM: ${JSON.stringify(fn)} ARGS: ${JSON.stringify(args)}`);
    return this.onCallRoom(fn, ...args);
  }
 
  /**
   * Object containing information about a plugin.
   * 
   * @typedef {Object} PluginData
   * @property {number} id - The plugin id
   * @property {boolean} isEnabled - Indicates whether the plugin is enabled or disabled.
   * @property {object} [pluginSpec] - HHM pluginSpec property.
   */

  /**
   * Returns a list of PluginData objects.
   * @returns {Promise<Array.<PluginData>>} - array of plugins
   */
  async getPlugins() {
    logger.debug(`GET_PLUGINS`);
    return this.onGetPlugins();
  }

  /**
   * Returns PluginData of the given plugin id.
   * 
   * @param {string} name - name of the plugin
   * @returns {Promise<PluginData>|null} - data of the plugin or null if
   *    plugin was not found
   */
  async getPlugin(name) {
    logger.debug(`GET_PLUGIN: ${name}`);
    return this.onGetPlugin(name);
  }

  /**
   * Enables a HHM plugin with the given id.
   * 
   * @param {string} name - name of the plugin
   * @returns {Promise<boolean} - was the plugin enabled or not?
   */
  async enablePlugin(name) {
    logger.debug(`ENABLE_PLUGIN: ${name}`);
    return this.onEnablePlugin(name);
  }

  /**
   * Disables a HHM plugin with the given id. If the name is an Array then
   * it disables all the plugins in the given order.
   * 
   * @param {string|Array} name - name or array of names of the plugin(s)
   * @returns {Promise<boolean} - was the plugin disabled or not?
   */
  async disablePlugin(name) {
    logger.debug(`DISABLE_PLUGIN: ${name}`);
    return this.onDisablePlugin(name);
  }

  /**
   * Gets a list of plugins that depend on the given plugin.
   * 
   * @param {string} name - name of the plugin
   * @returns {Promise<Array.<PluginData>>} - array of plugins
   */
  async getDependentPlugins(name) {
    logger.debug(`GET_DEPENDENT_PLUGINS: ${name}`);
    return this.onGetDependentPlugins(name);
  }
}
