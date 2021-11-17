import express from 'express';
import completeService from '@services/complete-service';
const router = express.Router();

router.post(
  '/',
  completeService.addUserComplete,
  completeService.postDonePuzzleData,
);

export default router;
