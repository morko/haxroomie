require('./setup');
const expect = require('chai').expect;

const { Haxroomie } = require('../');
const createConfigs = require('./utils/mock-config');
const fs = require('fs');
const path = require('path');

describe('RoomController tests that require running rooms', function() {
  let amountOfRooms = 1;
  let configs = createConfigs(amountOfRooms);
  if (!configs) return;
  let rooms = [];
  let haxroomie;

  beforeEach(async function() {
    this.timeout(20000);
    haxroomie = new Haxroomie();
    await haxroomie.launchBrowser();
    for (let i = 1; i <= configs.length; i++) {
      let r = await haxroomie.addRoom(i);
      rooms.push(r);
    }
    await Promise.all(rooms.map((r, i) => r.openRoom(configs[i])));
  });

  afterEach(async function() {
    await haxroomie.closeBrowser();
    rooms = [];
  });

  describe('#callRoom', function() {
    it('call a function in roomObject and return the result', async function() {
      let players = await rooms[0].callRoom('getPlayerList');
      expect(players).to.be.an('array');
    });
  });

  describe('#getPlugins', function() {
    it('should return an Array', async function() {
      let plugins = await rooms[0].plugins.getPlugins();
      expect(plugins).to.be.an('array');
    });

    it('should contain the plugins defined in the config', async function() {
      let pluginConfig = configs[0].pluginConfig;
      let plugins = await rooms[0].plugins.getPlugins();
      plugins = plugins.map(p => p.name);
      for (let pluginName of Object.keys(pluginConfig)) {
        expect(plugins).to.contain(pluginName);
      }
    });
  });

  describe('#getPlugin', function() {
    it('should return the plugin', async function() {
      let plugin = await rooms[0].plugins.getPlugin('sav/commands');
      expect(plugin.pluginSpec.name).to.be.a('string').and.equal('sav/commands');
    });

    it('should return null if no plugin', async function() {
      let plugin = await rooms[0].plugins.getPlugin('invalidPlugin');
      expect(plugin).to.equal(null);
    });
  });

  describe('#disablePlugin', function() {
    it('should disable the specified plugin', async function() {
      let isDisabled = await rooms[0].plugins.disablePlugin('sav/commands');
      expect(isDisabled).to.equal(true);
      let plugin = await rooms[0].plugins.getPlugin('sav/commands');
      expect(plugin.isEnabled).to.equal(false);
    });
  });

  describe('#enablePlugin', function() {
    it('should enable the specified plugin', async function() {
      await rooms[0].plugins.disablePlugin('sav/commands');
      let isEnabled = await rooms[0].plugins.enablePlugin('sav/commands');
      expect(isEnabled).to.equal(true);
      let plugin = await rooms[0].plugins.getPlugin('sav/commands');
      expect(plugin.isEnabled).to.equal(true);
    });
  });

  describe('#addPlugin', function() {
    it('should add a plugin for the room', async function() {
      await rooms[0].plugins.addPlugin({
        name: 'mock-plugin',
        content: fs.readFileSync(
          path.join(__dirname, 'utils', 'plugin.js'),
          { encoding: 'utf-8' }
        )
      });
      let plugin = await rooms[0].plugins.getPlugin('mock-plugin');
      expect(plugin.name).to.equal('mock-plugin');
    });

    it('should assign correct name for the plugin', async function() {
      await rooms[0].plugins.addPlugin({
        name: 'custom-name',
        content: fs.readFileSync(
          path.join(__dirname, 'utils', 'plugin-without-pluginspec.js'),
          { encoding: 'utf-8' }
        )
      });
      let plugin = await rooms[0].plugins.getPlugin('custom-name');
      expect(plugin.name).to.equal('custom-name');
    });
  });

  describe('#getRepositories', function() {
    it('should retrieve array of repositories', async function() {
      let repos = await rooms[0].repositories.getRepositories();
      expect(repos).to.be.an('array');
    });
  });

  describe('#addRepository', function() {
    it('should add a repository from github', async function() {
      let repo = {
        type: 'github',
        repository: 'morko/hhm-sala-plugins'
      };
      let wasAdded = await rooms[0].repositories.addRepository(repo);
      expect(wasAdded).to.equal(true);
      let repos = await rooms[0].repositories.getRepositories();
      let repoFromHr = repos.find(r => r.repository === 'morko/hhm-sala-plugins');
      expect(repoFromHr).to.be.an('object');
    });
  });

  describe('#getPluginConfig', function() {
    it('should retrieve the plugins config', async function() {
      let config = await rooms[0].plugins.getPluginConfig('sav/commands');
      expect(config.commandPrefix).to.equal(
        configs[0].pluginConfig['sav/commands'].commandPrefix
      );
    });
  });

  describe('#getPluginConfig', function() {
    it('should set a plugins config', async function() {
      await rooms[0].plugins.setPluginConfig(
        { commandPrefix: '.' }, 'sav/commands'
      );
      let config = await rooms[0].plugins.getPluginConfig('sav/commands');
      expect(config.commandPrefix).to.equal('.');
    });

    it('should replace all plugin configs', async function() {
      await rooms[0].plugins.addPlugin({
        name: 'mock-plugin',
        content: fs.readFileSync(
          path.join(__dirname, 'utils', 'plugin-without-pluginspec.js'),
          { encoding: 'utf-8' }
        )
      });
      await rooms[0].plugins.setPluginConfig({
        'sav/commands': { commandPrefix: '.' }, 
        'mock-plugin': { test: 'test' }, 
      });
      let cConfig = await rooms[0].plugins.getPluginConfig('sav/commands');
      expect(cConfig.commandPrefix).to.equal('.');
      let mConfig = await rooms[0].plugins.getPluginConfig('mock-plugin');
      expect(mConfig.test).to.equal('test');
    });
  });
});
