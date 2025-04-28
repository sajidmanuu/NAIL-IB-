import express from 'express';
import cricketController from '../controllers/cricketController.js';

const router = express.Router();

// Match Routes
router.post('/match', cricketController.createMatch);
router.get('/match/:id', cricketController.getMatchDetails);
router.post('/match/:id/updateScore', cricketController.updateMatchScore);

// Player Routes
router.post('/player', cricketController.createPlayer);
router.get('/player/:id', cricketController.getPlayerDetails);
router.post('/player', cricketController.createPlayer);              // Create a new player
router.get('/player/:id', cricketController.getPlayerDetails);       // Get player details
router.put('/player/stats', cricketController.updatePlayerStats);
// Ball Routes
router.post('/ball', cricketController.addBallDetails);

export default router;
