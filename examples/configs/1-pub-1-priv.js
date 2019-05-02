/**
 * Example haxroomie configuration file.
 * Opens 1 public and 1 private room.
 * 
 * Copy this to the haxroomie directory and edit to your liking to
 * easily get haxroomie running.
 * 
 * CHANGE THE admin AND host PASSWORDS!!!
 */

let config = {
  'pub': {
    autoStart: true,
    roomName: 'PRO 3v3 1',
    playerName: 'host',
    maxPlayers: 10,
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
  'priv': {
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