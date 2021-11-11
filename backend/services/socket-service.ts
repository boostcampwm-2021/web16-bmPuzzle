import { clear } from 'console';
import { roomURL } from './roomInfo';

const updateRoomURL = (io: any) => {
  const cb = (io: any) => {
    let mySet = new Set<string>();
    const _roomURL = Array.from(roomURL);
    for (let item of _roomURL) {
      const clients = io.sockets.adapter.rooms.get(item);
      const numClients = clients ? clients.size : 0;
      if (numClients === 0) mySet.add(item);
    }
    mySet.forEach(item => roomURL.delete(item));
  };
  setInterval(cb, 60000, io);
};

export default (io: any) => {
  console.log('socket 연결!');
  io.on('connection', (socket: any) => {
    updateRoomURL(io);
    socket.on('joinRoom', (res: { roomID: string }) => {
      socket.join(res.roomID);
    });
    socket.on('message', (res: { roomID: string; message: object }) => {
      io.sockets.in(res.roomID).emit('message', res.message);
    });
    socket.on('leaveRoom', (res: { roomID: string }) => {
      socket.leave(res.roomID);
    });
    socket.on('disconnect', () => {});
  });
};
