import express from 'express';
import multer from 'multer';
import puzzleService from '@services/register-puzzle-service';
const router = express.Router();

router.post('/', multer({ storage: puzzleService.storage }).single('img'), puzzleService.registerPuzzle);

export default router;
