import { Size, Point } from "paper/dist/paper-core";
import { Howl } from "howler";
import Puzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/index";
import FindChange from "@components/play-puzzle/puzzle-canvas/puzzle/find-change";

const constant = {
  percentageTotal: 100.0,
  imgMargin: 0.1,
  borderStrokeWidth: 5,
  tileOpacity: 1,
  maskOpacity: 0.25,
  orgTileLoc: 100,
  tileMarginX: 50,
  tileMarginY: -30,
};

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
};
let config: Config;
const moveTile = () => {
  config = Puzzle.exportConfig();
  const {
    originHeight,
    originWidth,
    imgWidth,
    imgHeight,
    tilesPerRow,
    tilesPerColumn,
    tileWidth,
    tileMarginWidth,
    level,
    imgName,
    groupTiles,
    shapes,
    tiles,
    complete,
    groupTileIndex,
    project,
    puzzleImage,
    tileIndexes,
  } = Puzzle.exportConfig();
  console.log(tileIndexes);
  const tileRatio = tileWidth / constant.percentageTotal;
  for (let y = 0; y < tilesPerColumn; y++) {
    for (let x = 0; x < tilesPerRow; x++) {
      const shape = shapes[y * tilesPerRow + x];
      const mask = getMask(
        tileRatio,
        shape.topTab,
        shape.rightTab,
        shape.bottomTab,
        shape.leftTab,
        tileWidth,
        project,
        imgWidth,
        imgHeight
      );
      if (mask === undefined) continue;
      mask.opacity = constant.maskOpacity;
      mask.strokeColor = new project.Color("#fff");

      const cloneImg = puzzleImage.clone();
      const img = getTileRaster(
        cloneImg,
        new Size(tileWidth, tileWidth),
        new Point(tileWidth * x, tileWidth * y),
        project,
        imgWidth / originWidth + constant.imgMargin
      );

      const border = mask.clone();
      border.strokeColor = new project.Color("#ddd");
      border.strokeWidth = constant.borderStrokeWidth;

      const tile = new project.Group([mask, img, border]);
      tile.clipped = true;
      tile.opacity = constant.tileOpacity;
      tile.position = new Point(constant.orgTileLoc, constant.orgTileLoc);
      tiles.push(tile);
      groupTiles.push([tile, undefined]);
      tileIndexes.push(tileIndexes.length);
    }
  }
  Puzzle.setting({
    originHeight,
    originWidth,
    imgWidth,
    imgHeight,
    tilesPerRow,
    tilesPerColumn,
    tileWidth,
    tileMarginWidth,
    level,
    imgName,
    groupTiles,
    shapes,
    tiles,
    complete,
    groupTileIndex,
    project,
    puzzleImage,
    tileIndexes,
  });
  for (let y = 0; y < config.tilesPerColumn; y++) {
    for (let x = 0; x < config.tilesPerRow; x++) {
      const index1 = Math.floor(Math.random() * config.tileIndexes.length);
      const index2 = config.tileIndexes[index1];
      const tile = config.tiles[index2];
      config.tileIndexes.splice(index1, 1);

      const position = new Point(
        config.project.view.center.x -
          config.tileWidth +
          config.tileWidth * (x * 2 + (y % 2)) -
          config.imgWidth,
        config.project.view.center.y -
          config.tileWidth / 2 +
          config.tileWidth * y -
          config.imgHeight / 2
      );

      const cellPosition = new Point(
        Math.round(position.x / config.tileWidth) + 1,
        Math.round(position.y / config.tileWidth) + 1
      );

      tile.position = new Point(
        cellPosition.x * config.tileWidth + constant.tileMarginX,
        cellPosition.y * config.tileWidth + constant.tileMarginY
      );
    }
  }
  config.groupTiles.forEach((gtile) => {
    gtile[0].onMouseDrag = (event: any) => {
      if (gtile[1] === undefined) {
        gtile[0].position = new Point(
          gtile[0].position._x + event.delta.x,
          gtile[0].position._y + event.delta.y
        );
      } else {
        config.groupTiles.forEach((gtile_now) => {
          if (gtile[1] === gtile_now[1]) {
            gtile_now[0].position = new Point(
              gtile_now[0].position._x + event.delta.x,
              gtile_now[0].position._y + event.delta.y
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
  if (flag && uniteFlag) uniteTiles(nowTile, preTile);
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

    directionArr.forEach((dir, idx) => {
      if (dir !== undefined && groupObj[dir] !== undefined) {
        fitTiles(
          tile,
          groupObj[dir],
          config.shapes[nowIndex],
          config.shapes[dir],
          idx,
          false
        );
      }
    });
  });
};

const checkComplete = () => {
  let flag = false;
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

  return flag;
};
const effectSound = (src: any, volume = 1) => {
  let sound;
  const soundInject = (src: any) => {
    sound = new Howl({ src });
    sound.volume(volume);
  };
  soundInject(src);
  return sound;
};
const getMask = (
  tileRatio: number,
  topTab: number | undefined,
  rightTab: number | undefined,
  bottomTab: number | undefined,
  leftTab: number | undefined,
  tileWidth: number,
  project: any,
  imgWidth: number,
  imgHeight: number
) => {
  if (
    topTab === undefined ||
    rightTab === undefined ||
    bottomTab === undefined ||
    leftTab === undefined
  )
    return;

  const curvyCoords = [
    0, 0, 35, 15, 37, 5, 37, 5, 40, 0, 38, -5, 38, -5, 20, -20, 50, -20, 50,
    -20, 80, -20, 62, -5, 62, -5, 60, 0, 63, 5, 63, 5, 65, 15, 100, 0,
  ];

  const mask = new project.Path();
  const topLeftEdge = new Point(-imgWidth / 2, -imgHeight / 2);

  mask.moveTo(topLeftEdge);
  //Top
  for (let i = 0; i < curvyCoords.length / 6; i++) {
    const p1 = new Point(
      topLeftEdge.x + curvyCoords[i * 6 + 0] * tileRatio,
      topLeftEdge.y + topTab * curvyCoords[i * 6 + 1] * tileRatio
    );

    const p2 = new Point(
      topLeftEdge.x + curvyCoords[i * 6 + 2] * tileRatio,
      topLeftEdge.y + topTab * curvyCoords[i * 6 + 3] * tileRatio
    );

    const p3 = new Point(
      topLeftEdge.x + curvyCoords[i * 6 + 4] * tileRatio,
      topLeftEdge.y + topTab * curvyCoords[i * 6 + 5] * tileRatio
    );

    mask.cubicCurveTo(p1, p2, p3); // 곡선의 첫점, 중앙점, 끝점
  }

  //Right
  const topRightEdge = new Point(topLeftEdge.x + tileWidth, topLeftEdge.y);
  for (let i = 0; i < curvyCoords.length / 6; i++) {
    const p1 = new Point(
      topRightEdge.x - rightTab * curvyCoords[i * 6 + 1] * tileRatio,
      topRightEdge.y + curvyCoords[i * 6 + 0] * tileRatio
    );
    const p2 = new Point(
      topRightEdge.x - rightTab * curvyCoords[i * 6 + 3] * tileRatio,
      topRightEdge.y + curvyCoords[i * 6 + 2] * tileRatio
    );
    const p3 = new Point(
      topRightEdge.x - rightTab * curvyCoords[i * 6 + 5] * tileRatio,
      topRightEdge.y + curvyCoords[i * 6 + 4] * tileRatio
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  //Bottom
  const bottomRightEdge = new Point(topRightEdge.x, topRightEdge.y + tileWidth);
  for (let i = 0; i < curvyCoords.length / 6; i++) {
    const p1 = new Point(
      bottomRightEdge.x - curvyCoords[i * 6 + 0] * tileRatio,
      bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 1] * tileRatio
    );
    const p2 = new Point(
      bottomRightEdge.x - curvyCoords[i * 6 + 2] * tileRatio,
      bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 3] * tileRatio
    );
    const p3 = new Point(
      bottomRightEdge.x - curvyCoords[i * 6 + 4] * tileRatio,
      bottomRightEdge.y - bottomTab * curvyCoords[i * 6 + 5] * tileRatio
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  //Left
  const bottomLeftEdge = new Point(
    bottomRightEdge.x - tileWidth,
    bottomRightEdge.y
  );
  for (let i = 0; i < curvyCoords.length / 6; i++) {
    const p1 = new Point(
      bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 1] * tileRatio,
      bottomLeftEdge.y - curvyCoords[i * 6 + 0] * tileRatio
    );
    const p2 = new Point(
      bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 3] * tileRatio,
      bottomLeftEdge.y - curvyCoords[i * 6 + 2] * tileRatio
    );
    const p3 = new Point(
      bottomLeftEdge.x + leftTab * curvyCoords[i * 6 + 5] * tileRatio,
      bottomLeftEdge.y - curvyCoords[i * 6 + 4] * tileRatio
    );

    mask.cubicCurveTo(p1, p2, p3);
  }

  return mask;
};
const getTileRaster = (
  sourceRaster: paper.Raster,
  size: paper.Size,
  offset: paper.Point,
  project: any,
  scaleValue: number
) => {
  const targetRaster = new project.Raster("empty");
  targetRaster.scale(scaleValue);
  targetRaster.position = new Point(-offset.x, -offset.y);

  return targetRaster;
};

const MovePuzzle = { moveTile, findNearTile };
export default MovePuzzle;
