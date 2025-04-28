import mongoose from 'mongoose';
const { Schema } = mongoose;

const overSchema = new Schema({
  match: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  inning: { type: Number, default: 1 },
  overNumber: { type: Number, required: true },
  bowler: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  balls: [{ type: Schema.Types.ObjectId, ref: 'Ball' }],
  totalRuns: { type: Number, default: 0 },
  totalWickets: { type: Number, default: 0 },
  isMaiden: { type: Boolean, default: false }
});

const Over = mongoose.model('Over', overSchema);
export default Over;
