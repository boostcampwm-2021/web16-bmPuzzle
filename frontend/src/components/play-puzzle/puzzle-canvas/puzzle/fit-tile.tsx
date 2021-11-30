import FindChange from "@components/play-puzzle/puzzle-canvas/puzzle/find-change";
import Puzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/index";
import { Point } from "paper/dist/paper-core";
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
let conf: Config;
let first: boolean;
let room: string;
const fitTiles = (
  nowTile: any,
  preTile: any,
  nowShape: any,
  preShape: any,
  dir: number,
  flag: boolean,
  socket: any,
  roomID: string,
  config: Config
) => {
  conf = Puzzle.exportConfig();
  const yChange = FindChange.findYChange(nowShape, preShape);
  const xChange = FindChange.findXChange(nowShape, preShape);
  const xUp = FindChange.findXUp(nowShape, preShape);
  const yUp = FindChange.findYUp(nowShape, preShape);

  const range = conf.tileWidth;
  let uniteFlag = false;
  room = roomID;
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
const uniteTiles = (nowTile: any, preTile: any, socket: any) => {
  let substract = 0;
  let first = Puzzle.exportFirst();
  conf = Puzzle.exportConfig();
  if (first) {
    substract = conf.tilesPerRow * conf.tilesPerColumn + 1;
  } else {
    substract = 1;
  }
  let nowIndex = nowTile.index - substract;
  let preIndex = preTile.index - substract;
  let nowGroup = conf.groupTiles[nowIndex][1];
  let preGroup = conf.groupTiles[preIndex][1];

  if (nowGroup !== undefined && !Number.isNaN(nowGroup)) {
    if (preGroup === undefined || Number.isNaN(preGroup)) {
      conf.groupTiles[preIndex][1] = nowGroup;
    } else {
      conf.groupTiles.forEach((gtile) => {
        if (gtile[1] === nowGroup) {
          gtile[1] = preGroup;
        }
      });
    }
  } else {
    if (preGroup !== undefined && !Number.isNaN(preGroup)) {
      conf.groupTiles[nowIndex][1] = preGroup;
    } else {
      conf.groupTiles[nowIndex][1] = conf.groupTileIndex;
      conf.groupTiles[preIndex][1] = conf.groupTileIndex;
      if (conf.groupTileIndex !== null && !Number.isNaN(conf.groupTileIndex)) {
        conf.groupTileIndex++;
        socket.emit("groupIndex", {
          roomID: room,
          groupTileIndex: conf.groupTileIndex,
        });
      }
    }
  }
  if (!dismantling(conf.groupTiles[preIndex][1])) {
    groupFit(conf.groupTiles[preIndex][1], socket);
  }
};
const dismantling = (groupIndexNow: number) => {
  let count = 0;
  conf.groupTiles.forEach((gtile) => {
    if (gtile[1] === groupIndexNow) {
      count++;
    }
  });
  if (count === 1) {
    conf.groupTiles.forEach((gtile) => {
      if (gtile[1] === groupIndexNow) {
        gtile[1] = undefined;
        return true;
      }
    });
  }
  return false;
};
const groupFit = (nowGroup: number, socket: any) => {
  const xTileCount = conf.tilesPerRow;
  const yTileCount = conf.tilesPerColumn;
  let groupArr: any = [];
  let groupObj: any = {};
  first = Puzzle.exportFirst();
  conf.groupTiles.forEach((tile: any) => {
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
          conf.shapes[nowIndex],
          conf.shapes[dir[0]],
          dir[1],
          false,
          socket,
          room,
          conf
        );
        index++;
      }
    });
  });
};
const moveUpdate = (
  tileIndex: number,
  tilePosition: any[],
  tileGroup: number | null
) => {
  conf = Puzzle.exportConfig();
  if (conf !== undefined) {
    conf.tiles[tileIndex].position = new Point(
      tilePosition[1],
      tilePosition[2]
    );
    conf.groupTiles[tileIndex][1] = tileGroup;
  }
  Puzzle.setting(conf);
};
const indexUpdate = (groupIndex: number) => {
  conf = Puzzle.exportConfig();
  if (conf !== undefined) {
    conf.groupTileIndex = groupIndex;
  }
  Puzzle.setting(conf);
};
const FitPuzzle = {
  fitTiles,
  moveUpdate,
  indexUpdate,
};
export default FitPuzzle;
