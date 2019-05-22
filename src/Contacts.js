var Api = require('./Abstractions/Api');
var OperationResult = require('./Abstractions/OperationResult');

class Contacts {
  
  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   */
  constructor(accountId, authToken) {
    this.accountId = accountId;
    this.auth_token = authToken;
    this.resource = 'contacts';

    this.api = new Api(this.accountId, this.auth_token, this.resource);
  }

  /**
   * Searches a contact with email and get all the details of the contact
   *
   * @param {string} email Email for which to get the contact
   * @return OperationResult
   */
  getForEmail(email) {
    var emailInUriFormat = {
        'contact[email]': email,
    };
    return this.api._get('email', emailInUriFormat);
  }

  /**
   * Gets a list of opens for a contact
   *
   * @param {int} contactId Id of the Contact
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getOpens(contactId, page) {
    var resource = contactId +  '/open_report';
    return this.api._get(resource, {'page': page});
  }

  /**
   * Get a list of clicks for a contact
   *
   * @param {int} contactId
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getClicks(contactId, page) {
    var resource = contactId +  '/click_report';
    return this.api._get(resource, {'page': page});
  }

  /**
   * Get a list of contacts in the specified list
   *
   * @param {int} listId
   * @param {int} page page #. (>= 1)
   * @return OperationResult
   */
  getForList(listId, page) {
    var overrideResource = 'lists/' + listId;
    return this.api._get('contacts', {'page': page}, overrideResource);
  }

  /**
   * Get the specified contact from the specified list
   *
   * @param int listId
   * @param int contactId
   * @return OperationResult
   */
  getContactForList(listId, contactId) {
    var overrideResource = 'lists/' + listId;
    return this.api._get('contacts/' + contactId, [], overrideResource);
  }

  /**
   * Create a contact within a list. Updates if previous contact is matched by email
   *
   * @param {int} listId ID of the list for which the contact is being created
   * @param {string} email Email address for the contact to be created|updated
   * @param {string|null} firstName First name of Contact
   * @param {string|null} lastName Last name of Contact
   * @param {string|null} phone Phone number of Contact
   * @param {string|null} fax Fax number of Contact
   * @param {string|null} uid UID for the Contact
   * @param {array} customField Custom Fields passed as associative array. Keys represent the field names while values represent the values
   * @param {array} addTags Tags to add to the contact. Simple array of tag names
   * @param {array} removeTags Tags to remove from the contact. Simple array of tag names
   * @param {bool} removeFromDNM Set this true to subscribe contact to the list, and remove it from DNM)
   * @param {bool} subscribe Set this true to subscribe contact to the list; false otherwise
   * @return OperationResult
   */
  async createOrUpdateForList(
    listId,
    email,
    firstName = null,
    lastName = null,
    phone = null,
    fax = null,
    uid = null,
    customField = [],
    addTags = [],
    removeTags = [],
    removeFromDNM = true,
    subscribe = true
  ) {
    var contact = {
      'email': email,
      'first_name': firstName,
      'last_name': lastName,
      'phone': phone,
      'fax': fax,
      'uid': uid,
      'custom_field': customField,
      'add_tags': addTags,
      'remove_tags': removeTags,
      'subscribe': subscribe,
      'remove_from_dnm': removeFromDNM,
    };
    contact = this.api._discardNullAndEmptyValues(contact);

    var overrideResource = 'lists/' + listId;
    var getResult = await this.getForEmail(email);
    if (getResult.isSuccess) {
      var contactId = getResult.data['id'];
      if (contactId) {
        return this.api._put('contacts/' + contactId, [], contact, overrideResource);
      }
    }

    return this.api._post('contacts', [], contact, overrideResource);
  }

  /**
   * Create a contact within a list. Updates if previous contact is matched by email
   *
   * @param {int} listId ID of the list to which the contact being updated belongs
   * @param {int} contactId ID of the contact being updated
   * @param {string} email Email address for the contact to be updated
   * @param {string|null} firstName first name of Contact
   * @param {string|null} lastName last name of Contact
   * @param {string|null} phone phone number of Contact
   * @param {string|null} fax fax number of Contact
   * @param {string|null} uid UID for the Contact
   * @param {array} customField custom fields passed as associative array. Keys represent the field names while values represent the values
   * @param {array} addTags tags to add to the contact. Simple array of tag names
   * @param {array} removeTags tags to remove from the contact. Simple array of tag names
   * @param {bool} removeFromDNM set this true to subscribe contact to the list, and remove it from DNM)
   * @param {bool} subscribe set this true to subscribe contact to the list; false otherwise
   * @return OperationResult
   */
  updateForListAndContact(
    listId,
    contactId,
    email,
    firstName = null,
    lastName = null,
    phone = null,
    fax = null,
    uid = null,
    customField = [],
    addTags = [],
    removeTags = [],
    removeFromDNM = true,
    subscribe = true
  ) {
    var contact = {
      'email': email,
      'first_name': firstName,
      'last_name': lastName,
      'phone': phone,
      'fax': fax,
      'uid': uid,
      'custom_field': customField,
      'add_tags': addTags,
      'remove_tags': removeTags,
      'subscribe': subscribe,
      'remove_from_dnm': removeFromDNM,
    };
    contact = this.api._discardNullAndEmptyValues(contact);
    
    var overrideResource = 'lists/' + listId;

    return this.api._put('contacts/' + contactId, [], contact, overrideResource);
  }

