require('dotenv').config()

const Contacts = require('../src/Contacts');

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const CONTACT_ID = process.env.CONTACT_ID;
const LIST_ID = process.env.LIST_ID;

const testEmail = 'test' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';

describe('Gets the contact according to email address', function() {
  it('test getForEmail(page)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let resultList = await api.getForList(LIST_ID, 1);
    let email = resultList.data[0]['email'];
    let result = await api.getForEmail(email);

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    let id = result.data['id'];
    let accountId = result.data['account_id'];
    let resultEmail = result.data['email'];
    expect(LIST_ID).toEqual(String(id));
    expect(ACCOUNT_ID).toEqual(String(accountId));
    expect(resultEmail).toEqual(email);
  }, 60000);
});

describe('Gets the list of opens for the specified contact', function() {
  it('test getOpens(contactId, page)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let resultList = await api.getForList(LIST_ID, 1);
    let contactId = resultList.data[0]['id'];
    let result = await api.getOpens(contactId, 1);

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
  }, 60000);
});

describe('Gets the list of clicks for the specified contact', function() {
  it('test getClicks(contactId, page)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getClicks(CONTACT_ID, 1);

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(Array.isArray(result.data)).toBeTruthy();
  }, 60000);
});

describe('Gets the list of contacts for the specified list', function() {
  it('test getForList(listId, page)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getForList(LIST_ID, 1);
    let accountId = result.data[0]['account_id'];
    let id = result.data[0]['id'];

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(LIST_ID).toEqual(String(id));
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Gets the specified contact from the specified list', function() {
  it('test getContactForList(listId, contactId)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.getContactForList(LIST_ID, CONTACT_ID);

    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    let id = result.data['id'];
    let accountId = result.data['account_id'];
    expect(CONTACT_ID).toEqual(String(id));
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('Creates a contact within a list.', function() {
  it('test createOrUpdateForList() => create', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: null, customField3: 123}
    let results = await api.createOrUpdateForList(LIST_ID, email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', null, customFields, ['tag1','tag2'], ['removeTag1', 'removeTag2'], false, false);
    expect(results.isSuccess).toBeTruthy();
    expect(results.errorMessage).toEqual('');

    let getResult = await api.getForEmail(email);
    let resultEmail = getResult.data['email'];
    let resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('TestFirstName');
    expect(resultEmail).toEqual(email);
  }, 60000);
});

describe('Updates if previous contact is matched by email.', function() {
  it('test createOrUpdateForList() => update', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: null, customField3: 123}

    let createResult = await api.createOrUpdateForList(LIST_ID, email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', null, customFields, ['tag1','tag2'], ['removeTag1', 'removeTag2'], false, false);
    let updateResult = await api.createOrUpdateForList(LIST_ID, email, 'Updated FName', 'Updated LName', '555-555-5555', '999-999-9999', null, customFields, ['tag1','tag2'], ['removeTag1', 'removeTag2'], true, true);
    expect(updateResult.isSuccess).toBeTruthy();
    expect(updateResult.errorMessage).toEqual('');

    let getResult = await api.getForEmail(email);
    let resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('Updated FName');
  }, 60000);
});

describe('Creates a contact within a list. Updates if previous contact is matched by email.', function() {
  it('test createOrUpdateContact() => create', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: null, customField3: 123}

    let createResult = await api.createOrUpdateContact(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', 
      null, customFields,  ['tag1','tag2'], ['removeTag1','removeTag2'], false, false);
    expect(createResult.isSuccess).toBeTruthy();
    expect(createResult.errorMessage).toEqual('');

    let getResult = await api.getForEmail(email);
    let resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('TestFirstName');
  }, 60000);
});

