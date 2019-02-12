require('./setup');
const expect = require('chai').expect;

const Haxroomie = require('../src/Haxroomie')

describe('Haxroomie', function() {
  describe('#new Haxroomie()', function() {
    it('should create Haxroomie without errors', function() {
      return new Haxroomie();
    });
  });

  describe('#createBrowser()', function() {
    it('should launch puppeteer browser without errors', async function() {
      let haxroomie = new Haxroomie();
      // test that the puppeteer api has some property defined in API
      let browser = await haxroomie.createBrowser();
      expect(browser).to.have.property('pages');
      await haxroomie.closeBrowser();
    })
  });


  describe('#getSession()', function() {

    it('should return a Session object', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('1');
      expect(session).to.be.an('Session');
      await haxroomie.closeBrowser();
    });

    it('should add the session to roomSessions', async function() {
      let haxroomie = new Haxroomie();
      await haxroomie.getSession(0);
      expect(haxroomie.roomSessions).to.have.own.property(0);
      await haxroomie.closeBrowser();
    });

    it('should create new page for every new session request', async function() {
      let haxroomie = new Haxroomie();

      for (let i = 0; i < 5; i++) {
        await haxroomie.getSession(i);
      }
      let pages = await haxroomie.browser.pages()
      expect(pages).to.be.an('array').that.has.lengthOf(5);
      await haxroomie.closeBrowser();

    });

    it('should return the same session when using existing id', async function() {
      let haxroomie = new Haxroomie();
      await haxroomie.createBrowser();
      let sessionOne = await haxroomie.getSession(1);
      let sessionTwo = await haxroomie.getSession(1);
      expect(sessionOne).to.equal(sessionTwo);
      await haxroomie.closeBrowser();
    });
  });
});
