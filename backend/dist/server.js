import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import profileRoutes from './routes/profile.js';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
    res.send('Fitness App Backend Running');
});
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/profile', profileRoutes);
const PORT = process.env.PORT || 5050;
mongoose
    .connect(process.env.MONGODB_URI ||
    'mongodb+srv://bengarc:zf65gsPsShQMIW9N@cluster0.lrxvc4c.mongodb.net/fitness-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
