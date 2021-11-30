import { Point } from "paper/dist/paper-core";
import Puzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/index";
import FindChange from "@components/play-puzzle/puzzle-canvas/puzzle/find-change";
import initPuzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/config-init";

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
  groupTileIndex: number | null;
  project: any;
  puzzleImage: any;
  tileIndexes: any[];
  groupArr: any[];
  selectIndex: number;
};
let first = true;
let select_idx: any;
let config: Config;
let room: string;
let preemption: number[] = [];

const moveTile = (isFirstClient: boolean, socket: any, roomID: string) => {
  config = Puzzle.exportConfig();
  room = roomID;
  if (isFirstClient) initPuzzle.initConfig();
  config.groupTiles.forEach((gtile, index) => {
    if (gtile[1] === null) {
      gtile[1] = undefined;
    }
  });
  config.groupTiles.forEach((gtile, gtileIdx) => {
    gtile[0].onMouseDown = (event: any) => {
      if (preemption.includes(gtileIdx)) return;
      //select_idx = gtile[0].index;
      //gtile[0]._parent.addChild(gtile[0]);
      if (gtile[1] === undefined) {
        socket.emit("setPreemption", {
          roomID: roomID,
          socketID: socket.id,
          tileIndex: [gtileIdx],
        });
      } else {
        const group: number[] = [];
        config.groupTiles.forEach((gtileInfo, gtileIndex) => {
          if (gtileInfo[1] === gtile[1]) {
            group.push(gtileIndex);
          }
        });
        socket.emit("setPreemption", {
          roomID: roomID,
          socketID: socket.id,
          tileIndex: group,
        });
      }
    };
    gtile[0].onMouseDrag = (event: any) => {
      if (preemption.includes(gtileIdx)) return;
      const newPosition = {
        x: Math.min(
          Math.max(
            gtile[0].position._x + event.delta.x,
            Math.floor(config.tileWidth / 2)
          ),
          config.project.view._viewSize._width -
            Math.floor(config.tileWidth / 2)
        ),
        y: Math.min(
          Math.max(
            gtile[0].position._y + event.delta.y,
            Math.floor(config.tileWidth / 2)
          ),
          config.project.view._viewSize._height -
            Math.floor(config.tileWidth / 2)
        ),
      };
      const originalPosition = {
        x: gtile[0].position._x,
        y: gtile[0].position._y,
      };
      if (gtile[1] === undefined) {
        gtile[0].position = new Point(newPosition.x, newPosition.y);
      } else {
        config.groupTiles.forEach((gtile_now) => {
          if (gtile[1] === gtile_now[1]) {
            gtile_now[0].position = new Point(
              gtile_now[0].position._x + newPosition.x - originalPosition.x,
              gtile_now[0].position._y + newPosition.y - originalPosition.y
            );
          }
        });
      }
    };
  });
};
const moveUpdate = (
  tileIndex: number,
  tilePosition: any[],
  tileGroup: number | null
) => {
  config = Puzzle.exportConfig();
  if (config !== undefined) {
    config.tiles[tileIndex].position = new Point(
      tilePosition[1],
      tilePosition[2]
    );
    config.groupTiles[tileIndex][1] = tileGroup;
  }
};
const indexUpdate = (groupIndex: number) => {
  if (config !== undefined) {
    config.groupTileIndex = groupIndex;
  }
};

const findNearTile = (isFirstClient: boolean, socket: any, roomID: string) => {
  first = isFirstClient;
  config = Puzzle.exportConfig();
  const xTileCount = config.tilesPerRow;
  const yTileCount = config.tilesPerColumn;
  config.groupTiles.forEach((tile, tileIndex) => {
    tile[0].onMouseUp = (event: any) => {
      if (preemption.includes(tileIndex)) return;
      //tile[0]._parent.insertChild(select_idx, tile[0]);
      let nowIndex = 0;
      if (first) {
        nowIndex = tile[0].index - (xTileCount * yTileCount + 1);
      } else {
        nowIndex = tile[0].index - 1;
      }
      let nextIndexArr = [
        nowIndex - 1,
        nowIndex + 1,
        nowIndex - xTileCount,
        nowIndex + xTileCount,
      ];
      const tileArr: any[] = [];
      const tileShape: any[] = [];
      const nowShape = config.shapes[nowIndex];
      nextIndexArr.forEach((nextIndex, index) => {
        if (!checkUndefined(nowIndex, nextIndex, index)) {
          tileArr[index] = undefined;
        } else {
          tileArr[index] = config.tiles[nextIndex];
          tileShape[index] = config.shapes[nextIndex];
        }
      });
      tileArr.forEach((nowIndexTile, index) => {
        if (nowIndexTile !== undefined) {
          fitTiles(
            tile[0],
            nowIndexTile,
            nowShape,
            tileShape[index],
            index,
            true,
            socket
          );
        }
      });
      if (tile[1] === undefined) {
        socket.emit("tilePosition", {
          roomID: roomID,
          tileIndex: tileIndex,
          tilePosition: tile[0].position,
          tileGroup: tile[1],
          changedData: tile[0],
        });
      } else {
        config.groupTiles.forEach((tileNow, tileNowIndex) => {
          if (tile[1] === tileNow[1]) {
            socket.emit("tilePosition", {
              roomID: roomID,
              tileIndex: tileNowIndex,
              tilePosition: tileNow[0].position,
              tileGroup: tileNow[1],
              changedData: tileNow[0],
            });
          }
        });
      }
      socket.emit("deletePreemption", {
        roomID: roomID,
        socketID: socket.id,
      });
    };
  });
};

