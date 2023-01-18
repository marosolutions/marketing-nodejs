const Api = require('./Abstractions/Api');
const OperationResult = require('./Abstractions/OperationResult');
const Helpers = require('./Helpers/Helpers');

class TransactionalCampaigns {
  /**
   * Constructor
   *
   * @param {int} accountId
   * @param {string} authToken
   */
  constructor(accountId, authToken) {
    this.accountId = accountId;
    this.auth_token = authToken;
    this.resource = 'campaigns';

    this.api = new Api(this.accountId, this.auth_token, this.resource);
  }

  /**
   * Gets the list of Transaction Campaigns.
   * @param {int} page page #. (>= 1)
   * @return {OperationResult}
   */
  get(page) {
    return this.api._get(null, {'page': page});
  }

  /**
   * Creates a Transactional Campaign
   *
   * @param {string} name campaign name
   * @param {string} subject campaign subject
   * @param {string} preheader campaign preheader
   * @param {string} fromName sender name in the email
   * @param {string} fromEmail sender email address
   * @param {string} replyTo reply-to email address
   * @param {int} contentId
   * @param {bool} emailPreviewLink true to send email; false to not send.
   * @param {string} address
   * @param {string} language ISO 639-1 language code
   * @param {string} ctags array of campaign tags
   * @return {OperationResult}
   */
	create(name, subject, preheader, fromName, fromEmail, replyTo, contentId, emailPreviewLink, address, language, ctags) {
    let campaign = {
      'name': name,
      'subject': subject,
      'preheader': preheader,
      'from_name': fromName,
      'from_email': fromEmail,
      'reply_to': replyTo,
      'content_id': String(contentId),
      'email_preview_link': emailPreviewLink,
      'address': address,
      'language': language
    };
    if (ctags.length) {
      campaign['add_ctags'] = ctags;
    }

    let object = {
      campaign: campaign
    };
    return this.api._post('', [], object);
  }

