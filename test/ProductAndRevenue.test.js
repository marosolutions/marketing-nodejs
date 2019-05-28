require('dotenv').config()

const ProductAndRevenue = require('../src/ProductAndRevenue');
const OrderItemInput = require('../src/ResultTypes/OrderItemInput');

const ACCOUNT_ID = process.env.ACCOUNT_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

describe('Gets a the specified order.', function() {
  it('getOrder(id)', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';

    let createResult = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(createResult.isSuccess).toBeTruthy();

    let getResult = await api.getOrderForOriginalOrderId(originalOrderId);
    expect(getResult.isSuccess).toBeTruthy();
    let orderId = getResult.data['id'];

    let result = await api.getOrder(orderId);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');

    // Delete
    let deleteResult = await api.deleteForOriginalOrderId(originalOrderId);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 600000);
});

describe('Gets a the specified order.', function() {
  it('getOrderForOriginalOrderId(originalOrderId)', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';

    let createResult = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(createResult.isSuccess).toBeTruthy();

    let result = await api.getOrderForOriginalOrderId(originalOrderId);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');

    // Delete
    let deleteResult = await api.deleteForOriginalOrderId(originalOrderId);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Creates an order', function() {
  it('createOrder()', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';

    let result = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');

    // Delete
    let deleteResult = await api.deleteForOriginalOrderId(originalOrderId);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Updates an existing eCommerce order using unique originalOrderId', function() {
  it('updateOrderForOriginalOrderId()', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let createResult = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(createResult.isSuccess).toBeTruthy();
    
    let result = await api.updateOrderForOriginalOrderId(originalOrderId, '2019-04-24T18:05:24-04:00', 'Processed', orderItems);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');

    // Delete
    let deleteResult = await api.deleteForOriginalOrderId(originalOrderId);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Updates an existing eCommerce order using unique orderId', function() {
  it('updateOrderForOrderId()', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let createResult = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(createResult.isSuccess).toBeTruthy();

    let getResult = await api.getOrderForOriginalOrderId(originalOrderId);
    expect(getResult.isSuccess).toBeTruthy();
    let orderId = getResult.data['id'];

    let result = await api.updateOrderForOrderId(orderId, '2019-04-24T18:05:24-04:00', 'Processed', orderItems);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');

    // Delete
    let deleteResult = await api.deleteForOriginalOrderId(originalOrderId);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes the complete eCommerce order if the order is cancelled or returned using unique original order id.', function() {
  it('deleteForOriginalOrderId(originalOrderId)', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let createResult = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(createResult.isSuccess).toBeTruthy();

    let deleteResult = await api.deleteForOriginalOrderId(originalOrderId);
    expect(deleteResult.isSuccess).toBeTruthy();
    expect(deleteResult.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes the complete eCommerce order if the order is cancelled or returned using Maropost order id.', function() {
  it('deleteForOrderId(id)', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let createResult = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(createResult.isSuccess).toBeTruthy();

    let getResult = await api.getOrderForOriginalOrderId(originalOrderId);
    expect(getResult.isSuccess).toBeTruthy();
    let orderId = await getResult.data['id'];

    let result = await api.deleteForOrderId(orderId);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);
});


describe('Deletes the specified product(s) from a complete eCommerce order if the product(s) is cancelled or returned', function() {
  it('deleteProductsForOriginalOrderId(originalOrderId, productIds)', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let createResult = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(createResult.isSuccess).toBeTruthy();

    let getResult = await api.getOrderForOriginalOrderId(originalOrderId);
    expect(getResult.isSuccess).toBeTruthy();
    let productIds = ['12', '13', '14'];

    let result = await api.deleteProductsForOriginalOrderId(originalOrderId, productIds);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);
});

describe('Deletes the specified product(s) from a complete eCommerce order if the product(s) is cancelled or returned', function() {
  it('deleteProductsForOrderId(id, productIds)', async () => {
    let api = new ProductAndRevenue(ACCOUNT_ID, AUTH_TOKEN);
    let originalOrderId = 'node_test' + Math.round((new Date()).getTime() / 1000);
    let orderItems = [
      new OrderItemInput('2', '1340', '2', 'test_description_2', 'ad_code_2', 'category_2'),
      new OrderItemInput('3', '1350', '3', 'test_description_3', 'ad_code_3', 'category_3')
    ];
    let email = 'test_email_' + Math.round((new Date()).getTime() / 1000) + '@maropost.com';
    let createResult = await api.createOrder(true, email, 'test_firstName', 'test_lastName', '2017-10-13T18:05:24-04:00', 'Processed', originalOrderId, orderItems);
    expect(createResult.isSuccess).toBeTruthy();

    let getResult = await api.getOrderForOriginalOrderId(originalOrderId);
    expect(getResult.isSuccess).toBeTruthy();
    let orderId = getResult.data['id'];
    let productIds = ['12', '13', '14'];

    let result = await api.deleteProductsForOrderId(orderId, productIds);
    expect(result.isSuccess).toBeTruthy();
    expect(result.errorMessage).toEqual('');
  }, 60000);
});