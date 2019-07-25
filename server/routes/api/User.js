const { log, error } = require('../../util/logger');
const jwt = require('jsonwebtoken');
const SALT = process.env.SALT;

const UserService = require('../../service/UserService');

const User = app => {
  app.post('/api/user/register', register);
  app.post('/api/user/login', login);
  app.get('/api/me', get);
  return app;
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await UserService.register(email, password, name);
    const token = jwt.sign(user.toJSON(), SALT);
    res.send(token);
  } catch(err) {
    debugger;
    error(err);
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.login(email, password);
    const token = jwt.sign(user.toJSON(), SALT);
    res.send(token);
  } catch (err) {
    debugger;
    error(err);
    res.status(500).send(err);
  }
};

const get = async (req, res) => {
  const { user } = req;
  debugger;
  log(`API User : get me, it is a ${(user && 'user')}`);
  res.send(user);
};

module.exports = User;
