class OrderItemInput {
  /**
   * Constructor
   * @param {string} itemId
   * @param {string} price
   * @param {string} quantity
   * @param {string} description
   * @param {string} adcode
   * @param {string} category
   */
  constructor(
    itemId,
    price,
    quantity,
    description,
    adcode,
    category
  ) {
    this.item_id = itemId;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.adcode = adcode;
    this.category = category;
  }
}

module.exports = OrderItemInput;
