module.exports = function createCommands(session) {

  return {
    callRoom,
    sendChat,
    getPlayerList,
    kickPlayer,
    banPlayer,
    giveAdmin,
    removeAdmin,
    clearBans,
    getPlugins,
    getPlugin,
    enablePlugin,
    disablePlugin,
    getDependentPlugins
  };

  async function callRoom(fn, ...args) {
    return session.callRoom(fn, ...args);
  }
  
  function sendChat(msg) {
    if (!msg && msg !== 0) return;
    callRoom('sendChat', msg);
  }
  
  async function getPlayerList() {
    return callRoom('getPlayerList');
  }
  
  async function checkIfRoomHasPlayer(id) {
    let players = await getPlayerList();
    for (let player of players) {
      if (!player) continue;
      if (player.id == id) return true;
    }
    return false;
  }
  
  async function kickPlayer(id) {
    if (!id && id !== 0) {
      throw new Error('Missing required argument: id');
    }
    let hasPlayer = false;
    hasPlayer = await checkIfRoomHasPlayer(id);
    if (!hasPlayer) {
      throw new Error(`Room does not have player with id ${id}`)
    }
    await callRoom('kickPlayer', id, 'Bye!', false);
  }
  
  async function banPlayer(id) {
    if (!id && id !== 0) {
      throw new Error('Missing required argument: id');
    }
    let hasPlayer = false;
    hasPlayer = await checkIfRoomHasPlayer(id);
    if (!hasPlayer) {
      throw new Error(`Room does not have player with id ${id}`)
    }
    await callRoom('kickPlayer', id, 'Bye!', true);
  
  }
  
  async function giveAdmin(id) {
    if (!id && id !== 0) {
      throw new Error('Missing required argument: id');
    }
    let hasPlayer = false;
    hasPlayer = await checkIfRoomHasPlayer(id);
    if (!hasPlayer) {
      throw new Error(`Room does not have player with id ${id}`)
    }
    await callRoom('setPlayerAdmin', id, true);
  }
  
  async function removeAdmin(id) {
    if (!id && id !== 0) {
      throw new Error('Missing required argument: id');
    }
    let hasPlayer = false;
    hasPlayer = await checkIfRoomHasPlayer(id);
    if (!hasPlayer) {
      throw new Error(`Room does not have player with id ${id}`)
    }
    await callRoom('setPlayerAdmin', id, false);
  }

  async function clearBans() {
    return callRoom('clearBans');
  }

  async function getPlugins() {
    return session.getPlugins();
  }

  async function getPlugin(name) {
    return session.getPlugin(name);
  }

  async function enablePlugin(name) {
    return session.enablePlugin(name);
  }

  async function disablePlugin(name) {
    return session.disablePlugin(name);
  }
  async function getDependentPlugins(name) {
    return session.getDependentPlugins(name);
  }
}
