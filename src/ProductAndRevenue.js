var Api = require('./Abstractions/Api');
var OperationResult = require('./Abstractions/OperationResult');
var OrderItemInput = require('./ResultTypes/OrderItemInput');
var Helpers = require('./Helpers/Helpers');

class ProductAndRevenue {
  
  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   */
  constructor(accountId, authToken) {
    this.auth_token = authToken;
    this.accountId = accountId;
    this.resource = 'orders';

    this.api = new Api(this.accountId, this.auth_token, this.resource);
  }

  /**
   * Gets a the specified order.
   * @param {int} id
   * @return OperationResult
   */
  getOrder(id) {
    return this.api._get('find', {'where[id]': id});
  }

  /**
   * Gets a the specified order.
   * @param {string} originalOrderId matches the original_order_id field of the order.
   * @return OperationResult
   */
  getOrderForOriginalOrderId(originalOrderId) {
    return this.api._get(originalOrderId, []);
  }

  /**
   * Creates an order
   *
   * @param {bool} requireUnique true to validate that the order has a unique original_order_id for the given contact.
   * @param {string} contactEmail
   * @param {string} contactFirstName
   * @param {string} contactLastName
   * @param {string} orderDateTime uses the format: "YYYY-MM-DDTHH:MM:SS-05:00"
   * @param {string} orderStatus
   * @param {string} originalOrderId sets the original_order_id field
   * @param {array} orderItems an array of OrderItemInput objects.
   * @param {array|null} customFields associative array where the key (string) represents the field name and the value is the field value
   * @param {array|null} addTags simple array of tags to add (scalar values)
   * @param {array|null} removeTags simple array of tags to remove (scalar values)
   * @param {string|null} uid
   * @param {string|null} listIds CSV list of IDs (e.g, "12,13")
   * @param {string|null} grandTotal
   * @param {int|null} capaignId
   * @param {string|null} couponCode
   * @return OperationResult
   */
  createOrder(requireUnique,
              contactEmail,
              contactFirstName,
              contactLastName,
              orderDateTime,
              orderStatus,
              originalOrderId,
              orderItems,
              customFields = null,
              addTags = null,
              removeTags = null,
              uid = null,
              listIds = null,
              grandTotal = null,
              campaignId = null,
              couponCode = null
  ) {
    if (!Helpers.validateEmail(contactEmail)) {
      return new OperationResult(null, `The provided 'contactEmail' is not a well-formed email address.`);
    }
    if (!orderItems) {
      return new OperationResult(null, `No orderItems were provided. Each order must contain at least one orderItem.`);
    }
    orderItems.forEach(function(orderItem) {
      if (!(orderItem instanceof OrderItemInput)) {
        return new OperationResult(null, `All orderItems must be instances of OrderItemInput. At least one orderItem was not.`);
      }
    });

    var order = {
      'contact': {
        'email': contactEmail,
        'first_name': contactFirstName,
        'last_name': contactLastName
      },
      'order_date': orderDateTime,
      'order_status': orderStatus,
      'original_order_id': originalOrderId,
      'order_items': orderItems,
      'uid': uid,
      'campaign_id': campaignId,
      'coupon_code': couponCode,
      'grand_total': grandTotal
    };
    if (listIds) {
      order['list_ids'] = listIds;
    }
    if (customFields && customFields.length) {
      for (var key in customFields) {
        if (typeof key !== 'string') {
          return new OperationResult(null, 'All keys in your recipientCustomFields array must be strings.');
        }
        if (typeof customFields[key] === 'object') {
          return new OperationResult(null, 'All values in your customFields array must be non-null scalars (string, number).');
        }
      }
      order['custom_field'] = customFields;
    }
    if (addTags && addTags.length) {
      for (var key in addTags) {
        if (typeof addTags[key] === 'object') {
          return new OperationResult(null, 'All values in your addTags array must be non-null scalars (string, number).');
        }
      }
      order['add_tags'] = addTags;
    }
    if (removeTags && removeTags.length) {
      for (var key in removeTags) {
        if (typeof removeTags[key] === 'object') {
          return new OperationResult(null, 'All values in your removeTags array must be non-null scalars (string, number).');
        }
      }
      order['remove_tags'] = removeTags;
    }
    var object = { order: order }
    var params = (requireUnique) ? {'unique': true} : [];
    return this.api._post('', params, object);
  }

