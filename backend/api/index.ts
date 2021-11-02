import express from 'express';

import login from '@api/login/login';
import search from '@api/search/search';
const router = express.Router();

router.use('/login', login);
router.use('/search', search);
export default router;
