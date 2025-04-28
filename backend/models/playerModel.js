import mongoose from 'mongoose';
const { Schema } = mongoose;

const playerSchema = new Schema({
  name: { type: String, required: true },
  isPickedByTeam: { type: Boolean, default: false },

  // Real-time match indicators
  isStriker: { type: Boolean, default: false },
  isNonStriker: { type: Boolean, default: false },
  isBowllerCurrently: { type: Boolean, default: false },

  role: {
    type: String,
    enum: ['Batsman', 'Bowler', 'All-rounder'],
    required: true
  },

  battingStats: {
    runs: { type: Number, default: 0 },
    total4: { type: Number, default: 0 },
    total6: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    isOut: { type: Boolean, default: false }
  },

  bowlingStats: {
    overs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    maidens: { type: Number, default: 0 },
    noBalls: { type: Number, default: 0 },
    wides: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

const Player = mongoose.model('Player', playerSchema);
export default Player;
