import { createTiles } from "@src/components/play-puzzle/puzzle-canvas/puzzle/create-puzzle";
import movePuzzle from "@src/components/play-puzzle/puzzle-canvas/puzzle/move-puzzle";
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
};

let config: Config;
const setting = (conf: Config) => {
  config = { ...conf };
};
const exportConfig = () => config;
const run = () => {
  createTiles();
  movePuzzle.moveTile();
  movePuzzle.findNearTile();
};

const Puzzle = { setting, run, exportConfig };
export default Puzzle;
