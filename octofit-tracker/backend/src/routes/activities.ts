import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json({ message: 'List all activities', data: activities });
});

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ message: 'Create activity', data: activity });
});

export default router;
