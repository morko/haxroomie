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
   * @param {function} opt.onClientAction - handler for the actions that are sent 
   *    by clients
   * @param {function} opt.onCallRoom - handler for requests to call a function
   *    in the haxball room object
   */
  constructor(opt) {
    super(opt);
    if (!opt) {
      throw new Error('Missing required argument: opt');
    }
    if (!opt.id && opt.id !== 0) {
      throw new Error('Missing required argument: opt.id');
    }
    if (!opt.onClientAction) {
      throw new Error('Missing required argument: opt.onClientAction');
    }
    if (!opt.onCallRoom) {
      throw new Error('Missing required argument: opt.onCallRoom');
    }
    if (typeof opt.onClientAction !== 'function') {
      throw new Error('opt.onClientAction needs to be typeof function');
    }
    if (typeof opt.onCallRoom !== 'function') {
      throw new Error('opt.onCallRoom needs to be typeof function');
    }

    this.opt = opt;
    this.id = this.opt.id;
    this.onCallRoom = opt.onCallRoom;
    this.onClientAction = opt.onClientAction;

    this.actionFactory = require('haxroomie-action-factory')(this.id);

    this.subscriptions = {};
  }

  get [Symbol.toStringTag]() {
    return 'Session';
  }

  validateArguments(opt) {

    return opt;
  }

  /**
   * @param {string|number|object} id identifier of the subscriber
   * @param {function} actionHandler function that handles the incoming actions
   */
  subscribe(id, actionHandler) {
    if (!id && id !== 0) throw new Error('Missing required argument: id');
    if (!actionHandler || typeof actionHandler !== 'function') {
      throw new Error('Missing required argument: "actionHandler" function');
    }
    if (this.subscriptions.hasOwnProperty(id)) {
      throw new Error('Session already has subscriber with id ' + id);
    }
    if (id === this.id) {
      throw new Error('Client can not have the same id as the Session.');
    }
    logger.debug(`SUBSCRIBED "${id}" FOR SESSION "${this.id}"`);
    this.subscriptions[id] = actionHandler;

    this.emit('client_connected', id);
  }

  unsubscribe(id) {
    if (!id && id !== 0) throw new Error('Missing required argument: id');
    if (!this.subscriptions.hasOwnProperty(id)) {
      throw new Error ('No subscriptions found for id ' + id);
    }
    logger.debug(`UNSUBSCRIBE "${id}" FROM SESSION "${this.id}"`);

    let action = this.actionFactory.create('CLIENT_DISCONNECTED', { id: id });

    delete this.subscriptions[id];
    this.emit('client_disconnected', id);

  }

  send(id, action) {
    if (!action) throw new Error('Missing required argument: action');
    if (!action.hasOwnProperty('type')) {
      throw new Error('Invalid action: missing action.type property');
    }
    if (!action.hasOwnProperty('sender')) {
      throw new Error('Invalid action: missing action.sender property');
    }
    if (!id && id !== 0) throw new Error('Missing required argument: id');

    if (!this.subscriptions[id]) {
      throw new Error(`No session subscription for ${id}.`)
    }

    logger.debug(`SEND_TO ${id}: ${JSON.stringify(action)}`);
    this.subscriptions[id](action);
  }

  async sendToRoom(action) {
    if (!action) throw new Error('Missing required argument: action');
    if (!action.hasOwnProperty('type')) {
      throw new Error('Invalid action: missing action.type property');
    }
    if (!action.hasOwnProperty('sender')) {
      throw new Error('Invalid action: missing action.sender property');
    }
    logger.debug(`SEND_TO_ROOM ${this.id}: ${JSON.stringify(action)}`);

    try {
      return await this.onClientAction(action);
    } catch (err) {
      logger.error(`SEND_TO_ROOM_ERROR (${this.id}): ${err.stack}`);
      return null;
    }
  }

  async callRoom(fn, ...args) {
    if (!fn) {
      throw new Error('Missing required argument: fn');
    }
    logger.debug(`CALL_ROOM: ${JSON.stringify(fn)} ARGS: ${JSON.stringify(args)}`);
    return this.onCallRoom(fn, ...args);
  }

  broadcast(action) {
    if (!action) throw new Error('Missing required argument: action');
    if (!action.hasOwnProperty('type')) {
      throw new Error('Invalid action: missing action.type property');
    }
    if (!action.hasOwnProperty('sender')) {
      throw new Error('Invalid action: missing action.sender property');
    }

    logger.debug(`BROADCAST ${JSON.stringify(action)}`);
    for (let subID in this.subscriptions) {
      this.subscriptions[subID](action);
    }
  }
}
