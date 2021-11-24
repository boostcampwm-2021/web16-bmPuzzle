import { Size, Point } from "paper/dist/paper-core";
import Puzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/index";
const constant = {
  percentageTotal: 100.0,
  borderStrokeWidth: 5,
  tileOpacity: 1,
  maskOpacity: 0.25,
  orgTileLoc: 100,
  tileMarginX: 0,
  tileMarginY: 30,
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
  groupTileIndex: number | null;
  project: any;
  puzzleImage: any;
  tileIndexes: any[];
  groupArr: any[];
  selectIndex: number;
};
let config: Config;
const initConfig = () => {
  config = Puzzle.exportConfig();
  const tileRatio = config.tileWidth / constant.percentageTotal;
  for (let y = 0; y < config.tilesPerColumn; y++) {
    for (let x = 0; x < config.tilesPerRow; x++) {
      const shape = config.shapes[y * config.tilesPerRow + x];
      const mask = getMask(
        tileRatio,
        shape.topTab,
        shape.rightTab,
        shape.bottomTab,
        shape.leftTab,
        config.tileWidth,
        config.project,
        config.imgWidth,
        config.imgHeight
      );
      if (mask === undefined) continue;
      mask.opacity = constant.maskOpacity;
      mask.strokeColor = new config.project.Color("#fff");

      const cloneImg = config.puzzleImage.clone();
      const img = getTileRaster(
        cloneImg,
        new Size(config.tileWidth, config.tileWidth),
        new Point(config.tileWidth * x, config.tileWidth * y),
        Math.max(
          config.imgWidth / config.originWidth,
          config.imgHeight / config.originHeight
        )
      );

      const border = mask.clone();
      border.strokeColor = new config.project.Color("#ddd");
      border.strokeWidth = constant.borderStrokeWidth;

      const tile = new config.project.Group([mask, img, border]);
      tile.clipped = true;
      tile.opacity = constant.tileOpacity;
      tile.position = new Point(constant.orgTileLoc, constant.orgTileLoc);
      config.tiles.push(tile);
      config.groupTiles.push([tile, undefined]);
      config.groupArr.push(undefined);
      config.tileIndexes.push(config.tileIndexes.length);
    }
  }

  for (let y = 0; y < config.tilesPerColumn; y++) {
    for (let x = 0; x < config.tilesPerRow; x++) {
      const index1 = Math.floor(Math.random() * config.tileIndexes.length);
      const index2 = config.tileIndexes[index1];
      const tile = config.tiles[index2];
      config.tileIndexes.splice(index1, 1);
      const position = new Point(
        config.project.view.center.x -
          config.tileWidth / 2 +
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
        cellPosition.y * config.tileWidth +
          (config.tilesPerColumn % 2 === 1
            ? -constant.tileMarginY
            : constant.tileMarginY)
      );
    }
  }
  Puzzle.setting({
    ...config,
  });
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
  scaleValue: number
) => {
  const targetRaster = new config.project.Raster("empty");
  targetRaster.scale(scaleValue);
  targetRaster.position = new Point(-offset.x, -offset.y);

  return targetRaster;
};
const initPuzzle = { initConfig };
export default initPuzzle;
