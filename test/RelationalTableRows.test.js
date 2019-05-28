require('dotenv').config()

const RelationalTableRows = require('../src/RelationalTableRows');

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const DEFAULT_TABLENAME = "phpunit_testing_for_api";

describe('Gets the records of the Relational Table', function() {
  it('get()', async () => {
    let api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    let result = await api.get();

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
  }, 600000);
});

describe('Gets the specified record from the Relational Table', function() {
  it('show(idFieldName, idFieldValue)', async () => {
    let api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    let getResult = await api.get();
    let email = getResult.data['records'][0]['email'];
    
    let result = await api.show("email", email);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
    let actualEmail = result.data['result']['record']['email'];
    expect(email).toEqual(actualEmail);
  }, 600000);
});

describe('Adds a record to the Relational Table.', function() {
  it('create(keyValues)', async () => {
    let api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    let email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };

    let result = await api.create(keyValues);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
    let created = result.data['result']['created'];
    expect(1).toEqual(created);
  }, 600000);
});

describe('Updates a record in the Relational Table.', function() {
  it('update(keyValues)', async () => {
    let api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    let email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };
    let createResult = await api.create(keyValues);
    expect(createResult.isSuccess).toBeTruthy();

    let keyValuesUpdate = {
      'email': email,
      'firstName': 'Test First Name Update',
      'lastName': 'Test Last Name Update'
    };
    let result = await api.update(keyValuesUpdate);
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
    let api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    let email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };

    let result = await api.upsert(keyValues);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
    let created = result.data['result']['created'];
    expect(1).toEqual(created);
  }, 600000);

  it('upsert(keyValues) update', async () => {
    let api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    let email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };
    let createResult = await api.create(keyValues);
    expect(createResult.isSuccess).toBeTruthy();

    let keyValuesUpdate = {
      'email': email,
      'firstName': 'Test First Name Update',
      'lastName': 'Test Last Name Update'
    };
    let result = await api.upsert(keyValuesUpdate);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
  }, 600000);
});

describe('Deletes the given record of the relational table', function() {
  it('delete(idFieldName, idFieldValue)', async () => {
    let api = new RelationalTableRows(ACCOUNT_ID, AUTH_TOKEN, DEFAULT_TABLENAME);
    let email = 'test_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let keyValues = {
      'email': email,
      'firstName': 'Test First Name',
      'lastName': 'Test Last Name'
    };
    let createResult = await api.create(keyValues);
    expect(createResult.isSuccess).toBeTruthy();

    let result = await api.delete('email', email);
    expect(createResult.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(result.data).not.toBeNull();
  }, 600000);
});