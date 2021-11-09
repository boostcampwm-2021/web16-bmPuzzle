import express from 'express';
import joinPlayRoom from '@services/play-puzzle';
const router = express.Router();

router.post('/:roomID', joinPlayRoom);

export default router;
