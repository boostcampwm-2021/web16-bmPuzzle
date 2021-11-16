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
export const createTiles = () => {
  config = Puzzle.exportConfig();
  getRandomShapes();
};

const getRandomShapes = () => {
  for (let y = 0; y < config.tilesPerColumn; y++) {
    for (let x = 0; x < config.tilesPerRow; x++) {
      let topTab: undefined | number;
      let rightTab: undefined | number;
      let bottomTab: undefined | number;
      let leftTab: undefined | number;

      if (y === 0) topTab = 0;
      if (y === config.tilesPerColumn - 1) bottomTab = 0;
      if (x === 0) leftTab = 0;
      if (x === config.tilesPerRow - 1) rightTab = 0;

      config.shapes.push({
        topTab: topTab,
        rightTab: rightTab,
        bottomTab: bottomTab,
        leftTab: leftTab,
      });
    }
  }

  for (let y = 0; y < config.tilesPerColumn; y++) {
    for (let x = 0; x < config.tilesPerRow; x++) {
      const shape = config.shapes[y * config.tilesPerRow + x];

      const shapeRight =
        x < config.tilesPerRow - 1
          ? config.shapes[y * config.tilesPerRow + (x + 1)]
          : undefined;

      const shapeBottom =
        y < config.tilesPerColumn - 1
          ? config.shapes[(y + 1) * config.tilesPerRow + x]
          : undefined;

      config.shapes[y * config.tilesPerRow + x].rightTab =
        x < config.tilesPerRow - 1 ? getRandomTabValue() : shape.rightTab;

      if (shapeRight && shape.rightTab !== undefined)
        shapeRight.leftTab = -shape.rightTab;

      config.shapes[y * config.tilesPerRow + x].bottomTab =
        y < config.tilesPerColumn - 1 ? getRandomTabValue() : shape.bottomTab;

      if (shapeBottom && shape.bottomTab !== undefined)
        shapeBottom.topTab = -shape.bottomTab;
    }
  }
};
const getRandomTabValue = () => {
  return Math.pow(-1, Math.floor(Math.random() * 2));
};
