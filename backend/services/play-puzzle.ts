const joinPlayRoom = async (req: any, res: any, next: any) => {
  const roomID = req.params.roomID;
  res.status(200).json({
    roomID: roomID,
  });
};

export default joinPlayRoom;
