import puzzle from '@models/puzzle';
import puzzleService from '@services/db/puzzle-service';
import path from 'path';
import fs from 'fs';

const search = (req: any, res: any, next: any) => {
  const files = fs.readdirSync(path.join(path.resolve(), 'public'));
  Object.assign(req, { files: files });
  next();
};

const sendImgUrl = async (req: any, res: any) => {
  const puzzles = await puzzleService.getPuzzle();
  let return_data: any[] = [];
  let name_data: any[] = [];
  req.files.map((file: any) => {
    const now_puzzle = puzzles.info.filter(
      (puzzle: any) => puzzle.image == file,
    )[0];
    if(now_puzzle!=undefined){

        return_data.push(now_puzzle);
        name_data.push(now_puzzle.image);
    }
  });
  res.status(200).json({
    code: 1000,
    message: 'Welldone.',
    data: return_data,
    file_name: name_data,
  });
};
export default { search, sendImgUrl };
