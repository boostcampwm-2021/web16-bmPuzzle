import { Point, Size } from "paper/dist/paper-core";
import { createTiles } from "@src/components/play-puzzle/puzzle-canvas/puzzle/create-puzzle";
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
  groupTiles: number[];
  shapes: any[];
  tiles: any[];
  complete: boolean;
  groupTileIndex: number;
};

let config: Config;
const setting = (conf: Config) => {
  config = { ...conf };
};
const exportConfig = () => config;
const run = () => {
  createTiles();
  //moveTile();
  //findNearTile();
};

/*
class Puzzle {
  project: any;
  puzzleImage: null | any;

  config: Config;
  constructor(project: any, config: Config) {
    this.config = {
      ...config,
    };
    this.project = project;
    this.puzzleImage = new this.project.Raster({
      source: "puzzleImage",
      position: this.project.view.center,
    });

    createTiles();
    this.moveTile();
    this.findNearTile();
  }
}
*/

export default { setting, run, exportConfig };
