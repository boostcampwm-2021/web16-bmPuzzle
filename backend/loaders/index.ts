import expressLoader from '@loaders/express';
import socketLoader from './socket';

const setting = async (expressApp: any, http: any) => {
  await expressLoader(expressApp);
  await socketLoader(expressApp, http);
};

export default setting;
