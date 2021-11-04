import express from 'express';
import loginService from '@services/login-service';
const router = express.Router();

router.post('/', loginService);

export default router;
