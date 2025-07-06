import express from 'express';
import {
  analyzePrompts,
  getAllBrandTypes,
  getAllBrandDescriptions,
} from '../controllers/promptsController.js';

const router = express.Router();

router.get('/brand-types', getAllBrandTypes);
router.get('/brand-type-descriptions', getAllBrandDescriptions);
router.post('/', analyzePrompts);

export default router;
