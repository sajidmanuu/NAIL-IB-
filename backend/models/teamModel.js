import mongoose from 'mongoose';
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: { type: String, required: true },

  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  

  totalRuns: { type: Number, default: 0 },
  totalWickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },

  extras: {
    bye: { type: Number, default: 0 },
    legbye: { type: Number, default: 0 },
    noball: { type: Number, default: 0 },
    wide: { type: Number, default: 0 },
    overthrow: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
export default Team;
