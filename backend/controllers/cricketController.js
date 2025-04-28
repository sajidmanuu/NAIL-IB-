import Match from '../models/matchModel.js';
import Player from '../models/playerModel.js';
import Ball from '../models/ballModel.js';
import Team from '../models/teamModel.js';

// Create a new match
const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get match details
const getMatchDetails = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('team1 team2 currentBatsman currentBowler');
    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new player
const createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get player details
const getPlayerDetails = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team');
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add ball details
const addBallDetails = async (req, res) => {
  try {
    const ball = new Ball(req.body);
    await ball.save();
    res.status(201).json(ball);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update match score
const updateMatchScore = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { team1Runs, team2Runs } = req.body;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    match.score.set('team1', team1Runs);
    match.score.set('team2', team2Runs);
    await match.save();

    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update player batting and bowling stats (for example, after a ball is bowled or a player is out)
const updatePlayerStats = async (req, res) => {
  try {
    const { playerId, runs, balls, isOut, overs, wickets, runsConceded, maidens } = req.body;

    // Find the player
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Update batting stats if it's a batting update
    if (runs !== undefined && balls !== undefined) {
      player.battingStats.runs += runs;
      player.battingStats.balls += balls;
      player.battingStats.isOut = isOut;
    }

    // Update bowling stats if it's a bowling update
    if (overs !== undefined && wickets !== undefined && runsConceded !== undefined) {
      player.bowlingStats.overs += overs;
      player.bowlingStats.wickets += wickets;
      player.bowlingStats.runsConceded += runsConceded;
      player.bowlingStats.maidens += maidens;
    }

    // Save the updated player stats
    await player.save();

    res.status(200).json({ message: 'Player stats updated successfully!', player });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createMatch,
  getMatchDetails,
  createPlayer,
  getPlayerDetails,
  addBallDetails,
  updateMatchScore,
  updatePlayerStats, // Add this to update player stats
};
