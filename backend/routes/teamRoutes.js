import express from 'express';
import teamController from '../controllers/teamController.js';

const router = express.Router();

// Team Routes
router.post('/team', teamController.createTeam);
router.get('/teams', teamController.getTeamDetails);
router.post('/team/updateBallData', teamController.updateBallData);

export default router;
