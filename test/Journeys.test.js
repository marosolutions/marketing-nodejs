require('dotenv').config()

const Journeys = require('../src/Journeys');

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const JOURNEY_ID = 0;
const CONTACT_ID = 0;

describe('Gets the list of journeys', function() {
  it('get(page)', async () => {
    let api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.get(1);
    let accountId = result.data[0]['account_id'];
    expect(result).not.toBe(null);
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets the list of all campaigns for the specified journey.', function() {
  it('getCampaigns(journeyId, page)', async () => {
    let api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    let resultData = await api.get(1);

    for (let i = 0; i < resultData.data.length; i++) {
      let journeyId = resultData.data[i]['id'];
      let result = await api.getCampaigns(journeyId, 1);

      if (result.isSuccess && result.data.length) {
        let accountId = result.data[0]['account_id'];
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
    let api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    let resultData = await api.get(1);

    for (let i = 0; i < resultData.data.length; i++) {
      let journeyId = resultData.data[i]['id'];
      let result = await api.getContacts(journeyId, 1);

      if (result.isSuccess && result.data.length) {
        let accountId = result.data[0]['account_id'];
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
    let api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    let getResult = await api.get(1);
    let journeyId = getResult.data[0]["id"];
    let contactResult = await api.getContacts(journeyId, 1);
    let contactId = 0;
    let email = '';
    let uid = '';
    for (let i = 0; i < contactResult.data.length; i++) {
      let contactId = contactResult.data[i]['contact_id'];
      let email = contactResult.data[i]['email'];
      let uid = contactResult.data[i]['uid'];
      if (contactId > 0 && email){
        break;
      }
    }

    let result = await api.stopAll(contactId, email, uid, 1);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);
});

describe('Pause the specified journey for the specified contact.', function() {
  it('pauseJourneyForContact(journeyId, contactId)', async () => {
    let api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    let getResult = await api.get(1);
    let journeyId = 0
    let contactId = 0;
    for (let i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      let contactResult = await api.getContacts(journeyId, 1);
      if (contactResult.isSuccess) {
        expect(contactResult.isSuccess).toBeTruthy();
        contactId = contactResult.data[i]['contact_id'];

        let startResult = await api.startJourneyForContact(journeyId, contactId);
        expect(startResult.isSuccess).toBeTruthy();
        expect(startResult.errorMessage).toEqual('');

        let pauseResult = await api.pauseJourneyForContact(journeyId, contactId);
        expect(pauseResult.isSuccess).toBeTruthy();
        expect(pauseResult.errorMessage).toEqual('');
        break;
      }
    }
  }, 6000000);
});

// timeout
describe('Pause the specified journey for the contact having the specified UID', function() {
  it('pauseJourneyForUid(journeyId, uid)', async () => {
    let api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    let getResult = await api.get(1);
    let journeyId = 0;
    let uid = 0;
    let isTested = false;
    for (let i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      let contactResult = await api.getContacts(journeyId, 1);
      for (let i = 0; i < contactResult.data.length; i++) {
        uid = contactResult.data[i]['uid'];
        let pauseResult = await api.pauseJourneyForUid(journeyId, uid);
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
    let api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    let getResult = await api.get(1);
    let journeyId = 0;
    let contactId = 0;
    let isTested = false;
    for (let i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      let contactResult = await api.getContacts(journeyId, 1);
      for (let i = 0; i < contactResult.data.length; i++) {
        contactId = contactResult.data[i]['contactId'];
        let pauseResult = await api.resetJourneyForContact(journeyId, contactId);
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
    let api = new Journeys(ACCOUNT_ID, AUTH_TOKEN);
    let getResult = await api.get(1);
    let journeyId = 0;
    let uid = 0;
    let isTested = false;
    for (let i = 0; i < getResult.data.length; i++) {
      journeyId = getResult.data[i]['id'];
      let contactResult = await api.getContacts(journeyId, 1);
      for (let i = 0; i < contactResult.data.length; i++) {
        uid = contactResult.data[i]['uid'];
        let pauseResult = await api.resetJourneyForUid(journeyId, uid);
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