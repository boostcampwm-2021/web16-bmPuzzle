import express from 'express';

import login from '@api/login/login';
import search from '@api/search/search';
import register from '@api/register-puzzle/index';
import my from '@api/my/index';
import ranking from '@api/ranking/index';
import room from '@api/room/index';
import complete from '@api/complete/index';

const router = express.Router();

router.use('/login', login);
router.use('/search', search);
router.use('/register', register);
router.use('/my', my);
router.use('/ranking', ranking);
router.use('/room', room);
router.use('/complete', complete);

export default router;
