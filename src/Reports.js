var Api = require('./Abstractions/Api');
var Helpers = require('./Helpers/Helpers');

class Reports {

  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   */
  constructor(accountId, authToken) {
    this.auth_token = authToken;
    this.accountId = accountId;
    this.resource = 'reports';

    this.api = new Api(this.accountId, this.auth_token, this.resource);
  }

  /**
   * Gets the list of reports
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  get(page) {
    return this.api._get(null, {'page': page});
  }

  /**
   * Gets report by id
   * @param {int} id report ID
   * @return OperationResult
   */
  getReport(id) {
    return this.api._get(id);
  }

  /**
   * Gets the list of open reports based on filters and fields provided
   *
   * @param {array} fields contact field names to retrieve
   * @param {Date|null} from the beginning of date range filter
   * @param {Date|null} to the end of the date range filter
   * @param {bool|null} unique when true, gets only unique opens
   * @param {string|null} email filters by provided email in the contact
   * @param {string|null} uid filters by uid
   * @param {int|null} per determines how many records per request to receive
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getOpens(
      page,
      fields = [],
      from = null,
      to = null,
      unique = null,
      email = null,
      uid = null,
      per = null
  ) {
    var params = {
      'fields': (fields) ? fields.join(',') : '',
      'from': (from) ? Helpers.formatDate(from) : null,
      'to': (to) ? Helpers.formatDate(to) : null,
      'unique': unique,
      'email': email,
      'uid': uid,
      'per': per,
      'page': page
    };
    var sanitizedParams = this.api._discardNullAndEmptyValues(params);
    return this.api._get('opens', sanitizedParams);
  }

  /**
   * Gets a list of click reports
   *
   * @param {array} fields contact field names to retrieve
   * @param {Date|null} from the beginning of date range filter
   * @param {Date|null} to the end of the date range filter
   * @param {bool|null} unique when true, gets only unique opens
   * @param {string|null} email filters by provided email in the contact
   * @param {string|null} uid filters by uid
   * @param {int|null} per determines how many records per request to receive
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getClicks(
    page,
    fields = [],
    from = null,
    to = null,
    unique = null,
    email = null,
    uid = null,
    per = null
  ) {
    var params = {
      'fields': fields.join(','),
      'from': (from) ? Helpers.formatDate(from) : null,
      'to': (to) ? Helpers.formatDate(to) : null,
      'unique': unique,
      'email': email,
      'uid': uid,
      'per': per,
      'page': page
    };
    var sanitizedParams = this.api._discardNullAndEmptyValues(params);
    return this.api._get('clicks', sanitizedParams);
  }

  /**
   * Gets a list of bounce reports
   *
   * @param {array} fields plucks these contact fields if they exist
   * @param {Date|null} from the beginning of date range filter
   * @param {Date|null} to the end of the date range filter
   * @param {bool|null} unique when true, gets only unique opens
   * @param {string|null} email filters by provided email in the contact
   * @param {string|null} uid filters by uid
   * @param {string|null} type filters by specific type
   * @param {int|null} per determines how many records per request to receive
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getBounces(
    page,
    fields = [],
    from = null,
    to = null,
    unique = null,
    email = null,
    uid = null,
    type = null,
    per = null
  ) {
    var params = {
      'fields': fields.join(','),
      'from': (from) ? Helpers.formatDate(from) : null,
      'to': (to) ? Helpers.formatDate(to) : null,
      'unique': unique,
      'email': email,
      'uid': uid,
      'type': type,
      'per': per,
      'page': page
    };
    var sanitizedParams = this.api._discardNullAndEmptyValues(params);
    return this.api._get('bounces', sanitizedParams);
  }

  /**
   * Gets a list of Unsubscribes with provided filter constraints
   *
   * @param {array} fields contact field names to retrieve
   * @param {Date|null} from the beginning of date range filter
   * @param {Date|null} to the end of the date range filter
   * @param {bool|null} unique when true, gets only unique opens
   * @param {string|null} email filters by provided email in the contact
   * @param {string|null} uid filters by uid
   * @param {int|null} per determines how many records per request to receive
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getUnsubscribes(
    page,
    fields = [],
    from = null,
    to = null,
    unique = null,
    email = null,
    uid = null,
    per = null
  ) {
    var params = {
      'fields': fields.join(','),
      'from': (from) ? Helpers.formatDate(from) : null,
      'to': (to) ? Helpers.formatDate(to) : null,
      'unique': unique,
      'email': email,
      'uid': uid,
      'per': per,
      'page': page
    };
    var sanitizedParams = this.api._discardNullAndEmptyValues(params);
    return this.api._get('unsubscribes', sanitizedParams);
  }

  /**
   * Gets a list of complaints filtered by provided params
   *
   * @param {array} fields contact field names to retrieve
   * @param {Date|null} from the beginning of date range filter
   * @param {Date|null} to the end of the date range filter
   * @param {bool|null} unique when true, gets only unique opens
   * @param {string|null} email filters by provided email in the contact
   * @param {string|null} uid filters by uid
   * @param {int|null} per determines how many records per request to receive
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getComplaints(
    page,
    fields = [],
    from = null,
    to = null,
    unique = null,
    email = null,
    uid = null,
    per = null
  ) {
    var params = {
      'fields': fields.join(','),
      'from': (from) ? Helpers.formatDate(from) : null,
      'to': (to) ? Helpers.formatDate(to) : null,
      'unique': unique,
      'email': email,
      'uid': uid,
      'per': per,
      'page': page
    };
    var sanitizedParams = this.api._discardNullAndEmptyValues(params);
    return this.api._get('complaints', sanitizedParams);
  }

  /**
   * Gets a list of Ab Reports
   *
   * @param {string} name To get ab_reports with mentioned name
   * @param {Date|null} from Beginning of date range filter
   * @param {Date|null} to End of date range filter
   * @param {int|null} per gets the mentioned number of reports
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getAbReports(
    name,
    page,
    from = null,
    to = null,
    per = null
  ) {
    this.resource = '';
    this.api = new Api(this.accountId, this.auth_token, this.resource);
    var params = {
      'name': name,
      'from': (from) ? Helpers.formatDate(from) : null,
      'to': (to) ? Helpers.formatDate(to) : null,
      'per': per,
      'page': page
    };
    var sanitizedParams = this.api._discardNullAndEmptyValues(params);
    return this.api._get('ab_reports', sanitizedParams);
  }

  /**
   * Gets the list of all Journeys
   *
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getJourneys(page) {
    return this.api._get('journeys', {'page': page});
  }
};

module.exports = Reports;