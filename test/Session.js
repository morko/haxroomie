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

    it('should send back a CLIENT_CONNECTED action', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('sessionID1');
      let fakeActionHandler = sinon.fake();
      session.subscribe('clientID1', fakeActionHandler);

      expect(fakeActionHandler.callCount).to.equal(1);
      expect(fakeActionHandler.lastArg).to.deep.equal({
        type: 'CLIENT_CONNECTED',
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
      let fakeActionHandler = sinon.fake();
      session.subscribe('clientID1', fakeActionHandler);
      session.unsubscribe('clientID1');
      expect(session.subscriptions).to.not.have.property('clientID1');
      await haxroomie.closeBrowser();
    });

  });

  describe('#send()', function() {

    it('should send a private message', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('sessionID1');

      let fakeActionHandler1 = sinon.fake();
      let fakeActionHandler2 = sinon.fake();
      session.subscribe('clientID1', fakeActionHandler1);
      session.subscribe('clientID2', fakeActionHandler2);

      const actionFactory = require('haxroomie-action-factory')('clientID1');
      let action = actionFactory.create('HELLO', { test: 'test'} );
      session.send('clientID2', action,);

      expect(fakeActionHandler2.callCount).to.equal(2);
      expect(fakeActionHandler2.lastArg).to.deep.equal(action);
      await haxroomie.closeBrowser();
    });

    it('should send a broadcast message', async function() {
      let haxroomie = new Haxroomie();
      let session = await haxroomie.getSession('sessionID1');

      let fakeActionHandler1 = sinon.fake();
      let fakeActionHandler2 = sinon.fake();
      let fakeActionHandler3 = sinon.fake();
      session.subscribe('clientID1', fakeActionHandler1);
      session.subscribe('clientID2', fakeActionHandler2);
      session.subscribe('clientID3', fakeActionHandler3);

      const actionFactory = require('haxroomie-action-factory')('clientID1');
      let action = actionFactory.create('HELLO', { test: 'test'} );
      session.broadcast(action);

      expect(fakeActionHandler1.callCount).to.equal(4);
      expect(fakeActionHandler1.lastArg).to.deep.equal(action);
      expect(fakeActionHandler2.callCount).to.equal(3);
      expect(fakeActionHandler2.lastArg).to.deep.equal(action);
      expect(fakeActionHandler3.callCount).to.equal(2);
      expect(fakeActionHandler3.lastArg).to.deep.equal(action);
      await haxroomie.closeBrowser();
    });
  });
});
