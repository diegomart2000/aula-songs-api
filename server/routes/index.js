const compose = require('lodash/fp/compose');

const Root = require('./api/Root');
const User = require('./api/User');
const Song = require('./api/Song');
const Media = require('./api/Media');

module.exports = compose(
  Root,
  User,
  Song,
  Media,
);
