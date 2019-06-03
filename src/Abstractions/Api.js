const axios = require('axios');

const OperationResult = require('./OperationResult');
const Helpers = require('../Helpers/Helpers');

class Api {

  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   * @param {string} resource
   */
  constructor(accountId, authToken, resource, baseUrl = null) {
    this._authToken = authToken;
    this._accountId = accountId;
    this._resource = resource;
    this._baseUrl = baseUrl;
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
    let queryStr = (this._authToken) ? '?auth_token=' + this._authToken : '';
    if(keyValuePairs) {
      for (let key in keyValuePairs) {
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
    if (this._baseUrl) {
      return this._baseUrl;
    }

    let url = Helpers.API_URL;
    let resource = this._resource;
    // overrides original resource if specified
    resource = (overrideResource === null) ? resource : overrideResource;
    url += (!resource) ? this._accountId : this._accountId + '/' + resource;

    return url;
  }

  /**
   * @param {array} params
   * @return {array}
   */
  _discardNullAndEmptyValues(params) {
    let transformedArray = {};
    for (let key in params) {
      let value = params[key];
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
    let url = this.url(overrideRootResource);
    url += (resource) ? '/' + resource : '';
    // gets in json format per api docs
    url += '.json';
    url += this.getQueryString(params);

    return axios.get(url)
    .then( async response => {
      const jsonResponse = await response;
      return new OperationResult(jsonResponse);
    })
    .catch(function (error) {
      return new OperationResult(null, error);
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
    let url = this.url(overrideRootResource);
    url += (resource) ? '/' + resource : '';
    url += '.json';
    url += this.getQueryString(params);

    const formData = JSON.stringify(body);
    return axios.post(url, formData, {headers: this.getHttpHeaders()})
    .then( async response => {
      const jsonResponse = await response;
      return new OperationResult(jsonResponse);
    })
    .catch(function (error) {
      return new OperationResult(null, error);
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
    let url = this.url(overrideRootResource);
    url += (resource) ? '/' + resource : '';
    url += '.json';
    url += this.getQueryString(params);

    const formData = (typeof body === 'object') ? JSON.stringify(body) : null;
    return axios.put(url, formData, {headers: this.getHttpHeaders()})
    .then( async response => {
      const jsonResponse = await response;
      return new OperationResult(jsonResponse);
    })
    .catch(function (error) {
      return new OperationResult(null, error);
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
    let url = this.url(overrideRootResource);
    url += (resource) ? '/' + resource : '';
    url += '.json';
    url += this.getQueryString(params);

    const formData = (typeof body === 'object') ? JSON.stringify(body) : null;
    return axios.delete(url, formData, {headers: this.getHttpHeaders()})
    .then( async response => {
      const jsonResponse = await response;
      return new OperationResult(jsonResponse);
    })
    .catch(function (error) {
      return new OperationResult(null, error);
    });
  }
}

module.exports = Api;