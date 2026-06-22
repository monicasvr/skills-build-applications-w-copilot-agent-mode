import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB using octofit_db');
}

export default mongoose;
