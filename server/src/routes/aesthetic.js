import express from 'express';
import { getAesthetic } from '../controllers/aestheticController.js';

const router = express.Router();

router.post('/', getAesthetic);

export default router;
