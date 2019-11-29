/**
 * Provides a persistence API to allow plugins to persist and restore data.
 *
 * Changelog:
 *
 * 1.1.0:
 *  - add onBeforePersist event to let plugins prepare for persistence
 *  - export persistAllPluginData
 *  - make the exported persistPluginData also trigger the above-mentioned event
 *
 * 1.0.0:
 *  - initial version
 *
 */

var room = HBInit();

room.pluginSpec = {
  name: `hhm/persistence`,
  author: `saviola`,
  version: `1.1.0`,
  dependencies: [
    `hhm/persistence`, // Can't be disabled
  ],
  // TODO document and accept config updates
  config: {
    persistenceIntervalSeconds: 300,
  }
};

//
// Global variables
//

let interval, storage;

//
// Plugin functions
//

/**
 * Persists the data of all enabled plugins
 */
async function persistAllPluginData() {
  room.triggerEvent(`onBeforePersist`);

  // TODO does this wait for all persistence as expected?
  await room.getPluginManager().getEnabledPluginIds()
      .map((id) => room.getPluginManager().getPlugin(id))
      .forEach(async (plugin) => await persistPluginData(plugin));
}

/**
 * TODO documentation
 */
async function persistPluginData(plugin) {
  if (!plugin.hasName()) return;

  const persistedData = {
    data: typeof plugin.onPersist === `function` ? plugin.onPersist() : undefined,
    pluginSpec: plugin.pluginSpec
  };

  await storage.setItem(plugin._name, persistedData);
}

async function persistPluginDataWrapper(plugin) {
  room.triggerEvent(`onBeforePersist`);

  await persistPluginData(plugin);
}

//
// Event handlers
//

/**
 * TODO documentation
 */
async function onRoomLinkHandler() {
  storage = await HHM.storage.create({
    name: `hhm/persistence`
  });

  // Set up persistence interval
  interval = setInterval(() => persistAllPluginData(),
      room.getConfig().persistenceIntervalSeconds * 1000);
}

/**
 * TODO documentation
 */
async function onHhmBeforePluginLoadedHandler({ plugin }) {
  // restore plugin data if any
  const persistedData = await storage.getItem(plugin._name);

  if (persistedData === null || typeof plugin.onRestore !== `function`) return;

  plugin.onRestore(persistedData.data, persistedData.pluginSpec);
}

/**
 * TODO documentation
 */
async function onHhmPluginDisabledHandler({ plugin }) {
  return persistPluginData(plugin);
}

//
// Exports
//

room.persistPluginData = persistPluginDataWrapper;
room.persistAllPluginData = persistAllPluginData;

room.onRoomLink = onRoomLinkHandler;

room.onHhm_beforePluginLoaded = onHhmBeforePluginLoadedHandler;
room.onHhm_pluginDisabled = onHhmPluginDisabledHandler;
