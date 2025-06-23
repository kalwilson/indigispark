import express from 'express';
import { analyzePrompts } from '../controllers/promptsController.js';

const router = express.Router();

router.post('/', analyzePrompts);

export default router;
