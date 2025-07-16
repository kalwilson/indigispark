import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import generateNameRoutes from './routes/generateName.js';
import promptsRoutes from './routes/prompts.js';
import aestheticRoutes from './routes/aesthetic.js';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use('/api/generate-name', generateNameRoutes);
app.use('/api/prompts', promptsRoutes);
app.use('/api/aesthetic', aestheticRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} :)`);
});
