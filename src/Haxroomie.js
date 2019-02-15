const { RoomController } = require('./room');
const puppeteer = require('puppeteer');
const logger = require('./logger');

module.exports = class Haxroomie {

  constructor(opt) {
    this.browser = null;
    this.roomSessions = {};

    opt = opt || {};
    /*
     * The size of the headless browsers viewport.
     */
    this.viewport = opt.viewport || { width: 400, height: 500 };
    /**
     * The port that the chromium headless browser will use as the
     * remote-debugging-port. Default is 3066
     *
     * NOTE: It is best to select a port that is not open outside your LAN for
     * security reasons.
     */

    if (this.port === 0) {
      throw new Error('INVALID_PORT: 0');
    }
    this.port = opt.port || 3066;

    /**
     * Makes chrome run without sandbox. Useful only if chrome wont launch in
     * sandboxed mode.
     */
    this.noSandbox = opt.noSandbox || false;
    /**
     * Setting this to false will make puppeteer try to spawn a window. Normally
     * you don't need this unless debugging.
     */
    this.headless = opt.hasOwnProperty('headless') ? opt.headless : true;
  }

  async createBrowser() {
    // make sure there isnt a browser running already
    let browser = await this.getRunningBrowser();
    // if there is a browser running throw an error
    if (browser) {
      throw new Error(
        `BROWSER_RUNNING: http://localhost:${this.port}.
        Use another port or close the browser.`
      )
    }

    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: this.headless,
        devtools: !this.headless,
        args: [
          `--remote-debugging-port=${this.port}`,
          `--no-sandbox=${this.noSandbox}`
        ]
      });
    }
    return this.browser;
  }

  async getRunningBrowser() {
    try {
      this.browser = await puppeteer.connect({
        browserURL: `http://localhost:${this.port}`
      });
    } catch (err) {
      return null;
    }
    return this.browser;
  }

  async closeBrowser() {
    if (this.browser) await this.browser.close();
  }

  async getSession(sessionID) {
    if (!this.browser) {
      throw new Error(`Browser is not running!`)
    }
    if (!sessionID && sessionID !== 0) {
      throw new Error('Missing required argument: sessionID');
    }
    // if there are no sessions get the default page
    if (Object.keys(this.roomSessions).length === 0) {
      let pages = await this.browser.pages();
      let page = pages[0];
      let session = await this.initSession(page, sessionID);
      return session;
    }

    // if the session does not exist, create a new page
    if (!this.roomSessions[sessionID]) {
      let page = await this.browser.newPage();
      let session = this.initSession(page, sessionID);
      return session;
    }

    // if the session exists then return it
    return this.roomSessions[sessionID].session;
  }

  /**
   * @private
   */
  async initSession(page, sessionID) {
    page.on('console', (msg) => {
      logger.debug(`ROOM_LOG (${sessionID}): ${msg.text()}`);
    });

    const device = {
      'name': 'Galaxy S5',
      'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3452.0 Mobile Safari/537.36',
      'viewport': {
        'width': this.viewport.width,
        'height': this.viewport.height,
        'deviceScaleFactor': 1,
        'isMobile': false,
        'hasTouch': false,
        'isLandscape': false
      }
    }

    await page.emulate(device);

    let room = new RoomController({
      page: page,
      id: sessionID,
    });
    page.on('pageerror', (error) => {
      let errorAction = room.actionFactory.createError(
        `BROWSER_ERROR`,
        `(${sessionID}): ${error.message}`
      );
      room.session.broadcast(errorAction);
    });

    this.roomSessions[sessionID] = room;

    return room.session;
  }
}
