/**
 * Example haxroomie configuration file.
 * Opens 2 public rooms.
 * 
 * Copy this to the haxroomie directory and edit to your liking to
 * easily get haxroomie running.
 * 
 * CHANGE THE admin AND host PASSWORDS!!!
 */

let config = {
  'pub1': {
    autoStart: true,
    roomName: 'PRO 3v3 1',
    playerName: 'host',
    maxPlayers: 10,
    public: true,
    geo: { code: 'eu', lat: '52.5192', lon: '13.4061'},
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: 'adminpass',
          host: 'hostpass',
        }
      }
    }
  },
  'pub2': {
    autoStart: true,
    roomName: 'PRO 3v3 2',
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
  }
};
module.exports = config;