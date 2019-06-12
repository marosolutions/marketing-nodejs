const Api = require('./Abstractions/Api');
const OperationResult = require('./Abstractions/OperationResult');

class AbTestCampaigns {
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
   * Creates an Ab Test Campaign
   *
   * @param {string} name
   * @param {string} fromEmail
   * @param {string} replyTo
   * @param {string} address
   * @param {string} language Allowed value for language can be either of these:
   * ['en' for English, 'es' for Spanish, 'de' for German, 'it' for Italian, 'fr' for French, 'pt' for Portuguese, 'pl' for Polish, 'da' for Danish, 'zh' for Chinese, 'nl' for Dutch, 'sv' for Swedish, 'no' for Norwegian]
   * @param {array} campaignGroupsAttributes
   * @param {string} commit Allowed values for commit: 'Save as Draft' or 'Send Test' or 'Schedule'
   * @param {string|null} sendAt send_at should be in "YYYY-MM-DD HH:mm:ss" where HH - Hour of the day, 24-hour clock (00..23), MM - Minute of the hour (00..59), SS - Second of the minute (00..60)
   * @param {int|null} brandId
   * @param {array} suppressedListIds
   * @param {array} suppressedSegmentIds
   * @param {array} suppressedJourneyIds
   * @param {int|null} emailPreviewLink Allowed values: 1 to send email; 0 to not send.
   * @param {string|null} decidedBy Allowed values for decidedBy: ('TopChoice' for Top Choices) or
   * ('Opens' for Highest Open Rate) or ('Clicks' for Highest Click Rate) or ('Manual' for Manual Selection) or
   * ('click_to_open' for Highest Click-to-Open Rate) or ('conversions' for Highest Conversion Rate)
   * @param {array} lists
   * @param {array} cTags
   * @param {array} segments
   * @return {OperationResult}
   */
  createAbTest(
    name,
    fromEmail,
    replyTo,
    address,
    language,
    campaignGroupsAttributes,
    commit,
    sendAt,
    brandId = null,
    suppressedListIds = null,
    suppressedSegmentIds = null,
    suppressedJourneyIds = null,
    emailPreviewLink = null,
    decidedBy = null,
    lists = null,
    cTags = null,
    segments = null
  ) {
    let object = {
      name: name,
      from_email: fromEmail,
      reply_to: replyTo,
      address: address,
      language: language,
      send_at: sendAt,
      commit: commit,
      brand_id: brandId,
      email_preview_link: emailPreviewLink,
      decided_by: decidedBy,
      campaign_groups_attributes: campaignGroupsAttributes,
      suppressed_list_ids: suppressedListIds,
      suppressed_segment_ids: suppressedSegmentIds,
      suppressed_journey_ids: suppressedJourneyIds,
      lists: lists,
      ctags: cTags,
      segments: segments
    }
    object = this.api._discardNullAndEmptyValues(object);
    return this.api._post('ab_test', [], object);
  }
}

module.exports = AbTestCampaigns;
