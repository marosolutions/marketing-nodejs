const OperationResult =  require('../Abstractions/OperationResult');

class RelationalTableColumn {
  /**
   * Constructor
   */
  constructor() {
    this.name;
    this.key;
    this.data_type;
    this.primary_key;
    this.field_length;
    this.auto_increment;
    this.allow_null;
    this.sendable;
  }

  /**
   * if ->isSuccess is true, then the instance properties are valid.
   * Otherwise, they're not, and ->errorMessage will convey the problem.
   * 
   * @return OperationResult
   */
  validate() {
    if (typeof this.name !== 'string') {
      return new OperationResult(null, `Value of column 'name' must be a string.`)
    }

    if (typeof this.key !== 'string') {
      return new OperationResult(null, `Value of column 'key' must be a string.`)
    }

    if (typeof this.data_type !== 'string') {
      return new OperationResult(null, `Value of column 'data_type' must be a string.`)
    }

    if (typeof this.primary_key !== 'boolean') {
      return new OperationResult(null, `Value of column 'primary_key' must be a boolean.`)
    }

    if (typeof this.auto_increment !== 'boolean') {
      return new OperationResult(null, `Value of column 'auto_increment' must be a boolean.`)
    }

    if (typeof this.allow_null !== 'boolean') {
      return new OperationResult(null, `Value of column 'allow_null' must be a boolean.`)
    }

    if (typeof this.sendable !== 'boolean') {
      return new OperationResult(null, `Value of column 'sendable' must be a boolean.`)
    }

    if (typeof this.field_length !== 'number') {
      return new OperationResult(null, `Value of column 'field_length' must be a integer.`)
    }

    let result = new OperationResult(null, '');
    result.isSuccess = true;
    return result;
  }
}

module.exports = RelationalTableColumn;