describe('Creates a contact within a list. Updates if previous contact is matched by email.', function() {
  it('test createOrUpdateContact() => update', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: null, customField3: 123}

    let createResult = await api.createOrUpdateContact(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', 
      null, customFields,  ['tag1','tag2'], ['removeTag1','removeTag2'], false, false);
    let updateResult = await api.createOrUpdateContact(email, 'UpdateFirstName', 'UpdateLastName', '555-555-5555', '999-999-9999', 
      null, customFields,  ['tag1','tag2'], ['removeTag1','removeTag2'], false, false);
    expect(updateResult.isSuccess).toBeTruthy();
    expect(updateResult.errorMessage).toEqual('');

    let getResult = await api.getForEmail(email);
    let resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('UpdateFirstName');
  }, 60000);
});

describe('Creates a contact within a list. Updates if previous contact is matched by email', function() {
  it('test updateForListAndContact()', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: null, customField3: 123}

    let createResult = await api.createOrUpdateForListsAndWorkflows(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', null, customFields, ['tag1","tag2'], ['removeTag1','removeTag2'], false, [21,94,95], [], [7,45]);
    let contactId = createResult.data['id'];

    let updateResult = await api.updateForListAndContact(LIST_ID, contactId, email,
      'UpdatedFirstName', 'UpdatedLastName', '444-444-4444',
      '888-888-8888', null, customFields,
      ['tag3','tag4'], ['removeTag3','removeTag4'], true, true);
    expect(updateResult.isSuccess).toBeTruthy();
    expect(updateResult.errorMessage).toEqual('');

    let getResult = await api.getForEmail(email);
    let resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('UpdatedFirstName');
  }, 60000);
});

describe('Deletes specified contact from all lists', function() {
  it('test deleteFromAllLists(email)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: null, customField3: 123};
    let createResult = await api.createOrUpdateForListsAndWorkflows(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', null, customFields, ['tag1","tag2'], ['removeTag1','removeTag2'], false, [21,94,95], [], [7,45]);

    let getResult = await api.getForEmail(email);
    let resultFirstName = getResult.data['first_name'];
    expect(resultFirstName).toEqual('TestFirstName');

    let deleteResult = await api.deleteFromAllLists(email);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes specified contact from the specified list', function() {
  it('test deleteListContact(uid)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: null, customField3: 123};
    let tags = ["tag1", "tag2", "tag3"];
    let removeTags = ["remove_tag1", "remove_tag2", "remove_tag3"];
    let createResult = await api.createOrUpdateContact(email, "dotnet_test_fm", "dotnet_test_lm", "9999999999", "5555555555", "xxx123", customFields, tags, removeTags, false, false);
    let contactId = createResult.data['id'];

    let deleteResult = await api.deleteListContact(LIST_ID, contactId);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes specified contact from the specified list', function() {
  it('test unsubscribeAll(contactFieldValue, contactFieldName)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: 'abc', customField3: 123};
    let tags = ["tag1", "tag2", "tag3"];
    let removeTags = ["remove_tag1", "remove_tag2", "remove_tag3"];
    let createResult = await api.createOrUpdateContact(email, "dotnet_test_fm", "dotnet_test_lm", "9999999999", "5555555555", "xxx123", customFields, tags, removeTags, false, false);

    let unsubscribeResult = await api.unsubscribeAll(email);
    expect(unsubscribeResult.isSuccess).toBeTruthy();
    expect(unsubscribeResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes contact having the specified UID', function() {
  it('test deleteContactForUid(uid)', async () => {
    let api = new Contacts(ACCOUNT_ID, AUTH_TOKEN);
    let email = testEmail;
    let customFields = {customField1: true, customField2: 'abc', customField3: 123};
    let createResult = await api.createOrUpdateContact(email, 'TestFirstName', 'TestLastName', '555-555-5555', '999-999-9999', 
      'xx1123', customFields,  ['tag1','tag2'], ['removeTag1','removeTag2'], false, false);
    let getResult = await api.getForEmail(email);
    let uid = getResult.data["uid"];
    expect(getResult.isSuccess).toBeTruthy();
    expect(getResult.errorMessage).toEqual('');
    if (uid) {
      let deleteResult = await api.deleteContactForUid(uid);
      expect(deleteResult.isSuccess).toBeTruthy();
      expect(deleteResult.errorMessage).toEqual('');
    }
  }, 60000);
});