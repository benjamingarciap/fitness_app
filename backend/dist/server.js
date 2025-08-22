import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import profileRoutes from './routes/profile.js';
import 'dotenv/config';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
    res.send('Fitness App Backend Running');
});
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/profile', profileRoutes);
const PORT = process.env.PORT;
console.log(PORT);
mongoose
    .connect(process.env.MONGODB_URI || '')
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
