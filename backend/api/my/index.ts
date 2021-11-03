import express from 'express';
import myService from '@services/my-service';
const router = express.Router();

router.post('/', myService.search,myService.filter);

export default router;
