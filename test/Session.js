require('./setup');
const expect = require('chai').expect;
const sinon = require('sinon');

const Haxroomie = require('../src/Haxroomie')

describe('Session', function() {

  describe('#subscribe()', function() {

    it('should add subscription', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('sessionID1');
      session.subscribe('clientID1', () => {});
      expect(session.subscriptions).to.have.property('clientID1');
      await haxroomie.closeBrowser();
    });

    it('should send back a CLIENT_CONNECTED message', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('sessionID1');
      let messageHandler = sinon.fake();
      session.subscribe('clientID1', messageHandler);

      expect(messageHandler.callCount).to.equal(1);
      expect(messageHandler.lastArg).to.deep.equal({
        type: session.messageTypes.CLIENT_CONNECTED,
        payload: {
          roomInfo: null,
          clientID: 'clientID1',
          sessionID: 'sessionID1'
        },
        sender: 'sessionID1'
      });
      await haxroomie.closeBrowser();
    });
  });

  describe('#unsubscribe()', function() {

    it('should remove the subscription', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('sessionID1');
      let messageHandler = sinon.fake();
      session.subscribe('clientID1', messageHandler);
      session.unsubscribe('clientID1');
      expect(session.subscriptions).to.not.have.property('clientID1');
      await haxroomie.closeBrowser();
    });

  });

  describe('#send()', function() {

    it('should send a private message', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('sessionID1');

      let messageHandler1 = sinon.fake();
      let messageHandler2 = sinon.fake();
      session.subscribe('clientID1', messageHandler1);
      session.subscribe('clientID2', messageHandler2);

      let msg = {
        type: 'HELLO',
        sender: 'clientID1',
        payload: { 
          test: 'test'
        }
      };
      session.send('clientID2', msg);

      expect(messageHandler2.callCount).to.equal(2);
      expect(messageHandler2.lastArg).to.deep.equal(msg);
      await haxroomie.closeBrowser();
    });

    it('should send a broadcast message', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('sessionID1');

      let messageHandler1 = sinon.fake();
      let messageHandler2 = sinon.fake();
      let messageHandler3 = sinon.fake();
      session.subscribe('clientID1', messageHandler1);
      session.subscribe('clientID2', messageHandler2);
      session.subscribe('clientID3', messageHandler3);

      let msg = {
        type: 'HELLO',
        sender: 'clientID1',
        payload: { 
          test: 'test'
        }
      };
      session.broadcast(msg);

      expect(messageHandler1.callCount).to.equal(4);
      expect(messageHandler1.lastArg).to.deep.equal(msg);
      expect(messageHandler2.callCount).to.equal(3);
      expect(messageHandler2.lastArg).to.deep.equal(msg);
      expect(messageHandler3.callCount).to.equal(2);
      expect(messageHandler3.lastArg).to.deep.equal(msg);
      await haxroomie.closeBrowser();
    });
  });
});
