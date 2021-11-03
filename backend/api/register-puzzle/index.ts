import express from 'express';
import multer from 'multer';
import puzzleService from '@services/db/puzzle-service';

const router = express.Router();
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
const upload = multer({ storage: storage });

router.post('/', upload.single('img'), (req, res) => {
  newPuzzle.user_id = req.body.userId;
  newPuzzle.title = req.body.title;
  newPuzzle.level = Number(req.body.level);
  puzzleService.createPuzzle(newPuzzle).then(result => {
    if (result) res.status(200).send();
    else res.status(500).send();
  });
});

export default router;
