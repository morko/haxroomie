require('./setup');
const expect = require('chai').expect;

const { createRooms } = require('./utils');

describe('RoomController.repositories', async function() {
  let rooms, haxroomie;

  before(async function() {
    this.timeout(30000);
    let data = await createRooms();
    rooms = data.rooms;
    haxroomie = data.haxroomie;
  });

  after(async function() {
    await haxroomie.closeBrowser();
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
        repository: 'morko/hhm-sala-plugins',
      };
      let wasAdded = await rooms[0].repositories.addRepository(repo);
      expect(wasAdded).to.equal(true);
    });
  });

  describe('#hasRepository', function() {
    it('should detect that the repository was added', async function() {
      let repo = {
        type: 'github',
        repository: 'morko/hhm-sala-plugins',
      };
      let hasRepo = await rooms[0].repositories.hasRepository(repo);
      expect(hasRepo).to.equal(true);
    });
  });

});
