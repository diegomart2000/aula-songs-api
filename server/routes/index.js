const compose = require('lodash/fp/compose');

const Root = require('./api/Root');
const User = require('./api/User');

module.exports = compose(
  Root,
  User,
);
