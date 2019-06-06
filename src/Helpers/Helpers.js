const moment = require('moment');

const Helpers = {
  API_URL: 'https://api.maropost.com/accounts/',

  humanize: function(str) {
    return str
          .replace(/^[\s_]+|[\s_]+$/g, '')
          .replace(/[_\s]+/g, ' ')
          .replace(/^[a-z]/, function(m) { return m.toUpperCase(); });
  },

  today: function(format = 'YYYY-MM-DD') {
    return moment().format(format);
  },

  additionalDate: function(date = null, additionalDate = null, format = 'YYYY-MM-DD') {
    const newDate = moment(date, format).add(additionalDate, 'days');
    return moment(newDate).format(format);
  },

  formatDate: function(dateTime, format = 'YYYY-MM-DD') {
    return moment(dateTime).format(format);
  },

  formatTimeStamp: function(timeStamp, format = 'YYYY-MM-DD') {
    return moment.unix(timeStamp).format(format);
  },

  getCurrentTimeStamp: function() {
    return moment().unix();
  },

  validateEmail: function(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
};

module.exports = Helpers;
