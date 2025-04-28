import express from 'express';
import ballController from '../controllers/ballController.js';

const router = express.Router();

// Ball Routes
router.post('/ball', ballController.addBallDetails);

export default router;
