import express from 'express';
import playerController from '../controllers/playerController.js';

const router = express.Router();

// Player Routes
router.post('/player', playerController.createPlayer);
router.get('/player/:id', playerController.getPlayerDetails);
router.get('/getAllUnselectedPlayer', playerController.getAllUnselectedPlayer);
router.post('/getPlayerPerformance', playerController.getPlayerPerformance);
 
// getAllUnselectedPlayer

export default router;
