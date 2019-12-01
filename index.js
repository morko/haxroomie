require('dotenv').config();

/**
 * Main module of Haxroomie.
 *
 * Can be obtained with
 * ```js
 * const haxroomie = require('haxroomie');
 * ```
 *
 * @module haxroomie
 */
const Haxroomie = require('./src/Haxroomie');

const haxroomie = {
  Haxroomie,
  createHaxroomie,
};

/**
 * Asynchronous factory function to create an instance of
 * [Haxroomie]{@link Haxroomie} without
 * the need to call [Haxroomie#launchBrowser]{@link Haxroomie#launchBrowser}
 * after constructing the object.
 *
 * @param {object} opt - Options for the Haxroomie constructor.
 * @returns {Haxroomie} - Ready to use instance of
 * [Haxroomie]{@link Haxroomie}.
 */
async function createHaxroomie(opt) {
  let haxroomie = new Haxroomie(opt);
  await haxroomie.launchBrowser();
  return haxroomie;
}

module.exports = haxroomie;
