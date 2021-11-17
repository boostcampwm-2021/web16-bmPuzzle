import searchService from '@services/db/puzzle-service';
import donePuzzleService from '@services/db/done-puzzle-service';
import path from 'path';
import fs from 'fs';

const search = (req: any, res: any, next: any) => {
  const files = fs.readdirSync(path.join(path.resolve(), 'public'));
  Object.assign(req, { files: files });
  next();
};
const filter = async (req: any, res: any, next: any) => {
  const id = req.body.id;
  const upload = await searchService.myPuzzle(id);
  const done = await donePuzzleService.myDone(id);

  const uploadInfo: any = [];
  const uploadName: any = [];
  const doneInfo: any = [];
  const doneName: any = [];
  let idx: number = 0;
  upload.data.forEach((file: any) => {
    if (req.files.includes(file.image)) {
      uploadInfo.push(file);
      uploadName.push(file.image);
    }
  });
  done.data.forEach((file: any) => {
    if (req.files.includes(file.image)) {
      doneInfo.push(file);
      doneName.push(file.image);
    }
  });

  res.status(200).json({
    uploadData: uploadInfo,
    uploadName: uploadName,
    doneData: doneInfo,
    doneName: doneName,
    doneTime: done.time,
  });
};
export default { search, filter };
