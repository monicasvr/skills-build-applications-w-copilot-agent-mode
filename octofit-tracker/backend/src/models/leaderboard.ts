import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

export default model('LeaderboardEntry', leaderboardSchema);
