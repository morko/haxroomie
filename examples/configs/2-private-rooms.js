/**
 * Example haxroomie configuration file.
 * Opens 2 private room.
 * 
 * Copy this to the haxroomie directory and edit to your liking to
 * easily get haxroomie running.
 * 
 * CHANGE THE admin AND host PASSWORDS!!!
 */

let config = {
  'priv1': {
    autoStart: true,
    roomName: 'fs arena',
    playerName: 'host',
    maxPlayers: 20,
    public: true,
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: 'adminpass',
          host: 'hostpass',
        }
      }
    }
  },
  'priv2': {
    autoStart: true,
    roomName: 'fs arena',
    playerName: 'host',
    maxPlayers: 20,
    public: false,
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: 'adminpass',
          host: 'hostpass',
        }
      }
    }
  }
};
module.exports = config;