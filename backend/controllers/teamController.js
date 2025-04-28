import Player from '../models/playerModel.js';
import Team from '../models/teamModel.js';
// IMPORT Player
// Create a new team
const updateBallData = async (req, res) => {
  try {
    const { run, extras, wicket, striker, nonStriker, bowler } = req.body;

    const strikerPlayer = await Player.findById(striker);
    const bowlerPlayer = await Player.findById(bowler);

    if (!strikerPlayer || !bowlerPlayer) {
      return res.status(404).json({ message: 'Striker or Bowler not found' });
    }

    // Update batsman stats
    strikerPlayer.battingStats.balls += 1;
    strikerPlayer.battingStats.runs += run;
    if (run === 4) strikerPlayer.battingStats.total4 += 1;
    if (run === 6) strikerPlayer.battingStats.total6 += 1;

    if (wicket) strikerPlayer.battingStats.isOut = true;

    await strikerPlayer.save();

    // Update bowler stats
    bowlerPlayer.bowlingStats.balls += 1;
    bowlerPlayer.bowlingStats.runsConceded += run;

    if (wicket) bowlerPlayer.bowlingStats.wickets += 1;
    if (extras.noBall) bowlerPlayer.bowlingStats.noBalls += 1;
    if (extras.wide) bowlerPlayer.bowlingStats.wides += 1;

    // Calculate overs
    const totalBalls = bowlerPlayer.bowlingStats.balls;
    bowlerPlayer.bowlingStats.overs = Math.floor(totalBalls / 6) + (totalBalls % 6) / 10;

    await bowlerPlayer.save();

    // Update team extras
    const battingTeam = await Team.findOne({ players: striker });
    if (battingTeam) {
      if (extras.bye) battingTeam.extras.bye += 1;
      if (extras.legbye) battingTeam.extras.legbye += 1;
      if (extras.noball) battingTeam.extras.noball += 1;
      if (extras.wide) battingTeam.extras.wide += 1;
      if (extras.overthrow) battingTeam.extras.overthrow += 1;
      battingTeam.totalRuns += run;
      if (wicket) battingTeam.totalWickets += 1;
      battingTeam.overs += 1 / 6; // Assuming each call is one legal delivery
      await battingTeam.save();
    }

    return res.status(200).json({ message: 'Stats updated successfully' });
  } catch (error) {
    console.error('Error updating ball data:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const { name, players } = req.body;

    // 1. Create and save the new team
    const team = new Team({ name, players });
    await team.save();

    // 2. Update all selected players' isPickedByTeam to true
    await Player.updateMany(
      { _id: { $in: players } },
      { $set: { isPickedByTeam: true } }
    );

    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get team details
const getTeamDetails = async (req, res) => {
  try {
    const team = await Team.find();
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createTeam,
  getTeamDetails,
  updateBallData
};
