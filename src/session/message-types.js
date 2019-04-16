/**
 * Contains message/event types that Haxroomie sends to the clients
 * subscribed to a session.
 * 
 * All messages follow a format explained 
 * in [Message type definition]{@link module:haxroomie~Message}.
 * @namespace
 * @memberof module:haxroomie
 */
const messageTypes = {
  /**
   * Broadcasted when a new client connects to the session with the subscribe method.
   * 
   * Payload:
   * ```js
   * {
   *   roomInfo: object containing information about the running room | undefined,
   *   clientID: id of the client that connected
   * }
   * ```
   */
  CLIENT_CONNECTED: 'CLIENT_CONNECTED',
  /**
   * Broadcasted when client disconnects from the session with the unsubscribe method.
   * 
   * Payload:
   * ```js
   * {
    *   clientID: id of the client that disconnected
    * }
    * ```
   */
  CLIENT_DISCONNECTED: 'CLIENT_DISCONNECTED',
  /**
   * Broadcasted when one of the clients successfully requests haxroomie to
   * open a new haxball headless room with the session.openRoom method.
   * 
   * When the opening is in process, other clients can not request to open
   * room. When the process is done an OPEN_ROOM_STOP message will be
   * broadcasted.
   * 
   * Payload:
   * ```js
   * undefined
   * ```
   */
  OPEN_ROOM_START: 'OPEN_ROOM_START',
  /**
   * Broadcasted when the process of opening the haxball headless room has
   * completed.
   * 
   * Payload:
   * ```js
   * {
   *   roomInfo: object containing information about the running room
   * }
   * ```
   */
  OPEN_ROOM_STOP: 'OPEN_ROOM_STOP',
  /**
   * Broadcasted when one of the clients has requested to close the room
   * with the session.closeRoom method.
   * 
   * Payload:
   * ```js
   * undefined
   * ```
   */
  ROOM_CLOSED: 'ROOM_CLOSED',
  /**
   * Broadcasted when haxball headless roomObject emits some event.
   * 
   * Payload:
   * ```js
   * {
   *   handlerName: name of the roomObject handler function,
   *   args: array of arguments that the handler receives
   * }
   * ```
   */
  ROOM_EVENT: 'ROOM_EVENT',
  /**
   * Broadcasted when haxball headless manager (HHM) emits some event.
   * 
   * Payload:
   * ```js
   * {
   *   eventType: name of the HHM event type,
   *   args: array of arguments that the handler receives
   * }
   * ```
   */
  HHM_EVENT: 'HHM_EVENT',
  /**
   * Broadcasted when the page (tab) in the browser encounters some error.
   * 
   * Payload:
   * ```js
   * instanceof Error
   * ```
   */
  PAGE_ERROR: 'PAGE_ERROR',
  /**
   * Broadcasted when the browser page (tab) gets closed. This happens when
   * user manually closes the tab that this session is attached to.
   * 
   * This also renders the session unusable.
   * 
   * Payload:
   * ```js
   * undefined
   * ```
   */
  SESSION_CLOSED: 'SESSION_CLOSED',
  /**
   * Broadcasted when the browser page (tab) crashes.
   * 
   * This also renders the session unusable.
   * 
   * Payload:
   * ```js
   * instanceof Error
   * ```
   */
  SESSION_ERROR: 'SESSION_ERROR'
}

module.exports = messageTypes;