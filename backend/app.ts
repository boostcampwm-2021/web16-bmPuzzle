import express from 'express';
import _http from 'http';

import config from '@config/index';
import loaders from '@loaders/index';

const startServer = async () => {
  const app = express();
  const http = _http.createServer(app);

  await loaders(app, http);

  http.listen(config.port, (err?: Error) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
};

startServer();
