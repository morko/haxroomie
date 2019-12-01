/**
 * Example haxroomie configuration file.
 *
 * Opens one room with a simple custom roomscript. The script is located on
 * directory above this file and the fila path is parsed using the node.js
 * path module.
 *
 * This is useful starter config for ppl that are porting their scripts
 * to haxroomie. You can try adding other plugins incrementally to
 * test if they work with your script.
 */

const path = require('path');

let config = {
  room: {
    autoStart: true,
    roomName: `haxroomie`,
    playerName: `host`,
    maxPlayers: 10,
    public: true,
    roomScript: path.join(__dirname, '..', 'room-script.js'),
  },
};
module.exports = config;
