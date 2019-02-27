const Haxroomie = require('./src/Haxroomie');

module.exports = {
  Haxroomie,
  createHaxroomie
}

async function createHaxroomie(opt) {
  let haxroomie = new Haxroomie(opt);
  await haxroomie.createBrowser();
  return haxroomie;
}
