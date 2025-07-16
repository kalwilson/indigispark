import express from 'express';
import {
  analyzePrompts,
  getAllBrandTypes,
} from '../controllers/promptsController.js';

const router = express.Router();

router.get('/brand-types', getAllBrandTypes);

router.post('/', analyzePrompts);

export default router;
