import cors from 'cors';
import socket from '@services/socket-service';

const socketLoader = async (app: any, http: any) => {
  const io = require('socket.io')(http, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  socket(io);
};

export default socketLoader;