  /**
   * Create a contact without a list. Updates if already existing email is passed.
   *
   * @param {string} email email address for the contact to be created|updated
   * @param {string|null} firstName first name of Contact
   * @param {string|null} lastName last name of Contact
   * @param {string|null} phone phone number of Contact - no symbols  (e.g., "5555555555", not "555-555-5555")
   * @param {string|null} fax fax number of Contact - no symbols (e.g., "5555555555", not "555-555-5555")
   * @param {string|null} uid UID the contact belongs to
   * @param {array} customField Custom Field passed as array. Keys represent the field names while values represent the values
   * @param {array} addTags Tags to add to the contact. Non associated array of tagnames
   * @param {array} removeTags Tags to remove from the contact. Non associative array of tagnames
   * @param {bool} removeFromDNM Set this true to subscribe contact to the list, and remove it from DNM)
   * @return OperationResult
   */
  async createOrUpdateContact(
    email,
    firstName = null,
    lastName = null,
    phone = null,
    fax = null,
    uid = null,
    customField = [],
    addTags = [],
    removeTags = [],
    removeFromDNM = true,
    subscribe = true
  ) {
    var contact = {
      'email': email,
      'first_name': firstName,
      'last_name': lastName,
      'phone': phone,
      'fax': fax,
      'uid': uid,
      'custom_field': customField,
      'add_tags': addTags,
      'remove_tags': removeTags
    };
    contact = this.api._discardNullAndEmptyValues(contact);

    var getResult = await this.getForEmail(email);
    if (getResult.isSuccess) {
      var contactId = getResult.data['id'];
      if (contactId) {
        return this.api._put(contactId, [], contact);
      }
    }
    return this.api._post('', [], contact);
  }

  /**
   * Creates or Updates Contact - Multiple lists can be subscribed, unsubscribed. Multiple workflows can be unsubscribed.
   *
   * @param {string} email Email address for the contact to be created|updated
   * @param {string|null} firstName first name of Contact
   * @param {string|null} lastName last name of Contact
   * @param {string|null} phone phone number of Contact
   * @param {string|null} fax fax number of Contact
   * @param {string|null} uid UID the contact belongs to
   * @param {array} customField Custom Field passed as array. Keys represent the field names while values represent the values
   * @param {array} addTags Tags to add to the contact. Non associated array of tagnames
   * @param {array} removeTags Tags to remove from the contact. Non associative array of tagnames
   * @param {bool} removeFromDNM Set this true to subcribe contact to the list, and remove it from DNM)
   * @param {array} subscribeListIds Array of IDs of lists to subscribe the contact to
   * @param {array} unsubscribeListIds Array of IDs of Lists to unsubscribe the contact from
   * @param {array} unsubscribeWorkflowIds Array of list of IDs of workflows to unsubscribe the contact from
   * @param {string|null} unsubscribeCampaign CampaignID to unsubscribe the contact from
   * @return OperationResult
   */
  async createOrUpdateForListsAndWorkflows(
    email,
    firstName = null,
    lastName = null,
    phone = null,
    fax = null,
    uid = null,
    customField = [],
    addTags = [],
    removeTags = [],
    removeFromDNM = false,
    subscribeListIds = [],
    unsubscribeListIds = [],
    unsubscribeWorkflowIds = [],
    unsubscribeCampaign = null
  ) {
    var options = {
      'subscribe_list_ids': subscribeListIds.join(','),
      'unsubscribe_list_ids': unsubscribeListIds.join(','),
      'unsubscribe_workflow_ids': unsubscribeWorkflowIds.join(','),
      'unsubscribe_campaign': unsubscribeCampaign
    };
    options = this.api._discardNullAndEmptyValues(options);

    var contact = {
      'email': email,
      'first_name': firstName,
      'last_name': lastName,
      'phone': phone,
      'fax': fax,
      'uid': uid,
      'custom_field': customField,
      'add_tags': addTags,
      'remove_tags': removeTags,
      'remove_from_dnm': removeFromDNM,
      'options': options
    };
    contact = this.api._discardNullAndEmptyValues(contact);

    var getResult = await this.getForEmail(email);
    if (getResult.isSuccess) {
      var contactId = getResult.data['id'];
      if (contactId) {
        return this.api._put(contactId, [], contact);
      }
    }
    return this.api._post('', [], contact);
  }

  /**
   * Delete contacts from all list having the email as passed
   *
   * @param {string} email
   * @return OperationResult
   */
  deleteFromAllLists(email) {
    var emailAsArray = {
      'contact[email]': email
    };
    return this.api._delete('delete_all', emailAsArray);
  }

  /**
   * Delete the contact from the specified listIDs
   *
   * @param {int} contactId
   * @param {array} listIds
   * @return OperationResult
   */
  deleteFromLists(contactId, listIds = []) {
    var params = [];
    if (listIds) {
      params['list_ids'] = listIds.join(',');
    }
    return this.api._delete(contactId, params);
  }

  /**
   * Delete contacts having the specified UID
   *
   * @param {string} uid
   * @return OperationResult
   */
  deleteContactForUid(uid) {
    var params = {'uid': uid};
    return this.api._delete('delete_all', params);
  }

  /**
   * Delete contact from the specified List
   *
   * @param {int} listId
   * @param {int} contactId
   * @return OperationResult
   */
  deleteListContact(listId, contactId) {
    var overrideResource = 'lists/' + listId;
    var resource = 'contacts/' + contactId;
    return this.api._delete(resource, [], overrideResource);
  }

  /**
   * Unsubscribe contact having the email|uid as specified by the Value parameter
   *
   * @param {string} contactFieldValue The value of the field to search the contact based on
   * @param {string} contactFieldName The name of the field for which the value is being passed.
   *        For now, the possible values are: email or uid
   * @return OperationResult
   */
  unsubscribeAll(contactFieldValue, contactFieldName = 'email') {
    var params = {
      [key]: contactFieldValue
    };
    return this.api._put('unsubscribe_all', params);
  }
}

module.exports = Contacts;