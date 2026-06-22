import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export default model('Workout', workoutSchema);
