/**
 * Example haxroomie configuration file.
 * Opens 1 room with a simple custom roomscript. The script is located on
 * directory above this file and located using the node.js path module.
 * 
 * Copy this to the haxroomie directory and edit to your liking to
 * easily get haxroomie running.
 */

const path = require('path');

let config = {
  'room': {
    autoStart: true,
    roomName: 'PRO 3v3',
    playerName: 'host',
    maxPlayers: 10,
    public: true,
    roomScript: path.join(__dirname, '..', 'room-script.js')
  },
};
module.exports = config;