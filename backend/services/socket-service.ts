export default (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('연결성공');
    socket.on('message', (state: { name: string; message: string }) => {
      console.log(state);
    });
  });
};
