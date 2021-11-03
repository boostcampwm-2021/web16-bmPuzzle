import db from '@models/index';

const getData = async () => {
  const puzzleInfo = await db.Puzzle.findAll();
  if (puzzleInfo == null) return { code: 500, msg: 'no puzzle found' };

  return { code: 200, msg: 'puzzle return', info: puzzleInfo };
};

const filterData = async (keyword: string) => {
  const puzzleInfo = await db.Puzzle.findAll({
    where: { title: keyword, public: 1 },
  });

  if (puzzleInfo == null) return { code: 500, msg: 'no puzzle found' };
  return { code: 200, msg: 'search puzzle!', info: puzzleInfo };
};

export default { getData, filterData };
