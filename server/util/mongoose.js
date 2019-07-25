const mongoose = require('mongoose');
const { error } = require('./logger');
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, err => err && error('MONGOOSE Connection ERROR', err));

module.exports = mongoose;
