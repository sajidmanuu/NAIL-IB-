import mongoose from 'mongoose';
const { Schema } = mongoose;

const matchSchema = new Schema({
  team1: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  team2: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  matchType: {
    type: String,
    enum: ['Test', 'ODI', 'T20'],
    required: true
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed'],
    default: 'Scheduled'
  },
  currentInning: { type: Number, default: 1 },
  totalOvers: { type: Number } // Max overs per inning (for ODI, T20)
}, {
  timestamps: true
});

const Match = mongoose.model('Match', matchSchema);
export default Match;
