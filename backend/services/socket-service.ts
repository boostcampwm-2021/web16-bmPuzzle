import { eventNames } from 'process';
import { stringify } from 'querystring';
import { roomURL } from './roomInfo';

type Config = {
  originHeight: number;
  originWidth: number;
  imgWidth: number;
  imgHeight: number;
  tilesPerRow: number;
  tilesPerColumn: number;
  tileWidth: number;
  tileMarginWidth: number;
  level: number;
  imgName: String;
  groupTiles: any[];
  shapes: any[];
  tiles: any[];
  complete: boolean;
  groupTileIndex: number;
  project: any;
  puzzleImage: any;
  tileIndexes: any[];
  groupArr: any[];
  selectIndex: number;
};

const roomPuzzleInfo = new Map<string, any>();
const timer = new Map<string, any>();

const updateRoomURL = (io: any) => {
  const cb = (io: any) => {
    let mySet = new Set<string>();
    const _roomURL = Array.from(roomURL);
    _roomURL.forEach(url => {
      const clients = io.sockets.adapter.rooms.get(url);
      const numClients = clients ? clients.size : 0;
      if (numClients === 0) mySet.add(url);
    });
    mySet.forEach(url => {
      roomURL.delete(url);
      roomPuzzleInfo.delete(url);
    });
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
      const clients = io.sockets.adapter.rooms.get(res.roomID);
      const numClients = clients ? clients.size : 0;
      if (numClients > 3) socket.emit('isFull');
      else {
        socket.join(res.roomID);
        const isFirstClient = checkFirstClient(io, res.roomID);
        if (isFirstClient) socket.emit('isFirstUser');
      }
    });
    socket.on('message', (res: { roomID: string; message: object }) => {
      io.sockets.in(res.roomID).emit('message', res.message);
    });
    socket.on('leaveRoom', (res: { roomID: string }) => {
      socket.leave(res.roomID);
    });
    socket.on('setPuzzleConfig', (res: { roomID: string; config: Config }) => {
      roomPuzzleInfo.set(res.roomID, res.config);
    });
    socket.on('getPuzzleConfig', (res: { roomID: string }) => {
      socket.emit('getPuzzleConfig', roomPuzzleInfo.get(res.roomID));
    });
    socket.on(
      'tilePosition',
      (res: {
        roomID: string;
        tileIndex: number;
        tilePosition: any[];
        tileGroup: number | null;
        changedData: any;
        groupTileIndex: number;
      }) => {
        let config = roomPuzzleInfo.get(res.roomID);
        if (config === undefined) return;
        if (typeof res.changedData[0] === 'number') {
          config.tiles[res.tileIndex][1].children.forEach((child: any) => {
            if (child[0] === 'Path') {
              child[1].segments.forEach((c: any, idx: number) => {
                if (idx === 0) {
                  c[0] += res.changedData[0];
                  c[1] += res.changedData[1];
                } else {
                  c[0][0] += res.changedData[0];
                  c[0][1] += res.changedData[1];
                }
              });
            } else {
              child[1].matrix[4] += res.changedData[0];
              child[1].matrix[5] += res.changedData[1];
            }
          });
        } else {
          config.tiles[res.tileIndex] = res.changedData;
          roomPuzzleInfo.set(res.roomID, config);
        }
        config.groupTiles[res.tileIndex][1] = res.tileGroup;
        socket.broadcast.to(res.roomID).emit('tilePosition', {
          tileIndex: res.tileIndex,
          tilePosition: res.tilePosition,
          tileGroup: res.tileGroup,
          groupTileIndex: ++res.groupTileIndex,
        });
      },
    );
    socket.on('setTimer', (res: { roomID: string; timer: number }) => {
      timer.set(res.roomID, res.timer);
    });
    socket.on('getTimer', (res: { roomID: string; timer: number }) => {
      const sub = res.timer - timer.get(res.roomID);
      const tmp = {
        minutes: Math.floor(sub / 60),
        seconds: Math.round(sub % 60),
      };
      socket.emit('getTimer', tmp);
    });

    socket.on('deleteRoom', (res: { roomID: string }) => {
      timer.delete(res.roomID);
    });
    socket.on('disconnect', () => {});
  });
};
