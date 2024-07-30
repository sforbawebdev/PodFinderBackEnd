import express from 'express';
import userRoutes from './routes/userRoutes';
import podRoutes from './routes/podRoutes';
import membershipRoutes from './routes/membershipRoutes';
import messageRoutes from './routes/messageRoutes';
import { authenticateToken } from './middleware/authMiddleware';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', authenticateToken, podRoutes);
app.use('/api', authenticateToken, membershipRoutes);
app.use('/api', authenticateToken, messageRoutes);

export default app;
