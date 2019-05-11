var Api = require('./Abstractions/Api');
var OperationResult = require('./Abstractions/OperationResult');

class Campaigns {
  
  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   */
  constructor(accountId, authToken) {
    this.auth_token = authToken;
    this.accountId = accountId;
    this.resource = 'campaigns';
  }

  /**
   * Gets the list of campaigns (200 campaigns per page).
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  get(page) {
    return Api._get(null, {'page': page});
  }

  /**
   * Gets the given campaign.
   * @param {int} campaignId
   * @return OperationResult
   */
  getCampaign(campaignId) {
    return Api._get(campaignId, []);
  }

  /**
   * Gets the list of delivered report for the specified campaign
   *
   * @param {int} id The campaign ID
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getDeliveredReports(id, page) {
    var overrideUrl = this.resource + '/' + id;
    return Api._get('delivered_report', {'page': page}, overrideUrl);
  }

  /**
   * Gets a list of Open Reports for the specified Campaign
   *
   * @param {int} id The campaign ID
   * @param {bool|null} unique Gets for unique contacts
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getOpenReports(id, page, unique = null) {
    var params = {'page': page};
    if (unique) {
      params['unique'] = unique === true ? 'true' : 'false';
    }
    var overrideUrl = this.resource + '/' + id;
    return Api._get('open_report', params, overrideUrl);
  }

  /**
   * Gets a list of Click Reports for the specified Campaign
   *
   * @param {int} id The campaign ID
   * @param {bool|null} unique Gets for unique contacts
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getClickReports(id, page, unique = null) {
    var params = {'page': page};
    if (unique) {
      params['unique'] = unique === true ? 'true' : 'false';
    }
    var overrideUrl = this.resource + '/' + id;
    return Api._get('click_report', params, overrideUrl);
  }

  /**
   * Gets a list of Link Reports for the specified Campaign
   *
   * @param {int} id The campaign ID
   * @param {bool|null} $unique Gets for unique contacts
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getLinkReports(id, page, unique = null) {
    var params = {'page': page};
    if (unique) {
      params['unique'] = unique === true ? 'true' : 'false';
    }
    var overrideUrl = this.resource + '/' + id;
    return Api._get('link_report', params, overrideUrl);
  }

  /**
   * Gets a list of Bounce Reports for the specified Campaign
   *
   * @param {int} id The campaign ID
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getBounceReports(id, page) {
    var overrideUrl = this.resource + '/' + id;
    return Api._get('bounce_report', {'page': page}, overrideUrl);
  }

  /**
   * Gets a list of soft bounce reports for the specified Campaign
   *
   * @param {int} id The campaign ID
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getSoftBounceReports(id, page) {
    var overrideUrl = this.resource + '/' + id;
    return Api._get('soft_bounce_report', {'page': page}, overrideUrl);
  }

  /**
   * Gets a list of hard bounces for the specified campaigns
   *
   * @param {int} id The campaign ID
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getHardBounceReports(id, page) {
    var overrideUrl = this.resource + '/' + id;
    return Api._get('hard_bounce_report', {'page': page}, overrideUrl);
  }

  /**
   * Gets a list of unsubscribe reports for the specified campaign
   *
   * @param {int} id The campaign ID
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getUnsubscribeReports(id, page) {
    var overrideUrl = this.resource + '/' + id;
    return Api._get('unsubscribe_report', {'page': page}, overrideUrl);
  }

  /**
   * Gets a list of complain reports for the specified campaign
   *
   * @param int $id The campaign ID
   * @param int $page page #. (>= 1)
   * @return OperationResult
   */
  getComplaintReports(id, page) {
    var overrideUrl = this.resource + '/' + id;
    return Api._get('complaint_report', {'page': page}, overrideUrl);
  }
 }

module.exports = Campaigns;