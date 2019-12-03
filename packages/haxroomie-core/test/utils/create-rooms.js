const createConfigs = require('./create-configs');
const { createHaxroomie } = require('../../');

async function createRooms({ amount = 1, open = true } = {}) {
  let configs = createConfigs(amount);
  if (!configs) return;

  let rooms = [];
  let haxroomie = await createHaxroomie();
  for (let i = 1; i <= configs.length; i++) {
    let r = await haxroomie.addRoom(i);
    rooms.push(r);
  }
  if (open) {
    await Promise.all(rooms.map((r, i) => r.openRoom(configs[i])));
  }

  return {
    rooms,
    configs,
    haxroomie,
  };
}

module.exports = createRooms;
