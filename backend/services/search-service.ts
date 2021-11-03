import searchService from '@services/db/puzzle-service';
import puzzleService from '@services/db/puzzle-service';
import path from 'path';
import fs from 'fs';

const search = (req: any, res: any, next: any) => {
  const files = fs.readdirSync(path.join(path.resolve(), 'public'));
  Object.assign(req, { files: files });
  next();
};

const sendImgUrl = async (req: any, res: any) => {
  const puzzle =
    req.body.keyword !== undefined
      ? await searchService.filterPuzzle(req.body.keyword)
      : await searchService.getPuzzle();
  const filterInfo: any = [];
  const fileName: any = [];
  req.files.forEach((file: any) => {
    const puzzleInfo = puzzle.info.filter(
      (puzzle: any) => puzzle.image == file,
    )[0];
    puzzleInfo !== undefined
      ? (filterInfo.push(puzzleInfo), fileName.push(puzzleInfo.image))
      : '';
  });
  res.status(200).json({
    data: filterInfo,
    fileName: fileName,
  });
};
export default { search, sendImgUrl };
