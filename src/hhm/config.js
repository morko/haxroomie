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


HHM.config.repositories = [];

// Merge user repositories with default ones.
if (hrConfig.repositories && !Array.isArray(hrConfig.repositories)) {
  throw new Error(`Haxroomie's "repositories" should be an array!`);
} else if (hrConfig.repositories) {
  HHM.config.repositories = [...hrConfig.repositories];
}

let hasDefaultRepo = false;
for (let repo of HHM.config.repositories) {
  if (repo.type === `github` && repo.repository === `saviola777/hhm-plugins`) {
    hasDefaultRepo = true;
    break;
  }
}

if (!hasDefaultRepo) {
  // Add default plugin repository.
  HHM.config.repositories.push(
    {
      type: `github`,
      repository: `saviola777/hhm-plugins`
    }
  );
}

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
if (hrConfig.pluginConfig && typeof hrConfig.pluginConfig !== 'object') {
  throw new Error(`Haxroomie's "pluginConfig" should be an object!`);
} else if (hrConfig.pluginConfig) {
  window.hroomie.mergeDeep(HHM.config.plugins, hrConfig.pluginConfig);
}

// Temporarily remove the pluginConfigs for plugins that are passed
// into haxroomie in the `plugins` option so that the plugins won't get
// loaded from a repository.
const removedPluginConfigs = {};
if (hrConfig.plugins && !Array.isArray(hrConfig.plugins)) {
  throw new Error(`Haxroomie's "plugins" should be an array!`);
} else if (hrConfig.plugins) {
  for (let plugin of hrConfig.plugins) {
    if (HHM.config.plugins[plugin.name]) {
      removedPluginConfigs[plugin.name] = HHM.config.plugins[plugin.name];
      delete HHM.config.plugins[plugin.name];
    }
  }
}

// Work after HHM has been initialized.
HHM.config.postInit = HBInit => {
  let room = HBInit();

  // Load the `plugins`.
  if (hrConfig.plugins && Array.isArray(hrConfig.plugins)) {
    for (let plugin of hrConfig.plugins) {
      window.HHM.manager.addPlugin({ 
        pluginCode: plugin.content,
        pluginName: plugin.name 
      });
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
    window.HHM.manager.addPlugin({
      pluginCode: content,
      pluginName: name
    });
  }

  room.onRoomLink = () => {
    // This tells Haxroomie that HHM has fully loaded.
    window.hroomie.hhmStarted = true;
  }
};

HHM.manager.start();