require('./setup');
const expect = require('chai').expect;

const Haxroomie = require('../src/Haxroomie');
const createConfigs = require('./utils/mock-config');

describe('RoomController', function() {
  let amountOfRooms = 1;
  let configs = createConfigs(amountOfRooms);
  if (!configs) return;
  let rooms = [];
  let haxroomie;

  beforeEach(async function() {
    haxroomie = new Haxroomie();
    await haxroomie.launchBrowser();
    for (let i = 1; i <= configs.length; i++) {
      let r = await haxroomie.addRoom(i);
      rooms.push(r);
    }
  });

  afterEach(async function() {
    await haxroomie.closeBrowser();
    rooms = [];
  });

  describe('#openRoom()', function() {

    it('should start the room', function(done) {
      this.timeout(20000);
      rooms[0].on('open-room-error', done);
      rooms[0].on('open-room-stop', () => done());
      rooms[0].openRoom(configs[0]);
    });

    it('should fire open-room-start event', function(done) {
      this.timeout(3000);
      rooms[0].on('open-room-start', (config) => {
        expect(config).to.deep.equal(configs[0]);
        done();
      });
      rooms[0].openRoom(configs[0]);
    });
  });

  describe('#closeRoom()', function() {
    it('should close the room', function(done) {
      this.timeout(20000);
      rooms[0].on('open-room-error', done);
      rooms[0].on('open-room-stop', () => {
        rooms[0].closeRoom();
      });
      rooms[0].on('room-closed', () => done());
      rooms[0].openRoom(configs[0]);
    });
  });

  describe('#callRoom()', function() {
    it('call a function in roomObject and return the result', async function() {
      this.timeout(20000);
      await rooms[0].openRoom(configs[0]);
      let players = await rooms[0].callRoom('getPlayerList');
      expect(players).to.be.an('array');
    });
  });
});