const fitEffect = () => {
  let audio = new Audio("/audios/fit-tile.mp3");
  audio.loop = false;
  audio.crossOrigin = "anonymous";
  audio.volume = 0.5;
  audio.load();
  try {
    audio.play();
  } catch (err: any) {
    console.log(err);
  }
};

const checkUndefined = (
  nowIndex: number,
  nextIndex: number,
  direction: number
) => {
  let flag = true;
  const xTileCount = config.tilesPerRow;
  const yTileCount = config.tilesPerColumn;
  const groupTiles = config.groupTiles;

  const nowTile = groupTiles[nowIndex];
  const nextTile = groupTiles[nextIndex];

  if (nextTile !== undefined && nowTile !== undefined) {
    const nowGroup = nowTile[1];
    const nextGroup = nextTile[1];
    if (nowGroup !== undefined && nextGroup === nowGroup) {
      flag = false;
    }
  }

  if (nowIndex % xTileCount === 0 && direction === 0) {
    flag = false;
  } else if (nowIndex % xTileCount === 2 && direction === 1) {
    flag = false;
  } else if (nowIndex < xTileCount && direction === 2) {
    flag = false;
  } else if (nowIndex >= xTileCount * (yTileCount - 1) && direction === 3) {
    flag = false;
  }

  return flag;
};

const fitTiles = (
  nowTile: any,
  preTile: any,
  _nowShape: any,
  _preShape: any,
  dir: number,
  flag: boolean,
  socket: any
) => {
  const yChange = FindChange.findYChange(_nowShape, _preShape);
  const xChange = FindChange.findXChange(_nowShape, _preShape);
  const xUp = FindChange.findXUp(_nowShape, _preShape);
  const yUp = FindChange.findYUp(_nowShape, _preShape);

  const range = config.tileWidth;
  let uniteFlag = false;

  switch (dir) {
    case 0:
      if (
        (nowTile.position._x - preTile.position._x < range &&
          nowTile.position._x - preTile.position._x > -range &&
          Math.abs(nowTile.position._y - preTile.position._y) < 10) ||
        flag === false
      ) {
        nowTile.position = new Point(
          preTile.position._x + range + xChange,
          preTile.position._y + yChange
        );
        uniteFlag = true;
      }
      break;
    case 1:
      if (
        (preTile.position._x - nowTile.position._x < range &&
          preTile.position._x - nowTile.position._x > -range &&
          Math.abs(nowTile.position._y - preTile.position._y) < 10) ||
        flag === false
      ) {
        nowTile.position = new Point(
          preTile.position._x - (range + xChange),
          preTile.position._y + yChange
        );
        uniteFlag = true;
      }
      break;
    case 2:
      if (
        (preTile.position._y - nowTile.position._y < range &&
          preTile.position._y - nowTile.position._y > -range &&
          Math.abs(nowTile.position._x - preTile.position._x) < 10) ||
        flag === false
      ) {
        nowTile.position = new Point(
          preTile.position._x + xUp,
          preTile.position._y + range + yUp
        );
        uniteFlag = true;
      }
      break;
    case 3:
      if (
        (nowTile.position._y - preTile.position._y < range &&
          nowTile.position._y - preTile.position._y > -range &&
          Math.abs(nowTile.position._x - preTile.position._x) < 10) ||
        flag === false
      ) {
        nowTile.position = new Point(
          preTile.position._x + xUp,
          preTile.position._y - (range + yUp)
        );
        uniteFlag = true;
      }
      break;
  }
  if (flag && uniteFlag) {
    uniteTiles(nowTile, preTile, socket);
    fitEffect();
  }
};

