import cors from 'cors';

const socketLoader = async (app: any) => {
  const server = require('http').createServer(app);
  app.unsubscribe(cors());
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  const socket = require('./socketAction.ts')(io);
  return server;
};

export default socketLoader;
