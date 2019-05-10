class OperationResult {
    
  /**
   * Constructor
   */
  constructor() {
    this.isSuccess;
    this.errorMessage;
    this.exception;
    this._data;
  }

  /**
   * Gets the data of the Maropost response to the API call.
   * 
   * @return {array|mixed|null}
   */
  getData() {
    var data = this._data;
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    else if (Array.isArray(data)) {
        data.map(item => ({ 'scalar': item }))
    }
    else if (typeof data !== 'object') {
      return null;
    }
    return data;
  }
}

module.exports = OperationResult;