const Api = require('./Abstractions/Api');
const OperationResult = require('./Abstractions/OperationResult');

class Journeys {

  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   */
  constructor(accountId, authToken) {
    this.auth_token = authToken;
    this.accountId = accountId;
    this.resource = 'journeys';

    this.api = new Api(this.accountId, this.auth_token, this.resource);
  }

  /**
   * Gets the list of journeys
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  get(page) {
    return this.api._get(null, {'page': page});
  }

  /**
   * Gets the list of all campaigns for the specified journey.
   *
   * @param {int} journeyId
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
	getCampaigns(journeyId, page) {
    return this.api._get(journeyId + '/journey_campaigns', {'page': page});
  }

  /**
   * Gets the list of all contacts for the specified journey.
   *
   * @param {int} journeyId
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
	getContacts(journeyId, page) {
    return this.api._get(journeyId + '/journey_contacts', {'page': page});
  }
  
  /**
   * Stops all journeys, filtered for the matching parameters.
   *
   * @param {int} contactId this filter ignored if not greater than 0.
   * @param {string} recipientEmail this filter ignored if null.
   * @param {string} uid this filter ignored if null.
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
	stopAll(contactId, recipientEmail, uid, page) {
    let params = [];
    if (contactId > 0) {
      params['contact_id'] = contactId;
      }
    if (recipientEmail) {
      params['email'] = recipientEmail;
    }
    if (uid) {
      params['uid'] = uid;
    }
    params['page'] = page;
    return this.api._put('stop_all_journeys', params);
  }

  /**
   * Pause the specified journey for the specified contact.
   *
   * @param {int} journeyId
   * @param {int} contactId
   * @return OperationResult
   */
	pauseJourneyForContact(journeyId, contactId) {
    return this.api._put(journeyId + '/stop/' + contactId, []);
  }
  
  /**
   * Pause the specified journey for the contact having the specified UID.
   *
   * @param {int} journeyId
   * @param {string} uid
   * @return OperationResult
   */
	pauseJourneyForUid(journeyId, uid) {
    let params = [];
    params['uid'] = uid;
    return this.api._put(journeyId + '/stop/uid', params);
  }
  
  /**
   * Reset the specified journey for the specified active/paused contact. Resetting a contact to the beginning of the
   * journeys will result in sending of the same journey campaigns as originally sent.
   *
   * @param {int} journeyId
   * @param {int} contactId
   * @return OperationResult
   */
	resetJourneyForContact(journeyId, contactId) {
    return this.api._put(journeyId + '/reset/' + contactId, []);
  }
  
  /**
   * Reset the specified journey for the active/paused contact having the specified UID. Resetting a contact to the
   * beginning of the journeys will result in sending of the same journey campaigns as originally sent.
   *
   * @param {int} journeyId
   * @param {string} uid
   * @return OperationResult
   */
	resetJourneyForUid(journeyId, uid) {
    let params = [];
    params['uid'] = uid;
    return this.api._put(journeyId + '/reset/uid', params);
  }
  
  /**
   * Restarts a journey for a paused contact. Adds a new contact in journey. Retriggers the journey for a contact
   * who has finished its journey once. (To retrigger, MAKE SURE that "Retrigger Journey" option is enabled.)
   *
   * @param {int} journeyId
   * @param {int} contactId
   * @return OperationResult
   */
	startJourneyForContact(journeyId, contactId) {
    return this.api._put(journeyId + '/start/' + contactId, []);
  }
  
  /**
   * Restarts a journey for a paused contact having the specified UID. Adds a new contact in journey. Retriggers the
   * journey for a contact who has finished its journey once. (To retrigger, MAKE SURE that "Retrigger Journey"
   * option is enabled.)
   *
   * @param {int} journeyId
   * @param {string} uid
   * @return OperationResult
   */
	startJourneyForUid(journeyId, uid) {
    let params = [];
    params['uid'] = uid;
    return this.api._put(journeyId + '/start/uid', params);
	}
}

module.exports = Journeys;