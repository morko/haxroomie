const path = require('path');
const fs = require('fs');
const deepEqual = require('deep-equal');
const cprompt = require('./cprompt');

/**
 * Object containing information about reloaded config.
 * 
 * @typedef {Object} ReloadInfo
 * @property {object} oldConfig - The old config.
 * @property {object} newConfig - The new config.
 * @property {Map.<string|number, Array.<string>|null>} modifiedRooms - 
 *    Rooms that were modified in the new config.
 * 
 *    The key is a room id and value is an array of modified
 *    property names or null if the room was removed.
 */

class Config {
  constructor(opt) {
    opt = opt || {};
    if (!opt.configPath) throw new TypeError('invalid arguments');
    if (!opt.haxroomie) throw new TypeError('invalid arguments');

    this.haxroomie = opt.haxroomie;
    this.configPath = path.resolve(process.cwd(), opt.configPath);

    this.config = this.load(this.configPath);
    this.tokens = {};
  }

  /**
   * Returns the config for given room id or undefined if not found.
   * @param {string|number} id - Room id.
   * @returns {object|undefined} - Room config.
   */
  getRoomConfig(id) {
    if (!this.config[id]) return undefined;
    return this.cloneConfig(this.config[id]);
  }

  /**
   * Sets the config of the room.
   * @param {string|number} id - Room id.
   * @param {object} config - Room config.
   */
  setRoomConfig(id, config) {
    this.config[id] = config;
  }

  getToken(id) {
    if (this.tokens[id]) {
      return this.tokens[id];
    } else {
      return this.config[id].token;
    }
  }

  setToken(id, token) {
    this.tokens[id] = token;
  }

  /**
   * @returns {Iterable.<string>} - Iterator for room ids.
   */
  getRoomIds() {
    return Object.keys(this.config);
  }

  /**
   * Creates a new copy of a config object.
   * @param {object} - Config object
   * @returns {object} - Copy of the config.
   * @private
   */
  cloneConfig(config) {
    return JSON.parse(JSON.stringify(config));
  }

  /**
   * Parses the Haxroomie config.
   * @param {string} configPath - Path to the config file relative to
   *    current working directory.
   */
  load(configPath) {
    cprompt.print(`from ${configPath}`, 'LOADING CONFIG');

    let config;
    try {
      config = require(configPath);
    } catch (err) {
      cprompt.print(`Could not load the config: ${configPath}`, 'ERROR');
      throw err;
    }
    
    // Serialize the properties of each room in the config.
    for (let key of Object.keys(config)) {
      config[key] = this.serializeConfig(config[key]);
    }

    return config;
  }

  /**
   * Serializes the room config the 
   * 
   * Loads all the files in the config. The files get transformed into
   * FileDef objects that the RoomController#open method accepts.
   * 
   * Repositories that are of type 'local' get serialized to a format
   * that HHM accepts.
   * e.g.
   * ```js
   * {
   *   type: 'local'
   *   path: '/path/to/repo'
   * }
   * ```
   * to
   * ```js
   * {
   *   type: 'local'
   *   path: '/path/to/repo'
   *   plugins: {
   *     'pluginName1': 'plugin contents',
   *     'pluginName2': 'plugin contents',
   *   }
   * }
   * ```
   * @param {object} roomConfig - One rooms config in the Haxroomie
   *    config.
   * @return {object} - Haxroomie room config where all properties are
   *    serialized.
   */
  serializeConfig(roomConfig) {
    let newRoomConfig = Object.assign({}, roomConfig);
    if (roomConfig.roomScript) {
      newRoomConfig.roomScript = this.loadFile(roomConfig.roomScript);
    }
    if (roomConfig.hhmConfig) {
      newRoomConfig.hhmConfig = this.loadFile(roomConfig.hhmConfig);
    }
    if (roomConfig.hhm) {
      newRoomConfig.hhm = this.loadFile(roomConfig.hhm);
    }
    if (roomConfig.plugins) {
      if (!Array.isArray(roomConfig.plugins)) {
        throw new Error('The "plugins" config option should be an array!');
      }
      let loadedPlugins = [];
      for (let plugin of roomConfig.plugins) {
        if (!plugin.path) {
          throw new Error('Plugins config is missing path property!')
        }
        if (!plugin.name) {
          throw new Error('Plugins config is missing name property!')
        }
        let fileDef = this.loadFile(plugin.path);
        if (!fileDef) {
          continue;
        }
        fileDef.name = plugin.name;
        loadedPlugins.push(fileDef);
      }
      newRoomConfig.plugins = loadedPlugins;
    }

    if (roomConfig.repositories) {
      if (!Array.isArray(roomConfig.repositories)) {
        throw new Error('The "repositories" config option should be an array!');
      }
      let serialized = [];
      for (let repo of roomConfig.repositories) {
        if (typeof repo === 'object') {
          serialized.push(this.serializeRepository(repo));
        } else {
          serialized.push(repo);
        }
      }
      newRoomConfig.repositories = serialized;
    }

    return newRoomConfig;
  }

  /**
   * Serializes the repository to be ready to sent to browser.
   * @param {object} repository - The repository object.
   * @private
   */
  serializeRepository(repository) {
    let serialized = {};
    if (repository.type === 'local') {
      serialized = this.loadLocalRepository(repository);
    } else {
      Object.assign(serialized, repository);
    }
    return serialized;
  }

