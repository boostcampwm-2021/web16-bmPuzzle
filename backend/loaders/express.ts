import express from 'express';
import cors from 'cors';
import path from 'path';
import config from '@config/index';
import api from '@api/index';


const expressLoader = async (app: any) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/static', express.static(path.join(path.resolve(), '/public')));
  app.use('/api', api);

  app.listen(config.port, (err?: Error) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
};

export default expressLoader;
