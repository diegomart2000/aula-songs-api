const mongoose = require('../util/mongoose');

const schema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

const User = mongoose.model('User', schema);
module.exports = User;
