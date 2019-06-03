require('dotenv').config()

const Reports = require('../src/Reports');

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

describe('Gets the list of reports', function() {
  it('get(page)', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.get(1);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
  }, 60000);
});

describe('Gets report by id', function() {
  it('getReport(id)', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getReport(19);
    let accountId = result.data.account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets the list of open reports based on filters and fields provided', function() {
  it('getOpens() with page', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getOpens(1);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getOpens() with fields', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let fields = ['email', 'first_name', 'last_name'];
    let result = await api.getOpens(1, fields);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getOpens() with fields and params', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let fields = ['email', 'first_name', 'last_name'];
    let from = '2016-06-28';
    let to = '2017-06-28';
    let unique = true;
    let per = 4;
    let result = await api.getOpens(1, fields, from, to, unique, null, null, per);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of click reports', function() {
  it('getClicks() with page', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getClicks(1);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getClicks() with fields', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let fields = ['email', 'first_name', 'last_name'];
    let result = await api.getClicks(1, fields);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getClicks() with fields and params', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let fields = ['email', 'first_name', 'last_name'];
    let from = '2016-06-28';
    let to = '2017-06-28';
    let unique = true;
    let per = 4;
    let result = await api.getClicks(1, fields, from, to, unique, null, null, per);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of bounce reports', function() {
  it('getBounces() with page', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getBounces(1);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getBounces() with fields and params', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let fields = ['email', 'first_name', 'last_name'];
    let from = '2016-06-28';
    let to = '2017-06-28';
    let unique = true;
    let type = "hard";
    let per = 4;
    let result = await api.getBounces(1, fields, from, to, unique, null, null, type, per);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of Unsubscribes with provided filter constraints', function() {
  it('getUnsubscribes() with page', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getUnsubscribes(1);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getUnsubscribes() with fields and params', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let fields = ['email', 'first_name', 'last_name'];
    let from = '2016-06-28';
    let to = '2017-06-28';
    let unique = true;
    let per = 4;
    let result = await api.getUnsubscribes(1, fields, from, to, unique, null, null, per);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of complaints filtered by provided params', function() {
  it('getComplaints() with page', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getComplaints(1);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getComplaints() with fields and params', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let fields = ['email', 'first_name', 'last_name'];
    let from = '2016-06-28';
    let to = '2017-06-28';
    let unique = true;
    let per = 4;
    let result = await api.getComplaints(1, fields, from, to, unique, null, null, per);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of Ab Reports', function() {
  it('getAbReports() with page', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getAbReports(1);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getAbReports() with params', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let from = '2016-06-28';
    let to = '2017-06-28';
    let per = 4;
    let result = await api.getAbReports("Test", 1, from, to, per);
    let accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets the list of all Journeys', function() {
  it('getJourneys(page)', async () => {
    let api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getJourneys(1);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
  }, 60000);
});