const uniteTiles = (nowTile: any, preTile: any, socket: any) => {
  let substract = 0;
  if (first) {
    substract = config.tilesPerRow * config.tilesPerColumn + 1;
  } else {
    substract = 1;
  }
  let nowIndex = nowTile.index - substract;
  let preIndex = preTile.index - substract;
  let nowGroup = config.groupTiles[nowIndex][1];
  let preGroup = config.groupTiles[preIndex][1];

  if (nowGroup !== undefined && !Number.isNaN(nowGroup)) {
    if (preGroup === undefined || Number.isNaN(preGroup)) {
      config.groupTiles[preIndex][1] = nowGroup;
    } else {
      config.groupTiles.forEach((gtile) => {
        if (gtile[1] === nowGroup) {
          gtile[1] = preGroup;
        }
      });
    }
  } else {
    if (preGroup !== undefined && !Number.isNaN(preGroup)) {
      config.groupTiles[nowIndex][1] = preGroup;
    } else {
      config.groupTiles[nowIndex][1] = config.groupTileIndex;
      config.groupTiles[preIndex][1] = config.groupTileIndex;
      if (
        config.groupTileIndex !== null &&
        !Number.isNaN(config.groupTileIndex)
      ) {
        config.groupTileIndex++;
        socket.emit("groupIndex", {
          roomID: room,
          groupTileIndex: config.groupTileIndex,
        });
      }
    }
  }
  if (!dismantling(config.groupTiles[preIndex][1])) {
    groupFit(config.groupTiles[preIndex][1], socket);
  }
};
const dismantling = (groupIndexNow: number) => {
  let count = 0;
  config.groupTiles.forEach((gtile) => {
    if (gtile[1] === groupIndexNow) {
      count++;
    }
  });
  if (count === 1) {
    config.groupTiles.forEach((gtile) => {
      if (gtile[1] === groupIndexNow) {
        gtile[1] = undefined;
        return true;
      }
    });
  }
  return false;
};
const groupFit = (nowGroup: number, socket: any) => {
  const xTileCount = config.tilesPerRow;
  const yTileCount = config.tilesPerColumn;
  let groupArr: any = [];
  let groupObj: any = {};

  config.groupTiles.forEach((tile: any) => {
    let nowIndex = 0;
    if (tile[1] === nowGroup) {
      if (first) {
        nowIndex = tile[0].index - (xTileCount * yTileCount + 1);
      } else {
        nowIndex = tile[0].index - 1;
      }
      groupArr.push(tile[0]);
      groupObj[nowIndex] = tile[0];
    }
  });

  if (groupArr.length === 1) return;

  groupArr.forEach((tile: any) => {
    let nowIndex = 0;
    if (first) {
      nowIndex = tile.index - (xTileCount * yTileCount + 1);
    } else {
      nowIndex = tile.index - 1;
    }
    const up: number | undefined =
      nowIndex - xTileCount < 0 ? undefined : nowIndex - xTileCount;
    const left: number | undefined =
      nowIndex % xTileCount === 0 ? undefined : nowIndex - 1;
    const right: number | undefined =
      nowIndex % xTileCount === xTileCount - 1 ? undefined : nowIndex + 1;
    const down: number | undefined =
      nowIndex >= xTileCount * (yTileCount - 1)
        ? undefined
        : nowIndex + xTileCount;

    let directionArr = [
      [up, 2],
      [left, 0],
      [right, 1],
      [down, 3],
    ];

    let index = 0;
    directionArr.forEach((dir, idx) => {
      if (
        dir[0] !== undefined &&
        dir[1] !== undefined &&
        groupObj[dir[0]] !== undefined &&
        index < 1
      ) {
        fitTiles(
          tile,
          groupObj[dir[0]],
          config.shapes[nowIndex],
          config.shapes[dir[0]],
          dir[1],
          false,
          socket
        );
        index++;
      }
    });
  });
};

const checkComplete = () => {
  let flag = false;
  config = Puzzle.exportConfig();
  if (config !== undefined) {
    const firstGroup = config.groupTiles[0][1];

    if (firstGroup !== undefined) {
      flag = true;
      config.groupTiles.forEach((gtile) => {
        const nowGroup = gtile[1];
        if (nowGroup !== firstGroup) {
          flag = false;
        }
      });
    }
  }
  if (flag && !config.complete) {
    config.complete = true;
  } else {
    flag = false;
  }
  return flag;
};

const setPreemption = (preemptionData: number[] | undefined) => {
  if (preemptionData !== undefined) {
    preemption = preemptionData;
  }
};

const MovePuzzle = {
  moveTile,
  findNearTile,
  moveUpdate,
  checkComplete,
  indexUpdate,
  setPreemption,
};
export default MovePuzzle;
