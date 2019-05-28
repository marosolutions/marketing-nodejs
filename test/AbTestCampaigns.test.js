require('dotenv').config()

const AbTestCampaigns = require('../src/AbTestCampaigns');
const Helpers = require('../src/Helpers/Helpers');

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const TODAY = Helpers.today('YYYY-MM-DD HH:mm:ss');
const TOMORROW = Helpers.additionalDate(TODAY, 1, 'YYYY-MM-DD HH:mm:ss')

/*
  ERROR
  result OperationResult {
    data:
      { base:
        [ 'Winning criteria must be selected',
          'Campaign groups can\'t be less than two.',
          'No recipients were selected.' ] },
    errorMessage:
      '400: Either your accountId, authToken, or one (or more) of your function arguments are invalid.',
    isSuccess: false 
  }
*/
describe('Creates an Ab Test Campaign', function() {
  it('createAbTest()', async () => {
    let api = new AbTestCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    let name = 'name_' + Math.round((new Date()).getTime() / 1000);
    let fromEmail = 'frm_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let replyTo = 'to_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let address = 'The Alternative Daily | 860 US Highway 1 | Suite 210 | North Palm Beach | FL | 33408';
    let language = 'en';
    let sendAt = TOMORROW;
    let commit = 'Save as Draft';
    let campaignAttr = [
      {
        name: 'Group A',
        content_id: '92',
        subject: 'a',
        preheader: '232',
        from_name: 'k',
        percentage: '2',
        send_at: TOMORROW,
      },
      {
        name: 'Group B',
        content_id: '92',
        subject: 'b',
        preheader: '232',
        from_name: 'gg',
        percentage: '2',
        send_at: TOMORROW,
      }
    ];

    let result = await api.createAbTest(name, fromEmail, replyTo, address, language, campaignAttr, commit, sendAt);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);
});