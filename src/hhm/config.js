// Do not edit this block unless you know what you are doing

HHM = typeof HHM === `undefined` ? {} : HHM;
HHM.baseUrl = HHM.baseUrl || `https://haxplugins.tk/`;
HHM.config = HHM.config || {};
haxroomie = typeof haxroomie === `undefined` ? {} : haxroomie;

HHM.config.room = {
  roomName: haxroomie.roomName || `haxroomie`,
  playerName : haxroomie.playerName || `host`,
  maxPlayers: haxroomie.maxPlayers || 10,
  public : haxroomie.hasOwnProperty(`public`) ? haxroomie.public : false,
  password: haxroomie.password || undefined,
  geo: haxroomie.geo || undefined,
  token: haxroomie.token
};

HHM.config.postInit = HBInit => {
  let room = HBInit();

  room.onRoomLink = () => {
    room.setDefaultStadium(`Big`);
    room.setScoreLimit(0);
    room.setTimeLimit(7);
  }
};

pluginConfig = haxroomie.pluginConfig || {};
pluginConfig[`sav/roles`] = pluginConfig[`sav/roles`] || {};
pluginConfig[`sav/roles`].roles = pluginConfig[`sav/roles`].roles || {};
pluginConfig[`sav/players`] = pluginConfig[`sav/players`] || {};
pluginConfig[`sav/commands`] = pluginConfig[`sav/commands`] || {};

pluginConfig[`sav/roles`].roles.admin = pluginConfig[`sav/roles`].roles.admin ||  haxroomie.adminPassword;
pluginConfig[`sav/roles`].roles.host = pluginConfig[`sav/roles`].roles.host || haxroomie.hostPassword;
pluginConfig[`sav/players`].addPlayerIdToNickname = pluginConfig[`sav/players`].hasOwnProperty(`addPlayerIdToNickname`)
  ? pluginConfig[`sav/players`].addPlayerIdToNickname
  : true;
pluginConfig[`sav/commands`].commandPrefix = pluginConfig[`sav/commands`].commandPrefix || `!`;
HHM.config.plugins = pluginConfig;

HHM.config.repositories = [
  {
    url: `${HHM.baseUrl}plugins/hhm-plugins/`,
  },
  {
    url: `${HHM.baseUrl}plugins/fm/`,
  },
  {
    type: `github`,
    repository: `saviola777/hhm-plugins`
  },
];

if (haxroomie.repositories) {
  for (let i = 0; i < haxroomie.repositories.length; i++) {
    let urlParts = haxroomie.repositories[i].split(`/`);

    if (urlParts.length > 2 && urlParts[2] === `github.com`) {
      if (urlParts.length < 5) {
        throw new Error(`Invalid GitHub repository format.`);
      }
      haxroomie.repositories[i] = {
        type: `github`,
        repository: `${urlParts[3]}/${urlParts[4]}`
      }
      if (urlParts.length > 6) {
        haxroomie.repositories[i].branch = urlParts[6];
      }
      if (urlParts.length > 7) {
        haxroomie.repositories[i].path = urlParts[7];
      }
    }
  }

  HHM.config.repositories = [
    ...HHM.config.repositories, 
    ...haxroomie.repositories
  ];
}

if (haxroomie.roomScript) {
  HHM.config.plugins = {};
}

HHM.config.dryRun = false;

HHM.config.trueHeadless = true;

HHM.config.sendChatMaxLength = 2686;

// Load HHM if it has not already been loaded
if (HHM.manager === undefined) {
  let s = document.createElement(`script`);
  s.src = `${HHM.baseUrl}hhm.js`;
  document.head.appendChild(s);
}
