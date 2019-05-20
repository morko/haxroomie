/**
 * Example haxroomie configuration file.
 * Opens 1 room with a custom plugin. The script is located on
 * directory above this file and located using the node.js path module.
 * 
 * Setting the plugins object is useful for testing your plugins before
 * uploading them to GitHub or your server.
 * 
 * Copy this to the haxroomie directory and edit to your liking to
 * easily get haxroomie running.
 * 
 * CHANGE THE admin AND host PASSWORDS!!!
 */

const path = require('path');

let config = {
  'room': {
    autoStart: true,
    roomName: 'PRO 3v3',
    playerName: 'host',
    maxPlayers: 10,
    public: false,
    plugins: {
      'hr/autoadmin': path.join(__dirname, '..', 'room-script.js')
    }
  },
};
module.exports = config;