const { error, log } = require('../util/logger');
const cache = require('../util/cache');

const Song = require('../model/Song');

// ownerId: ObjectId,
// title: String,
// album: String,
// artist: String,
// length: Number,

/**
 *
 */
const create = async (ownerId, title, album, artist, length) => {
  try {
    log(`SongService : Song create [u: ${ownerId}, n: ${name}]`);

    const song = new Song({ ownerId, title, album, artist, length });
    await song.save();

    const songId = song._id.toString();

    // register it on redis to make it fast to fetch
    await cache.set(songId, song.toJSON());

    return song.toJSON();
  } catch (err) {
    error(`SongService : Error while creating song for ${name}`, err);
    throw err;
  }
};

/**
 * 
 * @param {String} songId
 */
const update = async (songId, title, album, artist, length) => {
  if (!songId) throw new Error(`400: Song id is required. Got g:${songId}`);
  const song = await get(songId, true);

  if (!song) {
    throw new Error(`404: Song not found g:${songId}`);
  }

  song.title = title;
  song.album = album;
  song.artist = artist;
  song.length = length;

  await song.save();
  await cache.set(songId, song.toJSON());

  return song;
}

/**
 * 
 * @param {String} songId
 */
const remove = async (songId) => {
  if (!songId) throw new Error(`400: Song id is required. Got g:${songId}`);

  const song = await Song.findByIdAndDelete(songId).exec();
  if (!song) {
    throw new Error(`404: Song not found g:${songId}`);
  }

  return song;
}

/**
 * To get a song by id
 * @param {string} songId
 */
const getById = async (songId, asModel) => {
  if (!songId) throw new Error(`Song id is required. Got g:${songId}`);
  try {
    let song = await cache.get(songId);
    
    // If cache hit, return it
    if (song) {
      return asModel ? Song.hydrate(song) : song;
    }

    // Song not found in cache, fetch it
    song = await Song.findById(songId).exec();
    if (!song) {
      throw new Error(`404: Song not found g:${songId}`);
    }

    await cache.set(songId, song.toJSON());

    return asModel ? song : song.toJSON();
  } catch (err) {
    error(`SongService : Error while loading song for ${songId}`, err);
    throw err;
  }
};

/**
 * To get a list of songs
 * @param {string} songId
 */
const list = async (page=0, size=30) => {
  try {

    const list = await Song.find(null, null, { skip: 10, limit: 5 }).exec();

    return list;
  } catch (err) {
    error(`SongService : Error while loading song list`, err);
    throw err;
  }
};

module.exports = {
  create,
  update,
  remove,
  getById,
  list,
};
