import db from '@models/index';
import searchService from '@services/db/puzzle-service';

const myDone =async (id: string) => {
  const puzzle = await db.DonePuzzle.findAll({ where: {user_id:id}});
  const puzzle_arr: any = [];
  const time_arr: any = [];
  puzzle.forEach(async (file: any) => {
    puzzle_arr.push(file.puzzle_id);
    time_arr.push(file.time);
  })
  const answer = await searchService.donePuzzle(puzzle_arr);
  return { code: 200, msg: 'puzzle return', data: answer, time:time_arr};
};
export default myDone;