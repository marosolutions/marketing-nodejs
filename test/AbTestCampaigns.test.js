require('dotenv').config()
var AbTestCampaigns = require('../src/AbTestCampaigns');
var Helpers = require('../src/Helpers/Helpers');

var ACCOUNT_ID = process.env.ACCOUNT_ID;
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var TODAY = Helpers.today('YYYY-MM-DD HH:mm:ss');
var TOMORROW = Helpers.additionalDate(TODAY, 1, 'YYYY-MM-DD HH:mm:ss')

/*
  result OperationResult {
  data:
    { base:
      [ 'Winning criteria must be selected',
        'Campaign groups can\'t be less than two.',
        'No recipients were selected.' ] },
  errorMessage:
    '400: Either your accountId, authToken, or one (or more) of your function arguments are invalid.',
  isSuccess: false }
*/
describe('Creates an Ab Test Campaign', function() {
  it('createAbTest()', async () => {
    var api = new AbTestCampaigns(ACCOUNT_ID, AUTH_TOKEN);
    var name = 'name_' + Math.round((new Date()).getTime() / 1000);
    var fromEmail = 'frm_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    var replyTo = 'to_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    var address = 'The Alternative Daily | 860 US Highway 1 | Suite 210 | North Palm Beach | FL | 33408';
    var language = 'en';
    var sendAt = TOMORROW;
    var commit = 'Save as Draft';
    var campaignAttr = [
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

    // var result = await api.createAbTest(name, fromEmail, replyTo, address, language, campaignAttr, commit, sendAt);
    // expect(response.isSuccess).toBeTruthy();
    // expect(response.errorMessage).toEqual('');
  }, 60000);
});