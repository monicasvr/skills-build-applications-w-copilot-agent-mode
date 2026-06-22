import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .sort({ rank: 1 })
    .populate('user team')
    .lean();
  res.json({ message: 'Leaderboard data', data: leaderboard });
});

export default router;
