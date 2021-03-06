import express from 'express';
import cors from 'cors';
import path from 'path';
import api from '@api/index';

const expressLoader = async (app: any) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/static', express.static(path.join(path.resolve(), '/public')));
  app.use('/api', api);
};

export default expressLoader;
