// import Match from '../models/matchModel.js';
import Match from '../models/matchModel.js';
import Team from '../models/teamModel.js';
import Player from '../models/playerModel.js';
const changeInning = async (req, res) => {
  try {
    const { matchId } = req.body;

    if (!matchId) {
      return res.status(400).json({ message: "Match ID is required" });
    }

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    match.currentInning = match.currentInning === 1 ? 2 : 1;
    await match.save();

    res.status(200).json({
      message: `Inning changed successfully to inning ${match.currentInning}`,
      currentInning: match.currentInning,
    });

  } catch (error) {
    console.error("Error changing inning:", error);
    res.status(500).json({ message: error.message });
  }
};
const getMatchPlayers = async (req, res) => {
  try {
    const { id } = req.body;
    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    // Determine batting and bowling team IDs based on inning
    const isFirstInning = match.currentInning === 1;
    const battingTeamId = isFirstInning ? match.team1 : match.team2;
    const bowlingTeamId = isFirstInning ? match.team2 : match.team1;

    // Populate players of both teams with player name only
    const battingTeam = await Team.findById(battingTeamId).populate({
      path: 'players',
      select: 'name role'
    });

    const bowlingTeam = await Team.findById(bowlingTeamId).populate({
      path: 'players',
      select: 'name role'
    });

    res.status(200).json({
      battingTeam: {
        name: battingTeam.name,
        players: battingTeam.players
      },
      bowlingTeam: {
        name: bowlingTeam.name,
        players: bowlingTeam.players
      }
    });
  } catch (err) {
    console.error('Error getting match players:', err);
    res.status(500).json({ message: err.message });
  }
}
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
    const match = await Match.find()
    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
 const getMatchDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id)
      .populate('team1')
      .populate('team2');

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error('Error fetching match by ID:', error);
    res.status(500).json({ message: error.message });
  }
 }
export default {
  changeInning ,
  createMatch,
  getMatchDetails,
  getMatchPlayers ,
  getMatchDetailsById
};
