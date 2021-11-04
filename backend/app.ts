import express from 'express';
import loaders from '@loaders/index';

const startServer = async () => {
  const app = express();

  await loaders(app);
};

startServer();
