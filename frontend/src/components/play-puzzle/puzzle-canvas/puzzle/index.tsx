import MovePuzzle from "@components/play-puzzle/puzzle-canvas/puzzle/move-puzzle";
import FitPuzzle from "@components/play-puzzle/puzzle-canvas/puzzle/fit-tile";
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

let config: Config;
let gIndex: number;
let first: boolean;
const setting = (conf: Config) => {
  config = { ...conf };
  if (!isNaN(gIndex)) {
    config.groupTileIndex = gIndex;
  }
};
const setFirst = (firstFlag: boolean) => {
  first = firstFlag;
};
const exportFirst = () => first;
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
  FitPuzzle.moveUpdate(tileIndex, tilePosition, tileGroup);
};
const groupUpdate = (groupIndex: number) => {
  FitPuzzle.indexUpdate(groupIndex);
};
const groupFirstUpdate = (groupIndex: number) => {
  gIndex = groupIndex;
};
const completePuzzle = () => {
  return MovePuzzle.checkComplete();
};
const setPreemption = (preemptionData: number[]) => {
  MovePuzzle.setPreemption(preemptionData);
};
const Puzzle = {
  setting,
  settingValue,
  move,
  exportConfig,
  renderMove,
  completePuzzle,
  groupUpdate,
  groupFirstUpdate,
  setFirst,
  setPreemption,
  exportFirst,
};
export default Puzzle;
