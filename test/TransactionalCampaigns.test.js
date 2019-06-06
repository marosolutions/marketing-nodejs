require('dotenv').config()

const TransactionalCampaigns = require('../src/TransactionalCampaigns');

const SEND_CAMPAIGN_ID = 1;
const SEND_CONTENT_ID = 162;
const ACCOUNT_ID = process.env.ACCOUNT_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const SEND_RECIPIENT = "test@maropost.com";
const SEND_SENDER_NAME = "user-test sender";
const SEND_SENDER_EMAIL = "info@maropost.com";
const SEND_SENDER_REPLYTO = "noreply@maropost.com";
const SEND_RECIPIENT_LAST_NAME = "test_receiverLN";
const SEND_RECIPIENT_FIRST_NAME = "test_receiverFN";

describe('Gets the list of Transaction Campaigns.', function() {
  it('get(page)', async () => {
    let api = new TransactionalCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.get(1);
    let accountId = result.data[0]['account_id'];
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

// ERROR => { status: '500', error: 'Internal Server Error' }
describe('Creates a Transactional Campaign', function() {
  it('create()', async () => {
    let api = new TransactionalCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    let campaignName = 'unitTest_name_' + Math.round((new Date()).getTime() / 1000);
    let result = await api.create(campaignName, "unitTest_subject", "unitTest_preheader", SEND_SENDER_NAME, SEND_SENDER_EMAIL, SEND_SENDER_REPLYTO, SEND_CONTENT_ID, false, "32 Koteshowr, Kathmandu, Nepal", "en", ["tag1", "tag2"])
    let accountId = result.data['account_id'];
    let resultName = result.data["name"];
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
    expect(campaignName).toEqual(resultName);
  }, 60000);
});

describe('Sends a transactional campaign email to a recipient.', function() {
  it('sendEmail()', async () => {
    let customFields = {'city': 'San Luis Obispo', 'state': 'California'};
    let tags = {'field1': 'value1', 'field2': 'value2'};
    let api = new TransactionalCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.sendEmail(SEND_CAMPAIGN_ID, null, 'test content', '<h2>Custom HTML</h2>', 'Test Content Text',
    null, null, true, 1, SEND_RECIPIENT, SEND_RECIPIENT_FIRST_NAME, SEND_RECIPIENT_LAST_NAME,
    customFields, null, SEND_SENDER_NAME, SEND_SENDER_REPLYTO, 'Test Subject', SEND_SENDER_EMAIL,
    'Test Sender Address', tags, ['ctag1', 'ctag2']);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);

  it('sendEmail() BothContentIdContentFields', async () => {
    let api = new TransactionalCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    let result = await api.sendEmail(SEND_CAMPAIGN_ID, 162, "test content", null, null, null, null, true, null, SEND_RECIPIENT, SEND_RECIPIENT_FIRST_NAME, SEND_RECIPIENT_LAST_NAME);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);
});