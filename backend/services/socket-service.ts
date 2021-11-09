export default (io: any) => {
  io.on('connection', (socket: any) => {
    socket.on('joinRoom', (data: any) => {
      socket.join(data.roomID);
    });
    socket.on('message', (res: { roomID: number; message: object }) => {
      io.sockets.in(res.roomID).emit('message', res.message);
    });
  });
};
