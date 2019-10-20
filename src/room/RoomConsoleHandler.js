const logger = require('../logger');

/** Handles the console logs that happen in the headless browser. */
class RoomErrorHandler {

  /**
   * @param {object} opt - Options.
   * @param {object} opt.page - RoomControllers page object.
   * @param {object} opt.emit - RoomControllers emit function.
   */
  constructor({ page, emit, roomId }) {
    this.page = page;
    this.emit = emit;
    this.roomId = roomId;

    this.handleConsole = this.handleConsole.bind(this);

    this.page.on('console', this.handleConsole);
  }

  /** 
   * Handle the `console` event from Puppeteer.
   */
  handleConsole(msg) {
    if (msg.type() === 'error') {
      this.handleConsoleError(msg);
    } else if (msg.type() === 'warning') {
      this.handleConsoleWarning(msg);
    } else {
      logger.debug(`[${this.roomId}]: ${msg.text()}`);
    }
  }
  /**
   * Handle console messages of type `error`.
   */
  handleConsoleError(msg) {  
    
    if (this.ignoreConsoleMsg(msg)) {
      return;
    }

    let logMsg = '';
    for (let jsHandle of msg.args()) {
      if (jsHandle._remoteObject.type === 'object') {
        logMsg += jsHandle._remoteObject.description;
      }
    }
    if (!logMsg) logMsg = msg.text();
    if (!logMsg) return;

    this.emit(`error-logged`, logMsg);
    logger.debug(`[${this.roomId}]: Error logged: ${logMsg}`);
  }


  /**
   * Handle console messages of type `warning`.
   */
  handleConsoleWarning(msg) {

    if (this.ignoreConsoleMsg(msg)) {
      return;
    }

    let logMsg = msg.text();
    if (!logMsg) return;

    this.emit(`warning-logged`, logMsg);
    logger.debug(`[${this.roomId}]: Warning logged: ${logMsg}`);
  }

  ignoreConsoleMsg(msg) {
    const text = msg.text();

    // ignore the errors that happen during loading plugins
    if (text.startsWith(
      `Failed to load resource: the server responded with a status of 404`)
    ) {
      return true;
    }

    // do not display warning that happens during loading HHM
    if (msg.text().startsWith( '[WARN HHM]:  No room config was provided')) {
      return true;
    }
    return false;
  }

}

module.exports = RoomErrorHandler;