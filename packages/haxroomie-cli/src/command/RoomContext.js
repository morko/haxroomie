/**
 * This wraps dependencies for the CommandHandler instances.
 *
 * It is easier to pass this context object to each one than to pass all the
 * required dependencies in to the constructors.
 */

class RoomContext {
  constructor({
    room,
    config,
    haxroomie,
    openRoom,
    closeRoom,
    setRoom,
    createRoom,
  } = {}) {
    if (!room) new TypeError('invalid arguments');
    if (!config) new TypeError('invalid arguments');
    if (!haxroomie) new TypeError('invalid arguments');
    if (!setRoom) new TypeError('invalid arguments');
    if (!openRoom) new TypeError('invalid arguments');
    if (!closeRoom) new TypeError('invalid arguments');
    if (!createRoom) new TypeError('invalid arguments');

    this.room = room;
    this.config = config;
    this.haxroomie = haxroomie;
    this.setRoom = setRoom;
    this.openRoom = openRoom;
    this.closeRoom = closeRoom;
    this.createRoom = createRoom;
  }
}

module.exports = RoomContext;
