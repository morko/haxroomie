require('./setup');
const expect = require('chai').expect;

const { Haxroomie } = require('../');

describe('Haxroomie launching browser', function() {
  let haxroomie = new Haxroomie();

  function expectBrowserToBeUsable(browser) {
    expect(browser).to.have.property('pages');
  }

  describe('#launchBrowser()', function() {
    it('should launch the browser', async function() {
      let browser = await haxroomie.launchBrowser();
      expectBrowserToBeUsable(browser);
    });
  });

  describe('#closeBrowser()', function() {
    it('should close the browser', async function() {
      return haxroomie.closeBrowser();
    });
  });
});

describe('Haxroomie', function() {
  let haxroomie = new Haxroomie();

  beforeEach(async function() {
    haxroomie = await new Haxroomie();
    await haxroomie.launchBrowser();
  });

  afterEach(async function() {
    await haxroomie.closeBrowser();
  });

  describe('#launchBrowser()', function() {
    it('should not allow to launch multiple browsers', async function() {
      return expect(haxroomie.launchBrowser()).to.eventually.be.rejected;
    });

    it('should not allow to launch multiple browsers from different instances', async function() {
      let haxroomie2 = new Haxroomie({ port: 3099 });
      await expect(haxroomie2.launchBrowser()).to.eventually.be.rejected;
      return haxroomie2.closeBrowser();
    });
  });

  describe('#addRoom()', function() {
    it('should add a new room', async function() {
      let room = await haxroomie.addRoom(1);
      expect(room).to.be.an('RoomController');
      return expect(haxroomie.hasRoom(1)).to.equal(true);
    });

    it('should throw if adding room with same id', async function() {
      await haxroomie.addRoom(1);
      return expect(haxroomie.addRoom(1)).to.eventually.be.rejected;
    });

    it('should add browser tab for each room', async function() {
      let numberOfRoomsToAdd = 4;
      for (let i = 0; i < numberOfRoomsToAdd; i++) {
        await haxroomie.addRoom(i);
      }
      let pages = await haxroomie.browser.pages();
      return expect(pages)
        .to.be.an('array')
        .that.has.lengthOf(numberOfRoomsToAdd + 1);
    });

    it('should only allow number or string as id', async function() {
      await expect(haxroomie.addRoom(523)).to.be.fulfilled;
      await expect(haxroomie.addRoom('fsdafewjkj')).to.be.fulfilled;
      await expect(haxroomie.addRoom(undefined)).to.be.rejected;
      await expect(haxroomie.addRoom(null)).to.be.rejected;
      await expect(haxroomie.addRoom(() => {})).to.be.rejected;
      return expect(haxroomie.addRoom({})).to.be.rejected;
    });
  });

  describe('#removeRoom()', function() {
    let numberOfRoomsToAdd = 4;

    beforeEach(async function() {
      for (let i = 0; i < numberOfRoomsToAdd; i++) {
        await haxroomie.addRoom(i);
      }
    });

    it('should remove a room', async function() {
      await haxroomie.removeRoom(1);
      expect(haxroomie.hasRoom(1)).to.equal(false);
    });

    it('should remove the rooms browser tab', async function() {
      await haxroomie.removeRoom(1);
      let pages = await haxroomie.browser.pages();
      expect(pages)
        .to.be.an('array')
        .that.has.lengthOf(numberOfRoomsToAdd);
    });
  });
});
