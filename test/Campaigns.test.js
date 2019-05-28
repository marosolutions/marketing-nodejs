require('dotenv').config()

const Campaigns = require('../src/Campaigns');

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

describe('get all campaign', function() {
  it('get(page)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let accountId = apiResponse.data[0]['account_id'];
    expect(apiResponse).not.toBe(null);
    expect(Array.isArray(apiResponse.data)).toBeTruthy();
    expect(apiResponse.isSuccess).toBeTruthy();
    expect(apiResponse.errorMessage).toEqual('');
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('get campaign by campaignId', function() {
  it('getCampaign(campaignId)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let campaignId = apiResponse.data[0]['id'];

    let response = await api.getCampaign(campaignId);
    let id = response.data["id"];
    let accountId = response.data['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('get deliveredReports by id and page', function() {
  it('getDeliveredReports(id, page)', async () => {
    let campaignId = 0;
    let qtyReports = 0;

    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);

    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]['id'];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['delivered'];

      if (qtyReports > 1) {
        campaignId = testCampaignId;
      }
    }

    let response = await api.getDeliveredReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    let accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('getOpenReports by id and page', function() {
  it('getOpenReports(id, page = 1, unique = true)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let campaignId = 0;
    let qtyReports = 0;
    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]['id'];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['opened'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    let response = await api.getOpenReports(campaignId, 1, true);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    let accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('getClickReports by id and page', function() {
  it('getClickReports(id, page = 1, unique = true)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let campaignId = 0;
    let qtyReports = 0;
    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]['id'];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['clicked'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    let response = await api.getClickReports(campaignId, 1, true);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    let accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('getLinkReports by id and page', function() {
  it('getLinkReports(id, page = 1, unique = true)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let campaignId = 0;
    let qtyReports = 0;
    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]['id'];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['clicked'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    let response = await api.getLinkReports(campaignId, 1, true);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    expect(id).toEqual(campaignId);
  }, 60000);
});

describe('getBounceReports by id and page', function() {
  it('getBounceReports(id, page = 1)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let campaignId = 0;
    let qtyReports = 0;
    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]['id'];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['bounced'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    let response = await api.getBounceReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    let accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

describe('getSoftBounceReports by id and page', function() {
  it('getSoftBounceReports(id, page = 1)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let campaignId = 0;
    let qtyReports = 0;
    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]['id'];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['soft_bounced'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    let response = await api.getSoftBounceReports(campaignId, 1, true);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    let accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 60000);
});

// ERROR
describe('getHardBounceReports by id and page', function() {
  it('getHardBounceReports(id, page = 1)', async (done) => {
    let campaignId = 0;
    let qtyReports = 0;
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]["id"];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['hard_bounced'];
      if (qtyReports > 1) {
        campaignId = testCampaignId;
        break;
      }
    }
    
    let response = await api.getHardBounceReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    let accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 600000);
});

describe('getUnsubscribeReports by id and page', function() {
  it('getUnsubscribeReports(id, page = 1)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let campaignId = 0;
    let qtyReports = 0;
    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]['id'];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['unsubscribed'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    let response = await api.getUnsubscribeReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    let accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 600000);
});

describe('getComplaintReports by id and page', function() {
  it('getComplaintReports(id, page = 1)', async () => {
    let api = new Campaigns(ACCOUNT_ID, AUTH_TOKEN);
    let apiResponse = await api.get(1);
    let campaignId = 0;
    let qtyReports = 0;
    for (let i = 0; campaignId == 0 && i < apiResponse.data.length; i++) {
      let testCampaignId = apiResponse.data[i]['id'];
      let campaignResult = await api.getCampaign(testCampaignId);
      qtyReports = campaignResult.data['complaint'];
      if (qtyReports > 1) {
          campaignId = testCampaignId;
      }
    }

    let response = await api.getComplaintReports(campaignId, 1);
    expect(response.isSuccess).toBeTruthy();
    expect(response.errorMessage).toEqual('');
    expect(response.data.length).toBeGreaterThan(1);
    let id = response.data[0]['campaign_id'];
    let accountId = response.data[0]['account_id'];
    expect(id).toEqual(campaignId);
    expect(ACCOUNT_ID).toEqual(String(accountId));
  }, 600000);
});