import db from '@models/index';
import puzzleService from '@services/db/puzzle-service';
import { brotliDecompress } from 'zlib';

const myDone = async (id: string) => {
  const puzzle = await db.DonePuzzle.findAll({ where: { user_id: id } });
  const puzzle_arr: any = [];
  const time_arr: any = [];
  puzzle.forEach(async (file: any) => {
    puzzle_arr.push(file.puzzle_id);
    time_arr.push(file.time);
  });

  const data = await puzzleService.donePuzzle(puzzle_arr, time_arr);

  return { code: 200, msg: 'puzzle return', data: data, time: time_arr };
};

const getData = async (userID: string, puzzleID: number, time: number) => {
  const res = await db.DonePuzzle.findOne({
    where: { user_id: userID, puzzle_id: puzzleID },
  });

  if (res == null) return { code: 500 };
  return { code: 200, data: res };
};

const createData = async (userID: number, puzzleID: number, time: number) => {
  const res = await db.DonePuzzle.create({
    user_id: userID,
    puzzle_id: puzzleID,
    time: time,
  });

  if (res == null) return { code: 500, msg: 'not create data' };
  return { code: 200, msg: 'create data' };
};

const updateData = async (userID: number, puzzleID: number, time: number) => {
  const res = await db.DonePuzzle.update(
    { time: time },
    { where: { user_id: userID, puzzle_id: puzzleID } },
  );

  if (res == null) return { code: 500, msg: 'not update data' };
  return { code: 200, msg: 'update time' };
};
export default { myDone, getData, createData, updateData };
