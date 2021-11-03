import db from '@models/index';
import puzzle from '@models/puzzle';

const filterPuzzle = async (keyword: string) => {
  const puzzleInfo = await db.Puzzle.findAll({
    where: { title: keyword, public: 1 },
    order:[
      ['visit_time','DESC']
    ],
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
  const puzzleInfo = await db.Puzzle.findAll({ where: { public: 1 },
    order:[
      ['visit_time','DESC']
    ],});
  if (puzzleInfo == null) return { code: 500, msg: 'no puzzle found' };
  return { code: 200, msg: 'puzzle return', info: puzzleInfo };
};

const myPuzzle =async (id: string) => {
  const puzzle = await db.Puzzle.findAll({ where: { public: 1,  user_id:id},
    order:[
      ['visit_time','DESC']
    ],});
  if (puzzle == null) return { code: 500, msg: 'no puzzle found' };
  return { code: 200, msg: 'puzzle return', data: puzzle };
};
export default { createPuzzle, getPuzzle, filterPuzzle, myPuzzle};
