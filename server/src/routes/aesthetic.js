import express from 'express';
import {
  getAesthetic,
  getTagGroups,
} from '../controllers/aestheticController.js';

const router = express.Router();

router.get('/tag-groups', getTagGroups);
router.post('/', getAesthetic);

export default router;
