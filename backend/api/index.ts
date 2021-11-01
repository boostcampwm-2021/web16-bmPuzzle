import express from 'express';

import login from '@api/login/login';

const router = express.Router();

router.use('/login', login)

export default router;
