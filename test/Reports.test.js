require('dotenv').config()
var Reports = require('../src/Reports');

var ACCOUNT_ID = process.env.ACCOUNT_ID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;

describe('Gets the list of reports', function() {
  it('get(page)', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.get(1);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
  }, 60000);
});

describe('Gets report by id', function() {
  it('getReport(id)', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getReport(19);
    var accountId = result.data.account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets the list of open reports based on filters and fields provided', function() {
  it('getOpens() with page', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getOpens(1);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getOpens() with fields', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var fields = ['email', 'first_name', 'last_name'];
    var result = await api.getOpens(1, fields);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getOpens() with fields and params', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var fields = ['email', 'first_name', 'last_name'];
    var from = '2016-06-28';
    var to = '2017-06-28';
    var unique = true;
    var per = 4;
    var result = await api.getOpens(1, fields, from, to, unique, null, null, per);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of click reports', function() {
  it('getClicks() with page', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getClicks(1);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getClicks() with fields', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var fields = ['email', 'first_name', 'last_name'];
    var result = await api.getClicks(1, fields);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getClicks() with fields and params', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var fields = ['email', 'first_name', 'last_name'];
    var from = '2016-06-28';
    var to = '2017-06-28';
    var unique = true;
    var per = 4;
    var result = await api.getClicks(1, fields, from, to, unique, null, null, per);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of bounce reports', function() {
  it('getBounces() with page', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getBounces(1);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getBounces() with fields and params', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var fields = ['email', 'first_name', 'last_name'];
    var from = '2016-06-28';
    var to = '2017-06-28';
    var unique = true;
    var type = "hard";
    var per = 4;
    var result = await api.getBounces(1, fields, from, to, unique, null, null, type, per);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of Unsubscribes with provided filter constraints', function() {
  it('getUnsubscribes() with page', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getUnsubscribes(1);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getUnsubscribes() with fields and params', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var fields = ['email', 'first_name', 'last_name'];
    var from = '2016-06-28';
    var to = '2017-06-28';
    var unique = true;
    var per = 4;
    var result = await api.getUnsubscribes(1, fields, from, to, unique, null, null, per);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of complaints filtered by provided params', function() {
  it('getComplaints() with page', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getComplaints(1);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getComplaints() with fields and params', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var fields = ['email', 'first_name', 'last_name'];
    var from = '2016-06-28';
    var to = '2017-06-28';
    var unique = true;
    var per = 4;
    var result = await api.getComplaints(1, fields, from, to, unique, null, null, per);
    // console.log('>> result', result.data[0])
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets a list of Ab Reports', function() {
  it('getAbReports() with page', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getAbReports(1);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);

  it('getAbReports() with params', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var from = '2016-06-28';
    var to = '2017-06-28';
    var per = 4;
    var result = await api.getAbReports("Test", 1, from, to, per);
    var accountId = result.data[0].account_id;
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets the list of all Journeys', function() {
  it('getJourneys(page)', async () => {
    var api = new Reports(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getJourneys(1);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
  }, 60000);
});
