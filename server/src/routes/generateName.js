import express from 'express';
import { generateName } from '../controllers/generateNameController.js';

const router = express.Router();

router.post('/', generateName);

export default router;
