import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ message: 'List all teams', data: teams });
});

router.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ message: 'Create team', data: team });
});

export default router;
