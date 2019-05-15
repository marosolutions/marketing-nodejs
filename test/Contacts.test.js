require('dotenv').config()
var Contacts = require('../src/Contacts');

var ACCOUNT_ID = process.env.ACCOUNT_ID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var CONTACT_ID = process.env.CONTACT_ID;
var LIST_ID = process.env.LIST_ID;

var testEmail = 'test' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';

describe('Gets the contact according to email address', function() {
  it('test getForEmail(page)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var resultList = await api.getForList(LIST_ID, 1);
    var email = resultList.data[0]['email'];
    var result = await api.getForEmail(email);

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    var id = result.data['id'];
    var accountId = result.data['account_id'];
    var resultEmail = result.data['email'];
    expect(LIST_ID).toEqual(String(id));
    expect(ACCOUNT_ID).toEqual(String(accountId));
    expect(resultEmail).toEqual(email);
  }, 60000);
});

describe('Gets the list of opens for the specified contact', function() {
  it('test getOpens(contactId, page)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var resultList = await api.getForList(LIST_ID, 1);
    var contactId = resultList.data[0]['id'];
    var result = await api.getOpens(contactId, 1);

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
  }, 60000);
});

describe('Gets the list of clicks for the specified contact', function() {
  it('test getClicks(contactId, page)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getClicks(CONTACT_ID, 1);

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
  }, 60000);
});

describe('Gets the list of contacts for the specified list', function() {
  it('test getForList(listId, page)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getForList(LIST_ID, 1);
    var accountId = result.data[0]['account_id'];
    var id = result.data[0]['id'];

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(LIST_ID).toEqual(String(id));
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets the specified contact from the specified list', function() {
  it('test getContactForList(listId, contactId)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.getContactForList(LIST_ID, CONTACT_ID);

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    var id = result.data['id'];
    var accountId = result.data['account_id'];
    expect(CONTACT_ID).toEqual(String(id));
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Creates a contact within a list. Updates if previous contact is matched by email.', function() {
  it('test createOrUpdateForList() => create', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: null, customField3: 123}
    var results = await api.createOrUpdateForList(LIST_ID, email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', null, customFields, ['tag1','tag2'], ['removeTag1', 'removeTag2'], false, false);
    expect(results.isSuccess).toBeTruthy();
    expect(results.errorMessage).toEqual('');

    var getResult = await api.getForEmail(email);
    var resultEmail = getResult.data['email'];
    var resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('TestFirstName');
    expect(resultEmail).toEqual(email);
  }, 60000);
});

describe('Creates a contact within a list. Updates if previous contact is matched by email.', function() {
  it('test createOrUpdateForList() => update', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: null, customField3: 123}

    var createResult = await api.createOrUpdateForList(LIST_ID, email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', null, customFields, ['tag1','tag2'], ['removeTag1', 'removeTag2'], false, false);
    var updateResult = await api.createOrUpdateForList(LIST_ID, email, 'Updated FName', 'Updated LName', '555-555-5555', '999-999-9999', null, customFields, ['tag1','tag2'], ['removeTag1', 'removeTag2'], true, true);
    expect(updateResult.isSuccess).toBeTruthy();
    expect(updateResult.errorMessage).toEqual('');

    var getResult = await api.getForEmail(email);
    var resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('Updated FName');
  }, 60000);
});

describe('Creates a contact within a list. Updates if previous contact is matched by email.', function() {
  it('test createOrUpdateContact() => create', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: null, customField3: 123}

    var createResult = await api.createOrUpdateContact(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', 
      null, customFields,  ['tag1','tag2'], ['removeTag1','removeTag2'], false, false);
    expect(createResult.isSuccess).toBeTruthy();
    expect(createResult.errorMessage).toEqual('');

    var getResult = await api.getForEmail(email);
    var resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('TestFirstName');
  }, 60000);
});

