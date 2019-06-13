/**
 * Example haxroomie configuration file.
 * Opens 1 private room.
 * 
 * Copy this to the haxroomie directory and edit to your liking to
 * easily get haxroomie running.
 * 
 * CHANGE THE admin PASSWORD!!!
 */

let config = {
  'priv': {
    autoStart: true,
    roomName: 'fs arena',
    playerName: 'host',
    maxPlayers: 20,
    public: false,
    pluginConfig: {
      // get admin priviledges with !auth admin adminpass
      'sav/roles': {
        roles: {
          admin: 'adminpass',
        }
      }
    }
  }
};
module.exports = config;