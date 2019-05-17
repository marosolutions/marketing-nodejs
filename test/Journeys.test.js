require('dotenv').config()
var Journeys = require('../src/Journeys');

var ACCOUNT_ID = process.env.ACCOUNT_ID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var JOURNEY_ID = 0;
var CONTACT_ID = 0;

describe('Gets the list of journeys', function() {
  it('get(page)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.get(1);
    var accountId = result.data[0]['account_id'];
    expect(result).not.toBe(null);
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets the list of all campaigns for the specified journey.', function() {
  it('getCampaigns(journeyId, page)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var resultData = await api.get(1);

    for (var i = 0; i < resultData.data.length; i++) {
      var journeyId = resultData.data[i]['id'];
      var result = await api.getCampaigns(journeyId, 1);

      if (result.isSuccess && result.data.length) {
        var accountId = result.data[0]['account_id'];
        expect(result).not.toBe(null);
        expect(Array.isArray(result.data)).toBeTruthy();
        expect(result.isSuccess).toBeTruthy();
        expect(result.errorMessage).toEqual('');
        expect(ACCOUNT_ID).toEqual(String(accountId));
        break;
      }
    }
  }, 60000);
});

describe('Gets the list of all contacts for the specified journey.', function() {
  it('getContacts(journeyId, page)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var resultData = await api.get(1);

    for (var i = 0; i < resultData.data.length; i++) {
      var journeyId = resultData.data[i]['id'];
      var result = await api.getContacts(journeyId, 1);

      if (result.isSuccess && result.data.length) {
        var accountId = result.data[0]['account_id'];
        expect(result).not.toBe(null);
        expect(Array.isArray(result.data)).toBeTruthy();
        expect(result.isSuccess).toBeTruthy();
        expect(result.errorMessage).toEqual('');
        expect(ACCOUNT_ID).toEqual(String(accountId));
        break;
      }
    }
  }, 60000);
});

describe('Stops all journeys, filtered for the matching parameters.', function() {
  it('stopAll(contactId, recipientEmail, uid, page)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var getResult = await api.get(1);
    var journeyId = getResult.data[0]["id"];
    var contactResult = await api.getContacts(journeyId, 1);
    var contactId = 0;
    var email = '';
    var uid = '';
    for (var i = 0; i < contactResult.data.length; i++) {
      var contactId = contactResult.data[i]['contact_id'];
      var email = contactResult.data[i]['email'];
      var uid = contactResult.data[i]['uid'];
      if (contactId > 0 && email){
        break;
      }
    }

    var result = await api.stopAll(contactId, email, uid, 1);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);
});

describe('Pause the specified journey for the specified contact.', function() {
  it('pauseJourneyForContact(journeyId, contactId)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var getResult = await api.get(1);
    var journeyId = 0
    var contactId = 0;
    var isTested = false;
    for (var i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      var contactResult = await api.getContacts(journeyId, 1);
      for (var i = 0; i < contactResult.data.length; i++) {
        contactId = contactResult.data[i]['contact_id'];
        var pauseResult = await api.pauseJourneyForContact(journeyId, contactId);
        if (pauseResult.isSuccess) {
          expect(pauseResult.isSuccess).toBeTruthy();
          expect(pauseResult.errorMessage).toEqual('');
          isTested = true;
          break;
        }
      }
      if (isTested) {
        break;
      }
    }
  }, 6000000);
});

// timeout
describe('Pause the specified journey for the contact having the specified UID', function() {
  it('pauseJourneyForUid(journeyId, uid)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var getResult = await api.get(1);
    var journeyId = 0;
    var uid = 0;
    var isTested = false;
    for (var i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      var contactResult = await api.getContacts(journeyId, 1);
      for (var i = 0; i < contactResult.data.length; i++) {
        uid = contactResult.data[i]['uid'];
        var pauseResult = await api.pauseJourneyForUid(journeyId, uid);
        if (pauseResult.isSuccess) {
          expect(pauseResult.isSuccess).toBeTruthy();
          expect(pauseResult.errorMessage).toEqual('');
          isTested = true;
          break;
        }
      }
      if (isTested) {
        break;
      }
    }
  }, 6000000);
});

// timeout
describe('Reset the specified journey for the specified active/paused contact.', function() {
  it('resetJourneyForContact(journeyId, contactId)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var getResult = await api.get(1);
    var journeyId = 0;
    var contactId = 0;
    var isTested = false;
    for (var i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      var contactResult = await api.getContacts(journeyId, 1);
      for (var i = 0; i < contactResult.data.length; i++) {
        contactId = contactResult.data[i]['contactId'];
        var pauseResult = await api.resetJourneyForContact(journeyId, contactId);
        if (pauseResult.isSuccess) {
          expect(pauseResult.isSuccess).toBeTruthy();
          expect(pauseResult.errorMessage).toEqual('');
          isTested = true;
          break;
        }
      }
      if (isTested) {
        break;
      }
    }
  }, 6000000);
});

// timeout
describe('Reset the specified journey for the active/paused contact having the specified UID.', function() {
  it('resetJourneyForUid(journeyId, uid)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var getResult = await api.get(1);
    var journeyId = 0;
    var uid = 0;
    var isTested = false;
    for (var i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      var contactResult = await api.getContacts(journeyId, 1);
      for (var i = 0; i < contactResult.data.length; i++) {
        uid = contactResult.data[i]['uid'];
        var pauseResult = await api.resetJourneyForUid(journeyId, uid);
        if (pauseResult.isSuccess) {
          expect(pauseResult.isSuccess).toBeTruthy();
          expect(pauseResult.errorMessage).toEqual('');
          isTested = true;
          break;
        }
      }
      if (isTested) {
        break;
      }
    }
  }, 6000000);
});

// timeout
describe('Restarts a journey for a paused contact. Adds a new contact in journey.', function() {
  it('startJourneyForContact(journeyId, contactId)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var getResult = await api.get(1);
    var journeyId = 0;
    var contactId = 0;
    var isTested = false;
    for (var i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      var contactResult = await api.getContacts(journeyId, 1);
      for (var i = 0; i < contactResult.data.length; i++) {
        contactId = contactResult.data[i]['contactId'];
        var pauseResult = await api.startJourneyForContact(journeyId, contactId);
        if (pauseResult.isSuccess) {
          expect(pauseResult.isSuccess).toBeTruthy();
          expect(pauseResult.errorMessage).toEqual('');
          isTested = true;
          break;
        }
      }
      if (isTested) {
        break;
      }
    }
  }, 6000000);
});

// timeout
describe('Restarts a journey for a paused contact having the specified UID.', function() {
  it('startJourneyForUid(journeyId, uid)', async () => {
    var api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    var getResult = await api.get(1);
    var journeyId = 0;
    var uid = 0;
    var isTested = false;
    for (var i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      var contactResult = await api.getContacts(journeyId, 1);
      for (var i = 0; i < contactResult.data.length; i++) {
        uid = contactResult.data[i]['uid'];
        var pauseResult = await api.startJourneyForUid(journeyId, uid);
        if (pauseResult.isSuccess) {
          expect(pauseResult.isSuccess).toBeTruthy();
          expect(pauseResult.errorMessage).toEqual('');
          isTested = true;
          break;
        }
      }
      if (isTested) {
        break;
      }
    }
  }, 6000000);
});