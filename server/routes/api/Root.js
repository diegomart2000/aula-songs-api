const Root = app => {
  app.get('/', get);
  return app;
};

const get = (req, res) => {
  res.send(`
    Hola 😋!<BR>
    =========<BR>
    Welcome to the Node Aula Song API.<BR>
    To know more about this project go to https://github.com/diegomart2000/aula-songs-api
  `);
};

module.exports = Root;
