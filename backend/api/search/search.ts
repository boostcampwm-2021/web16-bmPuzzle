import express from 'express';
import searchService from '@services/search-service';
const router = express.Router();

router.get('/', searchService.search, searchService.sendImgUrl);

router.post('/', searchService.search, searchService.filterImgUrl);

export default router;
