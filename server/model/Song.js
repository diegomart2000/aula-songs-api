const mongoose = require('../util/mongoose');
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  ownerId: ObjectId,
  title: String,
  album: String,
  artist: String,
  length: Number,
});

const Song = mongoose.model('Song', schema);
module.exports = Song;
