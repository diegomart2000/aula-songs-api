const { log, error } = require('../../util/logger');
const fs = require('fs');
const path = require('path');

const BASE_PATH=process.env.MEDIA_BASE_PATH;

const Media = app => {
  app.get('/api/media/:id', get);
  return app;
};

const get = async (req, res) => {
  const { id } = req.params;

  try {
    const fileLoc = path.join(BASE_PATH, `${id}.mp3`);
  
    const { length } = fs.statSync(fileLoc);
    const stream = fs.createReadStream(fileLoc);
    // Handle non-existent file
    stream.on('error', (err) => {
      error(err);
  
      res.status(404);
      res.write(`404: ${id}.mp3 File Not Found!`)
      res.end();
    });
  
    stream.on('end', () => res.end());
  
    // File exists, stream it to user
    res.header('Content-Length', length);
    res.header('Content-Type', 'audio/mpeg');

    res.status(200);
    stream.pipe(res);
  } catch(err) {
    error(err);
    res.status(500).send(err);
  }
};

module.exports = Media;
