import express from 'express';
import searchService from '@services/search-service';
const router = express.Router();

router.get('/:page', searchService.search, searchService.sendImgUrl);

router.post('/:page', searchService.search, searchService.sendImgUrl);

export default router;
