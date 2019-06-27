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

// Clear the default plugin config if `disableDefaultPlugins` is true
// or if user provided a room script.
if (hrConfig.disableDefaultPlugins || hrConfig.roomScript) {
  HHM.config.plugins = {};
}

// Merge user plugin configuration with the default.
if (hrConfig.pluginConfig) {
  window.hroomie.mergeDeep(HHM.config.plugins, hrConfig.pluginConfig);
}

// Temporarily remove the pluginConfigs for plugins that are passed
// into haxroomie in the `plugins` option so that the plugins won't get
// loaded from a repository.
const removedPluginConfigs = {};
for (let plugin of hrConfig.plugins) {
  if (HHM.config.plugins[plugin.name]) {
    removedPluginConfigs[plugin.name] = HHM.config.plugins[plugin.name];
    delete HHM.config.plugins[plugin.name];
  }
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

// Start HHM.
if (HHM.manager === undefined) {
  let s = document.createElement(`script`);
  // Load the HHM from ´hhm´ property if given. Otherwise from the default URL.
  if (hrConfig.hhm && hrConfig.hhm.content) {
    s.innerHTML = hrConfig.hhm.content;
  } else {
    s.src = `${HHM.baseUrl}hhm.js`;
  }
  document.head.appendChild(s);
}

// Work after HHM has been initialized.
HHM.config.postInit = HBInit => {
  let room = HBInit();

  // Load the `plugins`.
  if (hrConfig.plugins) {
    for (let plugin of hrConfig.plugins) {
      window.HHM.manager.addPluginByCode(plugin.content, plugin.name);
    }
  }

  // Set the configs for `plugins`
  for (let [pluginName, cfg] of Object.entries(removedPluginConfigs)) {
    let id = HHM.manager.getPluginId(pluginName);
    HHM.manager.setPluginConfig(id, cfg)
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