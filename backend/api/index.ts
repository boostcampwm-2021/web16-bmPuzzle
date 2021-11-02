import express from 'express';

import login from '@api/login/login';
import search from '@api/search/search';
import register from '@api/register-puzzle/index';

const router = express.Router();

router.use('/login', login);
router.use('/search', search);
router.use('/register', register);

export default router;
