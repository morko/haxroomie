/** @module haxroomie */

require('dotenv').config();
const Haxroomie = require('./src/Haxroomie');
const logger = require('./src/logger');

/**
 * Asynchronous factory function to create an instance of
 * [Haxroomie]{@link Haxroomie} without
 * the need to call [Haxroomie#launchBrowser]{@link Haxroomie#launchBrowser}
 * after constructing the object.
 *
 * @param {object} options - Options for the Haxroomie constructor.
 * @returns {Haxroomie} - Ready to use instance of
 * [Haxroomie]{@link Haxroomie}.
 */
async function createHaxroomie(options) {
  let haxroomie = new Haxroomie(options);
  await haxroomie.launchBrowser();
  return haxroomie;
}

module.exports = {
  Haxroomie,
  createHaxroomie,
  logger,
};
