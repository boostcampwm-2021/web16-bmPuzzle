import { roomURL } from './roomInfo';
const roomInfo: any = {};

export default (io: any) => {
  console.log('socket 연결!');
  io.on('connection', (socket: any) => {
    socket.on('joinRoom', (res: { roomID: string }) => {
      if (roomInfo[res.roomID] === undefined) roomInfo[res.roomID] = 1;
      else roomInfo[res.roomID]++;
      socket.join(res.roomID);
      console.log(roomInfo);
    });
    socket.on('message', (res: { roomID: string; message: object }) => {
      io.sockets.in(res.roomID).emit('message', res.message);
    });
    socket.on('leaveRoom', (res: { roomID: string }) => {
      roomInfo[res.roomID]--;
      console.log(roomInfo);
      if (roomInfo[res.roomID] === 0) {
        roomURL.delete(res.roomID);
        delete roomInfo[res.roomID];
        socket.disconnect();
      }
      console.log(roomInfo);
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });
};
