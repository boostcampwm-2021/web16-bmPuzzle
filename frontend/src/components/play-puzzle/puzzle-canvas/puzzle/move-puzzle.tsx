import { Point } from "paper/dist/paper-core";

import Puzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/index";
import FindChange from "@components/play-puzzle/puzzle-canvas/puzzle/find-change";

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
};
let config: Config;
const moveTile = () => {
  config = Puzzle.exportConfig();
  config.groupTiles.forEach((gtile: any) => {
    const [tile, group] = gtile;
    tile.onMouseDrag = (event: any) => {
      if (group === undefined) {
        tile.position = new Point(
          tile.position._x + event.delta.x,
          tile.position._y + event.delta.y
        );
      } else {
        config.groupTiles.forEach((gtileNow) => {
          const nowGroup = gtileNow[1];
          if (group === nowGroup) {
            tile.position = new Point(
              tile.position._x + event.delta.x,
              tile.position._y + event.delta.y
            );
          }
        });
      }
    };
  });
};

const findNearTile = () => {
  const xTileCount = config.tilesPerRow;
  const yTileCount = config.tilesPerColumn;
  config.tiles.forEach((tile) => {
    tile.onMouseUp = (event: any) => {
      const nowIndex = tile.index - (xTileCount * yTileCount + 1);
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
        if (nowIndexTile !== undefined)
          fitTiles(tile, nowIndexTile, nowShape, tileShape[index], index, true);
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

const enterRange = (preTile: any, nowTile: any, range: number, flag: boolean) =>
  (preTile.position._y - nowTile.position._y < range &&
    preTile.position._y - nowTile.position._y > -range &&
    Math.abs(nowTile.position._x - preTile.position._x) < 10) ||
  flag === false;

const fitTiles = (
  nowTile: any,
  preTile: any,
  _nowShape: any,
  _preShape: any,
  dir: number,
  flag: boolean
) => {
  const yChange = FindChange.findYChange(_nowShape, _preShape);
  const xChange = FindChange.findXChange(_nowShape, _preShape);
  const xUp = FindChange.findXUp(_nowShape, _preShape);
  const yUp = FindChange.findYUp(_nowShape, _preShape);

  const range = config.tileWidth;

  if (enterRange(preTile, nowTile, range, flag) || !flag) {
    switch (dir) {
      case 0: //좌
        nowTile.position = new Point(
          preTile.position._x + range + xChange,
          preTile.position._y + yChange
        );
        break;
      case 1: //우
        nowTile.position = new Point(
          preTile.position._x - (range + xChange),
          preTile.position._y + yChange
        );
        break;
      case 2: //상
        nowTile.position = new Point(
          preTile.position._x + xUp,
          preTile.position._y + range + yUp
        );
        break;
      case 3: //하
        nowTile.position = new Point(
          preTile.position._x + xUp,
          preTile.position._y - (range + yUp)
        );
        break;
    }
  }
  if (flag) uniteTiles(nowTile, preTile);
};

const uniteTiles = (nowTile: any, preTile: any) => {
  const substract = config.tilesPerRow * config.tilesPerColumn + 1;
  let nowIndex = nowTile.index - substract;
  let preIndex = preTile.index - substract;
  let nowGroup = config.groupTiles[nowIndex][1];
  let preGroup = config.groupTiles[preIndex][1];

  if (nowGroup !== undefined) {
    if (preGroup === undefined) {
      config.groupTiles[preIndex][1] = nowGroup;
    } else {
      config.groupTiles.forEach((gtile) => {
        if (gtile[1] === nowGroup) {
          gtile[1] = preGroup;
        }
      });
    }
  } else {
    if (preGroup !== undefined) {
      config.groupTiles[nowIndex][1] = preGroup;
    } else {
      config.groupTiles[nowIndex][1] = config.groupTileIndex;
      config.groupTiles[preIndex][1] = config.groupTileIndex;
      config.groupTileIndex++;
    }
  }

  groupFit(config.groupTiles[preIndex][1]);

  if (checkComplete() && !config.complete) {
    window.alert("퍼즐 완성");
    config.complete = true;
  }
};

const groupFit = (nowGroup: number) => {
  const xTileCount = config.tilesPerRow;
  const yTileCount = config.tilesPerColumn;
  let groupArr: any = [];
  let groupObj: any = {};

  config.groupTiles.forEach((tile: any) => {
    if (tile[1] === nowGroup) {
      const nowIndex = tile[0].index - (xTileCount * yTileCount + 1);
      groupArr.push(tile[0]);
      groupObj[nowIndex] = tile[0];
    }
  });

  groupArr.forEach((tile: any) => {
    const nowIndex = tile.index - (xTileCount * yTileCount + 1);
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

    let directionArr = [left, right, up, down];
    let flag = true;

    directionArr.forEach((dir, idx) => {
      if (dir !== undefined && groupObj[dir] !== undefined && flag) {
        fitTiles(
          tile,
          groupObj[dir],
          config.shapes[nowIndex],
          config.shapes[dir],
          idx,
          false
        );
        flag = false;
      }
    });
  });
};

const checkComplete = () => {
  let flag = false;
  const firstGroup = config.groupTiles[0][1];

  if (firstGroup !== undefined) {
    config.groupTiles.forEach((gtile) => {
      const nowGroup = gtile[1];
      flag = nowGroup !== firstGroup ? false : true;
    });
  }

  return flag;
};

const MovePuzzle = { moveTile, findNearTile };
export default MovePuzzle;
