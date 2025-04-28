import mongoose from 'mongoose';
const { Schema } = mongoose;

const ballSchema = new Schema({
  match: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  bowler: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  batsman: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  runs: { type: Number, default: 0 }, // runs by batsman
  extras: {
    bye: { type: Number, default: 0 },
    legbye: { type: Number, default: 0 },
    noball: { type: Number, default: 0 },
    wide: { type: Number, default: 0 },
    overthrow: { type: Number, default: 0 },
  },
  isLegal: { type: Boolean, default: true }, // legal delivery or not
  isWicket: { type: Boolean, default: false },
  wicketType: {
    type: String,
    enum: ['Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket', 'None'],
    default: 'None',
  },
  direction: { type: String, required: true }, // e.g., Cover, Mid-off
  ballType: { type: String, required: true }, // e.g., Fast, Offspin
  deliveryNumber: { type: Number }, // counts deliveries (legal + illegal)
  ballNumber: { type: Number }, // counts only legal balls
  overNumber: { type: Number }, // useful for tracking overs
  details: { type: String }, // notes
}, { timestamps: true });

const Ball = mongoose.model('Ball', ballSchema);
export default Ball;
