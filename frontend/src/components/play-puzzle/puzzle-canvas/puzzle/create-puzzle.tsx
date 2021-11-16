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
  getRandomShapes(shapes, tilesPerRow, tilesPerColumn);
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
