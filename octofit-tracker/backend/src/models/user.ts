import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, default: Date.now },
    totalPoints: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model('User', userSchema);
