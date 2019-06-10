# Summary

This package provides programmatic access to several Maropost services. It 
consists of eight services within the `Maropost.Api` namespace. Each service 
consists of one or more functions that perform an operation against your 
Maropost account. These functions return a result object indicating 
success/failure, any Exceptions throw, and the resulting data.

---

# Installation

## npm
[npm](https://www.npmjs.com/) is the standard node.js packaging system. The project is at [https://www.npmjs.com/package/maropost.api](https://www.npmjs.com/package/maropost.api).

# Usage
To use a service, first instantiate it, providing your Maropost AccountId
and Auth Token. For example, to get your list of reports using the Reports
service, execute:
```javascript
var { Maropost } = require(maropost.api)
var reports = new Maropost.Api.Reports(myAccountId, myAuthToken);
var result = await reports.get();
if (result.isSuccess) {
  var myReports = result.data;
}
```
The result object contains three fields:

- `isSuccess` (bool)
- `errorMessage` (string)
- `exception` (Exception)

If `isSuccess` is `false`, then `errorMessage` will contain information, and
`Exception` *might* contain an exception, depending upon the reason for
failure. If `exception` is not `null`, then `isSuccess` will always be `false`.

The object might also contains one property, `data` (dynamic), which contains whatever
data the operation itself provides. Some operations, such as `delete()`
operations, might not provide any data.



# Specific APIs
The specific APIs contained are:

- [Campaigns](#campaigns)
- [AB Test Campaigns](#ab-test-campaigns)
- [Transactional Campaigns](#transactional-campaigns)
- [Contacts](#contacts)
- [Journeys](#journeys)
- [Product and Revenue](#product-and-revenue)
- [Relational Table Rows](#relational-table-rows)
- [Reports](#reports)

## Campaigns
### Instantiation:
```javascript
new Maropost.Api.Campaigns(myAccountId, myAuthToken)
```

### Available methods:

 - `get(page)`
   - returns the list of campaigns for the account
   - `page`: page # (>= 1). Up to 200 records returned per page.
 - `getCampaign(campaignId)`
   - returns the given campaign
   - `campaignId`
 - `getDeliveredReports(id, page)`
   - returns the list of delivered reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
 - `getOpenReports(id, page, unique = null)`
   - returns the list of open reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
   - `unique`: `true` = get for unique contacts. Otherwise, `false`. 
 - `getClickReports(id, page, unique = null)`
   - returns the list of click reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
   - `unique`: `true` = get for unique contacts. Otherwise, `false`. 
 - `getLinkReports(id, page, unique = null)`
   - returns the list of link reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
   - `unique`: `true` = get for unique contacts. Otherwise, `false`. 
 - `getBounceReports(id, page)`
   - returns the list of bounce reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
 - `getSoftBounceReports(id, page)`
   - returns the list of soft bounce reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
 - `getHardBounceReports(id, page)`
   - returns the list of hard bounce reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
 - `getUnsubscribeReports(id, page)`
   - returns the list of soft unsubscribe reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
 - `getComplaintReports(id, page)`
   - returns the list of complaint reports for the given campaign ID
   - `page`: page # (>= 1). Up to 200 records returned per page.
   
---

## AB Test Campaigns
### Instantiation:
```javascript
new Maropost.Api.AbTestCampaigns(myAccountId, myAuthToken)
```

### Available Methods:
 - `createAbTest(name, fromEmail, replyTo, address, language, campaignGroupsAttributes, sendAt)`
   - `name`: name of the new campaign
   - `fromEmail`: default sender email address for campaign emails
   - `replyTo`: default reply-to email address for campaign emails
   - `address`: default physical address included on campaign emails
   - `language`: ISO 639-1 language code (e.g, `"en"`). 2 characters.
   - `campaignGroupsAttributes`: array of attributes. Each attribute is
   itself an object with the following properties (all strings):
     - `name`: name of the group
     - `content_id`: content ID
     - `subject`: subject line of emails
     - `from_name`: "from name" on emails
     - `percentage`: percentage of emails that should be sent with these
     settings.
   - `sendAt`: DateTime string having the format `YYYY-MM-DD HH:mm:ss`

---

## Transactional Campaigns

### Instantiation:
```javascript
new Maropost.Api.TransactionalCampaigns(myAccountId, myAuthToken)
```

### Available methods:
 - `get(page)`
     * returns the list of Transaction Campaigns
   - `page`: page # (>= 1). Up to 200 records returned per page.
 - `create(name, subject, preheader, fromName, fromEmail, replyTo, contentId, emailPreviewLink, address, language, ctags)`
     * Creates a Transactional Campaign
     * `name` campaign name
     * `subject` campaign subject
     * `preheader` campaign preheader
     * `fromName` sender name in the email
     * `fromEmail` sender email address
     * `replyTo` reply-to email address
     * `contentId`
     * `emailPreviewLink`
     * `address` physical address
     * `language` ISO 639-1 language code
     * `ctags` array of campaign tags

 - `sendEmail(campaignId,
      contentId = null,
      contentName = null,
      contentHtmlPart = null,
      contentTextPart = null,
      sendAtHour = null,
      sendAtMinute = null,
      ignoreDnm = null,
      contactId = null,
      recipientEmail = null,
      recipientFirstName = null,
      recipientLastName = null,
      recipientCustomFields = null,
      bccEmail = null,
      fromName = null,
      fromEmail = null,
      subject = null,
      replyTo = null,
      senderAddress = null,
      tags = null,
      ctags = null
    )`
     * Sends a transactional campaign email to a recipient. Sender's 
     information will be automatically fetched from the transactional 
     campaign, unless provided in the function arguments.
     * `campaignId`: must be a campaign that already exists when you call `svc.get()`. If you don't have one, first call `svc.create()`.
     * `contentId`: If provided, the transactional campaign's content will be replaced by this content.
     * `contentName`: If contentId is null, the transactional campaign's content name will be replaced by this name.
     * `contentHtmlPart`: If contentId is null, the transactional campaign's content HTML part will be replaced by this HTML part.
     * `contentTextPart`: If contentId is null, the transactional campaign's content Text part will be replaced by this Text part.
     * `sendAtHour`: Must be 1-12. Otherwise the email will go out immediately. If the hour is less than the current hour, the email will go out the following day.
     * `sendAtMinute`: Must be 0-60. Otherwise will be treated as 0. If the hour and minute combine to less than the current time, the email will go out the following day.
     * `ignoreDnm`: If true, ignores the Do Not Mail list for the recipient contact.
     * `contactId`: contact ID of the recipient.
     * `recipientEmail`: email address. Ignored unless `contactId` is null. Otherwise, it must be a well-formed email address according to `FILTER_VALIDATE_EMAIL`.
     * `recipientFirstName`: recipient's first name. Ignored unless `contactId` is null.
     * `recipientLastName`: recipient's last name. Ignored unless `contactId` is null.
     * `recipientCustomFields`: custom fields for the recipient. Ignored unless `contactId` is null. Is an associative array where the item key is the name of the custom field, and the item value is the field value. All keys must be strings. All values must be non-null scalars.
     * `bccEmail`: BCC recipient. May only pass a single email address, empty string, or null. If provided, it must be a well-formed email address according to `validateEmail`.
     * `fromName`: sender's name. If `fromEmail` is set, it overrides the transactional campaign default sender name. Ignored otherwise.
     * `fromEmail`: sender's email address. Overrides the transactional campaign default sender email.
     * `subject`: subject line of email. Overrides the transactional campaign default subject.
     * `replyTo`: reply-to address. Overrides the transactional campaign default reply-to.
     * `senderAddress`: physical address of sender. Overrides the transactional campaign default sender address.
     * `tags`: associative array where the item key is the name of the tag within the content, and the item value is the tag's replacement upon sending. All keys must be strings. All values must be non-null scalars.
     * `ctags`: campaign tags. Must be a simple array of scalar values.
     
---

## Contacts

### Instantiation:
```javascript
new Maropost.Api.Contacts(myAccountId, myAuthToken)
```

### Available methods:

 - `getForEmail(email)`
   * Gets the contact according to email address 
   * `email`: email address of the contact

 - `getOpens(contactId, page)`
   * Gets the list of opens for the specified contact
   - `page`: page # (>= 1). Up to 200 records returned per page.

 - `getClicks(contactId, page)`
   * Gets the list of clicks for the specified contact
   - `page`: page # (>= 1). Up to 200 records returned per page.

 - `getForList(listId, page)`
   * Gets the list of contacts for the specified list
   - `listId`
   - `page`: page # (>= 1). Up to 200 records returned per page.

 - `getContactForList(listId, contactId)`
   - Gets the specified contact from the specified list
   - `listId`
   - `contactId`

 - `updateForListAndContact(
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
    )`
     * Creates a contact within a list. Updates if previous contact is matched by email
     * `listId`: ID of the list to which the contact being updated belongs
     * `contactId`: ID of the contact being updated
     * `email`: Email address for the contact to be updated
     * `firstName`: first name of Contact
     * `lastName`: last name of Contact
     * `phone`: phone number of Contact
     * `fax`: fax number of Contact
     * `uid`: UID for the Contact
     * `customField`: custom fields passed as associative array. Keys represent the field names while values represent the values
     * `addTags`: tags to add to the contact. Simple array of tag names
     * `removeTags`: tags to remove from the contact. Simple array of tag names
     * `removeFromDNM`: set this true to subscribe contact to the list, and remove it from DNM)
     * `subscribe`: set this true to subscribe contact to the list; false otherwise
  
 - `createOrUpdateForList(
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
    )`
     * Creates a contact within a list. Updates if previous contact is matched by email.
     * `listId`: ID of the list for which the contact is being created
     * `email`: email address for the contact to be created|updated
     * `firstName`: first name of Contact
     * `lastName`: last Name of Contact
     * `phone`: phone number of Contact
     * `fax`: fax number of Contact
     * `uid`: UID for the contact
     * `customField`: custom fields passed as associative array. Keys represent the field names while values represent the values.
     * `addTags`: tags to add to the contact. Simple array of tag names (strings).
     * `removeTags`: tags to remove from the contact. Simple array of tag names (strings).
     * `removeFromDNM`: Set this true to subscribe contact to the list, and remove it from DNM.
     * `subscribe`: true to subscribe the contact to the list; false otherwise.

 - `createOrUpdateContact(
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
    )`
     * Creates a contact without a list. Updates if already existing email is passed.
     * `contactId`: ID of the contact
     * `email`: Email address for the contact to be created|updated
     * `firstName`: first name of Contact
     * `lastName`: last Name of Contact
     * `phone`: phone number of Contact
     * `fax`: fax number of Contact
     * `uid`: UID for the contact
     * `customField`: custom fields passed as associative array. Keys represent the field names while values represent the values
     * `addTags`: tags to add to the contact. Simple array of tag names (strings).
     * `removeTags`: tags to remove from the contact. Simple array of tag names (strings).
     * `removeFromDNM`: set this true to subscribe contact to the list, and remove it from DNM

 - `createOrUpdateForListsAndWorkflows(
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
    )`
     * Creates or updates Contact
        - Multiple lists can be subscribed, unsubscribed. 
        - Multiple workflows can be unsubscribed.
     * `email`: email address for the contact to be created|updated
     * `firstName`: first name of Contact
     * `lastName`: last name of Contact
     * `phone`: phone number of Contact
     * `fax`: fax number of Contact
     * `uid`: UID for the Contact
     * `customField`: custom fields passed as associative array. Keys represent the field names while values represent the values
     * `addTags`: tags to add to the contact. Simple array of tag names (strings)
     * `removeTags`: tags to remove from the contact. Simple array of tag names (strings)
     * `removeFromDNM`: set this true to subscribe contact to the list, and remove it from DNM
     * `subscribeListIds`: simple array of IDs of lists to subscribe the contact to
     * `unsubscribeListIds`: simple array of IDs of Lists to unsubscribe the contact from
     * `unsubscribeWorkflowIds`: simple array of list of IDs of workflows to unsubscribe the contact from
     * `unsubscribeCampaign`: campaignID to unsubscribe the contact from

 - `deleteFromAllLists(email)`
     * Deletes specified contact from all lists
     * `email`: email address of the contact

 - `deleteFromLists(contactId, listIds = [])`
     * Deletes the specified contact from the specified lists
     * `contactId`: id of the contact
     * `listIds`: simple array of ids of the lists

 - `deleteContactForUid(uid)`
     * Deletes contact having the specified UID

 - `deleteListContact(listId, contactId)`
     * Deletes specified contact from the specified list

 - `unsubscribeAll(contactFieldValue, contactFieldName = 'email')`
     * Unsubscribes contact having the specified field name/value.
     * `contactFieldValue`: the value of the field for the contact(s) being unsubscribed
     * `contactFieldName`: the name of the field being checked for the value. At present, the 
     accepted field names are: 'email' or 'uid'

---

## Journeys

### Instantiation:
```javascript
new Maropost.Api.Journeys(myAccountId, myAuthToken)
```

### Available methods:

 - `get(page)`
     * Gets the list of journeys
   - `page`: page # (>= 1). Up to 200 records returned per page.

 - `getCampaigns(journeyId, page)`
     * Gets the list of all campaigns for the specified journey
   - `page`: page # (>= 1). Up to 200 records returned per page.

 - `getContacts(journeyId, page)`
     * Gets the list of all contacts for the specified journey
   - `page`: page # (>= 1). Up to 200 records returned per page.

 - `stopAll(contactId, recipientEmail, uid)`
     * Stops all journeys, filtered for the matching parameters
     * `contactId`: this filter ignored unless greater than 0
     * `recipientEmail`: this filter ignored if null
     * `uid`: this filter ignored if null

 - `pauseJourneyForContact(journeyId, contactId)`
     * Pause the specified journey for the specified contact

 - `pauseJourneyForUid(journeyId, uid)`
     * Pause the specified journey for the contact having the specified UID

 - `resetJourneyForContact(journeyId, contactId)`
     * Reset the specified journey for the specified active/paused contact. 
     Resetting a contact to the beginning of the journeys will result in 
     sending of the same journey campaigns as originally sent.

 - `public function resetJourneyForUid(journeyId, uid)`
     * Reset the specified journey for the active/paused contact having the 
     specified UID. Resetting a contact to the beginning of the journeys 
     will result in sending of the same journey campaigns as originally sent.

 - `public function startJourneyForContact(journeyId, contactId)`
     * Restarts a journey for a paused contact. Adds a new contact in 
     journey. Retriggers the journey for a contact who has finished its 
     journey once. (To retrigger, *make sure* that "Retrigger Journey" option 
     is enabled.)

 - `startJourneyForUid(journeyId, uid)`
     * Restarts a journey for a paused contact having the specified UID. 
     Adds a new contact in journey. Retriggers the journey for a contact 
     who has finished its journey once. (To retrigger, *make sure* that 
     "Retrigger Journey" option is enabled.)

---

## Product and Revenue

### Instantiation:
```javascript
new Maropost.Api.ProductAndRevenue($myAccountId, $myAuthToken)
```

### Available methods:

 - `getOrder(id)`
     * Gets the specified order
 - `getOrderForOriginalOrderId(originalOrderId)`
     * Gets the specified order

 - `createOrder(requireUnique, contactEmail, contactFirstName, contactLastName,
                orderDateTime, orderStatus, originalOrderId, orderItems,
                customFields = null, addTags = null, removeTags = null,
                uid = null, listIds = null, grandTotal = null,
                campaignId = null, couponCode = null)`
     * Creates an order
     * `requireUnique`: true to validate that the order has a unique original_order_id for the given contact.
     * `contactEmail`
     * `contactFirstName`
     * `contactLastName`
     * `orderDateTime`: uses the format: "YYYY-MM-DDTHH:MM:SS-05:00"
     * `orderStatus`
     * `originalOrderId`: sets the original_order_id field
     * `orderItems` an array of OrderItemInput objects.
     * `customFields` associative array where the key (string) represents the field name and the value is the field value
     * `addTags` simple array of tags to add (scalar values)
     * `removeTags` simple array of tags to remove (scalar values)
     * `uid`
     * `listIds` CSV list of IDs (e.g, "12,13")
     * `grandTotal`
     * `campaignId`
     * `couponCode`

 - `updateOrderForOriginalOrderId(originalOrderId, orderDateTime, orderStatus, orderItems, campaignId = null, couponCode = null)`
     * Updates an existing eCommerce order using unique original_order_id if the details are changed due to partial
      return or some other update.
     * `originalOrderId`: matches the original_order_id field of the order
     * `orderDateTime`: uses the format: YYYY-MM-DDTHH:MM:SS-05:00
     * `orderStatus`
     * `orderItems`: restates the orderItems as as array of OrderItemInput objects.
     * `campaignId`
     * `couponCode`

 - `updateOrderForOrderId(orderId, orderDateTime, orderStatus, orderItems, campaignId = null, couponCode = null)`
     * Updates an existing eCommerce order using unique order_id if the details are changed due to partial return or
     * some other update.
     * `orderId`: matches the Maropost order_id field of the order
     * `orderDateTime`: uses the format: YYYY-MM-DDTHH:MM:SS-05:00
     * `orderStatus`
     * `orderItems`: restates the orderItems as as array of OrderItemInput objects.
     * `campaignId`
     * `couponCode`
    
 - `deleteForOriginalOrderId(originalOrderId)`
     * Deletes the complete eCommerce order if the order is cancelled or 
     returned
     * `originalOrderId` matches the original_order_id field of the order

 - `deleteForOrderId(id)`
     * Deletes the complete eCommerce order if the order is cancelled or 
     returned using Maropost order id
     * `id`: Maropost order_id

 - `deleteProductsForOriginalOrderId(originalOrderId, productIds)`
     * Deletes the specified product(s) from a complete eCommerce order if 
     the product(s) is cancelled or returned
     * `originalOrderId`: matches the original_order_id field of the order
     * `productIds`: the product(s) to delete from the order

 - `deleteProductsForOrderId(id, productIds)`
     * Deletes the specified product(s) from a complete eCommerce order if 
     the product(s) is cancelled or returned
     * `id`: Maropost order_id
     * `productIds`: the product(s) to delete from the order

---

## Relational Table Rows

### Instantiation:
Unlike the other services, the constructor for this requires a third
parameter: `tableName`. So for example:
```javascript
new Maropost.Api.RelationalTables(myAccountId, myAuthToken, tableName);
```

`tableName` sets which relational table the service's operations should act against. To switch tables, you do not need to re-instantiate the service. Simply update the `TableName` property of the instance:
```javascript
var rows = new Maropost.Api.RelationalTableRows(myAccountId, myAuthToken, 'table1');
rows._setTableName('table2');
```

### Available functions:

 - `get()`
     * Gets the records of the Relational Table

 - `show(id)`
     * Gets the specified record from the Relational Table
     * `id`: ID of the existing record you wish to read

 - `create(keyValues)`
     * Adds a record to the Relational Table
     * `keyValues`: Multiple objects, for the record to be updated, each item consisting of two fields:
       - `key`: string representing the name of the field
       - `value`: scalar value representing the new value for the field.
         - Any DateTime strings must be in one of three formats: "MM/DD/YYYY", 
         "YYYY-MM-DD", or "YYYY-MM-DDThh:mm:ssTZD".
       - NOTE: One of the KeyValues must represent the unique identifier.

 - `update(keyValues)`
     * Updates a record in the Relational Table.
     * `keyValues`: Multiple objects, for the record to be updated, each item consisting of two fields:
       - `key`: string representing the name of the field
       - `value`: scalar value representing the new value for the field.
         - Any DateTime strings must be in one of three formats: "MM/DD/YYYY", 
         "YYYY-MM-DD", or "YYYY-MM-DDThh:mm:ssTZD".
       - NOTE: One of the KeyValues must represent the unique identifier.

 - `upsert(KeyValue... $keyValues)`
     * Creates or updates a record in the Relational Table.
     * `keyValues`: Multiple objects, for the record to be updated, each item consisting of two fields:
       - `key`: string representing the name of the field
       - `value`: scalar value representing the new value for the field.
         - Any DateTime strings must be in one of three formats: "MM/DD/YYYY", 
         "YYYY-MM-DD", or "YYYY-MM-DDThh:mm:ssTZD".
       - NOTE: One of the KeyValues must represent the unique identifier.

 - `delete(idFieldName, idFieldValue)`
     * Deletes the given record of the Relational Table
     * `idFieldName` name of the field representing the unique identifier (E.g., "id", "email")
     * `idFieldValue` value of the identifier field, for the record to delete.

---

## Reports

### Instantiation:
```javascript
new Maropost.Api.Reports(myAccountId, myAuthToken)
```

### Available methods:
 - `get(page)`
   - returns the list of reports
   - `page`: page # (>= 1). Up to 200 records returned per page.

 - `getReport(id)`
   - Gets the list of reports
   - `id`: report ID

 - `getOpens(
      page,
      fields = [],
      from = null,
      to = null,
      unique = null,
      email = null,
      uid = null,
      per = null
    )`
   * returns the list of open reports based on filters and fields provided
   - `page`: page # (>= 1). Up to 200 records returned per page.
   * `fields`: contact field names to retrieve
   * `from`: the beginning of date range filter
   * `to`: the end of the date range filter
   * `unique`: when true, gets only unique opens
   * `email`: filters by provided email in the contact
   * `uid`: filters by uid
   * `per`: determines how many records per request to receive

 - `getClicks(
      page,
      fields = [],
      from = null,
      to = null,
      unique = null,
      email = null,
      uid = null,
      per = null
    )`
   * returns the list of click reports
   * `page`: page # (>= 1). Up to 200 records returned per page.
   * `fields`: plucks these contact fields if they exist
   * `from`: start of specific date range filter
   * `to`: end of date range filter
   * `unique`: if true, gets unique records
   * `email`: gets Clicks for specific email
   * `uid`: gets Clicks for provided uid
   * `per`: gets the specified number of records

 - `getBounces(
      page,
      fields = [],
      from = null,
      to = null,
      unique = null,
      email = null,
      uid = null,
      type = null,
      per = null
    )`
   * returns the list of bounce reports
   * `page`: page # (>= 1). Up to 200 records returned per page.
   * `fields`: plucks these contact fields if they exist
   * `from`: start of specific date range filter
   * `to`: end of date range filter
   * `unique`: if true, gets unique records
   * `email`: gets Bounces for specific email
   * `uid`: gets Bounces for provided uid
   * `per`: gets the specified number of records

 - `getUnsubscribes(
      page,
      fields = [],
      from = null,
      to = null,
      unique = null,
      email = null,
      uid = null,
      per = null
    )`
   * returns the list of Unsubscribes with provided filter constraints
   * `page`: page # (>= 1). Up to 200 records returned per page.
   * `fields`: plucks these contact fields if they exist
   * `from`: start of specific date range filter
   * `to`: end of date range filter
   * `unique` if true, gets unique records
   * `email` gets Unsubscribes for specific email
   * `uid` gets Unsubscribes for provided uid
   * `per` gets the specified number of records

 - `getComplaints(
      fields = [],
      from = null,
      to = null,
      unique = null,
      email = null,
      uid = null,
      per = null
    )`
   * returns the list of complaints filtered by provided params
   * `page`: page # (>= 1). Up to 200 records returned per page.
   * `fields`: plucks these contact fields if they exist
   * `from`: start of specific date range filter
   * `to`: end of date range filter
   * `unique`: if true, gets unique records
   * `email`: gets Complaints for specific email
   * `uid`: gets Complaints for provided uid
   * `per`: gets the specified number of records

 - `getAbReports(name, page, from = null, to = null, per = null)`
   * returns the list of Ab Reports
   * `name`: to get ab_reports with mentioned name
   * `page`: page # (>= 1). Up to 200 records returned per page.
   * `from`: beginning of date range filter
   * `to`: end of date range filter
   * `per`: gets the mentioned number of reports

 - `getJourneys(page)`
   * returns the list of all Journeys
   * `page`: page # (>= 1). Up to 200 records returned per page.
