HHM = typeof HHM === `undefined` ? {} : HHM;
HHM.baseUrl = HHM.baseUrl || `https://haxplugins.tk/`;
HHM.config = HHM.config || {};

HHM.config.room = {
  roomName: haxroomie.roomName || `haxroomie`,
  playerName : haxroomie.playerName || `host`,
  maxPlayers: haxroomie.maxPlayers || 10,
  public : haxroomie.hasOwnProperty('public') ? haxroomie.public : false,
  password: haxroomie.password || undefined,
  geo: haxroomie.geo || {code: `FI`, lat: 60.192059, lon: 24.945831},
  token: haxroomie.token
};

HHM.config.postInit = HBInit => {
  let room = HBInit();

  room.setDefaultStadium(`Big`);
  room.setScoreLimit(0);
  room.setTimeLimit(7);
};

HHM.config.plugins = {
  'sav/commands': {
    commandPrefix: `!`,
  },
  'sav/roles': {
    roles: {
      'host': haxroomie.hostPassword,
      'admin': haxroomie.adminPassword,
    },
  },
  'sav/players': {},
  'sav/chat': {}
};

HHM.config.repositories = [
  { url: `${HHM.baseUrl}plugins/hhm-plugins/` },
];

HHM.config.dryRun = false;

HHM.config.trueHeadless = true;

HHM.config.sendChatMaxLength = 2686;

// Load HHM if it has not already been loaded
if (HHM.manager === undefined) {
  let s = document.createElement(`script`);
  s.src = `${HHM.baseUrl}/hhm.js`;
  document.head.appendChild(s);
}
