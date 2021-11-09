import express from 'express';
import joinPlayRoom from '@services/play-puzzle';
const router = express.Router();

router.post('/', joinPlayRoom);

export default router;