describe('Creates a contact within a list. Updates if previous contact is matched by email.', function() {
  it('test createOrUpdateContact() => update', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: null, customField3: 123}

    var createResult = await api.createOrUpdateContact(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', 
      null, customFields,  ['tag1','tag2'], ['removeTag1','removeTag2'], false, false);
    var updateResult = await api.createOrUpdateContact(email, 'UpdateFirstName', 'UpdateLastName', '555-555-5555', '999-999-9999', 
      null, customFields,  ['tag1','tag2'], ['removeTag1','removeTag2'], false, false);
    expect(updateResult.isSuccess).toBeTruthy();
    expect(updateResult.errorMessage).toEqual('');

    var getResult = await api.getForEmail(email);
    var resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('UpdateFirstName');
  }, 60000);
});

describe('Creates a contact within a list. Updates if previous contact is matched by email', function() {
  it('test updateForListAndContact()', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: null, customField3: 123}

    var createResult = await api.createOrUpdateForListsAndWorkflows(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', null, customFields, ['tag1","tag2'], ['removeTag1','removeTag2'], false, [21,94,95], [], [7,45]);
    var contactId = createResult.data['id'];

    var updateResult = await api.updateForListAndContact(LIST_ID, contactId, email,
      'UpdatedFirstName', 'UpdatedLastName', '444-444-4444',
      '888-888-8888', null, customFields,
      ['tag3','tag4'], ['removeTag3','removeTag4'], true, true);
    expect(updateResult.isSuccess).toBeTruthy();
    expect(updateResult.errorMessage).toEqual('');

    var getResult = await api.getForEmail(email);
    var resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('UpdatedFirstName');
  }, 60000);
});

describe('Deletes specified contact from all lists', function() {
  it('test deleteFromAllLists(email)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: null, customField3: 123};
    var createResult = await api.createOrUpdateForListsAndWorkflows(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', null, customFields, ['tag1","tag2'], ['removeTag1','removeTag2'], false, [21,94,95], [], [7,45]);

    var getResult = await api.getForEmail(email);
    var resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('TestFirstName');

    var deleteResult = await api.deleteFromAllLists(email);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes specified contact from the specified list', function() {
  it('test deleteListContact(uid)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: null, customField3: 123};
    var tags = ["tag1", "tag2", "tag3"];
    var removeTags = ["remove_tag1", "remove_tag2", "remove_tag3"];
    var createResult = await api.createOrUpdateContact(email, "dotnet_test_fm", "dotnet_test_lm", "9999999999", "5555555555", "xxx123", customFields, tags, removeTags, false, false);
    var contactId = createResult.data['id'];

    var deleteResult = await api.deleteListContact(LIST_ID, contactId);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes specified contact from the specified list', function() {
  it('test unsubscribeAll(contactFieldValue, contactFieldName)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: 'abc', customField3: 123};
    var tags = ["tag1", "tag2", "tag3"];
    var removeTags = ["remove_tag1", "remove_tag2", "remove_tag3"];
    var createResult = await api.createOrUpdateContact(email, "dotnet_test_fm", "dotnet_test_lm", "9999999999", "5555555555", "xxx123", customFields, tags, removeTags, false, false);

    var unsubscribeResult = await api.unsubscribeAll(email);
    expect(unsubscribeResult.isSuccess).toBeTruthy();
    expect(unsubscribeResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes contact having the specified UID', function() {
  it('test deleteContactForUid(uid)', async () => {
    var api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    var email = testEmail;
    var customFields = {customField1: true, customField2: 'abc', customField3: 123};
    var createResult = await api.createOrUpdateContact(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', 
      'xx1123', customFields,  ['tag1','tag2'], ['removeTag1','removeTag2'], false, false);
    var getResult = await api.getForEmail(email);
    var uid = getResult.data["uid"];
    expect(getResult.isSuccess).toBeTruthy();
    expect(getResult.errorMessage).toEqual('');
    if (uid) {
      var deleteResult = await api.deleteContactForUid(uid);
      expect(deleteResult.isSuccess).toBeTruthy();
      expect(deleteResult.errorMessage).toEqual('');
    }
  }, 60000);
});