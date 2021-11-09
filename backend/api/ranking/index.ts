import express from 'express';
import rankingService from '@services/ranking-service';
const router = express.Router();

router.get('/', rankingService);

export default router;
