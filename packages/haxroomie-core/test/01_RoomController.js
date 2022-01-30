require('./setup');
const expect = require('chai').expect;

const { createRooms } = require('./utils');

describe('RoomController', function () {
  let rooms, configs, haxroomie;

  before(async function () {
    this.timeout(30000);
    let data = await createRooms({ amount: 1, open: false });
    rooms = data.rooms;
    configs = data.configs;
    haxroomie = data.haxroomie;
  });

  after(async function () {
    await haxroomie.closeBrowser();
  });

  afterEach(function () {
    rooms[0].removeAllListeners('open-room-start');
    rooms[0].removeAllListeners('open-room-stop');
    rooms[0].removeAllListeners('close-room-start');
    rooms[0].removeAllListeners('close-room-stop');
  });

  describe('#openRoom()', function () {
    it('should start the room', function (done) {
      this.timeout(20000);
      rooms[0].on('open-room-start', (err, config) => {
        if (err) done(err);
        try {
          expect(config).to.deep.equal(configs[0]);
        } catch (err) {
          done(err);
        }
      });
      rooms[0].on('open-room-stop', (err, roomInfo) => {
        if (err) {
          done(err);
          return;
        }
        try {
          expect(roomInfo).to.be.an('object');
        } catch (err) {
          done(err);
          return;
        }
        done();
      });
      try {
        rooms[0].openRoom(configs[0]);
      } catch (err) {
        // ignore async error
      }
    });
  });

  describe('#callRoom', function () {
    it('call a function in roomObject and return the result', async function () {
      let players = await rooms[0].callRoom('getPlayerList');
      expect(players).to.be.an('array');
    });
  });

  describe('log events', function () {
    afterEach(function () {
      rooms[0].removeAllListeners('error-logged');
      rooms[0].removeAllListeners('warning-logged');
      rooms[0].removeAllListeners('info-logged');
    });

    describe('error-logged', function () {
      it('should emit an event when browser logged error', function (done) {
        let msg = 'testing';
        let room = rooms[0];
        room.on('error-logged', (eMsg) => {
          try {
            expect(eMsg).to.equal(msg);
          } catch (err) {
            done(err);
          }
          done();
        });
        room.page.evaluate((msg) => {
          console.error(msg);
        }, msg);
      });
    });

    describe('warning-logged', function () {
      it('should emit an event when browser logged warning', function (done) {
        let msg = 'testing';
        let room = rooms[0];
        room.on('warning-logged', (eMsg) => {
          try {
            expect(eMsg).to.equal(msg);
          } catch (err) {
            done(err);
          }
          done();
        });
        room.page.evaluate((msg) => {
          console.warn(msg);
        }, msg);
      });
    });

    describe('info-logged', function () {
      it('should emit an event when browser logged message that is not a warning or error', function (done) {
        let msg = 'testing';
        let room = rooms[0];
        room.on('info-logged', (iMsg) => {
          try {
            expect(iMsg).to.equal(msg);
          } catch (err) {
            done(err);
          }
          done();
        });
        room.page.evaluate((msg) => {
          console.log(msg);
        }, msg);
      });
    });
  });

  describe('#closeRoom()', function () {
    it('should close the room', function (done) {
      this.timeout(20000);
      rooms[0].on('close-room-stop', () => done());
      rooms[0].closeRoom();
    });
  });
});
