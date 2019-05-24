require('dotenv').config()
var Campaigns = require('../src/Campaigns');

var ACCOUNT_ID = process.env.ACCOUNT_ID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;

describe('get all campaign', function() {
  it('get(page)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var accountId = apiResponse.data[0]['account_id'];
    expect(apiResponse).not.toBe(null);
    expect(Array.isArray(apiResponse.data)).toBeTruthy();
    expect(apiResponse.isSuccess).toBeTruthy();
    expect(apiResponse.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('get campaign by campaignId', function() {
  it('getCampaign(campaignId)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var campaignId = apiResponse.data[0]['id'];

    var response = await api.getCampaign(campaignId);
    var id = response.data["id"];
    var accountId = response.data['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('get deliveredReports by id and page', function() {
  it('getDeliveredReports(id, page)', async () => {
    var campaignId = 0;
    var qtyReports = 0;

    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);

    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]['id'];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['delivered'];

      if (qtyReports > 1) {
        campaignId = testCampaignId;
      }
    }

    var response = await api.getDeliveredReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    var accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('getOpenReports by id and page', function() {
  it('getOpenReports(id, page = 1, unique = true)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var campaignId = 0;
    var qtyReports = 0;
    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]['id'];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['opened'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    var response = await api.getOpenReports(campaignId, 1, true);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    var accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('getClickReports by id and page', function() {
  it('getClickReports(id, page = 1, unique = true)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var campaignId = 0;
    var qtyReports = 0;
    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]['id'];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['clicked'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    var response = await api.getClickReports(campaignId, 1, true);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    var accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('getLinkReports by id and page', function() {
  it('getLinkReports(id, page = 1, unique = true)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var campaignId = 0;
    var qtyReports = 0;
    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]['id'];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['clicked'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    var response = await api.getLinkReports(campaignId, 1, true);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    expect(id).toEqual(campaignId);
  }, 60000);
});

describe('getBounceReports by id and page', function() {
  it('getBounceReports(id, page = 1)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var campaignId = 0;
    var qtyReports = 0;
    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]['id'];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['bounced'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    var response = await api.getBounceReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    var accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('getSoftBounceReports by id and page', function() {
  it('getSoftBounceReports(id, page = 1)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var campaignId = 0;
    var qtyReports = 0;
    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]['id'];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['soft_bounced'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    var response = await api.getSoftBounceReports(campaignId, 1, true);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    var accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

// ERROR
describe('getHardBounceReports by id and page', function() {
  it('getHardBounceReports(id, page = 1)', async (done) => {
    var campaignId = 0;
    var qtyReports = 0;
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]["id"];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['hard_bounced'];
      if (qtyReports > 1) {
        campaignId = testCampaignId;
        break;
      }
    }
    
    var response = await api.getHardBounceReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    var accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 600000);
});

describe('getUnsubscribeReports by id and page', function() {
  it('getUnsubscribeReports(id, page = 1)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var campaignId = 0;
    var qtyReports = 0;
    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]['id'];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['unsubscribed'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    var response = await api.getUnsubscribeReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    var accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 600000);
});

describe('getComplaintReports by id and page', function() {
  it('getComplaintReports(id, page = 1)', async () => {
    var api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    var apiResponse = await api.get(1);
    var campaignId = 0;
    var qtyReports = 0;
    for (var i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      var testCampaignId = apiResponse.data[i]['id'];
      var campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['complaint'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    var response = await api.getComplaintReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    var id = response.data[0]['campaign_id'];
    var accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 600000);
});