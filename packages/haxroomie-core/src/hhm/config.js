// Default settings for the room.
hrConfig.roomName = hrConfig.roomName || 'haxroomie';
hrConfig.playerName = hrConfig.playerName || 'host';
hrConfig.maxPlayers = parseInt(hrConfig.maxPlayers, 10) || 10;
hrConfig.public = Object.prototype.hasOwnProperty.call(hrConfig, 'public')
  ? hrConfig.public
  : false;
hrConfig.password = hrConfig.password || undefined;
hrConfig.geo = hrConfig.geo || undefined;

HHM.config.room = hrConfig;

HHM.config.repositories = [];

// Merge user repositories with default ones.
if (hrConfig.repositories && !Array.isArray(hrConfig.repositories)) {
  throw new TypeError(`repositories should be an array!`);
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
  HHM.config.repositories.push({
    type: 'github',
    repository: 'saviola777/hhm-plugins',
    version: hrConfig.defaultRepoVersion,
  });
}

HHM.config.plugins = hrConfig.pluginConfig || {};

// Temporarily remove the pluginConfigs for plugins that are passed
// into haxroomie in the `plugins` option so that HMM does not try to
// load the plugin from a repository.
const removedPluginConfigs = {};
if (hrConfig.plugins && !Array.isArray(hrConfig.plugins)) {
  throw new TypeError(`plugins should be an array!`);
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

  // Load the additional `plugins` outside of repositories.
  if (hrConfig.plugins && Array.isArray(hrConfig.plugins)) {
    console.log(hrConfig);
    for (let plugin of hrConfig.plugins) {
      window.HHM.manager.addPlugin({
        pluginCode: plugin.content,
        pluginName: plugin.name,
      });
    }
  }

  // Set the configs for `plugins`.
  for (let [pluginName, cfg] of Object.entries(removedPluginConfigs)) {
    let id = HHM.manager.getPluginId(pluginName);
    HHM.manager.setPluginConfig(id, cfg);
  }

  // Load the `roomScript`.
  if (hrConfig.roomScript) {
    let name = hrConfig.roomScript.name;
    let content = hrConfig.roomScript.content;
    window.HHM.manager.addPlugin({
      pluginCode: content,
      pluginName: name,
    });
  }

  room.onRoomLink = () => {
    // This tells Haxroomie that HHM has fully loaded.
    window.hroomie.hhmStarted = true;
  };
};

HHM.manager.start();
