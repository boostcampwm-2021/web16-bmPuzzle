import MovePuzzle from "@components/play-puzzle/puzzle-canvas/puzzle/move-puzzle";

type Config = {
  [index: string]: number | any[] | boolean | any;
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
const setting = (conf: Config) => {
  config = { ...conf };
};
const settingValue = (key: string, value: any) => {
  config[key] = value;
};
const exportConfig = () => config;
const move = (isFirstClient: boolean) => {
  MovePuzzle.moveTile(isFirstClient);
  MovePuzzle.findNearTile();
};

const Puzzle = { setting, settingValue, move, exportConfig };
export default Puzzle;
