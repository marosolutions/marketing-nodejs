const Api = require('./Abstractions/Api');
const OperationResult = require('./Abstractions/OperationResult');

class RelationalTableRows {
  
  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   * @param {string} $tableName name of the table to act against for
   */
  constructor(accountId, authToken, tableName) {
    this.auth_token = authToken;
    this.accountId = accountId;
    this.resource = tableName;
    this.baseUrl = 'https://rdb.maropost.com/' + accountId + '/' + tableName;

    this.api = new Api(this.accountId, this.auth_token, this.resource, this.baseUrl);
  }
  
  /**
   * Gets the records of the Relational Table
   * @return {OperationResult}
   */
  get() {
    return this.api._get('');
  }

  /**
   * Gets the specified record from the Relational Table
   * @param {string} idFieldName name of the field representing the unique identifier (E.g., "id", "email")
   * @param {mixed} idFieldValue value of the identifier field, for the record to get.
   * @return {OperationResult}
   */
  show(idFieldName, idFieldValue) {
    let record = {
      'record': {
        [idFieldName]: idFieldValue
      }
    };
    return this.api._post('show', [], record);
  }

  /**
   * Adds a record to the Relational Table.
   * @param {object} keyValues a list of field name/values for the record to be updated.
   * @return {OperationResult}
   */
  create(keyValues) {
    let records = {};
    for (let key in keyValues) {
      records[key] = keyValues[key];
    }
    let requestRecords = {'record': records };
    return this.api._post('create', [], requestRecords);
  }

  /**
   * Updates a record in the Relational Table.
   * @param {object} keyValues a list of field name/values for the record to be updated. NOTE: Any DateTime strings
   * must be in one of three formats: "MM/DD/YYYY", "YYYY-MM-DD", or "YYYY-MM-DDThh:mm:ssTZD".
   * @return {OperationResult}
   */
  update(keyValues) {
    let records = {};
    for (let key in keyValues) {
      records[key] = keyValues[key];
    }
    let requestRecords = {'record': records };
    return this.api._put('update', [], requestRecords);
  }

  /**
   * Creates or updates a record in the Relational Table.
   * @param {object} keyValues a list of field name/values for the record to be updated. NOTE: Any DateTime strings
   * must be in one of three formats: "MM/DD/YYYY", "YYYY-MM-DD", or "YYYY-MM-DDThh:mm:ssTZD".
   * @return {OperationResult}
   */
  upsert(keyValues) {
    let records = {};
    for (let key in keyValues) {
      records[key] = keyValues[key];
    }
    let requestRecords = {'record': records };
    return this.api._post('upsert', [], requestRecords);
  }

  /**
   * Deletes the given record of the relational table
   * @param {string} idFieldName name of the field representing the unique identifier (E.g., "id", "email")
   * @param {mixed} idFieldValue value of the identifier field, for the record to get.
   * @return {OperationResult}
   */
  delete(idFieldName, idFieldValue) {
    let records = {
      [idFieldName]: idFieldValue
    }
    let record = {
      'record': records
    };
    return this.api._delete('delete', [], null, record);
  }

  /**
   * Updates/switches which table this service is acting against
   * @param {string} newTableName name of the table to use for successive calls.
   */
  _setTableName(newTableName) { 
    this.resource = newTableName;
  }
  
  /**
   * @return string name of the table this service is acting against.
   */
  _getTableName() {
    return this.resource;
  }
}

module.exports = RelationalTableRows;
