import express from 'express';
import multer from 'multer';
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    const fileType = String(file.mimetype.split('/').pop());
    const fileName = String(Date.now());
    cb(null, fileName + '.' + fileType);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('img'), (req, res) => {});

export default router;
