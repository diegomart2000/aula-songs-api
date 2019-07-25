const crypto = require('crypto');

const { error, log } = require('../util/logger');
const User = require('../model/User');

const encrypt = (password) => {
  if (!password) return '';
  return encrypred = crypto.createHmac('sha1', process.env.SALT).update(password).digest('hex');
};

/**
 * To get a user by id
 * @param {string} userId
 */
exports.get = async (userId) => {
  if (!userId) throw new Error(`User id is required. Got u:${userId}`);

  try {
    return await User.findById(userId).exec();
  } catch (err) {
    error(`UserService : Error while loading user for ${userId}`, err);
    throw err;
  }
};

exports.register = async (_email, _password, name) => {
  if (!_email || !_password) throw new Error('400: Email and password are required');

  const email = _email.toLowerCase();
  const password = encrypt(_password);

  log(`UserService : User register [u: ${email}]`);
  let user = await User.findOne({ email }).exec();

  if (!user) {
    log(`UserService : User not found, will create it [u: ${email}]`);
    user = new User({ email, password, name });
    await user.save();
  } else {
    log(`UserService : User email already registered [u: ${email}]`);
    throw new Error('403: Email already registered');
  }

  return user;
}

/**
 * To login a user
 */
exports.login = async (_email, _password) => {
  if (!_email || !_password) throw new Error('400: Email and password are required');

  const email = _email.toLowerCase();
  const password = encrypt(_password);

  log(`UserService : User login [u: ${email}]`);
  let user = await User.findOne({ email, password }).exec();

  if (!user) {
    throw new Error('404: User not found for given credentials');
  }

  return user;
};

