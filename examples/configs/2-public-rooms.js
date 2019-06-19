/**
 * Example haxroomie configuration file.
 * Opens 2 public rooms.
 * 
 * Copy this to the haxroomie directory and edit to your liking to
 * easily get haxroomie running.
 * 
 * CHANGE THE admin PASSWORD!!!
 */

let config = {
  'pub1': {
    autoStart: true,
    roomName: `PRO 3v3 1`,
    playerName: `host`,
    maxPlayers: 10,
    public: true,
    repositories: [
      {
        type: `github`,
        repository: `morko/hhm-sala-plugins`
      }
    ],
    pluginConfig: {
      // get admin priviledges with !auth admin adminpass
      'sav/roles': {
        roles: {
          admin: `adminpass`,
        }
      },
      // spam protection
      'hr/spam': {},
      // ensures room always has an admin
      'hr/always-one-admin': {}
    }
  },
  'pub2': {
    autoStart: true,
    roomName: `PRO 3v3 2`,
    playerName: `host`,
    maxPlayers: 10,
    public: true,
    repositories: [
      {
        type: `github`,
        repository: `morko/hhm-sala-plugins`
      }
    ],
    pluginConfig: {
      // get admin priviledges with !auth admin adminpass
      'sav/roles': {
        roles: {
          admin: `adminpass`,
        }
      },
      // spam protection
      'hr/spam': {},
      // ensures room always has an admin
      'hr/always-one-admin': {}
    }
  }
};
module.exports = config;