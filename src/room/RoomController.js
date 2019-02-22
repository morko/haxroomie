const Session = require('./Session');
const RoomOpener = require('./RoomOpener');

module.exports = class RoomController {

  constructor(opt) {
    if (!opt) throw new Error('Missing required argument: opt');
    if (!opt.page) throw new Error('Missing required argument: opt.page');
    if (!opt.id && opt.id !== 0) {
      throw new Error('Missing required argument: opt.id');
    }
    
    /** puppeteer.Page object */
    this.page = opt.page;

    /**
     * ID is used to be able to send and recieve actions from clients through 
     * the Session object. The session.id will be equal to this.
     */
    this.id = opt.id;

    /**
     * Session object that can talk to clients.
     */
    this.session = this.createSession(this.id);

    /**
     * Holds the room info if the room has been opened.
     *
     * The roomInfo Object contains the HaxBall roomConfig Object with with
     * roomLink property attached to it.
     */
    this.roomInfo = null;

    /**
     * This will be set to true when one of the clients request the
     * OPEN_ROOM. Other clients can not request OPEN_ROOM when this is not null.
     */
    this.openRoomInProcess = null;
    
    /**
     * Creates actions and error actions easily
     */
    this.actionFactory = require('haxroomie-action-factory')(this.id);

    /**
     * How many seconds to wait for the roomLink when opening the haxball room
     * before failing.
     */
    this.timeout = 8;

    /**
     * Handles the opening and closing processes room.
     */
    this.roomOpener = this.createRoomOpener();
  }

  get [Symbol.toStringTag]() {
    return 'RoomController';
  }

  createSession(id) {
    let session = new Session({
      id: this.id,
      onOpenRoom: (config) => this.handleOpenRoom(config),
      onCloseRoom: () => this.handleCloseRoom(),
      onCallRoom: (fn, ...args) => this.handleCallRoom(fn, ...args),
      onGetPlugins: () => this.handleGetPlugins(),
      onGetPlugin: (id) => this.handleGetPlugin(id),
      onEnablePlugin: (name) => this.handleEnablePlugin(name),
      onDisablePlugin: (name) => this.handleDisablePlugin(name),
      onGetDependentPlugins: (name) => this.handleGetDependentPlugins(name)
    });
    session.on('client_connected', this.handleClientConnected.bind(this));
    session.on('client_disconnected', this.handleClientDisconnected.bind(this));
    return session;
  }

  createRoomOpener() {
    let roomOpener = new RoomOpener({
      page: this.page,
      actionFactory: this.actionFactory,
      onEventFromBrowser: (action) => this.onEventFromBrowser(action),
      timeout: this.timeout
    });
    return roomOpener;
  }
  
  /**
   * This function receives the actions sent from the headless browser context.
   *
   * If action type is **'ROOM_EVENT'**, then the payload contains *args* and
   * *handlerName* properties. The default event handlers are listed in
   * https://github.com/morko/haxroomie/blob/master/src/hhm/haxroomie-plugin.js
   * 
   * If action type is **'HHM_EVENT'**, then the payload contains *args* and
   * *eventType* properties. The event types are listed in
   * https://github.com/saviola777/haxball-headless-manager/blob/master/src/namespace.js
   *
   * @param {Action} action
   */
  async onEventFromBrowser(action) {
    action.sender = this.id;
    this.broadcast(action);
  }

  /**
   * Broadcast action to all clients subscribed to the Session.
   */
  broadcast(action) {
    if(!this.session) return false;
    this.session.broadcast(action);
    return true;
  }
  /**
   * Send an action to a client with clientID that is subscribed to the 
   * Session.
   * 
   * @param {any} clientID id of the client
   * @param {action} action action to send to the client
   * @return {boolean} was sending successfull
   */
  send(clientID, action) {
    if(!this.session) return false;
    this.session.send(clientID, action);
    return true;
  }

  /**
   * This gets called when a client subscribes to this rooms session.
   * Broadcasts the information to all subscribed clients.
   * 
   * @param {any} id id of client that subscribed to session
   */
  handleClientConnected(id) {
    let message = {
      type: 'CLIENT_CONNECTED',
      sender: this.id,
      payload: {
        roomInfo: this.roomInfo,
        clientID: id,
        sessionID: this.session.id,
      }
    }
    this.broadcast(message);
  }
  /**
   * This gets called when a client unsubscribes from this.session.
   * Broadcasts the information to all subscribed clients.
   * 
   * @param {any} id id of client that unsubscribed from session
   */
  handleClientDisconnected(id) {
    let message = {
      type: 'CLIENT_DISCONNECTED',
      sender: this.id,
      payload: { clientID: id }
    }
    this.broadcast(message);
  }

  /**
   * Handler for the openRoom function in this.session.
   * See Session for documentation.
   */
  async handleOpenRoom(config) {

    if (this.openRoomInProcess !== null) {
      throw new Error('Room is already being opened!');
    }

    this.openRoomInProcess = true;
    this.broadcast({
      type: 'OPEN_ROOM_START',
      sender: this.id
    });

    let result = await this.roomOpener.open(config);
    this.openRoomInProcess = false;
    if (!result.error) this.roomInfo = result.payload.roomInfo;
    this.broadcast(result);
  }

  /**
   * Handler for the closeRoom function in this.session.
   * See Session for documentation.
   */
  async handleCloseRoom() {
    await this.roomOpener.close();
    this.roomInfo = null;
    this.broadcast({
      type: 'ROOM_CLOSED',
      sender: this.id
    });
  }

  /**
   * Handler for the callRoom function in this.session.
   * See Session for documentation.
   */
  async handleCallRoom(fn, ...args) {
    let result = await this.page.evaluate((fn, args) => {
      return window.hroomie.callRoom(fn, ...args);
    }, fn, args);
    if (result.error) {
      throw new Error(result.payload);
    }
    return result.payload.result;
  }

  /**
   * Handler for the getPlugins function in this.session.
   * See Session for documentation.
   */
  async handleGetPlugins() {
    let result = await this.page.evaluate(() => {
      return window.hroomie.getPlugins();
    });
    return result;
  }

  /**
   * Handler for the getPlugin function in this.session.
   * See Session for documentation.
   */
  async handleGetPlugin(name) {
    let result = await this.page.evaluate((name) => {
      return window.hroomie.getPlugin(name);
    }, name);
    return result;
  }

  /**
   * Handler for the enablePlugin function in this.session.
   * See Session for documentation.
   */
  async handleEnablePlugin(name) {
    let result = await this.page.evaluate((name) => {
      return window.hroomie.enablePlugin(name);
    }, name);
    return result;
  }

  /**
   * Handler for the disablePlugin function in this.session.
   * See Session for documentation.
   */
  async handleDisablePlugin(name) {
    let result = await this.page.evaluate((name) => {
      return window.hroomie.disablePlugin(name);
    }, name);
    return result;
  }

  /**
   * Handler for the getDependentPlugins function in this.session.
   * See Session for documentation.
   */
  async handleGetDependentPlugins(name) {
    let result = await this.page.evaluate((name) => {
      return window.hroomie.getDependentPlugins(name);
    }, name);
    return result;
  }
}
