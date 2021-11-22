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
  groupTileIndex: number | null;
  project: any;
  puzzleImage: any;
  tileIndexes: any[];
  groupArr: any[];
  selectIndex: number;
};

type Timer = {
  minutes: number;
  seconds: number;
};

let config: Config;
const setting = (conf: Config) => {
  config = { ...conf };
};
const settingValue = (key: string, value: any) => {
  config[key] = value;
};
const exportConfig = () => config;
const move = (isFirstClient: boolean, socket: any, roomID: string) => {
  MovePuzzle.moveTile(isFirstClient, socket, roomID);
  MovePuzzle.findNearTile(isFirstClient, socket, roomID);
};

const renderMove = (
  tileIndex: number,
  tilePosition: any[],
  tileGroup: number | null
) => {
  MovePuzzle.moveUpdate(tileIndex, tilePosition, tileGroup);
};
const groupUpdate = (groupIndex: number) => {
  MovePuzzle.indexUpdate(groupIndex);
};
const completePuzzle = () => {
  return MovePuzzle.checkComplete();
};

const Puzzle = {
  setting,
  settingValue,
  move,
  exportConfig,
  renderMove,
  completePuzzle,
  groupUpdate,
};
export default Puzzle;
