import db from '@models/index';

const filterPuzzle = async (keyword: string) => {
  const puzzleInfo = await db.Puzzle.findAll({
    where: { title: keyword, public: 1 },
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
  const puzzleInfo = await db.Puzzle.findAll({ where: { public: 1 } });
  if (puzzleInfo == null) return { code: 500, msg: 'no puzzle found' };

  return { code: 200, msg: 'puzzle return', info: puzzleInfo };
};

export default { createPuzzle, getPuzzle, filterPuzzle };
