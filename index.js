const Haxroomie = require('./src/Haxroomie');
const createActionFactory = require('haxroomie-action-factory');

module.exports = {
  Haxroomie,
  createActionFactory,
  createHaxroomie
}

async function createHaxroomie(opt) {
  let haxroomie = new Haxroomie(opt);
  await haxroomie.createBrowser();
  return haxroomie;
}
