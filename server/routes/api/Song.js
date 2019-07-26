const { log, error } = require('../../util/logger');
const SongService = require('../../service/SongService');

const Song = app => {
  app.get('/api/song', list);
  app.post('/api/song', create);
  return app;
};

const create = async (req, res) => {
  const { ownerId, title, album, artist, length } = req.body;

  try {
    const song = await SongService.create(ownerId, title, album, artist, length);
    res.status(200).send(song);
  } catch(err) {
    error(err);
    res.status(500).send(err);
  }
};

const list = async (req, res) => {
  const { page } = req.query;
  debugger;
  
  try {
    const list = await SongService.list(page);
    log(`API Song : get list of songs page ${page || 0} - found ${list.length}`);
    res.send(list);
  } catch (err) {
    debugger;
    error(err);
    res.status(500).send(err);
  }
};

module.exports = Song;