  /**
   * Tries to load a repository from filesystem.
   * @param {string} repo - The repository object.
   */
  loadLocalRepository(repo) {

    // do not modify the original object
    repo = Object.assign({}, repo);
    let subpath = repo.subpath || 'src';
    let suffix = repo.suffix || '.js';

    function listPlugins(dir, pluginList) {
      let files = fs.readdirSync(dir);
      pluginList = pluginList || [];
      for (let file of files) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
          pluginList = listPlugins(path.join(dir, file), pluginList);
        } else {
          if (file.endsWith(suffix)) {
            pluginList.push(path.join(dir, file));
          }
        }
      }
      return pluginList;
    };

    let pluginPaths = listPlugins(path.join(repo.path, subpath));

    let plugins = {};
    for (let pPath of pluginPaths) {
      let file = this.loadFile(pPath);
      let splitPath = pPath.split(path.sep);
      let pluginName = splitPath[splitPath.length - 2] + '/' + 
        splitPath[splitPath.length - 1].split('.')[0];
      plugins[pluginName] = file.content;
    }

    repo.plugins = plugins;
    return repo;
  }

  /**
   * Tries to load a file from given filePath.
   * 
   * @param {string} filePath - Path to the file.
   * @returns {FileDef} - FileDef with additional `modifiedTime` property that
   *    tells when the file has last been modified. The `name` property will
   *    be set to the given `filePath`
   */
  loadFile(filePath) {
    if (!fs.existsSync(filePath)) {
      cprompt.print(`No such file: ${filePath}`, 'ERROR');
      return;
    }
    let modifiedTime = fs.statSync(filePath).mtimeMs;
    let content = fs.readFileSync(filePath, {encoding: `utf-8`});

    return {name: filePath, content: content, modifiedTime: modifiedTime};
  }

  /**
   * Reloads the config from filesystem.
   * @returns {ReloadInfo} - Information about the reload.
   */
  reload() {
    // delete the cached config module import
    delete require.cache[require.resolve(this.configPath)];  

    let newConfig = this.load(this.configPath);
    let oldConfig = this.config;

    let modifiedRooms = new Map();

    for (let roomId of Object.keys(newConfig)) {

      let modifiedProperties = this.getModifiedProperties(
        newConfig[roomId],
        oldConfig[roomId] ? oldConfig[roomId] : {}
      );

      if (modifiedProperties.length !== 0) {
        modifiedRooms.set(roomId, modifiedProperties);
      }

      if (modifiedProperties.find(p => p === 'token')) {
        this.setToken(roomId, newConfig[roomId].token);
      }
    }

    // check for removed rooms
    for (let roomId of Object.keys(oldConfig)) {
      if (!newConfig[roomId]) {
        modifiedRooms.set(roomId, null);
        delete this.config[roomId];
      }
    }

    this.config = newConfig;
    return { oldConfig, newConfig, modifiedRooms };
  }

  /**
   * Compares two room config objects and returns the modified properties
   * in an array.
   * 
   * @param {object} newConfig - The new room config.
   * @param {object} oldConfig - The old room config.
   * @returns {Array.<string>} - Array of properties that were modified.
   *    If no properties were modified returns and empty array.
   * @private
   */
  getModifiedProperties(newConfig, oldConfig) {
    let modifiedProperties = [];

    for (let property of Object.keys(newConfig)) {

      if (property === 'roomScript' || property === 'hhmConfig' || property === 'hhm') {
        if (this.hasFileBeenModified(newConfig[property], oldConfig[property])) {
          modifiedProperties.push(property);
          continue;
        }

      } else if (property === 'plugins') {
        if (!oldConfig[property] || newConfig[property].length !== oldConfig[property].length) {
          modifiedProperties.push(property);
          continue;
        }
        for (let i = 0; i < newConfig[property].length; i++) {
          let newPlugin = newConfig[property][i];
          let oldPlugin = oldConfig[property][i];
          if (this.hasFileBeenModified(newPlugin, oldPlugin)) {
            modifiedProperties.push(property);
            continue;
          }
        }
        if (this.hasPluginsBeenModified(newConfig[property], oldConfig[property])) {
          modifiedProperties.push(property);
          continue;
        }

      } else {
        if (!deepEqual(newConfig[property], oldConfig[property])) {
          modifiedProperties.push(property);
          continue;
        }
      }
    }
    for (let property of Object.keys(oldConfig)) {
      if (typeof newConfig[property] === 'undefined') {
        modifiedProperties.push(property);
      }
    }
    return modifiedProperties;
  }

  hasFileBeenModified(newFile, oldFile) {
    if ((!oldFile && newFile) || (oldFile && !newFile)) {
      return true;
    } else if (newFile.modifiedTime !== oldFile.modifiedTime) {
      return true;
    }
  }

  hasPluginsBeenModified(newPlugins, oldPlugins) {
    if ((!oldPlugins && newPlugins) || (oldPlugins && !newPlugins)) {
      return true;
    }
    for (let key of Object.keys(newPlugins)) {
      if (this.hasFileBeenModified(newPlugins[key], oldPlugins[key])) {
        return true;
      }
    }
    for (let key of Object.keys(oldPlugins)) {
      if (!newPlugins[key]) {
        return true;
      }
    }
  }
}

module.exports = Config;