var fetch = require('node-fetch');

var OperationResult = require('./OperationResult');
var Helpers = require('../Helpers/Helpers');

class Api {

  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   * @param {string} resource
   */
  constructor(accountId, authToken, resource) {
    this._authToken = authToken;
    this._accountId = accountId;
    this._resource = resource;
  }

  /**
   * returns an associative array representing the HTTP Headers.
   * 
   * @return {array}
   */
  getHttpHeaders() {
    return {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }

  /**
   * @param {array} keyValuePairs
   * @return {string}
   */
  getQueryString(keyValuePairs) {
    var queryStr = (this._authToken) ? '?auth_token=' + this._authToken : '';
    if(keyValuePairs) {
      for (var key in keyValuePairs) {
        queryStr += '&' + key +  '=' + keyValuePairs[key];
      }
    }
    return queryStr.replace(/\s/g , '+');
  }

  /**
   * @param {string|null} resource
   * @param {string|null} overrideResource If "truthy", it replaces (for this call only) that specified by _resource.
   * @return {string}
   */
  url(overrideResource = null) {
    var url = Helpers.API_URL;
    var resource = this._resource;
    // overrides original resource if specified
    resource = (overrideResource === null) ? resource : overrideResource;
    url += (!resource) ? this._accountId : this._accountId + '/' + resource;

    return url;
  }

  /**
   * Create Request Data for API fetch request
   * 
   * @param {string} url
   * @param {method} method
   * @param {string|null} body
   * @return {string}
   */
  createApiRequestData(url, method = 'GET', body = null) {
    var request = {
      method: method,
      headers: this.getHttpHeaders()
    }
    if (body) {
      request['body'] = body;
    }
    return request;
  }

  /**
   * @param {array} params
   * @return {array}
   */
  _discardNullAndEmptyValues(params) {
    var transformedArray = {};
    for (var key in params) {
      var value = params[key];
      if (value) {
        transformedArray[key] = value;
      }
    }
    return transformedArray
  }

  /**
   * @param {string|null} resource
   * @param {array} params
   * @param {string|null} overrideRootResource if "truthy", it replaces (for this call only) the value set for this._resource. (Not to be confused with resource, which is more specific.)
   * @return OperationResult
   */
  _get(resource = null, params = [], overrideRootResource = null) {
    var _apiStatus;
    var url = this.url(overrideRootResource);
    url += (resource) ? '/' + resource : '';
    // gets in json format per api docs
    url += '.json';
    url += this.getQueryString(params);

    var requestData = this.createApiRequestData(url);

    return fetch(url, requestData)
    .then(async response => {
      var jsonResponse = await response.json()
      var _apiResponse = {
        body: jsonResponse,
        status: response.status
      };
      return new OperationResult(_apiResponse);
    })
    .catch(error => {
      return error;
    });
  }

  /**
   * @param {string|null} resource
   * @param {array} params
   * @param {object} body Will be posted as serialized JSON.
   * @param {string|null} overrideRootResource if "truthy", it replaces (for this call only) the value set for this._resource. (Not to be confused with resource, which is more specific.)
   * @return OperationResult
   */
  _post(resource, params, body, overrideRootResource = null) {
    var url = this.url(overrideRootResource);
    url += (resource) ? '/' + resource : '';
    url += '.json';
    url += this.getQueryString(params);

    var formData = JSON.stringify(body);
    var requestData = this.createApiRequestData(url, 'POST', formData);
    return fetch(url, requestData)
    .then(async response => {
      const jsonResponse = await response.json()
      var _apiResponse = {
        body: jsonResponse,
        status: response.status
      };
      return new OperationResult(_apiResponse);
    })
    .catch(error => {
      return error;
    });
  }

  /**
   * @param {string|null} resource
   * @param {array} params
   * @param {object|null} body Will be posted as serialized JSON.
   * @param {string|null} overrideRootResource if "truthy", it replaces (for this call only) the value set for this._resource. (Not to be confused with resource, which is more specific.)
   * @return OperationResult
   */
  _put(resource, params, body =  null, overrideRootResource = null) {
    var requestData;
    var url = this.url(overrideRootResource);
    url += (resource) ? '/' + resource : '';
    url += '.json';
    url += this.getQueryString(params);
    
    if (typeof body === 'object') {
      var formData = JSON.stringify(body);
      requestData = this.createApiRequestData(url, 'PUT', formData);
    } else {
      requestData = this.createApiRequestData(url, 'PUT');
    }

    return fetch(url, requestData)
    .then(async response => {
      const jsonResponse = await response.text()
      var _apiResponse = {
        body: jsonResponse,
        status: response.status
      };
      return new OperationResult(_apiResponse);
    })
    .catch(error => {
      return error;
    });
  }

  /**
   * Deletes the given resource at the url().
   *
   * @param {string} resource
   * @param {array} params
   * @param {string|null} overrideRootResource
   * @param {mixed|null} object
   * @return OperationResult
   */
  _delete(resource, params = [], overrideRootResource = null, body = null) {
    var requestData;
    var url = this.url(overrideRootResource);
    url += (resource) ? '/' + resource : '';
    url += '.json';
    url += this.getQueryString(params);
    
    if (body && typeof body === 'object') {
      var formData = JSON.stringify(body);
      requestData = this.createApiRequestData(url, 'DELETE', formData);
    } else {
      requestData = this.createApiRequestData(url, 'DELETE');
    }

    return fetch(url, requestData)
    .then(async response => {
      const jsonResponse = await response.text()
      var _apiResponse = {
        body: jsonResponse,
        status: response.status
      };
      return new OperationResult(_apiResponse);
    })
    .catch(error => {
      return error;
    });
  }
}

module.exports = Api;