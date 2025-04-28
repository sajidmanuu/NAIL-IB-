import express from 'express';
import matchController from '../controllers/matchController.js';

const router = express.Router();

// Match Routes
router.post('/match', matchController.createMatch);
router.get('/match', matchController.getMatchDetails);
router.post('/match/getMatchPlayers', matchController.getMatchPlayers);
router.post('/match/changeInning', matchController.changeInning);
router.get('/match/:id', matchController.getMatchDetailsById);

export default router;
