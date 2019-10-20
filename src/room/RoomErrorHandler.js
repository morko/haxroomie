const logger = require('../logger');

/** Handles the errors that happen in the headless browser. */
class RoomErrorHandler {

  /**
   * @param {object} opt - Options.
   * @param {object} opt.page - RoomControllers page object.
   * @param {object} opt.emit - RoomControllers emit function.
   * @param {object} opt.setRoomState - RoomControllers setRoomState function.
   */
  constructor({ page, emit, setRoomState, roomId }) {
    this.page = page;
    this.emit = emit;
    this.setRoomState = setRoomState;
    this.roomId = roomId;

    this.handlePageError = this.handlePageError.bind(this);
    this.handleError = this.handleError.bind(this);

    this.page.on('pageerror', this.handlePageError);
    this.page.on('error', this.handleError);
  }

  /** 
   * Handle the `pageerror` event from Puppeteer.
   */
  handlePageError(error) {
    this.emit(`page-error`, error);
    logger.debug(`[${this.roomId}]: Page error: ${error}`);
  }

  /** 
   * Handle the `error` event from Puppeteer.
   */
  handleError(error) {
    this.emit(`page-crash`, error);
    this.setRoomState('_usable', false);
    logger.debug(`[${this.roomId}]: Page crashed: ${error}`);
  }
}

module.exports = RoomErrorHandler;