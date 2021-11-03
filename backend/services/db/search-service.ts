import db from '@models/index';

const postData = async () => {
  const puzzleInfo = await db.Puzzle.findAll();
  if(puzzleInfo == null) return {code: 500, msg: 'no puzzle found'};

  return {code: 200, msg: 'puzzle return', info: puzzleInfo};
};

export default postData;
