HHM = typeof HHM === `undefined` ? {} : HHM;
HHM.baseUrl = HHM.baseUrl || `https://haxplugins.tk/`;
HHM.config = HHM.config || {};
haxroomie = typeof haxroomie === `undefined` ? {} : haxroomie;
window.hroomie = window.hroomie || {};

/**
 * Source from <https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge>
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
window.hroomie.isObject = function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Source from <https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge>
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
window.hroomie.mergeDeep = function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

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
    // This tells haxroomie that HHM has fully loaded and it RoomOpener
    // can continue its open method.
    window.hroomie.hhmStarted = true;

    room.setDefaultStadium(`Big`);
    room.setScoreLimit(0);
    room.setTimeLimit(7);
  }
};

HHM.config.plugins = {
  'sav/core': {},
  'sav/roles': {
    roles: {
      'host': haxroomie.hostPassword,
      'admin': haxroomie.adminPassword
    },
  },
  'sav/players': {
    addPlayerIdToNickname: true
  },
  'sav/commands': {
    commandPrefix: '!'
  },
  'sav/chat': {}

};

if (haxroomie.pluginConfig) {
  window.hroomie.mergeDeep(HHM.config.plugins, haxroomie.pluginConfig);
}

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

// Load HHM if it has not already been loaded
if (HHM.manager === undefined) {
  let s = document.createElement(`script`);
  s.src = `${HHM.baseUrl}hhm.js`;
  document.head.appendChild(s);
}
