import express from 'express';
import loginService from '@services/loginService';
const router = express.Router();

router.post('/', loginService);

export default router;
