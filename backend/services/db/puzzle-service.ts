import db from '@models/index';
import { Sequelize } from 'sequelize';
import puzzle from '@models/puzzle';

const filterPuzzle = async (keyword: string) => {
  const puzzleInfo = await db.Puzzle.findAll({
    where: { title: keyword, public: 1 },
    order: [['visit_time', 'DESC']],
  });

  if (puzzleInfo == null) return { code: 500, msg: 'no puzzle found' };
  return { code: 200, msg: 'search puzzle!', info: puzzleInfo };
};

const createPuzzle = async (data: object) => {
  const res = await db.Puzzle.create(data);
  if (res !== null) return true;
  else return false;
};

const getPuzzle = async () => {
  const puzzleInfo = await db.Puzzle.findAll({
    where: { public: 1 },
    order: [['visit_time', 'DESC']],
  });
  if (puzzleInfo == null) return { code: 500, msg: 'no puzzle found' };
  return { code: 200, msg: 'puzzle return', info: puzzleInfo };
};

const getPuzzleByID = async (id: number) => {
  const puzzle = await db.Puzzle.findOne({ where: { id: id } });
  if (puzzle == null) return { code: 500, msg: 'no puzzle found' };
  return { code: 200, image: puzzle.image, level: puzzle.level };
};

const myPuzzle = async (id: string) => {
  const puzzle = await db.Puzzle.findAll({
    where: { public: 0, user_id: id },
    order: [['visit_time', 'DESC']],
  });
  if (puzzle == null) return { code: 500, msg: 'no puzzle found' };
  return { code: 200, msg: 'puzzle return', data: puzzle };
};

const updateVisitTime = async (id: number) => {
  try {
    const puzzle = await db.Puzzle.update(
      { visit_time: Sequelize.literal('visit_time + 1') },
      { where: { id: id } },
    );
    return { code: 200, msg: 'visit_time updated' };
  } catch (err: any) {
    return { code: 500, msg: err };
  }
};
const donePuzzle = async (puzzle_id: any) => {
  const puzzle = await db.Puzzle.findAll({ where: { id: puzzle_id } });
  return puzzle;
};
export default {
  createPuzzle,
  getPuzzle,
  getPuzzleByID,
  filterPuzzle,
  myPuzzle,
  donePuzzle,
  updateVisitTime,
};
