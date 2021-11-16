import { Size, Point } from "paper/dist/paper-core";
import Puzzle from "@components/play-puzzle/puzzle-canvas/puzzle/index";

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

export const createTiles = () => {
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
  getRandomShapes(shapes, tilesPerRow, tilesPerColumn);
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
};

const getRandomShapes = (shapes: any[], width: number, height: number) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let topTab: undefined | number;
      let rightTab: undefined | number;
      let bottomTab: undefined | number;
      let leftTab: undefined | number;

      if (y === 0) topTab = 0;
      if (y === height - 1) bottomTab = 0;
      if (x === 0) leftTab = 0;
      if (x === width - 1) rightTab = 0;

      shapes.push({
        topTab: topTab,
        rightTab: rightTab,
        bottomTab: bottomTab,
        leftTab: leftTab,
      });
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const shape = shapes[y * width + x];

      const shapeRight =
        x < width - 1 ? shapes[y * width + (x + 1)] : undefined;

      const shapeBottom =
        y < height - 1 ? shapes[(y + 1) * width + x] : undefined;

      shapes[y * width + x].rightTab =
        x < width - 1 ? getRandomTabValue() : shape.rightTab;

      if (shapeRight && shape.rightTab !== undefined)
        shapeRight.leftTab = -shape.rightTab;

      shapes[y * width + x].bottomTab =
        y < height - 1 ? getRandomTabValue() : shape.bottomTab;

      if (shapeBottom && shape.bottomTab !== undefined)
        shapeBottom.topTab = -shape.bottomTab;
    }
  }
};
const getRandomTabValue = () => {
  return Math.pow(-1, Math.floor(Math.random() * 2));
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
