import express from 'express';
import searchService from '@services/search-service';
const router = express.Router();

router.get('/', searchService);

export default router;
