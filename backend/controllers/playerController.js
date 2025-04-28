import { plugin } from 'mongoose';
import Player from '../models/playerModel.js';

// import Player from '../models/playerModel.js';

export const getPlayerPerformance = async (req, res) => {
  try {
    const { playerId, status } = req.body;
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    if (status =='batting') {
      return res.status(200).json({ battingStats: player.battingStats });
    } else if (status =='bowling') {
      return res.status(200).json({ bowlingStats: player.bowlingStats });
    } else {
      return res.status(400).json({
        message: 'Invalid status. Must be "batting" or "bowling".'
      });
    }
  } catch (error) {
    console.error('Error fetching player performance:', error);
    return res.status(500).json({ message: error.message });
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
const getAllUnselectedPlayer = async (req, res) => {
  try {
    // console.log("hii");

    // Find players who are not picked and only return the name and _id fields
    const players = await Player.find({ isPickedByTeam: false }).select('name _id');  

    res.status(200).json(players);  // Send the list of players as response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export default {
getPlayerPerformance,
  getAllUnselectedPlayer,
  createPlayer,
  getPlayerDetails,
};
