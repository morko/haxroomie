HHM = typeof HHM === `undefined` ? {} : HHM;
HHM.config = HHM.config || {};
hrConfig = typeof hrConfig === `undefined` ? {} : hrConfig;

// Set the HHM version to use.
HHM.config.version = hrConfig.hhmVersion || '0.9.2';

HHM.config.room = {
  roomName: hrConfig.roomName || `haxroomie`,
  playerName : hrConfig.playerName || `host`,
  maxPlayers: hrConfig.maxPlayers || 10,
  public : hrConfig.hasOwnProperty(`public`) ? hrConfig.public : false,
  password: hrConfig.password || undefined,
  geo: hrConfig.geo || undefined,
  token: hrConfig.token
};

// Work after HHM has been initialized.
HHM.config.postInit = HBInit => {
  let room = HBInit();

  // Load the `plugins`.
  if (!hrConfig.roomScript && hrConfig.plugins) {
    for (let plugin of hrConfig.plugins) {
      window.HHM.manager.addPluginByCode(plugin.content, plugin.name);
    }
  }

  // Load the `roomScript`.
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

// The default plugin configuration.
HHM.config.plugins = {
  'sav/players': {
    addPlayerIdToNickname: false
  },
  'sav/roles': {
    roles: {
      'host': hrConfig.hostPassword,
      'admin': hrConfig.adminPassword
    },
  },
  'sav/commands': {
    commandPrefix: '!'
  },
  'sav/chat': {},
  'sav/help': {}
};

// Clear the default plugin config if `disableDefaultPlugins` is true.
if (hrConfig.disableDefaultPlugins) {
  HHM.config.plugins = {};
}

// Merge user plugin configuration with the default.
if (hrConfig.pluginConfig) {
  window.hroomie.mergeDeep(HHM.config.plugins, hrConfig.pluginConfig);
} 

// Default plugin repositories.
HHM.config.repositories = [
  {
    type: `github`,
    repository: `saviola777/hhm-plugins`
  },
];

// Merge user repositories with default ones.
if (hrConfig.repositories) {
  HHM.config.repositories = [
    ...HHM.config.repositories, 
    ...hrConfig.repositories
  ];
}

// If `roomScript` is provided, do not load any other plugins.
if (hrConfig.roomScript) {
  HHM.config.plugins = {};
}

// Start HHM.
if (HHM.manager === undefined) {
  let s = document.createElement(`script`);
  // Load the HHM from ´hhm´ property if given. Otherwise from the default URL.
  if (hrConfig.hhm && hrConfig.hhm.content) {
    s.innerHTML = hrConfig.hhm.content;
  } else {
    s.src = `https://hhm.surge.sh/releases/hhm-${HHM.config.version}.js`;
  }
  document.head.appendChild(s);
}
