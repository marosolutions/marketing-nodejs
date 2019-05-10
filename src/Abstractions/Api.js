var GetResult = require('../ResultTypes/GetResult')

/**
 * Trait Api
 */

/**
 * @var {string}
 */
var _authToken;

/**
 * @var {string}
 */
var _accountId;

/**
 * @var {string}
 */
var _apiResponse;

/**
 * @var {int}
 */
var _apiStatus;

/**
 * @var {string}
 */
var _resource;

var Api = {

  /**
   * returns an associative array representing the HTTP Headers.
   * 
   * @return {array}
   */
  getHttpHeaders: function() {
    return {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  },

  /**
   * @param {array} keyValuePairs
   * @return {string}
   */
  getQueryString: function(keyValuePairs) {
    var queryStr = (_authToken) ? '?auth_token=' . _authToken : '';
    for (var key in keyValuePairs) {
      queryStr += '&' + key +  '=' + keyValuePairs[key];
    }
    return queryStr.replace(/\s/g , '+');
  },

  /**
   * @param {string|null} resource
   * @param {string|null} overrideResource If "truthy", it replaces (for this call only) that specified by _resource.
   * @return {string}
   */
  url: function(resource = null, overrideResource = null) {
    var url = 'https://api.maropost.com/accounts/' + _accountId + '/';
    if (!overrideResource) {
      url += (!resource) ? '' : resource;
    }
    else {
        url += overrideResource + '/';
        url += (!resource) ? '' : resource;
    }
    return url;
  },

  /**
   * Create Request Data for API fetch request
   * 
   * @param {string} url
   * @param {method} method
   * @param {string|null} body
   * @return {string}
   */
  createApiRequestData: function(url, method = 'GET', body = null) {
    var request = new Request(
      url,
      {
        method: method,
        body: body,
        headers: new Headers(getHttpHeaders)
      }
    );
    return request;
  },

  /**
   * @param {array} params
   * @return {array}
   */
  _discardNullAndEmptyValues: function(params) {
    var transformedArray = [];
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var value = keyValuePairs[key];
        if (value) {
          transformedArray[key] = value;
        }
      }
    }
    return transformedArray
  },
  
  /**
   * @param {string|null} resource
   * @param {array} params
   * @param {string|null} overrideRootResource if "truthy", it replaces (for this call only) the value set for $this->resource. (Not to be confused with $resource, which is more specific.)
   * @return GetResult
   */
  _get: async function(resource = null, params = [], overrideRootResource = null) {
    var url = this.url(resource, overrideRootResource) + '.json' + this.getQueryString(params);
    var request = this.createApiRequestData(url);

    try {
      var response = await fetch(request);
      
      // await response of fetch call
      var response = await fetch(request);

      // only proceed once promise is resolved
      var data = await response.json();

      // only proceed once second promise is resolved
      _apiResponse = {
        body: data,
        status: response.status
      };
    }
    catch(err) {
    }

    return new GetResult(_apiResponse);
  },

  /**
   * @param {string|null} resource
   * @param {array} params
   * @param {object} body Will be posted as serialized JSON.
   * @param {string|null} overrideRootResource if "truthy", it replaces (for this call only) the value set for $this->resource. (Not to be confused with $resource, which is more specific.)
   * @return GetResult
   */
  _post: async function(resource, params, body, overrideRootResource = null) {
    var url = this.url(resource, overrideRootResource) + '.json' + this.getQueryString(params);
    var formData = JSON.stringify(body);
    var request = this.createApiRequestData(url, 'POST', formData);

    try {
      var response = await fetch(request);

      // await response of fetch call
      var response = await fetch(request);

      // only proceed once promise is resolved
      var data = await response.json();

      // only proceed once second promise is resolved
      _apiResponse = {
        body: data,
        status: response.status
      };
    }
    catch(err) {
    }

    return new GetResult(_apiResponse);
  },

  /**
   * @param {string|null} resource
   * @param {array} params
   * @param {object|null} body Will be posted as serialized JSON.
   * @param {string|null} overrideRootResource if "truthy", it replaces (for this call only) the value set for $this->resource. (Not to be confused with $resource, which is more specific.)
   * @return GetResult
   */
  _put: async function(resource, params, body =  null, overrideRootResource = null) {
    var request;
    var url = this.url(resource, overrideRootResource) + '.json' + this.getQueryString(params);
    
    if (typeof body === 'object') {
      var formData = JSON.stringify(body);
      request = this.createApiRequestData(url, 'PUT', body);
    } else {
      request = this.createApiRequestData(url, 'PUT');
    }

    try {
      var response = await fetch(request);

      // await response of fetch call
      var response = await fetch(request);

      // only proceed once promise is resolved
      var data = await response.json();

      // only proceed once second promise is resolved
      _apiResponse = {
        body: data,
        status: response.status
      };
    }
    catch(err) {
    }

    return new GetResult(_apiResponse);
  },

  /**
   * Deletes the given resource at the url().
   *
   * @param {string} resource
   * @param {array} params
   * @param {string|null} overrideRootResource
   * @param {mixed|null} object
   * @return OperationResult
   */
  _delete: async function(resource, params = [], overrideRootResource = null, body = null) {
    var request;
    var url = this.url(resource, overrideRootResource) + '.json' + this.getQueryString(params);
    
    if (typeof body === 'object') {
      var formData = JSON.stringify(body);
      request = this.createApiRequestData(url, 'DELETE', body);
    } else {
      request = this.createApiRequestData(url, 'DELETE');
    }

    try {
      var request;
      var url = this.url(overrideRootResource);
      url += (resource) ? '/' + resource : '';
      url += '.json';
      url += this.getQueryString(params);
      if (typeof body === 'object') {
        body = JSON.stringify(body);
        request = this.createApiRequestData(url, 'PUT', body);
      } else {
        request = this.createApiRequestData(url, 'PUT');
      }
      
      var response = await fetch(request);

      // await response of fetch call
      var response = await fetch(request);

      // only proceed once promise is resolved
      var data = await response.json();

      // only proceed once second promise is resolved
      _apiResponse = {
        body: data,
        status: response.status
      };
    }
    catch(err) {
    }

    return new GetResult(_apiResponse);
  }

};

module.exports = Api;