import express from 'express';
import searchService from '@services/search-service';
import sendImgUrl from '@services/search-service';
const router = express.Router();

router.get('/', searchService.search, searchService.sendImgUrl);

export default router;
