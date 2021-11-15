import { roomURL } from './roomInfo';

const updateRoomURL = (io: any) => {
  const cb = (io: any) => {
    let mySet = new Set<string>();
    const _roomURL = Array.from(roomURL);
    _roomURL.forEach(url => {
      const clients = io.sockets.adapter.rooms.get(url);
      const numClients = clients ? clients.size : 0;
      if (numClients === 0) mySet.add(url);
    });
    mySet.forEach(url => roomURL.delete(url));
  };
  setInterval(cb, 60000, io);
};

const checkFirstClient = (io: any, roomID: string) => {
  const clients = io.sockets.adapter.rooms.get(roomID);
  const numClients = clients ? clients.size : 0;
  if (numClients === 1) return true;
  return false;
};

export default (io: any) => {
  console.log('socket 연결!');
  io.on('connection', (socket: any) => {
    updateRoomURL(io);
    socket.on('joinRoom', (res: { roomID: string }) => {
      socket.join(res.roomID);
      const isFirstClient = checkFirstClient(io, res.roomID);
      if (isFirstClient) socket.emit('isFirstUser');
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
