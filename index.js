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
const { messageTypes } = require('./src/session')

    
/**
 * Messages are used to emit events through the {@link Session}. To recieve
 * these messages you must subscribe to them using the 
 * {@link Session#subscribe} method. All messages
 * must follow a specific format described here.
 * 
 * The Haxroomie messages are almost similar to
 * [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action). 
 * **The difference is** that each message MUST contain the sender. This 
 * enables better support for private messages.
 * If the message came from Haxroomie, then `sender === session.id`.
 * 
 * Message objects can be sent with {@link Session#send} and 
 * {@link Session#broadcast}.
 * 
 * @typedef {Object} Message
 * @property {string} type - type of message
 * @property {string|number|object} sender - sender of the message
 * @property {object|Error} [payload] - Data of the message. Should be
 *    `instanceof Error` if `error === true`.
 * @property {boolean} [error] - Should be true if 
 *    `(payload instanceof Error) === true`. In other words when the sender
 *    wants to send an error to the receiver.
 */

const haxroomie = {
  Haxroomie,
  createHaxroomie,
  messageTypes
};

/**
 * Asynchronous factory function to create an instance of 
 * [Haxroomie]{@link module:haxroomie.Haxroomie} without
 * the need to call [Haxroomie#createBrowser]{@link module:haxroomie.Haxroomie#createBrowser}
 * after constructing the object.
 * 
 * @param {object} opt - Options for the Haxroomie constructor.
 * @returns {module:haxroomie.Haxroomie} - Ready to use instance of 
 * [Haxroomie]{@link module:haxroomie.Haxroomie}.
 */
async function createHaxroomie(opt) {
  let haxroomie = new Haxroomie(opt);
  await haxroomie.createBrowser();
  return haxroomie;
}

module.exports = haxroomie;