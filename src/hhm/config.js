HHM = typeof HHM === `undefined` ? {} : HHM;
HHM.baseUrl = HHM.baseUrl || `https://haxplugins.tk/`;
HHM.config = HHM.config || {};
hrConfig = typeof hrConfig === `undefined` ? {} : hrConfig;

HHM.config.room = {
  roomName: hrConfig.roomName || `haxroomie`,
  playerName : hrConfig.playerName || `host`,
  maxPlayers: hrConfig.maxPlayers || 10,
  public : hrConfig.hasOwnProperty(`public`) ? hrConfig.public : false,
  password: hrConfig.password || undefined,
  geo: hrConfig.geo || undefined,
  token: hrConfig.token
};

HHM.config.postInit = HBInit => {
  let room = HBInit();

  if (!hrConfig.roomScript && hrConfig.plugins) {
    for (let plugin of hrConfig.plugins) {
      window.HHM.manager.addPluginByCode(plugin.content, plugin.name);
    }
  }

  if (hrConfig.roomScript) {
    let name = hrConfig.roomScript.name;
    let content = hrConfig.roomScript.content
    window.HHM.manager.addPluginByCode(content, name);
  }

  room.onRoomLink = () => {
    // This tells Haxroomie that HHM has fully loaded.
    window.hroomie.hhmStarted = true;
  }
};

HHM.config.plugins = {
  'sav/roles': {
    roles: {
      'host': hrConfig.hostPassword,
      'admin': hrConfig.adminPassword
    },
  },
  'sav/players': {
    addPlayerIdToNickname: false
  },
  'sav/commands': {
    commandPrefix: '!'
  },
  'sav/chat': {}
};

// merge user plugin configuration with the default
if (hrConfig.pluginConfig && !hrConfig.disableDefaultPlugins) {
  window.hroomie.mergeDeep(HHM.config.plugins, hrConfig.pluginConfig);
// disable all plugins if user has set `disableDefaultPlugins` true
} else if (hrConfig.disableDefaultPlugins) {
  HHM.config.plugins = hrConfig.pluginConfig || {};
}

HHM.config.repositories = [
  {
    url: `${HHM.baseUrl}plugins/hhm-plugins/`,
  },
  {
    type: `github`,
    repository: `saviola777/hhm-plugins`
  },
];

// merge user repositories with default ones
if (hrConfig.repositories) {
  HHM.config.repositories = [
    ...HHM.config.repositories, 
    ...hrConfig.repositories
  ];
}

// if rooms script is provided, do not load any other plugins
if (hrConfig.roomScript) {
  HHM.config.plugins = {};
}

// Load HHM if it has not already been loaded
if (HHM.manager === undefined) {
  let s = document.createElement(`script`);
  if (hrConfig.hhm && hrConfig.hhm.content) {
    s.innerHTML = hrConfig.hhm.content;
  } else {
    s.src = `${HHM.baseUrl}hhm.js`;
  }
  document.head.appendChild(s);
}
