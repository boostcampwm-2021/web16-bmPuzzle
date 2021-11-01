import express from 'express';
import loaders from './loaders/index';

const startServer = async () => {
  const app = express();
  await loaders(app);
  app.listen(3000, (err?: Error) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
};

startServer();
