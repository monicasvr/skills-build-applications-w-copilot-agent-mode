import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

// Seed the octofit_db database with test data
async function seed() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding:', mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const teams = await Team.create([
    { name: 'Team Kraken', description: 'Competitive endurance crew' },
    { name: 'Team Nautilus', description: 'Strength and recovery squad' }
  ]);

  const users = await User.create([
    {
      name: 'Ava Reed',
      email: 'ava.reed@example.com',
      role: 'captain',
      team: teams[0]._id,
      totalPoints: 1240
    },
    {
      name: 'Kai Brooks',
      email: 'kai.brooks@example.com',
      role: 'member',
      team: teams[0]._id,
      totalPoints: 980
    },
    {
      name: 'Mia Chen',
      email: 'mia.chen@example.com',
      role: 'member',
      team: teams[1]._id,
      totalPoints: 1105
    }
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id];
  await Promise.all(teams.map((team) => team.save()));

  await Activity.create([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 45,
      caloriesBurned: 420,
      date: new Date('2026-06-20T08:30:00Z'),
      notes: 'Morning tempo run'
    },
    {
      user: users[1]._id,
      type: 'Cycling',
      durationMinutes: 60,
      caloriesBurned: 630,
      date: new Date('2026-06-20T09:00:00Z'),
      notes: 'Hill interval training'
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      durationMinutes: 50,
      caloriesBurned: 220,
      date: new Date('2026-06-19T18:00:00Z'),
      notes: 'Recovery flow session'
    }
  ]);

  await Workout.create([
    {
      title: 'Power HIIT Circuit',
      difficulty: 'Hard',
      durationMinutes: 30,
      category: 'Strength',
      description: 'A high-intensity circuit to build power and endurance.'
    },
    {
      title: 'Core Stability Flow',
      difficulty: 'Medium',
      durationMinutes: 25,
      category: 'Core',
      description: 'Focused core exercises with mobility and balance work.'
    }
  ]);

  await LeaderboardEntry.create([
    {
      user: users[0]._id,
      team: teams[0]._id,
      rank: 1,
      score: 1240
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      rank: 2,
      score: 1105
    },
    {
      user: users[1]._id,
      team: teams[0]._id,
      rank: 3,
      score: 980
    }
  ]);

  console.log('Seed the octofit_db database with test data complete.');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