  /**
   * Sends a transactional campaign email to a recipient. Sender's information will be automatically fetched from the
   * transactional campaign, unless provided in the function arguments.
   *
   * @param {int} campaignId must be a campaign that already exists when you call ->get(). If you don't have one, first call ->create().
   * @param {int|null} contentId If provided, the transactional campaign's content will be replaced by this content.
   * @param {string|null} contentName If contentId is null, the transactional campaign's content name will be replaced by this name.
   * @param {string|null} contentHtmlPart If contentId is null, the transactional campaign's content HTML part will be replaced by this HTML part.
   * @param {string|null} contentTextPart If contentId is null, the transactional campaign's content Text part will be replaced by this Text part.
   * @param {int|null} sendAtHour Must be 1-12. Otherwise the email will go out immediately. If the hour is less than the current hour, the email will go out the following day.
   * @param {int|null} sendAtMinute Must be 0-60. Otherwise will be treated as 0. If the hour and minute combine to less than the current time, the email will go out the following day.
   * @param {bool} ignoreDnm If true, ignores the Do Not Mail list for the recipient contact.
   * @param {int|null} contactId contact ID of the recipient.
   * @param {string|null} recipientEmail email address. Ignored unless contactId is null. Otherwise, it must be a well-formed email address according to FILTER_VALIDATE_EMAIL.
   * @param {string|null} recipientFirstName recipient's first name. Ignored unless contactId is null.
   * @param {string|null} recipientLastName recipient's last name. Ignored unless contactId is null.
   * @param {array|null} recipientCustomFields custom fields for the recipient. Ignored unless contactId is null. Is an associative array where the item key is the name of the custom field, and the item value is the field value. All keys must be strings. All values must be non-null scalars.
   * @param {string|null} bccEmail BCC recipient. May only pass a single email address, empty string, or null. If provided, it must be a well-formed email address according to FILTER_VALIDATE_EMAIL.
   * @param {string|null} fromName sender's name. If fromEmail is set, it overrides the transactional campaign default sender name. Ignored otherwise.
   * @param {string|null} fromEmail sender's email address. Overrides the transactional campaign default sender email.
   * @param {string|null} subject subject line of email. Overrides the transactional campaign default subject.
   * @param {string|null} replyTo reply-to address. Overrides the transactional campaign default reply-to.
   * @param {string|null} senderAddress physical address of sender. Overrides the transactional campaign default sender address.
   * @param {array|null} tags associative array where the item key is the name of the tag within the content, and the item value is the tag's replacement upon sending. All keys must be strings. All values must be non-null scalars.
   * @param {array|null} ctags campaign tags. Must be a simple array of scalar values.
   * @return {OperationResult} data property contains information about the newly created campaign.
   */
	sendEmail(
    campaignId,
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
  ) {
    let emailObj = {
      campaign_id: campaignId
    };
    let contentFlag = 0; // nothing provided
    if (contentId) {
      emailObj['content_id'] = contentId;
      contentFlag = 1 // contentId provided
    }
    if (contentHtmlPart || contentTextPart || contentName) {
      emailObj['content'] = {
        'name': contentName,
        'html_part': contentHtmlPart,
        'text_part': contentTextPart
      }
      contentFlag = 2; //content field(s) provided
    }
    if (contentFlag == 3) {
      return new OperationResult(null, 'You may provide EITHER a contentId OR content field values, but not both.');
    }
    if (contactId == null) {
      if (!Helpers.validateEmail(recipientEmail)) {
        return new OperationResult(null, 'You must provide a well-formed recipientEmail because contactId is null.');
      }
      emailObj['contact'] = {
        'email': recipientEmail,
        'first_name': recipientFirstName,
        'last_name': recipientLastName
      }

      if (recipientCustomFields && recipientCustomFields.length) {
        for (let key in recipientCustomFields) {
          if (typeof key !== 'string') {
            return new OperationResult(null, 'All keys in your recipientCustomFields array must be strings.');
          }
          if (typeof recipientCustomFields[key] === 'object') {
            return new OperationResult(null, 'All values in your recipientCustomFields array must be non-null scalars (string, number).');
          }
        }
        emailObj['custom_field'] = recipientCustomFields;
      }
    } else {
      emailObj['contact_id'] = contactId;
    }
    if (sendAtHour > 0 && endAtHour <= 12) {
      if (!(sendAtMinute >= 0 && sendAtMinute <= 60)) {
        sendAtMinute = 0;
      }
      emailObj['send_time'] = {
        'hour': sendAtHour.toString(),
        'minute': sendAtMinute.toString()
      }
    }
    if (ignoreDnm) {
      emailObj['ignore_dnm'] = true;
    }
    if (fromEmail) {
      emailObj['from_email'] = fromEmail;
      emailObj['from_name'] = fromName;
    }
    if (replyTo) {
      emailObj['reply_to'] = replyTo;
    }
    if (subject) {
      emailObj['subject'] = subject;
    }
    if (senderAddress) {
      emailObj['address'] = senderAddress;
    }
    if (bccEmail) {
      if (!Helpers.validateEmail(bccEmail)) {
        return new OperationResult(null, 'When providing a bccEmail, it needs to be a well-formed email address.');
      }
      emailObj['bcc'] = bccEmail;
    }
    if (tags && tags.length) {
      for (let key in tags) {
        if (typeof key !== 'string') {
          return new OperationResult(null, 'All keys in your tags array must be strings.');
        }
        if (typeof tags[key] === 'object') {
          return new OperationResult(null, 'All values in your tags array must be non-null scalars (string, number).');
        }
      }
      emailObj['tags'] = tags;
    }
    if (ctags && ctags.length) {
      for (let key in ctags) {
        if (typeof ctags[key] === 'object') {
          return new OperationResult(null, 'All values in your ctags array must be non-null scalars (string, number).');
        }
      }
      emailObj['add_ctags'] = ctags;
    }
    let requestObj = { 'email': emailObj };
    return this.api._post('deliver', null, requestObj, 'emails');
  }
}

module.exports = TransactionalCampaigns;
