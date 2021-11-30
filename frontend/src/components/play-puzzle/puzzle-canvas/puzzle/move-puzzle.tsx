import { Point } from "paper/dist/paper-core";
import Puzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/index";
import initPuzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/config-init";
import FitPuzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/fit-tile";
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
let config: Config;
let preemption: number[] = [];

const moveTile = (isFirstClient: boolean, socket: any, roomID: string) => {
  config = Puzzle.exportConfig();
  if (isFirstClient) initPuzzle.initConfig();
  config.groupTiles.forEach((gtile, index) => {
    if (gtile[1] === null) {
      gtile[1] = undefined;
    }
  });
  config.groupTiles.forEach((gtile, gtileIdx) => {
    gtile[0].onMouseDown = (event: any) => {
      if (preemption.includes(gtileIdx)) return;
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
          Puzzle.setting(config);
          Puzzle.setFirst(first);
          FitPuzzle.fitTiles(
            tile[0],
            nowIndexTile,
            nowShape,
            tileShape[index],
            index,
            true,
            socket,
            roomID,
            config
          );
          config = Puzzle.exportConfig();
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
