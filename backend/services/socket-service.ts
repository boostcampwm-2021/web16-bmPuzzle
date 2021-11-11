export default (io: any) => {
  console.log('socket 연결!');
  io.on('connection', (socket: any) => {
    socket.on('joinRoom', (data: any) => {
      socket.join(data.roomID);
    });
    socket.on('message', (res: { roomID: number; message: object }) => {
      io.sockets.in(res.roomID).emit('message', res.message);
    });
    socket.on('disconnect', () => {
      socket.disconnect();
    });
  });
};
