import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

import collegesRouter from './routes/colleges.js';
import usersRouter from './routes/users.js';
import reviewsRouter from './routes/reviews.js';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/colleges', collegesRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Studzens API is running smoothly!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
