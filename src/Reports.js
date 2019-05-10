class Reports {

    /**
     * Constructor
     *
     * @param {int} accountId
     * @param {string} authToken
     */
    constructor(accountId, authToken) {
        this.auth_token = authToken;
        this.accountId = accountId;
        this.resource = 'reports';
    }

    display() {
        console.log('>>> accountId', this.accountId);
    }
};

module.exports = Reports;