require('dotenv').config()
var TransactionalCampaigns = require('../src/TransactionalCampaigns');
var Helpers = require('../src/Helpers/Helpers');

var ACCOUNT_ID = process.env.ACCOUNT_ID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var SEND_RECIPIENT = "test@maropost.com";
var SEND_RECIPIENT_FIRST_NAME = "test_receiverFN";
var SEND_RECIPIENT_LAST_NAME = "test_receiverLN";
var SEND_SENDER_NAME = "user-test sender";
var SEND_SENDER_EMAIL = "info@maropost.com";
var SEND_SENDER_REPLYTO = "noreply@maropost.com";
var SEND_CONTENT_ID = 162;
var SEND_CAMPAIGN_ID = 1;

describe('Gets the list of Transaction Campaigns.', function() {
  it('get(page)', async () => {
    var api = new TransactionalCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.get(1);
    var accountId = result.data[0]['account_id'];
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

// error => { status: '500', error: 'Internal Server Error' }
describe('Creates a Transactional Campaign', function() {
  it('create()', async () => {
    var api = new TransactionalCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    var campaignName = 'unitTest_name_' + Math.round((new Date()).getTime() / 1000);
    var result = await api.create(campaignName, "unitTest_subject", "unitTest_preheader", SEND_SENDER_NAME, SEND_SENDER_EMAIL, SEND_SENDER_REPLYTO, SEND_CONTENT_ID, false, "32 Koteshowr, Kathmandu, Nepal", "en", ["tag1", "tag2"])
    var accountId = result.data['account_id'];
    var resultName = result.data["name"];
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
    expect(campaignName).toEqual(resultName);
  }, 60000);
});

describe('Sends a transactional campaign email to a recipient.', function() {
  it('sendEmail()', async () => {
    var customFields = {'city': 'San Luis Obispo', 'state': 'California'};
    var tags = {'field1': 'value1', 'field2': 'value2'};
    var api = new TransactionalCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.sendEmail(SEND_CAMPAIGN_ID, null, 'test content', '<h2>Custom HTML</h2>', 'Test Content Text',
    null, null, true, 1, SEND_RECIPIENT, SEND_RECIPIENT_FIRST_NAME, SEND_RECIPIENT_LAST_NAME,
    customFields, null, SEND_SENDER_NAME, SEND_SENDER_REPLYTO, 'Test Subject', SEND_SENDER_EMAIL,
    'Test Sender Address', tags, ['ctag1', 'ctag2']);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);

  it('sendEmail() BothContentIdContentFields', async () => {
    var api = new TransactionalCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    var result = await api.sendEmail(SEND_CAMPAIGN_ID, 162, "test content", null, null, null, null, true, null, SEND_RECIPIENT, SEND_RECIPIENT_FIRST_NAME, SEND_RECIPIENT_LAST_NAME);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);
});