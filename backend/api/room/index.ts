import express from 'express';
import { getPuzzleInfo, checkURL } from '@services/play-puzzle';
const router = express.Router();

router.post('/urlcheck', checkURL);
router.post('/:puzzleID', getPuzzleInfo);

export default router;
