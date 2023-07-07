var configValues = require('./config');

module.exports = {
  getDbConnectionString: function () {
    return `mongodb+srv://${configValues.username}:${configValues.password}@cluster0.taps1ld.mongodb.net/node_todos`;
  },
};
