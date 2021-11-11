import multer from 'multer';
import puzzleService from '@services/db/puzzle-service';
import userService from '@services/db/user-service';
const newPuzzle = { user_id: '', image: '', title: '', level: 1 };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: async (req, file, cb) => {
    const fileType = String(file.mimetype.split('/').pop());
    const fileName = String(Date.now());
    const totalName = fileName + '.' + fileType;
    cb(null, totalName);
    newPuzzle.image = totalName;
  },
});

const registerPuzzle = (req: any, res: any) => {
  newPuzzle.user_id = req.body.userId;
  newPuzzle.title = req.body.title;
  newPuzzle.level = Number(req.body.level);
  puzzleService.createPuzzle(newPuzzle).then(result => {
    if (result) res.status(200).send();
    else res.status(500).send();
  });
  userService.updateUploadData(newPuzzle.user_id);
};

export default { storage, registerPuzzle };
