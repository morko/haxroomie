require('./setup');
const expect = require('chai').expect;

const { createRooms } = require('./utils');

describe('RoomController', function() {
  let rooms, configs, haxroomie;

  before(async function() {
    this.timeout(30000);
    let data = await createRooms({ amount: 1, open: false });
    rooms = data.rooms;
    configs = data.configs;
    haxroomie = data.haxroomie;
  });

  after(async function() {
    await haxroomie.closeBrowser();
  });

  afterEach(function() {
    rooms[0].removeAllListeners('open-room-start');
    rooms[0].removeAllListeners('open-room-stop');
    rooms[0].removeAllListeners('open-room-error');
    rooms[0].removeAllListeners('close-room-start');
    rooms[0].removeAllListeners('close-room-stop');
  });

  describe('#openRoom()', function() {
    it('should start the room', function(done) {
      this.timeout(20000);
      rooms[0].on('open-room-start', config => {
        expect(config).to.deep.equal(configs[0]);
      });
      rooms[0].on('open-room-stop', async () => {
        done();
      });
      rooms[0].on('open-room-error', done);
      rooms[0].openRoom(configs[0]);
    });
  });

  describe('#callRoom', function() {
    it('call a function in roomObject and return the result', async function() {
      let players = await rooms[0].callRoom('getPlayerList');
      expect(players).to.be.an('array');
    });
  });

  describe('#closeRoom()', function() {
    it('should close the room', function(done) {
      this.timeout(20000);
      rooms[0].on('close-room-stop', () => done());
      rooms[0].closeRoom();
    });
  });
});