  /**
     * Updates an existing eCommerce order using unique original_order_id if the details are changed due to partial
     * return or some other update.
     *
     * @param {string} originalOrderId matches the original_order_id field of the order
     * @param {string} orderDateTime uses the format: YYYY-MM-DDTHH:MM:SS-05:00
     * @param {string} orderStatus
     * @param {array} orderItems restates the orderItems as as array of OrderItemInput objects.
     * @param {int|null} campaignId
     * @param {string|null} couponCode
     * @return OperationResult
     */
  updateOrderForOriginalOrderId(originalOrderId, orderDateTime, orderStatus, orderItems, campaignId = null, couponCode = null) {
    if (!orderItems) {
      return new OperationResult(null, `No orderItems were provided. Each order must contain at least one orderItem.`);
    }
    orderItems.forEach(function(orderItem) {
      if (!(orderItem instanceof OrderItemInput)) {
        return new OperationResult(null, `All orderItems must be instances of OrderItemInput. At least one orderItem was not.`);
      }
    });
    var order = {
      'order_date': orderDateTime,
      'order_status': orderStatus,
      'campaign_id': campaignId,
      'coupon_code': couponCode,
      'order_items': orderItems
    };
    var object = { order: order }
    return this.api._put(originalOrderId, [], object);
  }

  /**
   * Updates an existing eCommerce order using unique order_id if the details are changed due to partial return or
   * some other update.
   *
   * @param {int} orderId matches the Maropost order_id field of the order
   * @param {string} orderDateTime uses the format: YYYY-MM-DDTHH:MM:SS-05:00
   * @param {string} orderStatus
   * @param {array} orderItems restates the orderItems as as array of OrderItemInput objects.
   * @param {int|null} campaignId
   * @param {string|null} couponCode
   * @return OperationResult
   */
  updateOrderForOrderId(orderId, orderDateTime, orderStatus, orderItems, campaignId = null, couponCode = null) {
    if (!orderItems) {
      return new OperationResult(null, `No orderItems were provided. Each order must contain at least one orderItem.`);
    }
    orderItems.forEach(function(orderItem) {
      if (!(orderItem instanceof OrderItemInput)) {
        return new OperationResult(null, `All orderItems must be instances of OrderItemInput. At least one orderItem was not.`);
      }
    });
    var order = {
      'order_date': orderDateTime,
      'order_status': orderStatus,
      'campaign_id': campaignId,
      'coupon_code': couponCode,
      'order_items': orderItems
    }
    var object = { order: order }
    return this.api._put('find', {'where[id]': orderId}, object);
  }

  /**
   * Deletes the complete eCommerce order if the order is cancelled or returned using unique original order id.
   *
   * @param {string} originalOrderId matches the original_order_id field of the order
   * @return OperationResult
   */
	deleteForOriginalOrderId(originalOrderId) {
      return this.api._delete(originalOrderId);
  }

  /**
   * Deletes the complete eCommerce order if the order is cancelled or returned using Maropost order id.
   *
   * @param {int} id
   * @return OperationResult
   */
  deleteForOrderId(id) {
      return this.api._delete('find', {'where[id]': id});
  }

  /**
   * Deletes the specified product(s) from a complete eCommerce order if the product(s) is cancelled or returned,
   * using unique original_order_id.
   *
   * @param {string} originalOrderId matches the original_order_id field of the order
   * @param {array} productIds the product(s) to delete from the order
   * @return OperationResult
   */
  deleteProductsForOriginalOrderId(originalOrderId, productIds) {
    if (productIds == null || productIds.length == 0) {
      return new OperationResult(null, "No productIds were provided.");
    }
    productIds.forEach(function(productId) {
      if (!(/^\d+$/.test(productId))) {
        return new OperationResult(null, "At least one productId is invalid");
      }
    })
    return this.api._delete(originalOrderId, {'product_ids': productIds.join(',')});
  }

  /**
   * Deletes the specified product(s) from a complete eCommerce order if the product(s) is cancelled or returned,
   * using Maropost order_id.
   *
   * @param {int} id
   * @param {array} productIds the product(s) to delete from the order
   * @return OperationResult
   */
  deleteProductsForOrderId(id, productIds) {
    if (productIds == null || productIds.length == 0) {
      return new OperationResult(null, "No productIds were provided.");
    }
    productIds.forEach(function(productId) {
      if (!(/^\d+$/.test(productId))) {
        return new OperationResult(null, "At least one productId is invalid");
      }
    })
    var keyValuePair = {
      'product_ids': productIds.join(','),
      'where[id]': id
    }
    return this.api._delete('find', keyValuePair);
  }
}

module.exports = ProductAndRevenue;