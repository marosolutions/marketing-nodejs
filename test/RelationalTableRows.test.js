require('dotenv').config()
var RelationalTableRows = require('../src/RelationalTableRows');

var ACCOUNT_ID = process.env.ACCOUNT_ID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var DEFAULT_TABLENAME = "phpunit_testing_for_api";

describe('Gets the records of the Relational Table', function() {
  it('get()', async () => {
    var api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    var result = await api.get();

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
  }, 600000);
});

describe('Gets the specified record from the Relational Table', function() {
  it('show(idFieldName, idFieldValue)', async () => {
    var api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    var getResult = await api.get();
    var email = getResult.data['records'][0]['email'];
    
    var result = await api.show("email", email);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
    var actualEmail = result.data['result']['record']['email'];
    expect(email).toEqual(actualEmail);
  }, 600000);
});

describe('Adds a record to the Relational Table.', function() {
  it('create(keyValues)', async () => {
    var api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    var email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    var keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };

    var result = await api.create(keyValues);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
    var created = result.data['result']['created'];
    expect(1).toEqual(created);
  }, 600000);
});

describe('Updates a record in the Relational Table.', function() {
  it('update(keyValues)', async () => {
    var api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    var email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    var keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };
    var createResult = await api.create(keyValues);
    expect(createResult.isSuccess).toBeTruthy();

    var keyValuesUpdate = {
      'email': email,
      'firstName': 'Test First Name Update',
      'lastName': 'Test Last Name Update'
    };
    var result = await api.update(keyValuesUpdate);
    expect(createResult.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
  }, 600000);
});

/*
  result OperationResult {
    data: { status: '404', error: 'Not Found' },
    errorMessage: 'Not Found',
    isSuccess: false 
  }
*/
describe('Updates a record in the Relational Table.', function() {
  it('upsert(keyValues) create', async () => {
    var api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    var email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    var keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };

    var result = await api.upsert(keyValues);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
    var created = result.data['result']['created'];
    expect(1).toEqual(created);
  }, 600000);

  it('upsert(keyValues) update', async () => {
    var api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    var email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    var keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };
    var createResult = await api.create(keyValues);
    expect(createResult.isSuccess).toBeTruthy();

    var keyValuesUpdate = {
      'email': email,
      'firstName': 'Test First Name Update',
      'lastName': 'Test Last Name Update'
    };
    var result = await api.upsert(keyValuesUpdate);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
  }, 600000);
});

describe('Deletes the given record of the relational table', function() {
  it('delete(idFieldName, idFieldValue)', async () => {
    var api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    var email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    var keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };
    var createResult = await api.create(keyValues);
    expect(createResult.isSuccess).toBeTruthy();

    var result = await api.delete('email', email);
    expect(createResult.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
  }, 600000);
});