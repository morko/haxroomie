require('./setup');
const expect = require('chai').expect;

const { createRooms } = require('./utils');
const fs = require('fs');
const path = require('path');

describe('RoomController.plugins', async function () {
  let rooms, configs, haxroomie;

  before(async function () {
    this.timeout(30000);
    let data = await createRooms();
    rooms = data.rooms;
    configs = data.configs;
    haxroomie = data.haxroomie;
  });

  after(async function () {
    await haxroomie.closeBrowser();
  });

  describe('#getPlugins', function () {
    it('should return an Array', async function () {
      let plugins = await rooms[0].plugins.getPlugins();
      expect(plugins).to.be.an('array');
    });

    it('should contain the plugins defined in the config', async function () {
      let pluginConfig = configs[0].pluginConfig;
      let plugins = await rooms[0].plugins.getPlugins();
      plugins = plugins.map((p) => p.name);
      for (let pluginName of Object.keys(pluginConfig)) {
        expect(plugins).to.contain(pluginName);
      }
    });
  });

  describe('#getPlugin', function () {
    it('should return the plugin', async function () {
      let plugin = await rooms[0].plugins.getPlugin('sav/commands');
      expect(plugin.pluginSpec.name)
        .to.be.a('string')
        .and.equal('sav/commands');
    });

    it('should return null if no plugin', async function () {
      let plugin = await rooms[0].plugins.getPlugin('invalidPlugin');
      expect(plugin).to.equal(null);
    });
  });

  describe('#disablePlugin', function () {
    it('should disable a plugin', async function () {
      let disabled = await rooms[0].plugins.disablePlugin('sav/commands');
      expect(disabled).to.be.an('array').and.to.have.lengthOf.at.most(1);
      let plugin = await rooms[0].plugins.getPlugin('sav/commands');
      expect(plugin.isEnabled).to.equal(false);
    });
  });

  describe('#enablePlugin', function () {
    it('should enable a plugin', async function () {
      let isEnabled = await rooms[0].plugins.enablePlugin('sav/commands');
      expect(isEnabled).to.equal(true);
      let plugin = await rooms[0].plugins.getPlugin('sav/commands');
      expect(plugin.isEnabled).to.equal(true);
    });
  });

  describe('#addPlugin', function () {
    it('should add a plugin for the room', async function () {
      await rooms[0].plugins.addPlugin({
        name: 'default-plugin',
        content: fs.readFileSync(
          path.join(__dirname, 'data', 'default-plugin.js'),
          { encoding: 'utf-8' }
        ),
      });
      let plugin = await rooms[0].plugins.getPlugin('default-plugin');
      expect(plugin.name).to.equal('default-plugin');
    });

    it('should assign correct name for the plugin', async function () {
      await rooms[0].plugins.addPlugin({
        name: 'custom-name',
        content: fs.readFileSync(
          path.join(__dirname, 'data', 'plugin-without-pluginspec.js'),
          { encoding: 'utf-8' }
        ),
      });
      let plugin = await rooms[0].plugins.getPlugin('custom-name');
      expect(plugin.name).to.equal('custom-name');
    });
  });

  describe('#getPluginConfig', function () {
    it('should retrieve the plugins config', async function () {
      let config = await rooms[0].plugins.getPluginConfig('sav/commands');
      expect(config.commandPrefix).to.equal(
        configs[0].pluginConfig['sav/commands'].commandPrefix
      );
    });
  });

  describe('#setPluginConfig', function () {
    it('should set a plugins config', async function () {
      await rooms[0].plugins.setPluginConfig(
        { commandPrefix: '.' },
        'sav/commands'
      );
      let config = await rooms[0].plugins.getPluginConfig('sav/commands');
      expect(config.commandPrefix).to.equal('.');
    });

    it('should replace all plugin configs', async function () {
      await rooms[0].plugins.setPluginConfig({
        'sav/commands': { commandPrefix: '.' },
        'default-plugin': { test: 'test' },
      });
      let cConfig = await rooms[0].plugins.getPluginConfig('sav/commands');
      expect(cConfig.commandPrefix).to.equal('.');
      let pConfig = await rooms[0].plugins.getPluginConfig('default-plugin');
      expect(pConfig.test).to.equal('test');
    });
  });
});
