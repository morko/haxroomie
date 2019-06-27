/**
 * Example haxroomie configuration file.
 * Opens 1 private room.
 */

let config = {
  'priv': {
    autoStart: true,
    roomName: `haxroomie`,
    playerName: `host`,
    maxPlayers: 20,
    public: false,
    repositories: [
      // salamini's repository from https://github.com/morko/hhm-sala-plugins
      {
        type: 'github',
        repository: 'morko/hhm-sala-plugins'
      },
      // Herna's repository from https://github.com/XHerna/hhm-plugins
      {
        type: 'github',
        repository: 'XHerna/hhm-plugins'
      },
    ],
    pluginConfig: {
      // uncomment the 'sav/roles' property if you want admin passwords
      /*
      'sav/roles': {
        roles: {
          // get admin priviledges with !auth admin adminpass
          admin: `adminpass`,
          // get host priviledges with !auth host hostpass
          host: `hostpass`
        }
      },
      */
      // always have one admin in the room
      'hr/always-one-admin': {},
      // allows players to pause writing 'p'
      'hr/pause': {
        // tells this plugin that players can pause unlimited times per game
        maxPauseTimes: 0
      },
      // keeps track of banned players and has some commands for players with
      // admin or host priviledges
      'hr/kickban': {},
    }
  }
};
module.exports = config;