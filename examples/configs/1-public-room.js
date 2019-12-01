/**
 * Example haxroomie configuration file.
 * Opens 2 public rooms.
 */

let config = {
  pub: {
    autoStart: true,
    roomName: `haxroomie`,
    playerName: `host`,
    maxPlayers: 10,
    public: true,
    repositories: [
      // salamini's repository from https://github.com/morko/hhm-sala-plugins
      {
        type: 'github',
        repository: 'morko/hhm-sala-plugins',
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
      // spam protection
      'hr/spam': {},
      // ensures room always has an admin
      'hr/always-one-admin': {},
      // allows players to pause writing 'p'
      'hr/pause': {
        // tells this plugin that players can pause 1 time per game
        maxPauseTimes: 1,
      },
      // keeps track of banned players and has some commands for players with
      // admin or host priviledges
      'hr/kickban': {},
    },
  },
};
module.exports = config;
