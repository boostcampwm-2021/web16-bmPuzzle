import db from '@models/index';

const postData = async (data: object) => {
  const res = await db.Puzzle.create(data);
  if (res !== null) return true;
  else return false;
};

export default postData;
